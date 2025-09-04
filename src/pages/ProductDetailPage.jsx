import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Select, Rate, Tabs, message } from 'antd';
import { Heart, ShoppingBag, Star, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { fetchProductById } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import { useTheme } from '../contexts/ThemeContext';

const ProductDetailPage = () => {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

 // ProductDetailPage.js

useEffect(() => {
  // जब भी कंपोनेंट लोड हो और id मौजूद हो, तो fetchProductById एक्शन को डिस्पैच करें
  if (id) {
    dispatch(fetchProductById(id));
  }
}, [dispatch, id]); // यह हुक तब चलेगा जब id या dispatch ऑब्जेक्ट बदलेगा
  console.log(selectedProduct,"selectedProduct")


  useEffect(() => {
    if (selectedProduct) {
      setSelectedSize(selectedProduct.sizes?.[0] || '');
      setSelectedColor(selectedProduct.colors?.[0] || '');
      setSelectedImageIndex(0);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    dispatch(addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      originalPrice: selectedProduct.originalPrice,
      image: selectedProduct.image,
      size: selectedSize,
      color: selectedColor,
    }));
    
    message.success('Product added to cart!');
  };

  const handleAddToWishlist = () => {
    if (!selectedProduct) return;
    
    dispatch(addToWishlist(selectedProduct));
    message.success('Product added to wishlist!');
  };

  const handlePrevImage = () => {
    if (!selectedProduct || !selectedProduct.images) return;
    setSelectedImageIndex(prev => 
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!selectedProduct || !selectedProduct.images) return;
    setSelectedImageIndex(prev => 
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-slate-50'
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-semibold mb-4 transition-colors ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>Product not found</h2>
          <p className={`mb-4 transition-colors ${
            isDarkMode ? 'text-gray-300' : 'text-slate-600'
          }`}>{error || 'The product you\'re looking for doesn\'t exist.'}</p>
          <button 
            onClick={() => dispatch(fetchProductById(id))}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const productImages = selectedProduct.images || [selectedProduct.image];

  const tabItems = [
    {
      key: 'description',
      label: 'Description',
      children: (
        <div className="prose max-w-none">
          <p className={`leading-relaxed mb-6 transition-colors ${
            isDarkMode ? 'text-gray-300' : 'text-slate-600'
          }`}>
            {selectedProduct.description}
          </p>
          <h4 className={`text-lg font-semibold mb-4 transition-colors ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>Features:</h4>
          <ul className="space-y-2">
            {selectedProduct.features?.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      key: 'reviews',
      label: `Reviews (${selectedProduct.rating.count})`,
      children: (
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <div className={`text-3xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>{selectedProduct.rating.average}</div>
            <div>
              <Rate disabled defaultValue={selectedProduct.rating.count} />
              <p className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-slate-600'
              }`}>Based on {selectedProduct.reviews} reviews</p>
            </div>
          </div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Customer reviews will be displayed here.</p>
        </div>
      ),
    },
    {
      key: 'shipping',
      label: 'Shipping & Returns',
      children: (
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Truck className="w-6 h-6 text-amber-500 mt-1" />
            <div>
              <h4 className={`font-semibold mb-2 transition-colors ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>Free Shipping</h4>
              <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Free shipping on orders over $100. Standard delivery takes 3-5 business days.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <RotateCcw className="w-6 h-6 text-amber-500 mt-1" />
            <div>
              <h4 className={`font-semibold mb-2 transition-colors ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>Easy Returns</h4>
              <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>30-day return policy. Items must be in original condition with tags attached.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Shield className="w-6 h-6 text-amber-500 mt-1" />
            <div>
              <h4 className={`font-semibold mb-2 transition-colors ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>Secure Payment</h4>
              <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Your payment information is processed securely. We do not store credit card details.</p>
            </div>
          </div>
        </div>
      ),
    },
  ];



  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image Display */}
            <div className={`relative aspect-square rounded-2xl overflow-hidden group ${
              isDarkMode ? 'bg-gray-800' : 'bg-slate-100'
            }`}>
              <img
                src={productImages[selectedImageIndex].url}
                alt={selectedProduct.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              
              {/* Zoom Icon */}
              <div className={`absolute top-4 right-4 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
              } backdrop-blur-sm`}>
                <ZoomIn className={`w-5 h-5 ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`} />
              </div>
              
              {/* Navigation Arrows */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDarkMode ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'
                    } backdrop-blur-sm`}
                  >
                    <ChevronLeft className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-300' : 'text-slate-600'
                    }`} />
                  </button>
                  
                  <button
                    onClick={handleNextImage}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDarkMode ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'
                    } backdrop-blur-sm`}
                  >
                    <ChevronRight className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-300' : 'text-slate-600'
                    }`} />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {productImages.length}
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index 
                        ? 'border-amber-500 ring-2 ring-amber-200' 
                        : isDarkMode 
                          ? 'border-gray-600 hover:border-gray-500' 
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >

                  {
                    console.log(image,"image")
                  }
                    <img
                      src={image.url}
                      alt={`${selectedProduct.name} ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {selectedProduct.badge && (
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                selectedProduct.badge === 'Sale' ? 'bg-red-100 text-red-800' :
                selectedProduct.badge === 'New' ? 'bg-green-100 text-green-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {selectedProduct.badge}
              </span>
            )}

            <div>
              <h1 className={`text-3xl font-bold mb-4 transition-colors ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {selectedProduct.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Rate disabled defaultValue={selectedProduct.rating} />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>({selectedProduct.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className={`text-3xl font-bold transition-colors ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>${selectedProduct.price}</span>
                {selectedProduct.originalPrice && (
                  <span className={`text-xl line-through transition-colors ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-500'
                  }`}>${selectedProduct.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-700'
                }`}>Size</label>
                <Select
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="w-full"
                  size="large"
                >
                  {selectedProduct.sizes.map(size => (
                    <Select.Option key={size} value={size}>{size}</Select.Option>
                  ))}
                </Select>
              </div>
            )}

            {/* Color Selection */}
            {selectedProduct.colors && selectedProduct.colors.length > 0 && (
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-700'
                }`}>Color</label>
                <Select
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="w-full"
                  size="large"
                >
                  {selectedProduct.colors.map(color => (
                    <Select.Option key={color} value={color}>{color}</Select.Option>
                  ))}
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-slate-700'
              }`}>Quantity</label>
              <Select
                value={quantity}
                onChange={setQuantity}
                className="w-32"
                size="large"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <Select.Option key={num} value={num}>{num}</Select.Option>
                ))}
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingBag className="w-5 h-5" />}
                onClick={handleAddToCart}
                className={`flex-1 h-12 ${
                  isDarkMode 
                    ? 'bg-amber-600 hover:bg-amber-700 border-amber-600' 
                    : 'bg-slate-800 hover:bg-slate-900 border-slate-800'
                }`}
              >
                Add to Cart
              </Button>
              
              <Button
                size="large"
                icon={<Heart className="w-5 h-5" />}
                onClick={handleAddToWishlist}
                className={`h-12 ${
                  isDarkMode 
                    ? 'border-gray-600 hover:border-red-400 hover:text-red-400' 
                    : 'border-slate-300 hover:border-red-300 hover:text-red-500'
                }`}
              >
                Wishlist
              </Button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${selectedProduct.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-slate-600'
              }`}>
                {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs items={tabItems} size="large" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;