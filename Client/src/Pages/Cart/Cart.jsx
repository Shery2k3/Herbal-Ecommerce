import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCart } from "../../Components/Cart/CartContext.jsx";
import CartItem from "../../Components/CartItem/CartItem.jsx";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useAppState } from "../../Components/CartState/useCartState.jsx";
import { Link } from "react-router-dom";
import emptyCart from "../../../public/images/empty-cart.png";
import { Cascader, Form } from "antd";
import { useAreaContext } from "./components/localarea.jsx";
import API_BASE_URL from "../../constants";
import { useAreas } from "../../api/hooks/useArea.js";

const Cart = () => {
  const [deliveryCharges, SetCharges] = useState();
  const { cityId, localArea, setLocalArea } = useAreaContext();
  const [isOpen, setIsOpen] = useState(null);
  const cascaderRef = useRef(null);
  const [cascaderOpen, setCascaderOpen] = useState(false);

  const {
    data: area,
    isLoading: isLoadingAreas,
    error: areaError,
  } = useAreas(cityId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Normalize localArea to be an array
        const normalizedLocalArea = Array.isArray(localArea)
          ? localArea
          : localArea.split(",");
        const area = normalizedLocalArea[0];

        const response = await axios.get(`${API_BASE_URL}/time/isOpen/${area}`);
        setIsOpen(response.data.isOpen);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [localArea]);

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

  const ChangeArea = (values) => {
    setLocalArea(values.area);
  };

  const { cart, clearCart, totalPrice } = useCart();
  const { isCartOpen, activateCart, closeCart } = useAppState();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (cascaderOpen) {
      document.body.classList.add("cascader-open");
    } else {
      document.body.classList.remove("cascader-open");
    }

    return () => {
      document.body.classList.remove("cascader-open");
    };
  }, [cascaderOpen]);

  const handleCascaderOpen = () => {
    setCascaderOpen(true);
  };

  const handleCascaderClose = () => {
    setCascaderOpen(false);
  };

  return (
    <div className={isCartOpen ? "cart-menu open" : "cart-menu"}>
      {cart.length === 0 ? (
        <div className="empty">
          <p className="closeCart" onClick={closeCart}>
            <FontAwesomeIcon icon={faX} />
          </p>
          <img className="empty-cart" src={emptyCart} alt="" />
          <h2>Your cart is empty</h2>
          <p>Add items to get started</p>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-top">
            <div className="cart-header">
              <h2>Your Cart</h2>
              <span>
                <button
                  onClick={() => {
                    clearCart();
                    closeCart();
                  }}
                >
                  Clear Cart
                </button>
                <p className="closeCart" onClick={closeCart}>
                  <FontAwesomeIcon icon={faX} />
                </p>
              </span>
            </div>

            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.title}>
                  <CartItem
                    title={item.title}
                    quantity={item.quantity}
                    price={item.price}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="cart-bottom">
            <Form onValuesChange={ChangeArea}>
              <Form.Item
                className="area-form"
                name="area"
                rules={[
                  {
                    type: "array",
                    required: true,
                    message: "Select your area to get real delivery price",
                  },
                ]}
              >
                <Cascader
                  ref={cascaderRef}
                  options={area}
                  placeholder="Select your area to get delivery price"
                  defaultValue={localArea ? [localArea] : []}
                  allowClear={false}
                  placement="bottomLeft"
                  popupClassName="cascader"
                  onDropdownVisibleChange={(visible) => {
                    if (visible) {
                      handleCascaderOpen();
                    } else {
                      handleCascaderClose();
                    }
                  }}
                />
              </Form.Item>
            </Form>
            <div className="cart-total">
              <span>Sub-Total:</span>
              <span>Rs. {totalPrice()}</span>
            </div>
            <div className="cart-total">
              <span>Delivery Fee:</span>
              <span>
                {deliveryCharges
                  ? `Rs. ${deliveryCharges}`
                  : "Select Your Area"}
              </span>
            </div>
            <div className="cart-total grand-total">
              <span>Grand Total:</span>
              <span>
                Rs.{" "}
                {deliveryCharges
                  ? totalPrice() + deliveryCharges
                  : totalPrice()}
              </span>
            </div>
            {totalPrice() < 500 ? (
              <div className="minimum-order">
                <p>
                  You are <span>Rs.{500 - totalPrice()}</span> away from minimum
                  order
                </p>
              </div>
            ) : isOpen ? (
              <Link
                className="checkout-link"
                onClick={() => {
                  closeCart();
                  scrollToTop();
                }}
                to="/checkout"
              >
                <h3>Check Out</h3>
              </Link>
            ) : (
              <div className="minimum-order">
                <p>We're closed now. We'll reopen at 2 PM</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
