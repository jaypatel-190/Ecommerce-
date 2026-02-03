import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CIcon = ({ totalCartQuantity, ariaLabel = "View cart" }) => {
  return (
    <Link
      to={"/cart"}
      className="flex items-center text-white font-medium text-md relative"
      aria-label={ariaLabel}
    >
      <ShoppingCartIcon className="ml-2" />
      {totalCartQuantity > 0 && (
        <span
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          aria-label={`${totalCartQuantity} items in cart`}
        >
          {totalCartQuantity}
        </span>
      )}
    </Link>
  );
};

export default CIcon;