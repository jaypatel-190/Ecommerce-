import { useContext } from "react";
import Layout from "../../Components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../Components/loader/Loader";

const UserDashboard = () => {
  // user
  const user = JSON.parse(localStorage.getItem("users")) || {};

  const context = useContext(myContext);
  const { loading, getAllOrder } = context;
  // console.log(getAllOrder)

  // console.log(user)
  return (
    <Layout>
      

        {/* bottom  */}
        <div className="bottom">
          {/* main 1 */}
          <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            {/* text  */}
            <h2 className=" text-2xl lg:text-3xl font-bold">Order Details</h2>

            <div className="flex justify-center relative top-10">
              {loading && <Loader />}
            </div>

            {/* main 2 */}
            { Array.isArray(getAllOrder) && getAllOrder
              .filter((obj) => obj.userid === user?.uid)
              .map((order, index) => {
                // console.log(order);
                return (
                  <div key={index}>
                    {order.cartItems.map((item, index) => {
                      // console.log('item', item);
                      const {
                        id,
                        date,
                        quantity,
                        price,
                        title,
                        productImageUrl,
                        category,
                      } = item;
                      // console.log('order', order)
                      const { status } = order;
                      return (
                        <div
                          key={index}
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
                                  <div className="text-sm font-semibold">
                                    Order Status
                                  </div>
                                  <div className="text-sm font-medium text-green-800 first-letter:uppercase">
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
                                        alt="img"
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
              })}
          </div>
        </div>
      
    </Layout>
  );
};

export default UserDashboard;
