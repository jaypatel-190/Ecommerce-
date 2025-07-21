import { useNavigate, useParams } from "react-router";
import Layout from "../../Components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../Components/loader/Loader";
// import imges from "../../images/Page not found 404.gif";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { categoryname } = useParams();

  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  const navigate = useNavigate();

  // console.log("Category Name:", categoryname);
  // console.log("All Products:", getAllProduct);
  // console.log(getAllProduct.category);

  // filter product
  const filterProduct = getAllProduct.filter((obj) =>
    obj.category.includes(categoryname.toLowerCase())
  );
  // console.log(filterProduct)

  const cartItems = useSelector((state) => state.cart) || [];

  console.log(cartItems);

  const dispatch = useDispatch();

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
    <Layout>
      <div className="mt-10">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">
            {categoryname}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <section className="text-gray-600 body-font">
            {/* main 2 */}
            <div className="container px-5 py-5 mx-auto">
              {/* main 3  */}
              <div className="flex flex-wrap -m-4 justify-center">
                {filterProduct.length > 0 ? (
                  <>
                    {filterProduct.map((item, index) => {
                      const { id, title, price, productImageUrl } = item;
                      return (
                        <div key={index} className="p-4 w-full md:w-1/4">
                          <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                            <img
                              onClick={() => navigate(`/productinfo/${id}`)}
                              className="lg:h-80  h-96 w-full"
                              src={productImageUrl}
                              alt="img"
                            />
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
                                    className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
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
                  </>
                ) : (
                  <div>
                    <div className="flex justify-center">
                      <img
                        className=" mb-2"
                        src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                        alt=""
                      />
                      {/* <img className=" mb-2" src={imges} alt="image" /> */}
                    </div>
                    <h1 className=" text-black text-xl">
                      No {categoryname} product found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
