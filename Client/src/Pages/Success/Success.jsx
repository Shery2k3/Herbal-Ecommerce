import Items from "../../Components/Bill/Items/Item";
import { useState, useEffect, React } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAreaContext } from "../Cart/components/localarea";
import ReactDOMServer from "react-dom/server";
import EmailTemplateAdmin from "../../Components/EmailTemplate/EmailTemplateAdmin";
import EmailTemplateCustomer from "../../Components/EmailTemplate/EmailTemplateCustomer";
import "./Success.css";
import API_BASE_URL from "../../constants";

const Success = () => {
  const [deliveryCharges, setCharges] = useState();
  const [cart, setCart] = useState([]);
  const [totalPrice, setPrice] = useState();
  const [orderID, setOrderID] = useState();
  const [userData, setOrderData] = useState({});
  const { localArea, setLocalArea } = useAreaContext();
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.fromUserForm) {
      navigate("/404");
    }

    const handleBeforeUnload = () => {
      navigate("/404");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location.state, navigate]);

  // Add this function to get the email for a specific area
  const getEmail = async (localArea) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/branch/email/${localArea}`
      );
      return response.data.email;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendMail = async (
    formValues,
    cart,
    totalPrice,
    deliveryCharges,
    localArea,
    orderID
  ) => {
    try {
      const adminEmailBody = ReactDOMServer.renderToString(
        <EmailTemplateAdmin
          formValues={formValues}
          cart={cart}
          totalPrice={totalPrice}
          deliveryCharges={deliveryCharges}
          area={localArea}
          orderID={orderID}
        />
      );

      const customerEmailBody = ReactDOMServer.renderToString(
        <EmailTemplateCustomer
          formValues={formValues}
          cart={cart}
          totalPrice={totalPrice}
          deliveryCharges={deliveryCharges}
          area={localArea}
          orderID={orderID}
        />
      );

      const toEmail = await getEmail(encodeURIComponent(localArea)); // Get the email for the specific area
      console.log("localArea: ", localArea);

      await axios.post(`${API_BASE_URL}/email/send/`, {
        to: toEmail,
        subject: "Order: HOD-" + orderID,
        text: adminEmailBody,
      });

      await axios.post(`${API_BASE_URL}/email/send/`, {
        to: formValues.email,
        subject: "Here are your order HOD-" + orderID + " details!",
        text: customerEmailBody,
      });

      console.log("Email sent to: " + toEmail);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/checkout/last`);
        setCart(response.data[0].cart);
        setCharges(response.data[0].price.deliveryCharges);
        setPrice(response.data[0].price.totalPrice);
        setOrderID(response.data[0].orderId);
        setOrderData(response.data[0].formValues);
        if (location.state || location.state.fromUserForm) {
          sendMail(
            response.data[0].formValues,
            response.data[0].cart,
            response.data[0].price.totalPrice,
            response.data[0].price.deliveryCharges,
            localArea,
            response.data[0].orderId
          );
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="success-container">
        <div className="Success-cart-form">
          <h2 className="success-header">Order ID: HOD-{orderID}</h2>
          <div className="user-info">
            <p>Name: {userData.fullName}</p>
            <p>Phone Number: {userData.phoneNum}</p>
            <p>
              Address: {userData.deliveryAddress}, {localArea}
            </p>
          </div>
          {cart.map((item) => (
            <div key={item.title}>
              <Items
                title={item.title}
                quantity={item.quantity}
                price={item.price}
              />
            </div>
          ))}
          <div className="checkout-cart-bill">
            <div className="checkout-cart-total">
              <span>Sub-Total:</span>
              <span>Rs. {totalPrice}</span>
            </div>
            <div className="checkout-cart-total">
              <span>Delivery Fee:</span>
              <span>Rs. {deliveryCharges}</span>
            </div>
            <div className="checkout-cart-total">
              <span className="total">Grand Total:</span>
              <span className="total">Rs. {totalPrice + deliveryCharges}</span>
            </div>
          </div>
          <Link className="back-to-home clickable" to="/">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Home Page
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
