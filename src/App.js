import { useSelector, useDispatch } from "react-redux";

import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { calculateTotals,getCartItems } from "./features/cart/cartSlice";
import {useEffect} from 'react'
import Modal from "./components/Modal";

function App() {

  const { cartItems,isLoading } = useSelector((store) => {
    return store.cart
  });
   const { isOpen } = useSelector((store) => {
     return store.modal;
   });
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);
  
  useEffect(() => {
    dispatch(getCartItems())
  }, [])
  if (isLoading) {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
