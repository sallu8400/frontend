
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, InputNumber, Empty, message } from 'antd';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { ClearCart, clearCart, GetCart, RemoveFromCart, removeFromCart, updateCartItem } from '../store/slices/cartSlice';
import { useTheme } from '../contexts/ThemeContext';
import { useRazorpay } from "react-razorpay";
import axios from 'axios';

// Your base URL
// const BASE_URL = 'https://backend-2-rngp.onrender.com/api';
const BASE_URL = 'http://localhost:5000/api';

const CartPage = () => {
  const [loading, setLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const { Razorpay } = useRazorpay();
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Redux store data
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { items, total, itemCount ,itemDiscount} = useSelector((state) => state.cart);
  const token = user?.token;
  console.log(itemDiscount,"itemDiscount")
const [cartLoaded, setCartLoaded] = useState(false);    
  useEffect(() => {   
    if (isLoggedIn && !cartLoaded) {    
      dispatch(GetCart()).then(() => setCartLoaded(true)); // केवल एक बार लोड करें
    }


  }, [isLoggedIn, cartLoaded, dispatch]);  
  useEffect(() => {
    setDiscount(itemDiscount || 0);
  }, [itemDiscount]);
   

  // Calculate shipping, tax, and totals
  const shipping = total > 100 ? 0 : 15;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax - discount;



  const handleRemoveItem = (item) => {

    console.log(item)
    dispatch(RemoveFromCart(item._id));
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    console.log(itemId,quantity,"quantity","quantity")
    if (quantity <= 0) {
      // If quantity is 0 or less, remove the item
      await dispatch(removeFromCart(itemId));
    } else {
      await dispatch(updateCartItem({ itemId, quantity }));
    }
  };

const handleApplyCoupon = async () => {

  if(couponCode.trim() === appliedCoupon) {
    message.info(`Coupon "${appliedCoupon}" is already applied.`);
    return;
  }
  if (!couponCode.trim()) {
    message.warning("Please enter a coupon code.");
    return;
  }
  setCouponLoading(true);
  try {
    // बदलाव 1: API पेलोड से cartTotal हटा दिया गया है।
    // अब हम सिर्फ़ कूपन कोड भेज रहे हैं।
    const response = await axios.post(
      `${BASE_URL}/coupons/apply`,
      {
        code: couponCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // बदलाव 2: रिस्पॉन्स में पूरे कार्ट ऑब्जेक्ट को हैंडल करें।
    // अब हम response.data.cart को देखेंगे।
    if (response.data && response.data.cart) {

      console.log("Updated cart from coupon application:", response.data.cart);
      
      // सबसे अच्छा तरीका: पूरे कार्ट स्टेट को अपडेट करें।
      // यह सुनिश्चित करेगा कि डिस्काउंट, टोटल अमाउंट, आदि सब कुछ UI में सिंक हो जाए।
      setDiscount(response.data.cart.discount);
      setAppliedCoupon(true);

      // संदेश दिखाएँ। कूपन का नाम अपडेटेड कार्ट से लें।
      message.success(`Coupon "${response.data.cart.appliedCoupon}" applied successfully!`);
    
    } else {
      // अगर किसी वजह से कार्ट नहीं मिलता है तो एक सामान्य एरर दिखाएँ।
      message.error("Could not update the cart. Please refresh and try again.");
    }

  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to apply coupon. Please try again.";
    message.error(errorMessage);
    console.error("Coupon application error:", error);
  } finally {
    setCouponLoading(false);
  }
};


    const handleClearCart = async () => {
      await dispatch(ClearCart())
    dispatch(clearCart());
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn || !token) {
      message.error("Please log in to proceed to checkout.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      // Send the final calculated total and coupon code to the backend
      const orderPayload = {
        amount: finalTotal,
        couponCode: appliedCoupon,
      };

      const { data: order } = await axios.post(
        `${BASE_URL}/payment/order`,
        orderPayload, // Pass the payload in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: "rzp_test_nMxPa43EyAHRSl", // IMPORTANT: Replace with your key from .env
        // amount: order.amount, // Amount from backend (in paise)
             amount: order.amount, // Amount from backend (in paise)
        currency: "INR",
        name: "Your Store Name",
        description: "Shopping Cart Checkout",
        order_id: order.id,
        handler: (response) => {
          // You should ideally verify the payment signature on the backend
          message.success("Payment successful!");
          dispatch(clearCart());
          navigate('/order-success'); // Optional: Redirect to a success page
        },
        prefill: {
          name: user?.name || "Customer",
          email: user?.email || "customer@example.com",
          contact: user?.mobile || "",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (response) => {
        console.error("Payment Failed:", response);
        message.error("Payment failed. Please check your details and try again.");
      });

    } catch (error) {
      console.error("Failed to create order:", error);
      const status = error.response?.status;
      if (status === 401) {
        message.error("Your session has expired. Please log in again.");
        navigate("/login");
      } else {
        message.error(error.response?.data?.message || "Could not connect to payment gateway.");
      }
    } finally {
      setLoading(false);
    }
  };

  // If cart is empty, show this view
  if (!items || items.length === 0) {
    return (
      <div className={`min-h-screen py-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className={`flex items-center mb-8 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
          <div className={`rounded-2xl shadow-lg p-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <Empty
              image={<ShoppingBag className={`w-24 h-24 mx-auto ${isDarkMode ? 'text-gray-600' : 'text-slate-300'}`} />}
              description={
                <div className="text-center">
                  <h2 className={`text-3xl font-bold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Your Cart is Empty</h2>
                  <p className={`text-xl mb-8 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                    Looks like you haven't added anything to your cart yet.
                  </p>
                </div>
              }
            >
              <Link to="/">
                <Button type="primary" size="large" className={isDarkMode ? 'bg-amber-600 hover:bg-amber-700 border-amber-600 text-white' : 'bg-slate-800 hover:bg-slate-900 border-slate-800 text-white'}>
                  Start Shopping
                </Button>
              </Link>
            </Empty>
          </div>
        </div>
      </div>
    );
  }


  // Main view when cart has items
return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className={`flex items-center mb-8 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Shopping
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl shadow-lg p-4 sm:p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              
              {/* --- ✅ बदलाव यहाँ से शुरू है --- */}
              <div className="flex justify-between items-center mb-8">
                <h1 className={`text-2xl sm:text-3xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Shopping Cart
                </h1>
                {/* "पूरा कार्ट खाली करें" बटन */}
                {isLoggedIn && Array.isArray(items) && items.length > 0 && (
                  <Button
                    type="text"
                    onClick={handleClearCart}
                    danger
                    icon={<Trash2 className="w-4 h-4 mr-2" />}
                    // onClick={handleClearCart} // यहाँ आप सभी आइटम्स को हटाने वाला फंक्शन कॉल करेंगे
                    className="flex items-center"
                  >
                    Clear Cart
                  </Button>
                )}
              </div>
              {/* --- ✅ बदलाव यहाँ खत्म है --- */}

              <div className="space-y-6">
                {isLoggedIn && Array.isArray(items) && items.map((item) => (
                  <div 
                    key={item._id}
                    className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-4 gap-x-2 p-4 border rounded-xl hover:shadow-md transition-all ${isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    {/* भाग 1: इमेज और प्रोडक्ट की जानकारी */}
                    <div className="flex items-center gap-4 w-full sm:w-auto sm:flex-1">
                      <img
                        src={item.product.images?.[0]?.url || "/placeholder.png"}
                        alt={item.product?.name || "No Image"}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className={`text-base font-semibold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.product.name}</h3>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                          Price: ₹{item.product.price}
                        </p>
                      </div>
                    </div>

                    {/* भाग 2: कंट्रोलर्स और कुल कीमत */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-x-2 sm:gap-x-4">
                      <div className="flex items-center space-x-2">
                        <Button size="small" icon={<Minus className="w-4 h-4" />} onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)} />
                        <InputNumber readOnly min={1} value={item.quantity} className="w-14 text-center" />
                        <Button size="small" icon={<Plus className="w-4 h-4" />} onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)} />
                      </div>
                      <p className={`text-base font-bold w-24 text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button type="text" danger icon={<Trash2 className="w-5 h-5" />} onClick={() => handleRemoveItem(item)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl shadow-lg p-6 sticky top-24 transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className={`text-2xl font-bold mb-6 transition-colors ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className={isDarkMode ? "text-gray-300" : "text-slate-600"}>Subtotal ({itemCount} items)</span>
                  <span className={`font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? "text-gray-300" : "text-slate-600"}>Shipping</span>
                  <span className={`font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? "text-gray-300" : "text-slate-600"}>Tax (8%)</span>
                  <span className={`font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>₹{tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount ({appliedCoupon})</span>
                    <span className="font-medium">- ₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <hr className={isDarkMode ? "border-gray-700" : "border-gray-200"} />
                <div className={`flex justify-between text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className={`w-full p-3 rounded-l-lg border-r-0 focus:outline-none transition-colors ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-slate-900"}`}
                  />
                  <Button
                    size="large"
                    onClick={handleApplyCoupon}
                    loading={couponLoading}
                    className={`rounded-l-none text-white ${isDarkMode ? "bg-amber-600 hover:bg-amber-700 border-amber-600" : "bg-slate-800 hover:bg-slate-900 border-slate-800"}`}
                  >
                    Apply
                  </Button>
                </div>
              </div>
              {shipping > 0 && (
                <div className={`border rounded-lg p-4 mb-6 transition-colors ${isDarkMode ? "bg-amber-900/20 border-amber-700" : "bg-amber-50 border-amber-200"}`}>
                  <p className={`text-sm ${isDarkMode ? "text-amber-300" : "text-amber-800"}`}>
                    Add ₹{(100 - total).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}
              <Button
                type="primary"
                size="large"
                onClick={handleBuyNow}
                disabled={loading}
                loading={loading}
                icon={<CreditCard className="w-5 h-5 mr-2" />}
                className={`w-full mb-4 text-white ${isDarkMode ? "bg-amber-600 hover:bg-amber-700 border-amber-600" : "bg-slate-800 hover:bg-slate-900 border-slate-800"}`}
              >
                {loading ? "Processing..." : `Pay ₹${finalTotal.toFixed(2)}`}
              </Button>
              <Link to="/">
                <Button size="large" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;