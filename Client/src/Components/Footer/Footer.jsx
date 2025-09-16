import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCopyright,
  faPhone,
  faEnvelope,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../public/images/logo.png";
import techlone from "../../../public/images/techlone.png";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const emailAddress = "herbiya0504@gmail.com";
  const phoneNumber = "+923312909968";

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleContactClick = (contactType) => {
    if (contactType === "email") {
      window.location.href = `mailto:${emailAddress}`;
    } else if (contactType === "phone" && isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else if (contactType === "whatsapp") {
      window.open(`https://wa.me/${phoneNumber}`, "_blank");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer>
        <div className="footer-sections">
          <div className="footer-logo">
            <Link onClick={scrollToTop} to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          <div className="socials-section">
            <h2 className="footer-heading">Follow Us On</h2>
            <div className="socials">
              <a
                href="https://www.facebook.com/share/19XuquS249/"
                target="_"
              >
                <FontAwesomeIcon icon={faFacebookF} className="social" />
              </a>
              <a href="https://www.instagram.com/herbiya0504" target="_">
                <FontAwesomeIcon icon={faInstagram} className="social" />
              </a>
              {/* <a href="https://www.linkedin.com/in/arsal-naeem/" target="_">
                <FontAwesomeIcon icon={faLinkedinIn} className="social" />
              </a> */}
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="social"
                onClick={() => handleContactClick("whatsapp")}
              />
            </div>
          </div>

          <div className="quick-links">
            <h2 className="footer-heading">Quick Links</h2>
            <span>
              <Link className="footer-link" onClick={scrollToTop} to="/">
                <FontAwesomeIcon icon={faArrowRight} /> Home
              </Link>
              <Link
                className="footer-link"
                onClick={scrollToTop}
                to="/about-us"
              >
                <FontAwesomeIcon icon={faArrowRight} /> About Us
              </Link>
              <Link
                className="footer-link"
                onClick={scrollToTop}
                to="/contact-us"
              >
                <FontAwesomeIcon icon={faArrowRight} /> Contact US
              </Link>
              {/* <Link className="footer-link" onClick={scrollToTop} to="/blogs">
                <FontAwesomeIcon icon={faArrowRight} /> Blogs
              </Link> */}
            </span>
          </div>

          <div className="get-in-touch">
            <h2 className="footer-heading">Get in Touch</h2>
            <span>
              <p
                className="footer-link"
                onClick={() => handleContactClick("email")}
              >
                <FontAwesomeIcon icon={faEnvelope} /> {emailAddress}
              </p>
              <p
                className="footer-link"
                onClick={() => handleContactClick("phone")}
              >
                <FontAwesomeIcon icon={faPhone} /> +92 3312909968
              </p>
            </span>
          </div>
        </div>

        <div className="footer-attributes">
          <p className="name">
            Herbiya <FontAwesomeIcon icon={faCopyright} /> All rights
            reserved
          </p>
          <span>
            <p>Powered by: </p>
            <a
              className="credit"
              href="https://arsal-naeem.vercel.app"
              target="_blank"
            >
              Arsal&Shery
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
