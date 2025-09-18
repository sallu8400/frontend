import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AddToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
          const token = localStorage.getItem('authToken');

      const response = await axios.post(
        `${API_BASE_URL}/cart/add`,
        { productId }, // body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Add to cart failed");
    }
  }
);

export const RemoveFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue, getState }) => {
    try {
   const token = localStorage.getItem('authToken');

      const response = await axios.delete(
 `${API_BASE_URL}/cart/items/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data,"response.data;")

      return response.data; // Expected: { success, message, data: cart }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Remove from cart failed');
    }
  }
);

// Async thunk to update cart item quantity
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `${API_BASE_URL}/cart/items/${itemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.data, "ttt");
      return response.data.data;
    } catch (error) {

      console.log(error,"er")
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update cart item'
      );
    }
  }
);

export const ClearCart = createAsyncThunk(
  'cart/ClearCart',
  async (_, { rejectWithValue }) => {

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.delete(
        `${API_BASE_URL}/cart/clear`,
      
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.data, "ttt");
      return response.data.data;
    } catch (error) {

      console.log(error,"er")
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update cart item'
      );
    }
  }
);


export const GetCart = createAsyncThunk(
  "cart/GetCart",
  // Pehla argument payload ke liye hota hai, doosra thunkAPI ke liye
  async (_, { rejectWithValue }) => { // Yahan underscore (_) ka matlab hai ki hum pehle argument ko ignore kar rahe hain
    try {
      const token = localStorage.getItem('authToken');

      // EK AUR CHECK: Token hai ya nahi?
      if (!token) {
        console.log("Token nahi mila, isliye request nahi bhej rahe.");
        return rejectWithValue("Authentication token not found!");
      }

      const response = await axios.get(
        `${API_BASE_URL}/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Yahan naya wala console log use karein
      console.error("GetCart thunk mein error aaya:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to get cart");
    }
  }
);





const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  itemDiscount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
    calculateTotals: (state) => {
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },

  extraReducers: (builder) => {
    builder
 .addCase(AddToCart.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(AddToCart.fulfilled, (state, action) => {
  state.loading = false;

  // ✅ Safely assign new items array
  state.items = action.payload?.data?.items || [];

  // ✅ Total cart value
  state.total = action.payload?.data?.totalAmount || 0;

  // ✅ Total distinct products for badge
  state.itemCount = action.payload?.data?.totalItems || 0;
})
.addCase(AddToCart.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || 'Something went wrong while adding to cart';
})


 .addCase(RemoveFromCart.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(RemoveFromCart.fulfilled, (state, action) => {
  state.loading = false;

  const data = action.payload?.data || {};

  state.items = Array.isArray(data.items) ? [...data.items] : [];
  state.total = data.totalAmount || 0;
  state.itemCount = data.totalItems || 0;
})

.addCase(RemoveFromCart.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

// updatete
.addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedCart = action.payload;

        state.items = updatedCart.items;
        state.total = updatedCart.totalAmount;
        state.itemCount = updatedCart.totalItems;
                state.itemDiscount = updatedCart.discount;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

// get cart
      .addCase(GetCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCart.fulfilled, (state, action) => {
        const cart = action.payload.data;
        state.items = cart.items;
        state.total = cart.totalAmount;
        state.itemCount = cart.totalItems;
        state.itemDiscount = cart.discount;
        state.loading = false;
        state.error = null;
      })
      .addCase(GetCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;