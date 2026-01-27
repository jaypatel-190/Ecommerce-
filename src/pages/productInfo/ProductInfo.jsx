import { useContext, useEffect, useState } from "react";
import Layout from "../../Components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams, useNavigate } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../Components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { Timestamp, addDoc, collection } from "firebase/firestore";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [product, setProduct] = useState("");
  const { id } = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct({ ...productTemp.data(), id: productTemp.id });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setLoading(false);
      toast.error('Failed to load product');
    }
  };

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const buyCart = (item) => {
    dispatch(addToCart(item));
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getProductData();
  }, []);

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

  const openModal = () => {
    const user = JSON.parse(localStorage.getItem("users"));
    if (!user) {
      navigate("/login");
      return;
    }
    if (!cartItems.some((p) => p.id === product.id)) {
      buyCart(product);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleBuyNow = async () => {
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return toast.error("All fields are required");
    }

    const user = JSON.parse(localStorage.getItem("users"));
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
      await addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      });
      dispatch(deleteFromCart(product));
      toast.success("Order placed successfully");
      closeModal();
    } catch (error) {
      console.error('Error placing order for product:', product?.id, error);
      toast.error('Failed to place order');
    }
  };

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap mb-24 -mx-4">
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <div>
                  <img
                    className="w-full lg:h-[39em] rounded-lg"
                    src={product?.productImageUrl}
                    alt={`Product image of ${product?.title}`}
                  />
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2">
                <div className="lg:pl-20">
                  <div className="mb-6">
                    <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                      {product?.title}
                    </h2>
                    <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                      <span>₹ {product?.price}</span>
                    </p>
                  </div>
                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                      Description :
                    </h2>
                    <p>{product?.description}</p>
                  </div>

                  <div className="mb-6" />
                  <div className="flex flex-wrap items-center mb-6">
                    {cartItems.some((p) => p.id === product.id) ? (
                      <button
                        onClick={() => deleteCart(product)}
                        className="w-full px-4 py-3 text-center text-white bg-red-500 border border-red-600 hover:bg-red-600 hover:text-gray-100 rounded-xl"
                      >
                        Delete from cart
                      </button>
                    ) : (
                      <button
                        onClick={() => addCart(product)}
                        className="w-full px-4 py-3 text-center text-pink-600 bg-pink-100 border border-pink-600  hover:bg-pink-600 hover:text-gray-100 rounded-xl"
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={openModal}
                      className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
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
                              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="number"
                              name="mobileNumber"
                              value={addressInfo.mobileNumber}
                              onChange={(e) => {
                                setAddressInfo({
                                  ...addressInfo,
                                  mobileNumber: e.target.value,
                                });
                              }}
                              placeholder="Enter your mobile number"
                              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:w-auto sm:text-sm"
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

export default ProductInfo;
