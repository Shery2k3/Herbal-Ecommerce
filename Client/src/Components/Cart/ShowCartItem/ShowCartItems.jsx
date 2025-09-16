import { useCart } from "../CartContext";
import "./ShowCartItem.css"

function ShowCartItems(props) {
    const { removeFromCart } = useCart();

    return (
        <>
            <div className="Checkout-cart-item">
                <span className="quantity-title">
                    <h3>{props.quantity}x {props.title}</h3>
                    <p className="clickable" onClick={() => removeFromCart(props.title)}>Remove</p>
                </span>
                <span>
                    <p>Rs. {props.price}</p>
                </span>
            </div>
        </>
    );
}

export default ShowCartItems;