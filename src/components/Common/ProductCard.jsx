
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { Heart, ShoppingBag, Star } from 'lucide-react';
// import { AddToCart } from '../../store/slices/cartSlice';
// import {  AddWishlist, getWishlist } from '../../store/slices/wishlistSlice';
// import { useTheme } from '../../contexts/ThemeContext';
// import { fetchProductById } from './../../store/slices/productsSlice';

// const ProductCard = ({ product, appliedDiscount = 0 }) => {
//   console.log(`ProductCard for "${product.title}" is rendering!`); // ✅ यह लाइन जोड़ें
//   const { isDarkMode } = useTheme();
//   console.log(product,"card")
//   const dispatch = useDispatch();

//   const handleAddToCart = async(e) => {
//   e.preventDefault();
// console.log(product,"cat")
// dispatch(AddToCart(product._id))
//     // dispatc h(addToCart({
//     //   id: product.id,
//     //   name: product.name,
//     //   price: appliedDiscount > 0 ? product.price * (1 - appliedDiscount / 100) : product.price,
//     //   originalPrice: product.originalPrice,
//     //   image: product.image,
//     // }));
//   };

//   const handleAddToWishlist = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await dispatch(AddWishlist(product._id));
//           dispatch(getWishlist());
//           console.log("wish")
//     if (res.meta.requestStatus === "fulfilled") {
 
//     }
//   } catch (err) {
//     console.error("Add to wishlist failed", err);
//   }
// };

// const HandleSeleted=(id)=>{

//   dispatch(fetchProductById(id))
// }

//   const getBadgeColor = (badge) => {
//     switch (badge) {
//       case 'Sale':
//         return 'bg-red-500 text-white';
//       case 'New':
//         return 'bg-green-500 text-white';
//       case 'Trending':
//         return 'bg-amber-500 text-white';
//       default:
//         return 'bg-gray-500 text-white';
//     }
//   };

//   const discountedPrice = appliedDiscount > 0 ? product.price * (1 - appliedDiscount / 100) : product.price;

//   return (
//     <Link to={`/product/${product._id}`} onClick={()=>HandleSeleted(product._id)}>
//       <div className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:scale-105 ${
//         isDarkMode ? 'bg-gray-800' : 'bg-white'
//       }`}>
//         <div className="relative">

//         {console.log(product.images.length,'jjjjj')}

// {product.images?.length === 2 && product.images[0]?.url ? (
//   <img
//     key={0}
//     src={product.images[0].url}
//     alt={product.images[0].alt || 'Product Image'}
//     className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
//   />
// ) : (
//   Array.isArray(product.images) && product.images.map((item, index) => (
//     item?.url && (
//       <img
//         key={index}
//         src={item.url}
//         alt={item.alt || 'Product Image'}
//         className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
//       />
//     )
//   ))
// )}



         
//           {product.badge && (
//             <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(product.badge)}`}>
//               {product.badge}
//             </span>
//           )}
          
//           {appliedDiscount > 0 && (
//             <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold bg-green-500 text-white">
//               -{appliedDiscount}%
//             </span>
//           )}
          
//           <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <button 
//               onClick={handleAddToWishlist}
//               className={`p-2 rounded-full shadow-lg transition-colors ${
//                 isDarkMode 
//                   ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-red-400' 
//                   : 'bg-white/80 backdrop-blur-sm hover:bg-gray-50 text-slate-600 hover:text-red-500'
//               }`}
//             >
//               <Heart className="w-5 h-5" />
//             </button>
//           </div>
          
//           <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <button
//               onClick={handleAddToCart}
//               className={`p-3 rounded-full transition-colors shadow-lg ${
//                 isDarkMode 
//                   ? 'bg-amber-600 hover:bg-amber-700 text-white' 
//                   : 'bg-slate-800 text-white hover:bg-slate-900'
//               }`}
//             >
//               <ShoppingBag className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
        
//         <div className="p-6">
//           {/* <div className="flex items-center mb-2">
//             <div className="flex items-center space-x-1">
//               <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
//               <span className={`text-sm font-medium ${
//                 isDarkMode ? 'text-gray-300' : 'text-slate-700'
//               }`}>{product.rating}</span>
//               <span className={`text-sm ${
//                 isDarkMode ? 'text-gray-400' : 'text-slate-500'
//               }`}>({product.reviews})</span>
//             </div>
//           </div>
//            */}

