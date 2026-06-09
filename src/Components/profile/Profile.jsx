import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Profile = ({ user, logout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserInfoDropdownOpen, setIsUserInfoDropdownOpen] = useState(false);

  // Function to toggle main dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsUserInfoDropdownOpen(false); // Close user info dropdown when main dropdown is toggled
  };

  // Function to toggle user info dropdown visibility
  const toggleUserInfoDropdown = () => {
    setIsUserInfoDropdownOpen(!isUserInfoDropdownOpen);
  };

  // Early return if user data is not available
  if (!user) {
    return null;
  }

  return (
    <div className="relative cursor-pointer" aria-label="User profile dropdown">
      <div
        className="flex items-center text-white font-medium text-md ml-4 "
        onClick={toggleDropdown}
        role="button"
        aria-label="User profile menu"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
          }
        }}
      >
        <AccountCircleIcon className="ml-2" />
        <span className="ml-1">{user.firstName || (user.name ? user.name.split(' ')[0] : 'User')}</span>
      </div>
      {isDropdownOpen && (
        <ul className="absolute top-full left-0 text-black bg-white border border-gray-200 rounded-md shadow-md z-10" role="menu" aria-label="User profile menu options">
          <li className="py-2 px-4 hover:bg-gray-100" role="none" aria-label="Dashboard menu item">
            {user.role === "user" && (
              <Link
                to={"/user-dashboard"}
                onClick={toggleDropdown}
                role="menuitem"
                aria-label="Navigate to user dashboard"
              >
                Dashboard
              </Link>
            )}

            {user.role === "admin" && (
              <Link
                to={"/admin-dashboard"}
                onClick={toggleDropdown}
                role="menuitem"
                aria-label="Navigate to admin dashboard"
              >
                Dashboard
              </Link>
            )}
          </li>
          <li
            className="py-2 px-4 hover:bg-gray-100 relative"
            onClick={toggleUserInfoDropdown}
            role="menuitem"
            aria-label={`${user.role || 'user'} information`}
            aria-expanded={isUserInfoDropdownOpen}
            aria-haspopup="true"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleUserInfoDropdown();
              }
            }}
          >
            {user.role || 'user'} Info
            {isUserInfoDropdownOpen && (
              <ul className="absolute top-0 right-full text-black w-max bg-white border border-gray-200 rounded-md shadow-md z-10" role="menu" aria-label="User information details">
                <li className="py-2 px-4" role="menuitem" aria-label={`First Name: ${user.firstName || (user.name ? user.name.split(' ')[0] : 'N/A')}`}>{`First Name: ${user.firstName || (user.name ? user.name.split(' ')[0] : 'N/A')}`}</li>
                <li className="py-2 px-4" role="menuitem" aria-label={`Last Name: ${user.lastName || (user.name && user.name.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : 'N/A')}`}>{`Last Name: ${user.lastName || (user.name && user.name.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : 'N/A')}`}</li>
                <li className="py-2 px-4" role="menuitem" aria-label={`Date: ${user.date || 'N/A'}`}>{`Date: ${user.date || 'N/A'}`}</li>
                <li className="py-2 px-4" role="menuitem" aria-label={`Contact Number: ${user.contactNumber || 'N/A'}`}>{`Contact Number: ${user.contactNumber || 'N/A'}`}</li>
              </ul>
            )}
          </li>
          <li
            className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            onClick={logout}
            role="menuitem"
            aria-label="Logout from your account"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                logout();
              }
            }}
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default Profile;
