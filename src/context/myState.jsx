import { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function MyState({ children }) {
  // Loading State
  const [loading, setLoading] = useState(false);

  // User State
  const [getAllProduct, setGetAllProduct] = useState([]);

  // App Configuration
  const brandName = "ShopWave";

  /**========================================================================
   *                          GET All Product Function
   *========================================================================**/

  const getAllProductFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          const docData = doc.data();
          productArray.push({
            ...docData,
            id: doc.id,
            time: docData.time ? docData.time.toDate().toISOString() : null
          });
        });
        setGetAllProduct(productArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
      toast.error('Failed to load products');
    }
  };

  // Order State
  const [getAllOrder, setGetAllOrder] = useState([]);

  /**========================================================================
   *                           GET All Order Function
   *========================================================================**/

  const getAllOrderFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "order"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray = [];
        QuerySnapshot.forEach((doc) => {
          const docData = doc.data();
          orderArray.push({
            ...docData,
            id: doc.id,
            time: docData.time ? docData.time.toDate().toISOString() : null
          });
        });
        setGetAllOrder(orderArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
      toast.error('Failed to load orders');
    }
  };

  // Delete order Function
  const orderDelete = async (orderId, itemId) => {
    setLoading(true);
    try {
      // Get the order document
      const orderDocRef = doc(fireDB, "order", orderId);
      const orderSnapshot = await getDoc(orderDocRef);
      if (!orderSnapshot.exists()) {
        throw new Error("Order not found");
      }

      // Get the cartItems array from the order document
      let cartItems = orderSnapshot.data().cartItems;

      // Filter out the item to delete
      const updatedCartItems = cartItems.filter((item) => item.id !== itemId);

      if (updatedCartItems.length === 0) {
        // If no items are left in the cart, delete the entire order document
        await deleteDoc(orderDocRef);
      } else {
        // Update the order document with the modified cartItems array
        await updateDoc(orderDocRef, { cartItems: updatedCartItems });

        // Update the getAllOrder state by updating the order with the new cartItems array
        setGetAllOrder((prevOrders) => {
          return prevOrders.map((order) => {
            if (order.id === orderId) {
              return { ...order, cartItems: updatedCartItems };
            }
            return order;
          });
        });
      }

      toast.success("Item deleted successfully");
      setLoading(false);
    } catch (error) {
      console.error('Error deleting order item:', error);
      toast.error('Failed to delete item');
      setLoading(false);
    }
  };

  // user State
  const [getAllUser, setGetAllUser] = useState([]);

  /**========================================================================
   *                           GET All User Function
   *========================================================================**/

  const getAllUserFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "user"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          const docData = doc.data();
          userArray.push({
            ...docData,
            id: doc.id,
            time: docData.time ? docData.time.toDate().toISOString() : null
          });
        });
        setGetAllUser(userArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
      toast.error('Failed to load users');
    }
  };

  useEffect(() => {
    getAllProductFunction();
    getAllOrderFunction();
    getAllUserFunction();
  }, []);
  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
        getAllProductFunction,
        getAllOrder,
        orderDelete,
        getAllUser,
        getAllUserFunction,
        brandName,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
