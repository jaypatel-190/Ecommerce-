import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import Sidebar from "../sidebar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import Profile from "../profile/Profile";
// import { useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
    localStorage.clear("users");
    navigate("/login");
  };

  // Cart items
  const cartItems = useSelector((state) => state.cart);

  return (
    <>
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
      <nav className="bg-pink-600 sticky top-0 z-10">
        <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
          {/* Left Section - Logo and Sidebar Toggle */}
          <div className="left flex items-center py-3 lg:py-0">
            <MenuIcon
              className="mr-2 cursor-pointer text-white"
              onClick={toggleSidebar}
            />
            <Link to={"/"}>
              <h2 className="font-bold text-white text-2xl text-center">
                ShopWave
              </h2>
            </Link>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="center flex justify-center mb-4 lg:mb-0">
            <ul className="flex space-x-6 text-white font-medium text-md px-5">
              <li
                className={`hover:text-gray-300 ${
                  location.pathname === "/" ? "border-b-2 border-white" : ""
                }`}
              >
                <Link to={"/"}>Home</Link>
              </li>
              <li
                className={`hover:text-gray-300 ${
                  location.pathname === "/allproduct"
                    ? "border-b-2 border-white"
                    : ""
                }`}
              >
                <Link to={"/allproduct"}>All Product</Link>
              </li>
              {!user && (
                <>
                  <li
                    className={`hover:text-gray-300 ${
                      location.pathname === "/signup"
                        ? "border-b-2 border-white"
                        : ""
                    }`}
                  >
                    <Link to={"/signup"}>Sign up</Link>
                  </li>
                  <li
                    className={`hover:text-gray-300 ${
                      location.pathname === "/login"
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
          <div className="right flex justify-center items-center">
            <SearchBar />

            {/* Profile Component */}
            {user && <Profile user={user} logout={logout} />}

            {/* Cart */}
            <Link
              to={"/cart"}
              className="flex items-center text-white font-medium text-md ml-4"
            >
              <ShoppingCartIcon className="ml-2" />
              <span className="ml-1">{`Cart(${cartItems.length})`}</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
