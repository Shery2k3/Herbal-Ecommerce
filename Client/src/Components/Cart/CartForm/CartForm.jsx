import axios from "axios";
import ShowCartItems from "../ShowCartItem/ShowCartItems";
import { useState, useEffect, React } from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./CartForm.css";
import { useAreaContext } from "../../../Pages/Cart/components/localarea";
import API_BASE_URL from "../../../constants";

function CartForm() {
  const [deliveryCharges, SetCharges] = useState(150);
  const { localArea } = useAreaContext();
  const { cart, totalPrice } = useCart();

  useEffect(() => {
    const fetchDeliveryCharges = async () => {
      try {
        if (Array.isArray(localArea) && localArea.length === 2) {
          const response = await axios.get(
            `${API_BASE_URL}/delivery/charges/${encodeURIComponent(
              localArea.join(",")
            )}`
          );
          SetCharges(response.data.charges);
        } else {
          const response = await axios.get(
            `${API_BASE_URL}/delivery/charges/${encodeURIComponent(localArea)}`
          );
          SetCharges(response.data.charges);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchDeliveryCharges();
  }, [localArea]);

  return (
    <>
      {cart.length === 0 ? (
        <h2>No Item in the Cart</h2>
      ) : (
        <div className="checkout-cart-form">
          {cart.map((item) => (
            <div key={item.title}>
              <ShowCartItems
                title={item.title}
                quantity={item.quantity}
                price={item.price}
              />
            </div>
          ))}
          <div className="checkout-cart-bill">
            <div className="checkout-cart-total">
              <span>Sub-Total:</span>
              <span>Rs. {totalPrice()}</span>
            </div>
            <div className="checkout-cart-total">
              <span>Delivery Fee:</span>
              <span>Rs. {deliveryCharges}</span>
            </div>
            <div className="checkout-cart-total">
              <span className="total">Grand Total:</span>
              <span className="total">
                Rs. {totalPrice() + deliveryCharges}
              </span>
            </div>
          </div>
          <Link className="back-to-home clickable" to="/">
            <FontAwesomeIcon icon={faArrowLeft} /> continue to add more products
          </Link>
        </div>
      )}
    </>
  );
}

export default CartForm;