//            <div className="flex items-center mb-2">
//   <div className="flex items-center space-x-1">
//     <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
//     <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
//       {product.rating?.average ?? 'N/A'}
//     </span>
//     <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
//       ({product.rating?.count ?? 0})
//     </span>
//   </div>
// </div>

//           <h3 className={`text-xl font-semibold mb-3 group-hover:text-amber-600 transition-colors ${
//             isDarkMode ? 'text-white' : 'text-slate-900'
//           }`}>
//             {product.name}
//           </h3>
          
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <span className={`text-2xl font-bold ${
//                 isDarkMode ? 'text-white' : 'text-slate-900'
//               }`}>
//                 ${discountedPrice.toFixed(2)}
//               </span>
//               {(product.originalPrice || appliedDiscount > 0) && (
//                 <span className={`text-lg line-through ${
//                   isDarkMode ? 'text-gray-400' : 'text-slate-500'
//                 }`}>
//                   ${product.originalPrice || product.price}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { AddToCart } from '../../store/slices/cartSlice';
import {  AddWishlist, getWishlist } from '../../store/slices/wishlistSlice';
import { useTheme } from '../../contexts/ThemeContext';
import { fetchProductById } from '../../store/slices/productsSlice';

const ProductCard = ({ product, appliedDiscount = 0 }) => {
  const { isDarkMode } = useTheme();
  console.log(product,"cardew")
  const dispatch = useDispatch();

  const handleAddToCart = async(e) => {
  e.preventDefault();
console.log(product,"cat")
dispatch(AddToCart(product._id))
    // dispatc h(addToCart({
    //   id: product.id,
    //   name: product.name,
    //   price: appliedDiscount > 0 ? product.price * (1 - appliedDiscount / 100) : product.price,
    //   originalPrice: product.originalPrice,
    //   image: product.image,
    // }));
  };

  const handleAddToWishlist = async (e) => {
  e.preventDefault();

  try {
    const res = await dispatch(AddWishlist(product._id));
          dispatch(getWishlist());
          console.log("wish")
    if (res.meta.requestStatus === "fulfilled") {
 
    }
  } catch (err) {
    console.error("Add to wishlist failed", err);
  }
};


const HandleSeleted=(id)=>{

  dispatch(fetchProductById(id))
}


  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Sale':
        return 'bg-red-500 text-white';
      case 'New':
        return 'bg-green-500 text-white';
      case 'Trending':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const discountedPrice = appliedDiscount > 0 ? product.price * (1 - appliedDiscount / 100) : product.price;
{product.images,"''''''"}
  return (
 <Link to={`/product/${product._id}`}  onClick={()=>HandleSeleted(product._id)}>
      <div className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:scale-105 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="relative">
          {/* Images */}
          {product.images?.length > 0 && (
            <>
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.alt || "Product Image 1"}
                className={`w-full h-80 object-cover transition-opacity duration-500 ${product.images.length === 2 ? 'opacity-100 group-hover:opacity-0 absolute' : ''} top-0 left-0`}
              />
              {product.images.length === 2 && (
                <img
                  src={product.images[1]?.url}
                  alt={product.images[1]?.alt || "Product Image 2"}
                  className="w-full h-80 object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />
              )}
            </>
          )}

          {/* Badge */}
          {product.badge && (
            <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(product.badge)}`}>
              {product.badge}
            </span>
          )}

          {/* Discount */}
          {appliedDiscount > 0 && (
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold bg-green-500 text-white">
              -{appliedDiscount}%
            </span>
          )}

          {/* Wishlist button */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToWishlist}
              className={`p-2 rounded-full shadow-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-red-400' : 'bg-white/80 backdrop-blur-sm hover:bg-gray-50 text-slate-600 hover:text-red-500'}`}
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Add to cart button */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className={`p-3 rounded-full transition-colors shadow-lg ${isDarkMode ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-slate-800 text-white hover:bg-slate-900'}`}
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="p-6">
          <div className="flex items-center mb-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                {product.rating?.average ?? 'N/A'}
              </span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                ({product.rating?.count ?? 0})
              </span>
            </div>
          </div>

          <h3 className={`text-xl font-semibold mb-3 group-hover:text-amber-600 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                ${discountedPrice.toFixed(2)}
              </span>
              {(product.originalPrice || appliedDiscount > 0) && (
                <span className={`text-lg line-through ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  ${product.originalPrice || product.price}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;