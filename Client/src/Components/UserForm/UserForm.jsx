import axios from "axios";
import { useState, useEffect } from "react";
import {
  ConfigProvider,
  Form,
  Input,
  Cascader,
  Space,
  Button,
  Radio,
  message,
} from "antd";
import "./UserForm.css";
import { useAreaContext } from "../../Pages/Cart/components/localarea.jsx";
import { useCart } from "../Cart/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../constants";
import { useAreas } from "../../api/hooks/useArea.js";

const UserForm = ({ fetching }) => {
  const [deliveryCharges, SetCharges] = useState();
  const [form] = Form.useForm();
  const { cityId, localArea, setLocalArea } = useAreaContext();
  const { cart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: area,
    isLoading: isLoadingAreas,
    error: areaError,
  } = useAreas(cityId);

  const handleSubmit = async (
    formValues,
    cart,
    totalPrice,
    deliveryCharges,
    localArea
  ) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(`${API_BASE_URL}/checkout/create/`, {
        formValues: formValues,
        cart: cart,
        localArea: localArea,
        price: {
          totalPrice: totalPrice,
          deliveryCharges: deliveryCharges,
        },
      });

      if (response.status === 200) {
        clearCart();
        message.success("Order Placed");
        navigate("Success", { state: { fromUserForm: true } });
      } else {
        message.error("Failed to process order. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to process order. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const ChangeArea = (value) => {
    setLocalArea(value);
  };

  const placeOrder = (values) => {
    if (
      typeof localArea === "undefined" ||
      !localArea ||
      localArea.length === 0
    ) {
      message.error("Please select your area to proceed");
      return;
    }

    if (values.paymentMethod === "Online") {
      handleSubmit(values, cart, totalPrice(), deliveryCharges, localArea);
    } else if (values.paymentMethod === "Cash") {
      handleSubmit(values, cart, totalPrice(), deliveryCharges, localArea);
    }
  };

  return (
    <>
      <div className="user-form">
        <Form
          layout="vertical"
          requiredMark={false}
          onFinish={placeOrder}
          form={form}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Your Name is required",
              },
            ]}
          >
            <Input size="large" placeholder="Full Name" />
          </Form.Item>

          <Space>
            <Form.Item
              className="sub-item"
              label="Mobile Number"
              name="phoneNum"
              rules={[
                {
                  required: true,
                  message: "Please input your mobile number!",
                },
                {
                  pattern: /^03\d{9}$/,
                  message: "Please input a valid mobile number!",
                },
              ]}
            >
              <Input size="large" placeholder="03xxxxxxxxx" maxLength={11} />
            </Form.Item>

            <Form.Item
              className="sub-item"
              label="Alternate Mobile Number"
              name="phoneNumAlternate"
              rules={[
                {
                  required: true,
                  message: "Please input your mobile number!",
                },
                {
                  pattern: /^03\d{9}$/,
                  message: "Please input a valid mobile number!",
                },
              ]}
            >
              <Input size="large" placeholder="03xxxxxxxxx" maxLength={11} />
            </Form.Item>
          </Space>

          <Form.Item
            label="Delivery Address"
            name="deliveryAddress"
            validateTrigger={["onChange", "onBlur"]}
            rules={[
              {
                validator: (_, value) =>
                  value && value.length > 0
                    ? Promise.resolve()
                    : Promise.reject(
                        "Please select your delivery address and area"
                      ),
              },
            ]}
          >
            <Space.Compact className="item">
              <Input size="large" placeholder="Enter Your Complete Address" />
              <Cascader
                onChange={ChangeArea}
                size="large"
                options={area}
                placeholder="Select your area to get delivery price"
                defaultValue={localArea}
                allowClear={false}
              />
            </Space.Compact>
          </Form.Item>

          <Space>
            <Form.Item
              className="sub-item"
              label="Nearest Landmark"
              name="near"
              rules={[
                {
                  required: true,
                  message: "A famous place will help us reach you",
                },
              ]}
            >
              <Input size="large" placeholder="any famouse place nearby" />
            </Form.Item>

            <Form.Item
              className="sub-item"
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Your Email is required",
                },
                {
                  type: "email",
                  message: "Invalid Email",
                },
              ]}
            >
              <Input size="large" placeholder="Enter Your Email" />
            </Form.Item>
          </Space>

          <Form.Item
            label="Delivery Instructions"
            name="instructions"
            rules={[
              {
                message: "Will help us Understand your required",
              },
            ]}
          >
            <Input size="large" placeholder="Delivery Instructions" />
          </Form.Item>

          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            initialValue="Cash"
          >
            <Radio.Group
              onChange={(e) => {
                form.setFieldsValue({ paymentMethod: e.target.value });
              }}
              buttonStyle="solid"
            >
              <Radio.Button value="Cash">Cash</Radio.Button>
              <Radio.Button value="Online" disabled>
                Online Payment
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            disabled={isSubmitting || fetching}
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UserForm;
