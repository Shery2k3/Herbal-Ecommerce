import "./ShowCart.css";
import { useCart } from "../../Components/Cart/CartContext.jsx";
import { Link } from "react-router-dom";
import { useAppState } from "../CartState/useCartState.jsx";

const ShowCart = () => {
  const { totalItems, totalPrice } = useCart();
  const { isCartOpen, activateCart, closeCart } = useAppState();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="showcart cart-opener" onClick={activateCart} to="/cart">
        <p className="quantity">{totalItems()}</p>
        <p className="viewcart">View Cart</p>
        <p className="cartPrice">Rs {totalPrice()}</p>
      </div>
    </>
  );
};

export default ShowCart;
