// slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = "https://backend-2-rngp.onrender.com/api";

// ✅ API function moved here
const getPaginatedProducts = async ({ page = 1, limit = 6 }) => {
  const res = await axios.get(`${API_BASE_URL}/products?page=${page}&limit=${limit}`);
  return res.data;
};

// ✅ Async thunk using internal API function
export const fetchPaginatedProducts = createAsyncThunk(
  "pagi/fetchPaginatedProducts",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await getPaginatedProducts({ page, limit });
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchAdminOrders = createAsyncThunk(
  'orders/fetchAdminOrders',
  async ({ page, pageSize }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        return rejectWithValue('Authentication token not found.');
      }
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };
      const response = await axios.get(
        `https://backend-2-rngp.onrender.com/api/payment/fetch?page=${page}&limit=${pageSize}`,
        config
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// ✅ Redux slice
const paginationSlice  = createSlice({
  name: "pagi",
  initialState: {
    data: [],
    total: 0,
    currentPage: 1,
    pages: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedProducts.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
        state.currentPage = action.payload.page;
        state.loading = false;
      })
      .addCase(fetchPaginatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // admin
   .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ API रिस्पॉन्स को initialState की फील्ड्स से मैप करें
        state.data = action.payload.orders;         // API का 'orders' -> state का 'data'
        state.total = action.payload.totalCount;    // API का 'totalCount' -> state का 'total'
        state.currentPage = action.payload.currentPage; // API का 'currentPage' -> state का 'currentPage'
        state.pages = action.payload.totalPages;    // API का 'totalPages' -> state का 'pages'
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      
  },
});

export default paginationSlice.reducer;
