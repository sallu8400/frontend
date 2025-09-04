import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
// API base URL - you can move this to environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data,"redux")

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for getting current user profile
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to get user profile');
      }

      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/auth/profile`,
        profileData,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
        }
      );

      // ✅ Show alert on success


      return response.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Update failed";



      return rejectWithValue(message);
    }
  }
);

// Async thunk for changing password
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Password change failed');
      }

      return data.message;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Check if user is logged in on app start
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        localStorage.removeItem('authToken');
        return rejectWithValue(data.message || 'Token invalid');
      }

      return data.user;
    } catch (error) {
      localStorage.removeItem('authToken');
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Check if user is logged in on app start
export const FetchAddress = createAsyncThunk(
  'auth/fetchaddress',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/auth/address`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const data = await response.json();
      console.log(data, "response");

      if (!response.ok) {
        localStorage.removeItem('authToken');
        return rejectWithValue(data.message || 'Token invalid');
      }

      // ✅ Return only address array
      return data.address;
    } catch (error) {
      localStorage.removeItem('authToken');
      return rejectWithValue(error.message || 'Network error');
    }
  }
);


export const Addadress = createAsyncThunk(
  'auth/Addadress',
  async (addressData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/auth/address`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json', // 👈 Needed for POST
        },
        body: JSON.stringify(addressData), // 👈 pass address details here
      });

      const data = await response.json();
      console.log(data, "add address response");

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to add address');
      }

      return data.address; // return newly added address (optional)
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const deleteAddress = createAsyncThunk(
  'auth/delete',
  async (id, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) return rejectWithValue('No token found');

      const response = await fetch(`${API_BASE_URL}/auth/address/delete/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const data = await response.json();
      console.log(data, "response");

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to delete');
      }

      return id; // return deleted id
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);


export const updateAddress = createAsyncThunk(
  'auth/updateAddress',
  async (data, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No token found');
      }

      const { _id, ...addressData } = data;

      const response = await fetch(`${API_BASE_URL}/auth/address/update/${_id}`, {
        method: 'PUT',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });

      const result = await response.json();
      console.log(result,"6666")

      if (!response.ok) {
        return rejectWithValue(result.message || 'Failed to update address');
      }

      return result.user.address; // assuming updated addresses array returned
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);


// 📁 addressSlice.js
// export const deleteAddress = createAsyncThunk(
//   'address/delete',
//   async ({ id, token }, thunkAPI) => {
//     try {
//       const res = await fetch(`https://backend-2-rngp.onrender.com/api/auth/address/delete/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) return thunkAPI.rejectWithValue(data.message);

//       return id; // return deleted address ID
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
//     }
//   }
// );



const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
   addresses: [],
  profileUpdateLoading: false,
  passwordChangeLoading: false,
  successMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      state.successMessage = null;
      localStorage.removeItem('authToken');
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    // Keep old actions for backward compatibility
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })

      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })

      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
        state.user = null;
      })

      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.profileUpdateLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileUpdateLoading = false;
        state.user = action.payload;
        state.error = null;
        state.successMessage = 'Profile updated successfully!';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.profileUpdateLoading = false;
        state.error = action.payload;
        state.successMessage = null;
      })

      // Change password
      .addCase(changePassword.pending, (state) => {
        state.passwordChangeLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.passwordChangeLoading = false;
        state.error = null;
        state.successMessage = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordChangeLoading = false;
        state.error = action.payload;
        state.successMessage = null;
      })

      // Check auth status
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = null; // Don't show error for auth check failure
        state.isLoggedIn = false;
        state.user = null;
      })

      // Check  adrees
      .addCase(FetchAddress.pending, (state) => {
  state.loading = true;
})
.addCase(FetchAddress.fulfilled, (state, action) => {
  state.loading = false;
  state.addresses = action.payload; // ✔️ Now this is correct
  state.error = null;
})
.addCase(FetchAddress.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || "Unable to fetch addresses";
})

   .addCase(deleteAddress.pending, (state) => {
  state.loading = true;
})
.addCase(deleteAddress.fulfilled, (state, action) => {
  state.loading = false;
  state.error = null;
  state.addresses = state.addresses.filter(addr => addr._id !== action.payload);
})

.addCase(deleteAddress.rejected, (state, action) => {
  state.error = action.payload;
})
// gdsfwdhg
   .addCase(Addadress.pending, (state) => {
  state.loading = true;
})
.addCase(Addadress.fulfilled, (state, action) => {
  state.addresses.push(action.payload); // or refetch list after add
  state.error = null;
})
.addCase(Addadress.rejected, (state, action) => {
  state.error = action.payload;
})
// update

.addCase(updateAddress.pending, (state) => {
  state.loading = true;
})
.addCase(updateAddress.fulfilled, (state, action) => {
  state.loading = false;
  state.error = null;

  // Replace the updated address in the state.addresses array
  const updatedAddress = action.payload.find(addr => addr._id); // assuming backend sends array of updated addresses
  if (updatedAddress) {
    state.addresses = state.addresses.map(addr =>
      addr._id === updatedAddress._id ? updatedAddress : addr
    );
  }
})
.addCase(updateAddress.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});






  },
});

export const {
  logout,
  clearError,
  clearSuccessMessage,
  loginStart,
  loginSuccess,
  loginFailure,
  updateProfile
} = authSlice.actions;

export default authSlice.reducer;