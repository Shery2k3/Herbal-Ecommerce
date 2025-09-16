import "./CartItem.css";
import { useCart } from "../Cart/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const CartItem = (props) => {
  const {
    cart,
    removeFromCart,
    addToCart,
    decreaseQuantity,
    clearCart,
    totalPrice,
  } = useCart();

  return (
    <>
      <div className="cart-item">
        <div>
          <img src={props.image} alt="" />
          <span className="item-details" >
            <p>{props.title}</p>
            <span className="item-price">Rs.{props.quantity * props.price}</span>
          </span>
        </div>
        <div className="item-quantity">
          <button className="left" onClick={() => decreaseQuantity(props.title)}><FontAwesomeIcon icon={faMinus} /></button>
          <span>{props.quantity}</span>
          <button className="right" onClick={() => addToCart({ title: props.title })}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
