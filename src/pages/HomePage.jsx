import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import HeroSlider from '../components/Home/HeroSlider';
import ProductCard from '../components/Common/ProductCard';
import { fetchProductsByCategory } from '../store/slices/productsSlice';
import { useTheme } from '../contexts/ThemeContext';
import { getWishlist } from '../store/slices/wishlistSlice';
import { fetchPaginatedProducts } from '../store/slices/paginationSlice'; // ✅ नया एक्शन इम्पोर्ट करें

const HomePage = () => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const featuredRef = React.useRef(null);

  // ✅ pagination slice से स्टेट चुनें, अब products slice की ज़रूरत नहीं
  const {
    data: currentProducts,
    loading,
    error,
    total,
  } = useSelector((state) => state.pagination);

  useEffect(() => {
    // ✅ currentPage बदलने पर paginated fetch एक्शन डिस्पैच करें
    dispatch(fetchPaginatedProducts({ page: currentPage, limit: productsPerPage }));
  }, [dispatch, currentPage]); // ✅ currentPage को dependency array में जोड़ें

  // Wishlist ko sirf initial render par fetch karein
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const categories = [
    {
      title: 'Men\'s Collection',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Sophisticated styles for the modern gentleman',
      link: '/men',
      category: 'men'
    },
    {
      title: 'Women\'s Collection',
      image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Elegant fashion for every occasion',
      link: '/women',
      category: 'women'
    },
    {
      title: 'Accessories',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Perfect finishing touches',
      link: '/accessories',
      category: 'accessories'
    },
    {
      title: 'Seasonal Sale',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Up to 50% off selected items',
      link: '/sale',
      category: 'sale'
    }
  ];

  // ❌ useMemo के साथ मैन्युअल स्लाइसिंग की अब आवश्यकता नहीं है
  // const currentProducts = useMemo(() => { ... });

  const handleCategoryClick = (categoryItem) => {
    dispatch(fetchProductsByCategory(categoryItem.category));
    navigate(categoryItem.link);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    // Pagination change par scroll karein
    setTimeout(() => {
      if (featuredRef.current) {
        featuredRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading products: {error}</p>
          <button
            onClick={() => dispatch(fetchPaginatedProducts({ page: currentPage, limit: productsPerPage }))} // ✅ paginated एक्शन के साथ पुनः प्रयास करें
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Categories Section */}
      {/* Shop by Category Section */}
      <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Shop by Category</h2>
            <p className={`text-xl max-w-2xl mx-auto transition-colors ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              Explore our carefully curated collections designed to express your unique style
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105"
              >
                <div className="aspect-w-3 aspect-h-4 relative">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-300 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-200 text-sm opacity-90">
                    {category.description}
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center text-amber-300 font-medium">
                      Shop Now →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* Featured Products Section */}
  {/* Products Grid & Pagination Section */}
      <section ref={featuredRef} className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Featured Products</h2>
            <p className={`text-xl max-w-2xl mx-auto transition-colors ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              Discover our handpicked selection of premium fashion pieces
            </p>
          </div>

          {currentProducts && currentProducts.length > 0 ? (
            <>
              {/* Products Grid Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {/* Pagination Section */}
              <div className="mt-6 flex justify-center">
                <Pagination
                  current={currentPage}
                  pageSize={productsPerPage}
                  total={total} // ✅ pagination state से कुल आइटम का उपयोग करें
                  onChange={onPageChange}
                  className="pagination-style"
                />
              </div>
              {/* View All Products Button Section */}
              <div className="text-center mt-12">
                <button
                  onClick={() => navigate('/products')} // एक समर्पित 'सभी उत्पाद' पृष्ठ पर नेविगेट करें
                  className={`px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 inline-block ${
                    isDarkMode ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-slate-800 text-white hover:bg-slate-900'
                  }`}
                >
                  View All Products
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;