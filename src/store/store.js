// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // localStorage के लिए
// import authSlice from './slices/authSlice';
// import cartSlice from './slices/cartSlice';
// import wishlistSlice from './slices/wishlistSlice';
// import productsSlice from './slices/productsSlice';
// import paginationReducer from './slices/paginationSlice'; 

// // <-- Sahi import


// // Persist कॉन्फिगरेशन
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['user', 'token', 'isLoggedIn'], // ✅ इसे जोड़ें
// };

// // प्रत्येक स्लाइस के लिए अलग-अलग कॉन्फिग भी कर सकते हैं
// const authPersistConfig = {
//   key: 'auth',
//   storage,
//   whitelist: ['user', 'token','isLoggedIn']
// };

// const cartPersistConfig = {
//   key: 'cart',
//   storage,
//   whitelist: ['items','total','itemCount']
// };

// const WishlistPersistConfig = {
//   key: 'wishlisht',
//   storage,
//   whitelist: ['count']
// };

// // पर्सिस्टेड रिड्यूसर बनाएं
// const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
// const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);
// // const persistedWishlistReducer = persistReducer(persistConfig, wishlistSlice);
// const persistedWishlistReducer = persistReducer(persistConfig, WishlistPersistConfig);
// // const persistedpagination = persistReducer(persistConfig, pagination);

// // export const store = configureStore({
// //   reducer: {
// //     auth: persistedAuthReducer,
// //     cart: persistedCartReducer,
// //     wishlist: persistedWishlistReducer,
// //     products: productsSlice, 
// //     pagginatin:pagination,
// //       // products को पर्सिस्ट नहीं कर रहे
// //   },
// //   middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware({
// //       serializableCheck: {
// //         ignoredActions: ['persist/PERSIST'], // Redux Persist के वॉर्निंग्स से बचने के लिए
// //       },
// //     }),
// // });

// export const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer,
//     cart: persistedCartReducer,
//     wishlist: persistedWishlistReducer,
//     products: productsSlice,
//     pagination: paginationReducer  // <-- Yahan slice ka naam 'pagination' rakha hai
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST'],
//       },
//     }),
// });

// export const persistor = persistStore(store);
// export default store;
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import wishlistSlice from './slices/wishlistSlice';
import productsSlice from './slices/productsSlice';
import paginationReducer from './slices/paginationSlice';

// Persist configurations
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isLoggedIn'],
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'total', 'itemCount'],
};

const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
  whitelist: ['count'],
};

// Persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistSlice);

// Store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
    products: productsSlice, // not persisted (fine)
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
