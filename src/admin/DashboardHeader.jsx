import { useState, useEffect, useRef } from 'react'; // Hooks add kiye gaye hain
import { Bell, Search, User } from "lucide-react";

// Helper function to join class names, 'cn' ki jagah
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export function DashboardHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Dropdown ke reference ke liye

  // Yeh effect dropdown ke bahar click karne par use band kar dega
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    // Event listener add karna
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup: component unmount hone par listener hata dena
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    // 'bg-card', 'border-border' ko standard classes se replace kiya
    <header className="h-16 sticky top-0 z-20 bg-white border-b border-gray-200 px-6 flex items-center   justify-between">
      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          {/* <Input> ko <input> se replace kiya */}
          <input
            type="text"
            placeholder="Search orders, customers, products..."
            className="pl-10 w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell Button */}
        <button className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Bell className="h-5 w-5" />
          {/* 'bg-destructive' ko 'bg-red-600' se replace kiya */}
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 rounded-full flex items-center justify-center text-xs text-white">
            3
          </span>
        </button>

        {/* User Dropdown Menu */}
        <div className="relative" ref={dropdownRef}>
          {/* Trigger Button */}
          <button
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {/* Avatar */}
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {/* <AvatarImage> ko <img> se replace kiya */}
              {/* <img src="" alt="Admin" className="h-full w-full object-cover" /> */}
              {/* <AvatarFallback> ko <div> se replace kiya */}
              <div className="text-xs font-semibold text-gray-600">AD</div>
            </div>
          </button>

          {/* Dropdown Content */}
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10"
            >
              <div className="p-2">
                {/* Label */}
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-gray-500">
                    admin@example.com
                  </p>
                </div>
                {/* Separator */}
                <hr className="my-2 border-gray-200" />
                {/* Menu Item */}
                <a href="#" className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </a>
                <a href="#" className="block px-2 py-1.5 text-sm rounded-md hover:bg-gray-100">
                  Settings
                </a>
                {/* Separator */}
                <hr className="my-2 border-gray-200" />
                <a href="#" className="block px-2 py-1.5 text-sm rounded-md hover:bg-gray-100">
                  Log out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}