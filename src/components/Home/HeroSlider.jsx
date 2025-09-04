import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight, Star } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const { isDarkMode } = useTheme();

  const slides = [
    {
      id: 1,
      title: 'Elevate Your Style',
      subtitle: 'Premium Fashion Collection',
      description: 'Discover premium fashion that defines your unique personality. Curated collections from the world\'s finest designers.',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200',
      buttonText: 'Shop Collection',
      offer: '30% Off New Collection'
    },
    {
      id: 2,
      title: 'Winter Collection',
      subtitle: 'Cozy & Stylish',
      description: 'Stay warm and fashionable with our latest winter collection. Premium materials and contemporary designs.',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1200',
      buttonText: 'Explore Winter',
      offer: 'Free Shipping on Orders $100+'
    },
    {
      id: 3,
      title: 'Designer Dresses',
      subtitle: 'Elegant & Sophisticated',
      description: 'Perfect for special occasions. Luxurious fabrics and timeless designs that make you stand out.',
      image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1200',
      buttonText: 'Shop Dresses',
      offer: 'Limited Time Offer'
    }
  ];

  return (
<section className={`relative overflow-hidden transition-colors duration-300 ${
  isDarkMode 
    ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
    : 'bg-gradient-to-br from-slate-50 to-slate-100'
}`}>
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={0}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 5000, disableOnInteraction: false }}
    loop={true}
    className="hero-swiper" // Removed fixed height for mobile
  >
    {slides.map((slide) => (
      <SwiperSlide key={slide.id}>
        <div className="relative h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            {/* Adjusted padding and height for mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-16 md:py-20 lg:h-[700px]">
              {/* Text content section */}
              <div className="space-y-6 lg:space-y-8 z-10 relative text-center lg:text-left">
                <div className="flex items-center space-x-2 justify-center lg:justify-start">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className={`font-medium transition-colors ${
                    isDarkMode ? 'text-gray-300' : 'text-slate-600'
                  }`}>Trusted by 10,000+ customers</span>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold text-amber-600 mb-2">{slide.subtitle}</h2>
                  {/* Responsive font size for the title */}
                  <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {slide.title}
                  </h1>
                </div>
                
                <p className={`text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 transition-colors ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}>
                  {slide.description}
                </p>
                
                {/* Centered buttons on mobile */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className={`px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center group ${
                    isDarkMode 
                      ? 'bg-amber-600 text-white hover:bg-amber-700' 
                      : 'bg-slate-800 text-white hover:bg-slate-900'
                  }`}>
                    {slide.buttonText}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className={`border-2 px-8 py-4 rounded-lg font-semibold transition-all ${
                    isDarkMode 
                      ? 'border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white' 
                      : 'border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}>
                    View Lookbook
                  </button>
                </div>
                
                {/* Adjusted stats section for mobile */}
                <div className="flex items-center justify-center lg:justify-start space-x-6 pt-6">
                  <div>
                    <p className={`text-xl md:text-2xl font-bold transition-colors ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>50K+</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>Happy Customers</p>
                  </div>
                  <div>
                    <p className={`text-xl md:text-2xl font-bold transition-colors ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>1000+</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>Premium Products</p>
                  </div>
                  <div>
                    <p className={`text-xl md:text-2xl font-bold transition-colors ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>4.9★</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>Customer Rating</p>
                  </div>
                </div>
              </div>
              
              {/* Image section with responsive adjustments */}
              <div className="relative mt-8 lg:mt-0">
                {/* Disabled rotation on mobile for better layout */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform sm:rotate-3 hover:rotate-1 transition-transform duration-500">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    // Responsive image height
                    className="w-full h-[350px] sm:h-[450px] lg:h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Floating offer card with responsive positioning */}
                <div className={`absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 rounded-xl shadow-xl p-4 sm:p-6 transform hover:scale-105 transition-all ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-600 font-bold text-lg">%</span>
                    </div>
                    <div>
                      <p className={`font-semibold text-sm sm:text-base transition-colors ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>{slide.offer}</p>
                      <p className={`text-xs sm:text-sm transition-colors ${
                        isDarkMode ? 'text-gray-300' : 'text-slate-600'
                      }`}>Limited Time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-20 right-20 w-32 h-32 md:w-64 md:h-64 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
          <div className={`absolute bottom-20 left-20 w-48 h-48 md:w-96 md:h-96 rounded-full opacity-20 blur-3xl ${
            isDarkMode ? 'bg-gray-700' : 'bg-slate-200'
          }`}></div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>
  );
};

export default HeroSlider;