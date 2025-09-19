import logo from "../../../public/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../CartState/useCartState";
import BranchModal from "../BranchModal/BranchModal";

const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const { isCartOpen, activateCart, closeCart } = useAppState();

  const activate = () => {
    setActive(!isActive);
  };

  const closeNav = () => {
    setActive(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const nav = document.querySelector("nav");
      if (nav && !nav.contains(event.target)) {
        closeNav();
      }
    };

    document.addEventListener("click", handleOutsideClick);

  return () => {
    document.removeEventListener("click", handleOutsideClick);
  };
}, []);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isActive]);  return (
    <>
      <nav>
        <Link
          onClick={() => {
            closeNav();
            scrollToTop();
          }}
          to="/"
          className="logo-container"
        >
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <ul className={isActive ? "nav-items open" : ""}>
          <li className="nav-item">
            <Link
              className="link"
              onClick={() => {
                closeNav();
                scrollToTop();
              }}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="link"
              onClick={() => {
                closeNav();
                scrollToTop();
              }}
              to="/about-us"
            >
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="link"
              onClick={() => {
                closeNav();
                scrollToTop();
              }}
              to="/contact-us"
            >
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <div
              className="link"
              onClick={() => {
                closeNav();
                activateCart();
              }}
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                className="cart-nav cart-opener"
              />
            </div>
          </li>
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <BranchModal hasButton={true} />

          <div className="link" onClick={activateCart}>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="cart cart-opener"
            />
          </div>
        </div>
        <FontAwesomeIcon icon={faBars} className="menu" onClick={activate} />
      </nav>
    </>
  );
};

export default Navbar;
