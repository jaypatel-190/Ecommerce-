import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import Sidebar from "../sidebar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import Profile from "../profile/Profile";
import toast from "react-hot-toast";
import CIcon from "./CIcon";

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
      <nav className="bg-pink-600 sticky top-0 z-10" role="navigation" aria-label="Main navigation">
        <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 px-4">
          {/* Left Section - Logo and Sidebar Toggle */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div className="flex items-center">
              <MenuIcon
                className="mr-2 cursor-pointer text-white"
                onClick={toggleSidebar}
                aria-label="Toggle menu"
                role="button"
                tabIndex={0}
                aria-expanded={isSidebarOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSidebar();
                  }
                }}
              />
              <Link to={"/"} aria-label="ShopWave - Navigate to home page" role="menuitem">
                <h2 className="font-bold text-white text-2xl text-center" aria-label="ShopWave brand logo">
                  ShopWave
                </h2>
              </Link>
            </div>

            {/* Mobile Cart */}
            <div className="lg:hidden">
              <CIcon totalCartQuantity={totalCartQuantity} ariaLabel="View shopping cart" />
            </div>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="hidden lg:flex justify-center mb-4 lg:mb-0">
            <ul className="flex space-x-6 text-white font-medium text-md px-5" role="navigation" aria-label="Main navigation menu">
              <li
                className={`hover:text-gray-300 ${location.pathname === "/" ? "border-b-2 border-white" : ""
                  }`}
                aria-label="Home navigation item"
              >
                <Link to={"/"} aria-label="Navigate to home page" role="menuitem">Home</Link>
              </li>
              <li
                className={`hover:text-gray-300 ${location.pathname === "/allproduct"
                  ? "border-b-2 border-white"
                  : ""
                  }`}
                aria-label="All products navigation item"
              >
                <Link to={"/allproduct"} aria-label="View all products" role="menuitem">All Product</Link>
              </li>
              {!user && (
                <>
                  <li
                    className={`hover:text-gray-300 ${location.pathname === "/signup"
                      ? "border-b-2 border-white"
                      : ""
                      }`}
                    aria-label="Signup navigation item"
                  >
                    <Link to={"/signup"} aria-label="Create a new account" role="menuitem">Sign up</Link>
                  </li>
                  <li
                    className={`hover:text-gray-300 ${location.pathname === "/login"
                      ? "border-b-2 border-white"
                      : ""
                      }`}
                    aria-label="Login navigation item"
                  >
                    <Link to={"/login"} aria-label="Sign in to your account" role="menuitem">Login</Link>
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
            <CIcon totalCartQuantity={totalCartQuantity} ariaLabel="View shopping cart" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;