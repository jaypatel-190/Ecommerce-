import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import Sidebar from "../sidebar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import Profile from "../profile/Profile";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("users")); // Get user from local storage

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("users");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  // Cart items
  const cartItems = useSelector((state) => state.cart);

  // Calculate total quantity of items in cart
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
      <nav className="bg-pink-600 sticky top-0 z-10">
        <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 px-4">
          {/* Left Section - Logo and Sidebar Toggle */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div className="flex items-center">
              <MenuIcon
                className="mr-2 cursor-pointer text-white"
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              />
              <Link to={"/"}>
                <h2 className="font-bold text-white text-2xl text-center">
                  ShopWave
                </h2>
              </Link>
            </div>

            {/* Mobile Cart */}
            <div className="lg:hidden">
              <Link
                to={"/cart"}
                className="flex items-center text-white font-medium text-md relative"
              >
                <ShoppingCartIcon />
                {totalCartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="hidden lg:flex justify-center mb-4 lg:mb-0">
            <ul className="flex space-x-6 text-white font-medium text-md px-5">
              <li
                className={`hover:text-gray-300 ${location.pathname === "/" ? "border-b-2 border-white" : ""
                  }`}
              >
                <Link to={"/"}>Home</Link>
              </li>
              <li
                className={`hover:text-gray-300 ${location.pathname === "/allproduct"
                  ? "border-b-2 border-white"
                  : ""
                  }`}
              >
                <Link to={"/allproduct"}>All Product</Link>
              </li>
              {!user && (
                <>
                  <li
                    className={`hover:text-gray-300 ${location.pathname === "/signup"
                      ? "border-b-2 border-white"
                      : ""
                      }`}
                  >
                    <Link to={"/signup"}>Sign up</Link>
                  </li>
                  <li
                    className={`hover:text-gray-300 ${location.pathname === "/login"
                      ? "border-b-2 border-white"
                      : ""
                      }`}
                  >
                    <Link to={"/login"}>Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Right Section - Functional Items */}
          <div className="hidden lg:flex justify-center items-center space-x-4">
            <SearchBar />

            {/* Profile Component */}
            {user && <Profile user={user} logout={logout} />}

            {/* Cart */}
            <Link
              to={"/cart"}
              className="flex items-center text-white font-medium text-md relative"
            >
              <ShoppingCartIcon className="ml-2" />
              {totalCartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
