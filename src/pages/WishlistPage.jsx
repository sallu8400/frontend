import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Empty } from 'antd';
import { ArrowLeft, Heart, ShoppingBag, Star, Trash2 } from 'lucide-react';

import { AddToCart, addToCart, RemoveFromCart } from '../store/slices/cartSlice';
import { useTheme } from '../contexts/ThemeContext';
import { getWishlist, removeFromWishlist } from './../store/slices/wishlistSlice';

const WishlistPage = () => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const { items, count } = useSelector((state) => state.wishlist);
console.log(items.products,"wishlishcount")
  const handleRemoveFromWishlist = async(id) => {
   alert(id)

     await dispatch(removeFromWishlist(id));

      dispatch(getWishlist())

      
  };

  const handleAddToCartAndRemove = async(item,id) => {
alert(id)
    console.log(item._id,"item")
   await dispatch(AddToCart(item._id));
     await dispatch(removeFromWishlist(id));
      await dispatch(getWishlist());

  };

  

  if (items.length === 0) {
    return (
      <div className={`min-h-screen py-12 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-slate-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className={`flex items-center mb-8 transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
          
          <div className={`rounded-2xl shadow-lg p-8 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <Empty
              image={<Heart className={`w-24 h-24 mx-auto ${
                isDarkMode ? 'text-gray-600' : 'text-slate-300'
              }`} />}
              description={
                <div className="text-center">
                  <h2 className={`text-3xl font-bold mb-4 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>Your Wishlist is Empty</h2>
                  <p className={`text-xl mb-8 transition-colors ${
                    isDarkMode ? 'text-gray-300' : 'text-slate-600'
                  }`}>
                    Save items you love to your wishlist and shop them later
                  </p>
                </div>
              }
            >
              <Link to="/">
                <Button 
                  type="primary" 
                  size="large" 
                  className={isDarkMode 
                    ? 'bg-amber-600 hover:bg-amber-700 border-amber-600' 
                    : 'bg-slate-800 hover:bg-slate-900 border-slate-800'
                  }
                >
                  Start Shopping
                </Button>
              </Link>
            </Empty>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-slate-50'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className={`flex items-center mb-8 transition-colors ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Continue Shopping
        </Link>

        <div className={`rounded-2xl shadow-lg p-6 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <h1 className={`text-3xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>My Wishlist</h1>
            <div className={`flex items-center space-x-2 transition-colors ${
              isDarkMode ? 'text-gray-300' : 'text-slate-600'
            }`}>
              <Heart className="w-5 h-5 text-red-500" />
              <span>{count} items</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

{items.products?.map((item) => (
  
  // React के लिए key हमेशा यूनिक होनी चाहिए। विशलिस्ट आइटम की अपनी _id सबसे सही है।
  <div
    key={item._id} 
    className={`group relative border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
      isDarkMode 
        ? 'bg-gray-700 border-gray-600' 
        : 'bg-white border-gray-100'
    }`}
  >
    <div className="relative">
      {/* लिंक में product की ID इस्तेमाल करें */}
      <Link to={`/product/${item.product._id}`}>
        {/* इमेज product के अंदर images ऐरे में है। हम पहली इमेज दिखा रहे हैं। */}
        {/* '?' (Optional Chaining) लगाना सुरक्षित है, ताकि अगर images ऐरे खाली हो तो एरर न आए। */}
  <img
  src={item.product.images[0]?.url} // <--- यह है लाइन 145
  alt={item.product.name}
  
/>
      </Link>
      
      {/* Badge product के अंदर है */}
      {item.product.badge && (
        <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
          item.product.badge === 'Sale' ? 'bg-red-500 text-white' :
          item.product.badge === 'New' ? 'bg-green-500 text-white' :
          'bg-amber-500 text-white'
        }`}>
          {item.product.badge}
        </span>
      )}
      
      {/* विशलिस्ट से हटाने के लिए विशलिस्ट आइटम की ID (item._id) भेजें, प्रोडक्ट की नहीं */}
      <Button
        type="text"
        danger
        icon={<Trash2 className="w-4 h-4" />}
        onClick={() => handleRemoveFromWishlist(item._id)} 
        className={`absolute top-3 right-3 shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-red-900' 
            : 'bg-white hover:bg-red-50'
        }`}
      />
      
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* कार्ट में जोड़ने के लिए पूरा product ऑब्जेक्ट भेजें */}
        <Button
          type="primary"
          icon={<ShoppingBag className="w-4 h-4" />}
          onClick={() => handleAddToCartAndRemove(item.product)} 
          className={isDarkMode 
            ? 'bg-amber-600 hover:bg-amber-700 border-amber-600 shadow-lg' 
            : 'bg-slate-800 hover:bg-slate-900 border-slate-800 shadow-lg'
          }
        />
      </div>
    </div>
    
    <div className="p-4">
      {/* रेटिंग product के अंदर है */}
      <div className="flex items-center mb-2">
        <div className="flex items-center space-x-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className={`text-xs font-medium transition-colors ${
            isDarkMode ? 'text-gray-300' : 'text-slate-700'
          }`}>{item.product.rating.average}</span>
          <span className={`text-xs transition-colors ${
            isDarkMode ? 'text-gray-400' : 'text-slate-500'
          }`}>({item.product.rating.count})</span>
        </div>
      </div>
      
      {/* नाम और लिंक भी product के अंदर से आएंगे */}
      <Link to={`/product/${item.product._id}`}>
        <h3 className={`text-sm font-semibold mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          {item.product.name}
        </h3>
      </Link>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1">
          <span className={`text-lg font-bold transition-colors ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>${item.product.price}</span>
          {item.product.originalPrice && (
            <span className={`text-sm line-through transition-colors ${
              isDarkMode ? 'text-gray-400' : 'text-slate-500'
            }`}>${item.product.originalPrice}</span>
          )}
        </div>
      </div>
      
      {/* कार्ट में जोड़ने के लिए पूरा product ऑब्जेक्ट भेजें */}
      <Button
        type="primary"
        icon={<ShoppingBag className="w-4 h-4" />}
        onClick={() => handleAddToCartAndRemove(item.product,item._id)}
        className={`w-full ${
          isDarkMode 
            ? 'bg-amber-600 hover:bg-amber-700 border-amber-600' 
            : 'bg-slate-800 hover:bg-slate-900 border-slate-800'
        }`}
        size="small"
      >
        Add to Cart
      </Button>
    </div>
  </div>
))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/">
              <Button 
                type="primary" 
                size="large" 
                className={isDarkMode 
                  ? 'bg-amber-600 hover:bg-amber-700 border-amber-600' 
                  : 'bg-slate-800 hover:bg-slate-900 border-slate-800'
                }
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;