import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import { store ,persistor} from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';


import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';

import SignupPage from './pages/SignupPage';

import { useEffect } from "react";
import { logout } from './store/slices/authSlice';
import MainLayout from './components/Layout/MainLayout';
import { DashboardLayout } from './admin/DashboardLayout';
import HomeAdmin from './admin/pages/HomeAdmin';
import Dashboard from './admin/pages/HomeAdmin';
import AddProductForm from './admin/pages/AddProductForm';

const AppContent = () => {
  const dispatch=useDispatch()
  const { isDarkMode } = useTheme();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

useEffect(() => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    dispatch(logout());
    console.log("logu oyt success full")
  }
  
}, [dispatch]);
  const antdTheme = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1e293b',
      borderRadius: 8,
      fontFamily: 'Poppins, system-ui, sans-serif',
      colorBgContainer: isDarkMode ? '#1f2937' : '#ffffff',
      colorBgElevated: isDarkMode ? '#374151' : '#ffffff',
      colorText: isDarkMode ? '#f9fafb' : '#1f2937',
      colorTextSecondary: isDarkMode ? '#d1d5db' : '#6b7280',
      colorBorder: isDarkMode ? '#4b5563' : '#e5e7eb',
    },
    components: {
      Button: {
        borderRadius: 8,
      },
      Input: {
        borderRadius: 8,
      },
      Select: {
        borderRadius: 8,
      },
      Modal: {
        borderRadius: 16,
      },
    },
  };

  return (
<ConfigProvider theme={antdTheme}>
  <Router>
    <Routes>

      {/* Auth Routes - Without Layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />


      {/* for admin  Login */}

            {/* <Route path="/admin" element={<DashboardLayout />} /> */}



         <Route path="/admin/home" element={<DashboardLayout />}>
        <Route index element={<HomeAdmin />} />
        <Route path="product" element={<AddProductForm />} />
      </Route>

      {/* All other routes with Header/Footer layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path=":category" element={<CategoryPage />} />
        <Route path=":category/:subcategory" element={<CategoryPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

    </Routes>
  </Router>
</ConfigProvider>
  );
};

const App = () => {
  return (
      <Provider store={store}>

       <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

