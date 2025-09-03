import { useState, useEffect } from "react"; // useEffect add kiya hai
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  Package,
  FileText,
  Menu,
  X,
  Store,
  ChevronDown,
} from "lucide-react";

// Helper function to replace 'cn' utility
// Yeh 'cn' jaisa hi kaam karega, class names ko jodne ke liye
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Menu Items
const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Customers", url: "/customers", icon: Users },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingCart,
    submenus: [
      { title: "All Orders", url: "/orders/all" },
      { title: "Pending Orders", url: "/orders/pending" },
      { title: "Completed Orders", url: "/orders/completed" },
    ],
  },
  { title: "Sales", url: "/sales", icon: TrendingUp },
  { title: "Statistics", url: "/statistics", icon: BarChart3 },
  { title: "Products", url: "/admin/product", icon: Package },
  { title: "Reports", url: "/reports", icon: FileText },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  // Jab page refresh ho, toh active submenu wala dropdown open rakho
  useEffect(() => {
    const activeParent = menuItems.find(item => 
      item.submenus?.some(submenu => submenu.url === location.pathname)
    );
    
    if (activeParent) {
      setOpenDropdown(activeParent.title);
    } else {
      // Agar koi submenu active nahi hai, toh sab band kar do
      setOpenDropdown(null);
    }
  }, [location.pathname]); // Yeh effect tab chalega jab URL change hoga

  const handleToggle = (title) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  return (
    <div
      className={classNames(
        "h-screen bg-white border-r sticky top-0 z-20 border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-lg">Admin</span>
          </div>
        )}
        {/* Yahan <Button> ki jagah normal <button> use kiya hai */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 h-8 w-8 flex items-center justify-center"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          if (item.submenus) {
            const isAnySubmenuActive = item.submenus.some(
              (submenu) => location.pathname === submenu.url
            );

            return (
              <div key={item.title}>
                <div
                  onClick={() => handleToggle(item.title)}
                  className={classNames(
                    "cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    "hover:bg-gray-100",
                    (openDropdown === item.title || isAnySubmenuActive) && "bg-gray-100 font-semibold",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="font-medium flex-1">{item.title}</span>
                      <ChevronDown
                        className={classNames(
                          "h-4 w-4 transition-transform",
                          openDropdown === item.title && "rotate-180"
                        )}
                      />
                    </>
                  )}
                </div>

                {/* Submenus */}
                {!collapsed && openDropdown === item.title && (
                  <div className="pl-8 mt-1 space-y-1">
                    {item.submenus.map((submenu) => {
                      const isActive = location.pathname === submenu.url;
                      return (
                        <NavLink
                          key={submenu.title}
                          to={submenu.url}
                          className={classNames(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                            "hover:bg-gray-100",
                            isActive && "bg-indigo-600 text-white"
                          )}
                        >
                          <span className="font-medium">{submenu.title}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // Regular Menu Item
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.title}
              to={item.url}
              className={classNames(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                "hover:bg-gray-100",
                isActive && "bg-indigo-600 text-white",
                collapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}