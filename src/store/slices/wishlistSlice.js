import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { getAuthHeaders } from './../../utils/authHeaders';
const API_BASE_URL = 'https://backend-2-rngp.onrender.com/api';


export const AddWishlist = createAsyncThunk(
  "products/AddWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); // ⬅️ get token from localStorage (or Redux if stored there)

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // ⬅️ attach token in header
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/wishlist/add`,
              { productId },
        config
      );
  console.log("response.data;",response.data)
      return response.data;

    
    } catch (error) {
      console.log(error.response?.data?.message || error.message,error)
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getWishlist = createAsyncThunk(
  'wishlist/getWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.get(`${API_BASE_URL}/wishlist`, {
           headers: getAuthHeaders() // 👈 clean and reusable
      });

      return response.data;
    } catch (error) {
      console.error('Wishlist fetch error:', error);

      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch wishlist'
      );
    }
  }
);

// ✅ Remove from Wishlist
export const removeFromWishlist = createAsyncThunk(
  'wishlist/remove',
  async (id, { rejectWithValue }) => {
    alert(id)
    try {
          const token = localStorage.getItem('authToken');
      const { data } = await axios.delete(
        `${API_BASE_URL}/wishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response?.data?.message || 'Remove failed');
    }
  }
);





const initialState = {
  items: [],      // wishlist products
  count: 0,       // number of products in wishlist
  loading: false, // loading state
  error: null     // error message
};


const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // addToWishlist: (state, action) => {
    //   const exists = state.items.find(item => item.id === action.payload.id);
    //   if (!exists) {
    //     state.items.push(action.payload);
    //     state.count = state.items.length;
    //   }
    // },
    // removeFromWishlist: (state, action) => {
    //   state.items = state.items.filter(item => item.id !== action.payload);
    //   state.count = state.items.length;
    // },
    // clearWishlist: (state) => {
    //   state.items = [];
    //   state.count = 0;
    // },
  },

extraReducers: (builder) => {
  builder
    .addCase(getWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.data; // ← update products
      state.count = action.payload.count;         // ← update count
    })
    .addCase(getWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Something went wrong';
    })
// add wislist 
        .addCase(AddWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
.addCase(AddWishlist.fulfilled, (state, action) => {
  state.loading = false;
  state.items = {
    ...state.items,
    product: [...(state.items.product || []), action.payload.data]
  };
  state.count = (state.count || 0) + 1;
})

    .addCase(AddWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Something went wrong';
    })

       // ✅ REMOVE FROM WISHLIST
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  .addCase(removeFromWishlist.fulfilled, (state, action) => {
  state.loading = false;
  // ✅ action.payload.data में से .products ऐरे निकालें
  state.items = action.payload.data.products; 
})
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
}

});



export const { addToWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; 