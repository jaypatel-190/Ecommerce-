import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";

const category = [
  {
    image: "https://cdn-icons-png.flaticon.com/256/4359/4359963.png",
    name: "fashion",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11833/11833323.png",
    name: "shirt",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/8174/8174424.png",
    name: "jacket",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/7648/7648246.png",
    name: "mobile",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12142/12142416.png",
    name: "laptop",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/10686/10686553.png",
    name: "shoes",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12114/12114279.png",
    name: "home",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11946/11946316.png",
    name: "books",
  },
];

const Sidebar = ({ toggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem("users"));
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("users");
    navigate("/login");
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={toggleSidebar}
      />
      <div className="w-64 bg-pink-600 h-screen fixed top-0 left-0 z-50 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-700 scrollbar-track-pink-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 translate-x-0">
        <div className="flex flex-col mt-5 p-5 space-y-4">
          {/* Sidebar header */}
          <div className="left flex items-center py-3 lg:py-0">
            {/* Close Icon */}
            <CloseIcon
              className="mr-2 cursor-pointer text-white"
              onClick={toggleSidebar}
            />
            <h2 className="font-bold text-white text-2xl text-center">Menu</h2>
          </div>

          {/* Categories */}
          <h2 className="font-bold text-white text-2xl text-center">
            Categories
          </h2>

          {category.map((item, index) => (
            <Link
              key={index}
              to={`/category/${item.name}`}
              className="flex items-center space-x-4 p-2 hover:bg-pink-500 rounded-md"
            >
              <img src={item.image} alt={`Category ${item.name}`} className="w-10 h-10" />
              <span className="text-white font-medium text-lg">{item.name}</span>
            </Link>
          ))}
          {/* Account */}

          <div className="flex flex-col space-y-2">
            <h2 className="font-bold text-white text-2xl text-center">Account</h2>
            {!user ? (
              <>
                <Link
                  to="/signup"
                  className={`flex items-center space-x-4 p-2 hover:bg-pink-500 rounded-md ${location.pathname === "/signup"
                    ? "border-b-2 border-white"
                    : ""
                    }`}
                >
                  <span className="text-white font-medium text-lg">
                    Login/Register
                  </span>
                </Link>
              </>
            ) : (
              <>
                {user.role === "user" && (
                  <Link
                    to="/user-dashboard"
                    className="flex items-center space-x-4 p-2 hover:bg-pink-500 rounded-md cursor-pointer"
                  >
                    <span className="text-white font-medium text-lg">
                      User Dashboard
                    </span>
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link
                    to="/admin-dashboard"
                    className="flex items-center space-x-4 p-2 hover:bg-pink-500 rounded-md"
                  >
                    <span className="text-white font-medium text-lg">
                      Admin Dashboard
                    </span>
                  </Link>
                )}
                <div
                  className="flex items-center space-x-4 p-2 hover:bg-pink-500 rounded-md cursor-pointer"
                  onClick={logout}
                  role="button"
                  aria-label="Logout from your account"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      logout();
                    }
                  }}
                >
                  <span className="text-white font-medium text-lg">Logout</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
