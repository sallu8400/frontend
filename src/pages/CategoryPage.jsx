import React, { useEffect,useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Slider, Select, Checkbox, Button, Input, Breadcrumb } from "antd";
import { Filter, X, Tag, Home } from "lucide-react";
import {
  fetchProducts,
  fetchProductsByCategory,
  sortProducts,
  filterByCategory,
  applyFilters,
  
} from "../store/slices/productsSlice";
import ProductCard from "../components/Common/ProductCard";
import { useTheme } from "../contexts/ThemeContext";

const CategoryPage = () => {
  const { isDarkMode } = useTheme();
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filteredProducts, loading, error, filters } = useSelector(
    (state) => state.products
  );
console.log(filteredProducts,"filteredProductsprice")
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
const debounceTimer = useRef(null); // ✅ keeps reference across renders

  const availableCoupons = [
    { code: "SAVE20", discount: 20, minAmount: 100 },
    { code: "WELCOME10", discount: 10, minAmount: 50 },
    { code: "FASHION15", discount: 15, minAmount: 75 },
  ];

  useEffect(() => {
    console.log(
      "CategoryPage useEffect - category:",
      category,
      "subcategory:",
      subcategory
    );

    if (category) {
      const targetCategory = subcategory || category;
      console.log("Setting targetCategory to:", targetCategory);
   console.log("all1")
      // PEHLE Redux state update karo with correct category
      dispatch(fetchProductsByCategory(targetCategory));
      
      // PHIR API call karo
      dispatch(fetchProductsByCategory(targetCategory));
    } else {
   
      // No category means we're on home page - show all products
      dispatch(filterByCategory("all"));
      dispatch(fetchProducts());
    }
  }, [dispatch, category, subcategory]);

  useEffect(() => {
    dispatch(
      applyFilters({
        priceRange,
        sizes: selectedSizes,
        colors: selectedColors,
      })
    );
  }, [dispatch, priceRange, selectedSizes, selectedColors]);

  useEffect(() => {
    dispatch(sortProducts(sortBy));
  }, [dispatch, sortBy]);


  const getCategoryTitle = (cat, subcat) => {
    if (subcat) {
      return `${subcat.charAt(0).toUpperCase() + subcat.slice(1)} - ${
        cat.charAt(0).toUpperCase() + cat.slice(1)
      }`;
    }
    switch (cat) {
      case "men":
        return "Men's Collection";
      case "women":
        return "Women's Collection";
      case "accessories":
        return "Accessories";
      case "sale":
        return "Sale Items";
      default:
        return "All Products";
    }
  };

  const getCategoryDescription = (cat, subcat) => {
    if (subcat) {
      return `Discover our premium ${subcat} collection`;
    }
    switch (cat) {
      case "men":
        return "Sophisticated styles for the modern gentleman";
      case "women":
        return "Elegant fashion for every occasion";
      case "accessories":
        return "Perfect finishing touches for your style";
      case "sale":
        return "Premium fashion at unbeatable prices";
      default:
        return "Discover our complete fashion collection";
    }
  };

  const handleSizeChange = (size, checked) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    }
  };

  const handleColorChange = (color, checked) => {
    if (checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    }
  };

  const applyCoupon = () => {
    const coupon = availableCoupons.find(
      (c) => c.code === couponCode.toUpperCase()
    );
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponCode("");
    }
  };



  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy("featured");
  };

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const allColors = [
    "Black",
    "White",
    "Navy",
    "Grey",
    "Brown",
    "Red",
    "Blue",
    "Green",
  ];

  // Breadcrumb items
  const breadcrumbItems = [
    {
      title: <Home className="w-4 h-4" />,
      href: "/",
    },
    ...(category
      ? [
          {
            title: category.charAt(0).toUpperCase() + category.slice(1),
            href: `/${category}`,
          },
        ]
      : []),
    ...(subcategory
      ? [
          {
            title: subcategory.charAt(0).toUpperCase() + subcategory.slice(1),
          },
        ]
      : []),
  ];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-slate-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-slate-50'
      }`}>
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading products: {error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
      {/* Category Header */}
      <div className={`border-b transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} className="mb-6" separator=">" />
          <div className="text-center">
            {/* Responsive font size */}
            <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {getCategoryTitle(category || "", subcategory)}
            </h1>
            <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              {getCategoryDescription(category || "", subcategory)}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Layout container: Mobile par vertical (flex-col), Desktop par horizontal (lg:flex-row) */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar: Mobile par conditionally render hoga */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
            <div className={`rounded-lg shadow-sm p-6 sticky top-24 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Filters</h3>
                {/* Mobile par 'Close' button */}
                <Button type="text" size="small" onClick={() => setShowFilters(false)} className="lg:hidden text-red-500" icon={<X className="w-4 h-4" />}>
                  Close
                </Button>
                {/* Desktop par 'Clear All' button */}
                <Button type="text" size="small" onClick={clearFilters} className="hidden lg:inline-block text-amber-600 hover:text-amber-700">
                  Clear All
                </Button>
              </div>

              {/* Coupon Section */}
              <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                 <h4 className={`font-medium mb-3 flex items-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><Tag className="w-4 h-4 mr-2 text-amber-600" />Apply Coupon</h4>
                 <div className="flex gap-2 mb-3">
                   <Input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} size="small" />
                   <Button type="primary" size="small" onClick={applyCoupon} className="bg-amber-600">Apply</Button>
                 </div>
                 {appliedCoupon && (<div className="flex items-center justify-between bg-green-100 p-2 rounded text-sm"><span className="text-green-800">{appliedCoupon.discount}% off!</span><Button type="text" size="small" onClick={removeCoupon} className="text-green-600"><X className="w-3 h-3" /></Button></div>)}
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Price Range</h4>
                <Slider range min={0} max={1000} value={priceRange} onChange={setPriceRange} />
                <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}><span>${priceRange[0]}</span><span>${priceRange[1]}</span></div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Size</h4>
                <div className="grid grid-cols-3 gap-2">{allSizes.map((size) => (<Checkbox key={size} checked={selectedSizes.includes(size)} onChange={(e) => handleSizeChange(size, e.target.checked)}>{size}</Checkbox>))}</div>
              </div>

              {/* Color Filter */}
              <div>
                <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Color</h4>
                <div className="space-y-2">{allColors.map((color) => (<Checkbox key={color} checked={selectedColors.includes(color)} onChange={(e) => handleColorChange(color, e.target.checked)}>{color}</Checkbox>))}</div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>Showing {filteredProducts.length} products</p>
              <div className="flex items-center gap-4">
                {/* Mobile par 'Filters' button */}
                <Button type="primary" icon={<Filter className="w-4 h-4" />} onClick={() => setShowFilters(true)} className={`lg:hidden ${isDarkMode ? 'bg-amber-600' : 'bg-slate-800'}`}>
                  Filters
                </Button>
                {/* Responsive sorting dropdown */}
                <Select value={sortBy} onChange={setSortBy} className="w-full sm:w-48" options={[{ value: "featured", label: "Sort by: Featured" }, { value: "price-low", label: "Price: Low to High" }, { value: "price-high", label: "Price: High to Low" }]} />
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} appliedDiscount={appliedCoupon?.discount || 0} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No products found</h3>
                <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>Try adjusting your filters.</p>
                <Button type="primary" onClick={clearFilters} className={isDarkMode ? 'bg-amber-600' : 'bg-slate-800'}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;