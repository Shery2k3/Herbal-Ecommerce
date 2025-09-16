import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/images/logo.png";
import { useCart } from "../../Components/Cart/CartContext";
import CartForm from "../../Components/Cart/CartForm/CartForm";
import UserForm from "../../Components/UserForm/UserForm";
import { Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import "./CheckOut.css";
import { useAreaContext } from "../Cart/components/localarea";
import API_BASE_URL from "../../constants"

function CheckOut() {
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();
  const { localArea, setLocalArea } = useAreaContext();
  const [isOpen, setIsOpen] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            setFetching(true);
            const normalizedLocalArea = Array.isArray(localArea) ? localArea : localArea.split(',');
            const area = normalizedLocalArea[0];
            
            const response = await axios.get(`${API_BASE_URL}/time/isOpen/${area}`);
            setIsOpen(response.data.isOpen);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setFetching(false);
        }
    };

    fetchData();
}, [localArea]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isOpen === false) {
      message.error("Unable to Place Order: The selected branch is currently closed.");
      navigate("/");
    }

    scrollToTop();
  }, [isOpen, navigate]);

  useEffect(() => {
    if (totalPrice() < 500) {
      message.error("Unable to Place Order: You are Rs.50 away from minimum order");
      navigate("/");
    }

    scrollToTop();
  }, [cart, navigate]);

  return (
    <>
      <div className="checkout-sections">
        <Link to="/">
          <img
            src={logo}
            alt="Herbia Logo"
            className="checkout-logo"
          />
        </Link>
        <div className="checkout-forms">
          <UserForm fetching={fetching} />
          <CartForm />
        </div>
      </div>
    </>
  );
}

export default CheckOut;
