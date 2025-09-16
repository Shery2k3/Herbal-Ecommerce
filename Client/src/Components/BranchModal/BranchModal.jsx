import { useEffect, useState } from "react";
import "./BranchModal.css";
import { Button, Cascader, Form, Modal, Select } from "antd";
import { useAreaContext } from "../../Pages/Cart/components/localarea.jsx";
import { useCart } from "../Cart/CartContext.jsx";
import logo from "../../../public/images/logo.png";
import { useAreas, useCities } from "../../api/hooks/useArea.js";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BranchModal = ({ hasButton }) => {
  const { cityId, setCityId, localArea, setLocalArea, clearArea } =
    useAreaContext();
  const { clearCart } = useCart();

  const [isOpen, setIsopen] = useState(
    hasButton ? false : cityId && localArea ? false : true
  );
  const [cascaderOpen, setCascaderOpen] = useState(false);
  const [form] = Form.useForm();

  const {
    data: cities,
    isLoading: isLoadingCities,
    error: citiesError,
  } = useCities();

  const {
    data: area,
    isLoading: isLoadingAreas,
    error: areaError,
  } = useAreas(cityId);

  const ChangeArea = (values) => {
    if (values.city) {
      setCityId(values.city);

      // Clear the area when city changes (both context and localStorage)
      clearArea();
      // Clear the cart when city changes
      clearCart();
      // Reset the area field in the form
      form.setFieldValue("area", undefined);
    }
    if (values.area) {
      setLocalArea(values.area);
    }
  };

  const handleCascaderOpen = () => {
    setCascaderOpen(true);
  };

  const handleCascaderClose = () => {
    setCascaderOpen(false);
  };

  // Update form values when cityId or localArea changes
  useEffect(() => {
    form.setFieldsValue({
      city: cityId || undefined,
      area: cityId && localArea ? [localArea] : undefined,
    });
  }, [cityId, localArea, form]);

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

  return (
    <>
      {hasButton && (
        <div
          className="link"
          onClick={() => {
            setIsopen(true);
          }}
        >
          <FontAwesomeIcon icon={faLocationDot} className="cart cart-opener" />
        </div>
      )}
      <Modal
        open={isOpen}
        closable={hasButton ? true : false}
        onCancel={
          hasButton
            ? () => {
                setIsopen(false);
              }
            : undefined
        }
        width={400}
        centered
        footer={null}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="" style={{ width: "150px" }} />
          <h3 className="branch-modal-heading">Please Select Your Area</h3>
        </div>
        <Form form={form} onValuesChange={ChangeArea}>
          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Please Select City",
              },
            ]}
            style={{ marginTop: "16px" }}
          >
            <Select
              placeholder="Please Select City"
              options={cities?.map((c) => ({
                value: c._id,
                label: c.name.charAt(0).toUpperCase() + c.name.slice(1),
              }))}
            />
          </Form.Item>

          <Form.Item
            name="area"
            dependencies={["city"]}
            rules={[
              {
                type: "array",
                required: true,
                message: "Please Select Area",
              },
            ]}
            style={{
              display: cityId && !isLoadingAreas ? "block" : "none",
            }}
          >
            <Cascader
              options={area}
              placeholder="Please Select Area"
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

        {cityId && localArea && (
          <button
            className="area-modal-close-button"
            onClick={() => setIsopen(false)}
          >
            Select
          </button>
        )}
      </Modal>
    </>
  );
};

export default BranchModal;
