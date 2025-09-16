import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import discount from "../../../public/images/discount.webp";
import "./DiscountModal.css";

const DiscountModal = () => {
  const [isActive, setIsActive] = useState(true);

  const handleClose = () => {
    setIsActive(false);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("discount-modal-container")) {
      handleClose();
    }
  };

  useEffect(() => {
    if (!isActive) {
      setTimeout(() => {
        document.querySelector(".discount-modal-container").style.display = "none";
      }, 500); // Matches the duration of the fade-out effect
    }
  }, [isActive]);

  return (
    <div
      className={`discount-modal-container ${isActive ? "active" : "inactive"}`}
      onClick={handleClickOutside}
    >
      <div className="discount-modal">
        <FontAwesomeIcon className="modal-closer" icon={faX} onClick={handleClose} />
        <img src={discount} alt="" />
      </div>
    </div>
  );
};

export default DiscountModal;
