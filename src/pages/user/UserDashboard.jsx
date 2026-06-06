import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../Components/loader/Loader";

const UserDashboard = () => {
  // user
  const user = JSON.parse(localStorage.getItem("users")) || {};

  const context = useContext(myContext);
  const { loading, getAllOrder } = context;

  return (
    <Layout>
      {/* Top User Info Section */}
      <div className="container mx-auto px-4 py-5 lg:py-8 max-w-6xl">
        <div className="bg-pink-50 py-6 rounded-xl border border-pink-100 flex flex-col items-center justify-center shadow-sm">
          {/* User Icon SVG */}
          <div className="flex justify-center mb-4 text-pink-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={64}
              height={64}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user-circle"
            >
              <circle cx={12} cy={12} r={10} />
              <circle cx={12} cy={10} r={3} />
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
          </div>
          {/* Details */}
          <div className="text-center space-y-1">
            <h1 className="text-lg">
              <span className="font-bold text-gray-700">Name:</span>{" "}
              <span className="text-gray-600">
                {user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User"}
              </span>
            </h1>
            <h1 className="text-lg">
              <span className="font-bold text-gray-700">Email:</span>{" "}
              <span className="text-gray-600">{user?.email || "N/A"}</span>
            </h1>
            {user?.date && (
              <h1 className="text-lg">
                <span className="font-bold text-gray-700">Date:</span>{" "}
                <span className="text-gray-600">{user?.date}</span>
              </h1>
            )}
            <h1 className="text-lg">
              <span className="font-bold text-gray-700">Role:</span>{" "}
              <span className="text-gray-600 capitalize">{user?.role || "user"}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* bottom  */}
      <div className="bottom">
        {/* main 1 */}
        <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
          {/* text  */}
          <h2 className=" text-2xl lg:text-3xl font-bold" aria-label="User order details">Order Details</h2>

          <div className="flex justify-center relative top-10">
            {loading && <Loader />}
          </div>

          {/* main 2 */}
          {Array.isArray(getAllOrder) &&
          getAllOrder.filter((obj) => obj.userid === user?.uid).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                className="w-16 h-16 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-gray-500 text-lg mb-4">You have not placed any orders yet.</p>
              <Link to="/allproduct">
                <button className="px-5 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition-colors">
                  Shop Now
                </button>
              </Link>
            </div>
          ) : (
            getAllOrder
              .filter((obj) => obj.userid === user?.uid)
              .map((order, index) => {
                return (
                  <div key={order.id || index}>
                    {order.cartItems.map((item, itemIndex) => {
                      const {
                        id,
                        date,
                        quantity,
                        price,
                        title,
                        productImageUrl,
                        category,
                      } = item;
                      const { status } = order;
                      return (
                        <div
                          key={`${order.id}-${item.id || itemIndex}`}
                          className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row"
                        >
                          {/* main 3  */}
                          <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs">
                            {/* left  */}
                            <div className="p-8">
                              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 gap-3">
                                <div className="mb-1">
                                  <div className="text-sm font-semibold text-black">
                                    Order Id
                                  </div>
                                  <div className="text-sm font-medium text-gray-900 break-words ">
                                    #{id}
                                  </div>
                                </div>

                                <div className="mb-1">
                                  <div className="text-sm font-semibold">
                                    Date
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {order.date}
                                  </div>
                                </div>

                                <div className="mb-1">
                                  <div className="text-sm font-semibold">
                                    Total Amount
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    ₹ {price * quantity}
                                  </div>
                                </div>

                                <div className="mb-1">
                                  <div className="text-sm font-semibold" id="order-status-label">
                                    Order Status
                                  </div>
                                  <div className="text-sm font-medium text-green-800 first-letter:uppercase" role="status" aria-live="polite" aria-labelledby="order-status-label">
                                    {status}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* right  */}
                          <div className="flex-1">
                            <div className="p-8">
                              <ul className="-my-7 divide-y divide-gray-200">
                                <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                  <div className="flex flex-1 items-stretch">
                                    <div className="flex-shrink-0">
                                      <img
                                        className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                        src={productImageUrl}
                                        alt={`Order item ${title}`}
                                        onError={(e) => {
                                          e.target.src = 'https://placehold.co/300x300?text=Image+Not+Found';
                                        }}
                                      />
                                    </div>

                                    <div className="ml-5 flex flex-col justify-between">
                                      <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900">
                                          {title}
                                        </p>
                                        <p className="mt-1.5 text-sm font-medium text-gray-500">
                                          {category}
                                        </p>
                                      </div>

                                      <p className="mt-4 text-sm font-medium text-gray-500">
                                        x {quantity}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="ml-auto flex flex-col items-end justify-between">
                                    <p className="text-right text-sm font-bold text-gray-900">
                                      ₹ {price}
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
          )}
        </div>
      </div>

    </Layout>
  );
};

export default UserDashboard;
