import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api";
import axios from 'axios'
const API_BASE_URL = "https://backend-z82r.onrender.com";

// Thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data; // assuming response.data is an array of products
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
); 

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); // ⬅️ get token from localStorage (or Redux if stored there)

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // ⬅️ attach token in header
        },
      };

      const response = await axios.get(
        `${API_BASE_URL}/products?category=${category}`,
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





export const fetchProductsBySearch = createAsyncThunk(
  "products/fetchProductsBySearch",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // or get from Redux state
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${API_BASE_URL}/products?search=${encodeURIComponent(searchTerm)}`,
        config
      );
console.log(response.data,"res")
      return response.data; // contains { success, count, data: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// export const fetchProductsByCategory = createAsyncThunk(
//   "products/fetchProductsByCategory",
//   async (category, { rejectWithValue }) => {
//     try {
//       console.log("API call for category:", category);
//       const response = await apiService.getProductsByCategory(category);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchProductById = createAsyncThunk(
//   "products/fetchProductById",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await apiService.getProductById(id);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const fetchProductById = createAsyncThunk(
  "products/fetchProductsByid",
  async (id, { rejectWithValue }) => {
    try {

    

      const response = await axios.get(
        `${API_BASE_URL}/products/${id}`
      );
console.log(response.data,"res")
      return response.data; // contains { success, count, data: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query, { rejectWithValue }) => {
    try {
      const response = await apiService.searchProducts(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const fetchProductsByPriceRange = createAsyncThunk(
//   'products/fetchByPriceRange',
//   async ({ minPrice, maxPrice }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`https://backend-2-rngp.onrender.com/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

const initialState = {
  allProducts: [],
  filteredProducts: [],
  selectedProduct: null,
  searchResults: [],
  loading: false,
  error: null,
  filters: {
    category: "all",
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
    sizes: [],
    colors: [],
  },
};


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

        filterByPrice: (state, action) => {
      state.filters.priceRange = action.payload;
      state.filteredProducts = state.allProducts.filter(
        (product) =>
          product.price >= action.payload[0] &&
          product.price <= action.payload[1]
      );
    }, 
    // filterByCategory: (state, action) => {
    //   const category = action.payload;
    //   console.log("Redux: Filtering by category:", category);

    //   // Update the category in filters
    //   state.filters.category = category;

    //   if (category === "all" || !category) {
    //     state.filteredProducts = state.allProducts;
    //     console.log("Redux: Showing all products:", state.allProducts.length);
    //   } else {
    //     state.filteredProducts = state.allProducts.filter(
    //       (product) => product.category.toLowerCase() === category.toLowerCase()
    //     );
    //     console.log(
    //       "Redux: Filtered products for",
    //       category,
    //       ":",
    //       state.filteredProducts.length
    //     );
    //   }
    // },
    sortProducts: (state, action) => {
      const sortBy = action.payload;


      let sorted = [...state.filteredProducts];

console.log(sorted,"sorted")

      switch (sortBy) {
        case "price-low":
          sorted.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          sorted.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
           sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          // sorted.sort((a, b) => b.id - a.id);
          break;
        default:
          // featured - keep original order
          break;
      }

      state.filteredProducts = sorted;
    },
    // filterByPrice: (state, action) => {
    //   state.filters.priceRange = action.payload;
    //   state.filteredProducts = state.allProducts.filter(
    //     (product) =>
    //       product.price >= action.payload[0] &&
    //       product.price <= action.payload[1]
    //   );
    // },
    applyFilters: (state, action) => {
      const { priceRange, sizes, colors } = action.payload;

let filtered = Array.isArray(state.allProducts) ? [...state.allProducts] : [];


      console.log(filtered,"gii")
    

      // Apply category filter first
      // if (state.filters.category !== "all" && state.filters.category) {
      //   filtered = filtered.filter(
      //     (product) =>
      //       product.category.toLowerCase() ===
      //       state.filters.category.toLowerCase()
      //   );
      //   console.log("Redux: After category filter:", filtered.length);
      // }


      
      // Apply price filter
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      // Apply size filter
      if (sizes.length > 0) {
        filtered = filtered.filter(
          (product) =>
            product.sizes && product.sizes.some((size) => sizes.includes(size))
        );
      }

      // Apply color filter
      if (colors.length > 0) {
        filtered = filtered.filter(
          (product) =>
            product.colors &&
            product.colors.some((color) => colors.includes(color))
        );
      }

      state.filteredProducts = filtered;
      state.filters = { ...state.filters, priceRange, sizes, colors };
      console.log("Redux: Final filtered products:", filtered.length);
    },
    clearError: (state) => {
      state.error = null;
    },
    resetFilters: (state) => {
      state.filters = {
        category: "all",
        priceRange: [0, 1000],
        rating: 0,
        inStock: false,
        sizes: [],
        colors: [],
      };
      state.filteredProducts = state.allProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
         .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
        // state.filteredProducts = action.payload; // optional: apply filters later
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload.data; // assuming data is in `.data`
        state.allProducts = action.payload.data; // if you want
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

//  search product


.addCase(fetchProductsBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data; // assuming API returns { data: [...] }
      })
      .addCase(fetchProductsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  //  price filter

  //  .addCase(fetchProductsByPriceRange.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchProductsByPriceRange.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.filteredProducts = action.payload.data || []; // or just action.payload if not wrapped
  //     })
  //     .addCase(fetchProductsByPriceRange.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     })

      // Fetch products by category
      // .addCase(fetchProductsByCategory.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      //   state.loading = false;
        
      //   // Update both allProducts and filteredProducts with category-specific data
      //   // This ensures we have the full dataset for filtering
      //   if (!state.allProducts.length) {
      //     state.allProducts = action.payload;
      //   }
        
      //   // Set filtered products to the fetched category products
      //   state.filteredProducts = action.payload;
        
      //   console.log("Redux: Category products loaded:", action.payload.length);
      // })      
      // .addCase(fetchProductsByCategory.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })

      // Fetch single product
      // .addCase(fetchProductById.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchProductById.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.selectedProduct = action.payload;
      // })
      // .addCase(fetchProductById.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })

      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
// by id
            .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.data;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedProduct,
  filterByCategory,
  sortProducts,
  filterByPrice,
  applyFilters,
  clearError,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;