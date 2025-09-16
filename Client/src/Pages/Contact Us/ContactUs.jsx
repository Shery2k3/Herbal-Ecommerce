import "./ContactUs.css";
import ContactForm from "../../Components/Contact Form/ContactForm";

const ContactUs = () => {
  const emailAddress = "contact@houseofdumplings.info";
  const phoneNumber = "+923456568977";

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleContactClick = (contactType) => {
    if (contactType === "email") {
      window.location.href = `mailto:${emailAddress}`;
    } else if (contactType === "phone" && isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  return (
    <>
      <div className="contact-page">
        <div className="contact-form-section">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
