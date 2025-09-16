import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Menu/Home";
import AboutUs from "./Pages/About Us/AboutUS";
import ContactUs from "./Pages/Contact Us/ContactUs";
import Cart from "./Pages/Cart/Cart";
import ShowCart from "./Components/Show Cart/ShowCart";
import Blog from "./Pages/Blog/Blog";
import CheckOut from "./Pages/Check Out/CheckOut.jsx";
import Success from "./Pages/Success/Success.jsx";
import Page404 from "./Pages/Page404/Page404.jsx";
import BlogPage from "./Pages/BlogPage/BlogPage.jsx";
import "./App.css";
import { useCart } from "./Components/Cart/CartContext.jsx";

function App() {
  const [count, setCount] = useState(0);
  const { totalItems } = useCart();
  const location = useLocation();

  const allowedRoutes = ["/", "/about-us", "/contact-us", "/blogs"];
  const showCartAllowedRoutes = ["/",];

  // Check if the current route is in the allowedRoutes array
  const isAllowedRoute = allowedRoutes.includes(location.pathname);
  const isShowCartRoute = showCartAllowedRoutes.includes(location.pathname);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <>
      {isAllowedRoute && <Navbar />}
      {isShowCartRoute && totalItems() !== 0 && <ShowCart />}

      <Cart />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        {/* <Route path="blogs" element={<Blog />} />
                <Route path="/blogs/:id" element={<BlogPage />} /> */}
        <Route path="checkout" element={<CheckOut />} />
        <Route path="/checkout/Success" element={<Success />} />
        <Route path="*" element={<Page404 />} />
      </Routes>

      {isAllowedRoute && <Footer />}
    </>
  );
}

export default App;
