import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Input, Empty } from 'antd';
import { Search, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { fetchProductsBySearch, searchProducts } from '../../store/slices/productsSlice';
import { useTheme } from '../../contexts/ThemeContext';

const SearchModal = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();
  
  const { searchResults: reduxSearchResults, loading } = useSelector((state) => state.products);

  const trendingSearches = [
    'Designer Dresses',
    'Leather Jackets',
    'Casual Wear',
    'Evening Gowns',
    'Winter Coats',
    'Accessories'
  ];

  const recentSearches = [
    'Black Dress',
    'Denim Jacket',
    'Summer Collection'
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(async () => {
        try {
          const result =  dispatch(fetchProductsBySearch(searchQuery));
          if (result.type === 'products/fetchProductsBySearch/fulfilled') {
            setSearchResults(result.payload);
          }
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsSearching(false);
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, dispatch]);

  // Update local search results when Redux state changes
  useEffect(() => {
    if (reduxSearchResults && reduxSearchResults.length >= 0) {
      setSearchResults(reduxSearchResults);
    }
  }, [reduxSearchResults]);

  const handleTrendingClick = (term) => {
    setSearchQuery(term);
  };

  const handleProductClick = () => {
    onClose();
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleModalClose = () => {
    onClose();
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleModalClose}
      footer={null}
      width={700}
      centered
      className="search-modal"
      title={
        <div className="flex items-center space-x-2">
          <Search className={`w-5 h-5 ${
            isDarkMode ? 'text-gray-400' : 'text-slate-600'
          }`} />
          <span>Search Products</span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search Input */}
        <Input
          size="large"
          placeholder="Search for products, brands, categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          prefix={<Search className={`w-5 h-5 ${
            isDarkMode ? 'text-gray-400' : 'text-slate-400'
          }`} />}
          className="search-input"
          autoFocus
        />

        {/* Search Results or Suggestions */}
        <div className="max-h-96 overflow-y-auto">
          {searchQuery.length > 2 ? (
            <div>
              {isSearching || loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                  <span className={`ml-3 transition-colors ${
                    isDarkMode ? 'text-gray-300' : 'text-slate-600'
                  }`}>Searching...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <h3 className={`text-sm font-medium mb-4 transition-colors ${
                    isDarkMode ? 'text-gray-300' : 'text-slate-600'
                  }`}>
                    {searchResults.length} results found for "{searchQuery}"
                  </h3>
                  <div className="space-y-3">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={handleProductClick}
                        className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors group ${
                          isDarkMode 
                            ? 'hover:bg-gray-700' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className={`font-medium group-hover:text-amber-600 transition-colors ${
                            isDarkMode ? 'text-white' : 'text-slate-800'
                          }`}>
                            {product.name}
                          </h4>
                          <p className={`text-sm capitalize transition-colors ${
                            isDarkMode ? 'text-gray-400' : 'text-slate-500'
                          }`}>{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold transition-colors ${
                            isDarkMode ? 'text-white' : 'text-slate-800'
                          }`}>${product.price}</p>
                          {product.originalPrice && (
                            <p className={`text-sm line-through transition-colors ${
                              isDarkMode ? 'text-gray-400' : 'text-slate-500'
                            }`}>${product.originalPrice}</p>
                          )}
                          <ArrowRight className={`w-4 h-4 group-hover:text-amber-500 transition-colors ml-auto ${
                            isDarkMode ? 'text-gray-400' : 'text-slate-400'
                          }`} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Empty
                  description={`No products found for "${searchQuery}"`}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Trending Searches */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  <h3 className={`font-medium transition-colors ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>Trending Searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleTrendingClick(term)}
                      className={`px-4 py-2 rounded-full text-sm hover:bg-amber-100 hover:text-amber-700 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-amber-900/20 hover:text-amber-400' 
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className={`w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-400'
                  }`} />
                  <h3 className={`font-medium transition-colors ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>Recent Searches</h3>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleTrendingClick(term)}
                      className={`flex items-center space-x-3 w-full text-left p-2 rounded-lg transition-colors group ${
                        isDarkMode 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Clock className={`w-4 h-4 ${
                        isDarkMode ? 'text-gray-400' : 'text-slate-400'
                      }`} />
                      <span className={`group-hover:text-slate-800 transition-colors ${
                        isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-slate-600'
                      }`}>{term}</span>
                      <ArrowRight className={`w-4 h-4 ml-auto transition-colors ${
                        isDarkMode 
                          ? 'text-gray-500 group-hover:text-gray-300' 
                          : 'text-slate-300 group-hover:text-slate-500'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories */}
              <div>
                <h3 className={`font-medium mb-4 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>Quick Categories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Men\'s Fashion', path: '/men' },
                    { name: 'Women\'s Fashion', path: '/women' },
                    { name: 'Accessories', path: '/accessories' },
                    { name: 'Sale Items', path: '/sale' }
                  ].map((category, index) => (
                    <Link
                      key={index}
                      to={category.path}
                      onClick={handleModalClose}
                      className={`p-3 border rounded-lg text-left transition-colors group ${
                        isDarkMode 
                          ? 'border-gray-600 hover:border-amber-500 hover:bg-amber-900/20' 
                          : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      <span className={`font-medium transition-colors ${
                        isDarkMode 
                          ? 'text-gray-300 group-hover:text-amber-400' 
                          : 'text-slate-700 group-hover:text-amber-700'
                      }`}>
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;