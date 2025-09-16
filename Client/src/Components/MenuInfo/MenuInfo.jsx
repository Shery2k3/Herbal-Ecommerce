import { useEffect, useRef } from "react";
import "./MenuInfo.css";
import { Link } from "react-router-dom";

const MenuInfo = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="menu-section">
      <h2 className="info-heading">
        <span className="accent">Ready to Glow? </span>Let Herbia Steal the
        Show!
      </h2>

      <p className="info">
        Step into Herbia, where nature and beauty come together in perfect
        harmony! From nourishing skincare to rejuvenating hair care, our pure
        and powerful products are crafted to bring out your natural radiance.
        Want to shine with confidence? Explore our collection below and begin
        your journey to true beauty, the Herbia way!
      </p>

      <Link to="/" className="menu-button">
        View Products
      </Link>
    </section>
  );
};

export default MenuInfo;
