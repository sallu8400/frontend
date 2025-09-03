import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCategory } from '../../store/slices/productsSlice';

const CategorySelector = ({ currentCategory = 'all', onCategoryChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  const categories = [
    { id: 'all', name: 'All Products', path: '/' },
    { id: 'men', name: 'Men\'s Fashion', path: '/men' },
    { id: 'women', name: 'Women\'s Fashion', path: '/women' },
    { id: 'accessories', name: 'Accessories', path: '/accessories' },
    { id: 'sale', name: 'Sale Items', path: '/sale' }
  ];

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category.id); // Debug log
    
    // Update Redux state first
    dispatch(filterByCategory(category.id));
    
    // Navigate to category page
    navigate(category.path);
    
    // Call parent callback if provided
    if (onCategoryChange) {
      onCategoryChange(category.id);
    }
  };

  // Use Redux state for current category if available
  const activeCategory = filters.category || currentCategory;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Shop by Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`p-3 rounded-lg text-center transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-amber-500 text-white shadow-lg transform scale-105'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md'
            }`}
          >
            <span className="font-medium text-sm">{category.name}</span>
          </button>
        ))}
      </div>
      
      {/* Debug info - remove in production */}
      <div className="mt-4 text-xs text-gray-500">
        Current Redux Category: {filters.category}
      </div>
    </div>
  );
};

export default CategorySelector;