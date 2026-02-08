import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import SkeletonCard from "../skeleton/SkeletonCard";

const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [loadingItemId, setLoadingItemId] = useState(null);

  const context = useContext(myContext);
  const { getAllProduct, brandName } = context;

  const rawCartItems = useSelector((state) => state.cart) || [];
  const cartItems = useMemo(() => rawCartItems, [rawCartItems]);

  const dispatch = useDispatch();

  // Handle image load
  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  };

  //add to cart function
  const addCart = async (item) => {
    setLoadingItemId(item.id);
    try {
      await dispatch(addToCart(item));
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setLoadingItemId(null);
    }
  };

  //delete from cart function
  const deleteCart = async (item) => {
    setLoadingItemId(item.id);
    try {
      await dispatch(deleteFromCart(item));
      toast.success("Deleted from cart");
    } catch (error) {
      toast.error("Failed to delete from cart");
    } finally {
      setLoadingItemId(null);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-10">
      {/* Show skeleton while loading or no products */}
      {!getAllProduct || getAllProduct.length === 0 ? (
        <SkeletonCard count={8} />
      ) : (
        <>
          {/* Heading  */}
          <div className="">
            <h1 className=" text-center mb-5 text-2xl font-semibold">
              Bestselling Products
            </h1>
          </div>

          {/* main  */}
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto ">
              <div className="flex flex-wrap -m-4">
                {getAllProduct.slice(0, 8).map((item) => {
                  const { id, title, price, productImageUrl } = item;
                  return (
                    <div key={id} className="p-4 w-full md:w-1/2 lg:w-1/4">
                      <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform duration-300 hover:scale-105">
                        <div className="relative lg:h-80 h-96 w-full bg-gray-100">
                          {!loadedImages.has(id) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <div className="animate-pulse">
                                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                              </div>
                            </div>
                          )}
                          <img
                            onClick={() => navigate(`/productinfo/${id}`)}
                            className={`lg:h-80 h-96 w-full object-cover transition-opacity duration-300 ${loadedImages.has(id) ? 'opacity-100' : 'opacity-0'
                              }`}
                            src={productImageUrl}
                            alt={`${title.substring(0, 25)} product`}
                            loading="lazy"
                            onLoad={() => handleImageLoad(id)}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Found';
                              handleImageLoad(id);
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                            {brandName}
                          </h2>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {title.substring(0, 25)}
                          </h1>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            ₹{price}
                          </h1>

                          <div className="flex justify-center ">
                            {cartItems.some((p) => p.id === item.id) ? (
                              <button
                                onClick={() => deleteCart(item)}
                                disabled={loadingItemId === item.id}
                                className=" bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                aria-label={`Remove ${title.substring(0, 25)} from cart`}
                                aria-busy={loadingItemId === item.id}
                              >
                                {loadingItemId === item.id ? (
                                  <>
                                    <LoadingSpinner />
                                    Removing...
                                  </>
                                ) : (
                                  "Delete From Cart"
                                )}
                              </button>
                            ) : (
                              <button
                                onClick={() => addCart(item)}
                                disabled={loadingItemId === item.id}
                                className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                aria-label={`Add ${title.substring(0, 25)} to cart`}
                                aria-busy={loadingItemId === item.id}
                              >
                                {loadingItemId === item.id ? (
                                  <>
                                    <LoadingSpinner />
                                    Adding...
                                  </>
                                ) : (
                                  "Add To Cart"
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePageProductCard;
