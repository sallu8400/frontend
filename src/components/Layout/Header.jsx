

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Dropdown, Avatar } from 'antd';
import { ShoppingBag, User, Menu, X, Search, Heart, Home, ChevronDown, ChevronUp } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import ThemeToggle from '../Common/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';
import { getWishlist } from './../../store/slices/wishlistSlice';

const Header = ({ onSearchClick }) => {
    const { isDarkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileWomenOpen, setMobileWomenOpen] = useState(false);
    const [mobileMenOpen, setMobileMenOpen] = useState(false);
    const [showWomenSubmenu, setShowWomenSubmenu] = useState(false);
    const [showMenSubmenu, setShowMenSubmenu] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const { itemCount } = useSelector((state) => state.cart);
    const { count: wishlistCount } = useSelector((state) => state.wishlist);

    // Jab menu khule, toh background scroll ko rokein
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Page badalne par menu ko band karein
    useEffect(() => {
        handleMobileMenuClose();
    }, [location.pathname]);

    const handleLogout = () => {
        dispatch(logout());
        handleMobileMenuClose();
    };
    
    useEffect(()=>{ 
        if(isLoggedIn) {
            dispatch(getWishlist());
        }
    }, [isLoggedIn, dispatch]);

    const handleCategoryClick = (path) => {
        navigate(path);
        // Page badalne par menu automatically band ho jayega
    };

    const handleCartClick = () => {
        navigate("/cart");
    };

    const handleWishlistClick = () => {
        navigate('/wishlist');
    };

    const handleMobileMenuClose = () => {
        setIsMenuOpen(false);
    };

    const userMenuItems = [
        { key: 'profile', label: <Link to="/profile">My Profile</Link> },
        { key: 'orders', label: <Link to="/orders">My Orders</Link> },
        { key: 'wishlist', label: <Link to="/wishlist">Wishlist</Link> },
        { type: 'divider' },
        { key: 'logout', label: <span onClick={handleLogout}>Sign Out</span> },
    ];

    const guestMenuItems = [
        { key: 'login', label: <Link to="/login">Sign In</Link> },
        { key: 'signup', label: <Link to="/signup">Sign Up</Link> },
    ];

    const womenSubcategories = [
        { name: 'All Women\'s', path: '/women' },
        { name: 'Dresses', path: '/women/dresses' },
        { name: 'Tops & Blouses', path: '/women/tops' },
        { name: 'Jackets & Coats', path: '/women/jackets' },
    ];
  
    const menSubcategories = [
        { name: 'All Men\'s', path: '/men' },
        { name: 'Shirts', path: '/men/shirts' },
        { name: 'T-Shirts', path: '/men/tshirts' },
        { name: 'Jackets', path: '/men/jackets' },
    ];
    
    const isActivePage = (path) => location.pathname === path;

    // --- Mobile Navigations ---
    const MobileNavLink = ({ path, children }) => (
        <button
            onClick={() => handleCategoryClick(path)}
            className={`text-left font-medium text-lg py-2 transition-colors w-full ${
                isActivePage(path) ? 'text-amber-600' : isDarkMode ? 'text-gray-300' : 'text-slate-700'
            }`}
        >
            {children}
        </button>
    );

    const MobileSubMenu = ({ title, subcategories, isOpen, toggleOpen }) => (
        <div>
            <button
                onClick={toggleOpen}
                className="w-full text-left font-medium text-lg py-2 transition-colors flex items-center justify-between"
            >
                {title}
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {isOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200 dark:border-gray-700">
                    {subcategories.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(item.path)}
                            className={`block py-1 text-left w-full transition-colors text-base ${
                                isActivePage(item.path) ? 'text-amber-500' : isDarkMode ? 'text-gray-400' : 'text-slate-600'
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
    
    // Desktop Navigations
    const DesktopCategoryMenu = ({ title, path, subcategories, showSubmenu, setShowSubmenu }) => (
        <div 
            className="relative group"
            onMouseEnter={() => setShowSubmenu(true)}
            onMouseLeave={() => setShowSubmenu(false)}
        >
            <button 
                onClick={() => navigate(path)}
                className={`font-medium transition-colors flex items-center ${
                    location.pathname.startsWith(path) ? 'text-amber-600' : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                }`}
            >
                {title}
                <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            
            {showSubmenu && (
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max min-w-[200px] shadow-xl rounded-lg border p-4 z-50 transition-colors ${
                  isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-100'
                }`}>
                  <div className="flex flex-col space-y-1">
                    {subcategories.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => navigate(item.path)}
                        className={`text-left p-2 rounded-md w-full transition-colors ${
                          isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-slate-700 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
        </div>
    );


    return (
        <>
            <header className={`shadow-sm border-b sticky top-0 z-40 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left Side: Logo */}
                        <Link to="/" className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-600 rounded-lg flex items-center justify-center mr-2">
                                <span className="text-white font-bold text-sm">C</span>
                            </div>
                            <span className={`text-2xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Ecom</span>
                        </Link>

                        {/* Middle: Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link to="/" className={`font-medium transition-colors ${isActivePage('/') ? 'text-amber-600' : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}>Home</Link>
                            <DesktopCategoryMenu title="Men" path="/men" subcategories={menSubcategories} showSubmenu={showMenSubmenu} setShowSubmenu={setShowMenSubmenu} />
                            <DesktopCategoryMenu title="Women" path="/women" subcategories={womenSubcategories} showSubmenu={showWomenSubmenu} setShowSubmenu={setShowWomenSubmenu} />
                            <button onClick={() => navigate('/accessories')} className={`font-medium transition-colors ${isActivePage('/accessories') ? 'text-amber-600' : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}>Accessories</button>
                        </nav>

                        {/* Right Side: Icons */}
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            {/* <ThemeToggle /> */}
                            <button onClick={onSearchClick} className={`transition-colors p-2 rounded-full ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}><Search className="w-5 h-5" /></button>
                            <button onClick={handleWishlistClick} className={`transition-colors relative p-2 rounded-full ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}><Badge count={isLoggedIn ? wishlistCount : 0} size="small"><Heart className="w-5 h-5" /></Badge></button>
                            <button onClick={handleCartClick} className={`transition-colors relative p-2 rounded-full ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}><Badge count={isLoggedIn ? itemCount : 0} size="small"><ShoppingBag className="w-5 h-5" /></Badge></button>
                            
                            <div className="hidden sm:block">
                                <Dropdown menu={{ items: isLoggedIn ? userMenuItems : guestMenuItems }} placement="bottomRight" trigger={['click']}>
                                    <div className="cursor-pointer p-1 rounded-full transition-colors"><Avatar size="small" src={isLoggedIn && user?.avatar}>{isLoggedIn && user ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}</Avatar></div>
                                </Dropdown>
                            </div>

                            {/* Mobile menu button */}
                            <button onClick={() => setIsMenuOpen(true)} className={`md:hidden transition-colors p-2 rounded-full ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- Mobile Menu Overlay --- */}
            <div 
                className={`fixed inset-0 z-50 transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
            >
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/40" 
                    onClick={handleMobileMenuClose}
                ></div>

                {/* Menu Content */}
                <div className={`relative w-4/5 max-w-sm h-full shadow-lg flex flex-col transition-colors ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                        <span className="font-bold text-lg">Menu</span>
                        <button onClick={handleMobileMenuClose}><X className="w-6 h-6" /></button>
                    </div>

                    <nav className="flex-grow p-4 overflow-y-auto">
                        <div className="flex flex-col space-y-2">
                           <MobileNavLink path="/">Home</MobileNavLink>
                           <MobileSubMenu title="Men" subcategories={menSubcategories} isOpen={mobileMenOpen} toggleOpen={() => setMobileMenOpen(!mobileMenOpen)} />
                           <MobileSubMenu title="Women" subcategories={womenSubcategories} isOpen={mobileWomenOpen} toggleOpen={() => setMobileWomenOpen(!mobileWomenOpen)} />
                           <MobileNavLink path="/accessories">Accessories</MobileNavLink>
                           <MobileNavLink path="/sale">Sale</MobileNavLink>
                        </div>
                        
                        <hr className="my-6 border-gray-200 dark:border-gray-700" />
                        
                        <div className="flex flex-col space-y-2">
                            {isLoggedIn ? (
                                <>
                                    <MobileNavLink path="/profile">My Profile</MobileNavLink>
                                    <MobileNavLink path="/orders">My Orders</MobileNavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="text-left font-medium text-lg py-2 text-red-500 transition-colors w-full"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <MobileNavLink path="/login">Sign In</MobileNavLink>
                                    <MobileNavLink path="/signup">Sign Up</MobileNavLink>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Header;