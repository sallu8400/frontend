// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import SearchModal from './../Modals/SearchModal';  

const MainLayout = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 font-poppins ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
    }`}>
      <Header onSearchClick={() => setIsSearchModalOpen(true)} />

      <Outlet /> {/* Nested routes render yaha hoga */}

      <Footer />
      
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
};

export default MainLayout;
