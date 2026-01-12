import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/layout/Layout";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  decrementQuantity,
  deleteAllFromCart,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { Navigate } from "react-router";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item removed from cart");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const user = JSON.parse(localStorage.getItem("users"));

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      toast.error("There are no products to buy");
      return;
    }

    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return toast.error("All fields are required");
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
      const orderRef = collection(fireDB, "order");
      addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      });
      toast.success("Order placed successfully");
      dispatch(deleteAllFromCart());
      closeModal();
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          {cartItems.length > 0 ? (
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section
                aria-labelledby="cart-heading"
                className="rounded-lg bg-white lg:col-span-8"
              >
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => {
                    const {
                      id,
                      title,
                      price,
                      productImageUrl,
                      quantity,
                      category,
                    } = item;
                    return (
                      <div key={index} className="">
                        <li className="flex py-6 sm:py-6 ">
                          <div className="flex-shrink-0">
                            <img
                              src={productImageUrl}
                              alt={`Cart item ${title}`}
                              className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                              <div>
                                <div className="flex justify-between">
                                  <h3 className="text-sm">
                                    <div className="font-semibold text-black">
                                      {title}
                                    </div>
                                  </h3>
                                </div>
                                <div className="mt-1 flex text-sm">
                                  <p className="text-sm text-gray-500">
                                    {category}
                                  </p>
                                </div>
                                <div className="mt-1 flex items-end">
                                  <p className="text-sm font-medium text-gray-900">
                                    ₹{price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <div className="mb-2 flex">
                          <div className="min-w-24 flex">
                            <button
                              onClick={() => handleDecrement(id)}
                              type="button"
                              className="h-7 w-7"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="mx-1 h-7 w-9 rounded-md border text-center"
                              value={quantity}
                              readOnly
                            />
                            <button
                              onClick={() => handleIncrement(id)}
                              type="button"
                              className="flex h-7 w-7 items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <div className="ml-6 flex text-sm">
                            <button
                              onClick={() => deleteCart(item)}
                              type="button"
                              className="flex items-center space-x-1 px-2 py-1 pl-0"
                            >
                              <DeleteIcon size={12} className="text-red-500" />
                              <span className="text-xs font-medium text-red-500">
                                Remove
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </section>
              {user ? (
                <section
                  aria-labelledby="summary-heading"
                  className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-4 lg:mt-0 lg:p-8"
                >
                  <h2
                    id="summary-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Price Details
                  </h2>

                  <dl className=" space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">
                        Price ({cartItemTotal} {cartItemTotal === 1 ? "item" : "items"})
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ₹ {cartTotal}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm text-gray-800">
                        <span>Delivery Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        Free
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                      <dt className="text-base font-medium text-gray-900">
                        Total Amount
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ₹ {cartTotal}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={openModal}
                      className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
                    >
                      Buy now
                    </button>
                  </div>
                </section>
              ) : (
                <Navigate to={"/login"} />
              )}
            </form>
          ) : (
            <div className="mt-12 text-center">
              <img
                src="https://www.schools365.in/static/version1714671919/frontend/MageBig/martfury_martfury_child/en_US/images/empty-cart.svg"
                alt="Empty shopping cart"
                className="mx-auto w-1/2"
              />
              <h2 className="text-2xl font-medium text-gray-900 mt-4">
                Your cart is empty
              </h2>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Enter Your Shipping Details
                    </h3>
                    <div className="mt-2">
                      <form>
                        <div className="flex flex-col">
                          <div className="mb-3">
                            <input
                              type="text"
                              name="name"
                              value={addressInfo.name}
                              onChange={(e) => {
                                setAddressInfo({
                                  ...addressInfo,
                                  name: e.target.value,
                                });
                              }}
                              placeholder="Enter your name"
                              className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              name="address"
                              value={addressInfo.address}
                              onChange={(e) => {
                                setAddressInfo({
                                  ...addressInfo,
                                  address: e.target.value,
                                });
                              }}
                              placeholder="Enter your address"
                              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="number"
                              name="pincode"
                              value={addressInfo.pincode}
                              onChange={(e) => {
                                setAddressInfo({
                                  ...addressInfo,
                                  pincode: e.target.value,
                                });
                              }}
                              placeholder="Enter your pincode"
                              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none  text-pink-600 placeholder-pink-300"
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              name="mobileNumber"
                              value={addressInfo.mobileNumber}
                              onChange={(e) => {
                                setAddressInfo({
                                  ...addressInfo,
                                  mobileNumber: e.target.value,
                                });
                              }}
                              placeholder="Enter your mobileNumber"
                              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                          </div>

                          {/* Other form fields go here */}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleBuyNow}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Place Order
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
