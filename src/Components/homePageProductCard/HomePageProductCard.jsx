import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState(new Set());

  const context = useContext(myContext);
  const { getAllProduct } = context;

  const rawCartItems = useSelector((state) => state.cart) || [];
  const cartItems = useMemo(() => rawCartItems, [rawCartItems]);

  const dispatch = useDispatch();

  // Handle image load
  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  };

  //add to cart function
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  //delete from cart function
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-10">
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
            {getAllProduct.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              return (
                <div key={index} className="p-4 w-full md:w-1/2 lg:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
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
                        alt={`${title.substring(0, 25)} product image`}
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
                        ShopWave
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
                            className=" bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >
                            Delete From Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => addCart(item)}
                            className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold "
                          >
                            Add To Cart
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
    </div>
  );
};

export default HomePageProductCard;
