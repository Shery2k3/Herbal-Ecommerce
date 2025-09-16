import { useEffect, useRef } from "react";
import about_1 from "../../../public/images/about-01-img.png";
import "./AboutSection.css";

const AboutSection = () => {
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
    <section ref={sectionRef} className="about-section1">
      <img className="resturant-image" src={about_1} alt="" />
      <div className="resturant-info">
        <h2 className="info-heading">HERBIA</h2>
        <div className="info">
          <p>
            It all began when our mother was struggling with hair issues and
            couldn't find a solution that truly worked. After trying countless
            products, she decided to take matters into her own hands and create
            something natural, safe, and effective.
          </p>
          <br />
          <p>
            What started as a simple homemade remedy soon became a game changer.
            The results were so powerful that friends and family began noticing
            the difference and asking for the oil themselves. Word quickly
            spread, and the demand kept growing.
          </p>
          <br />
          <p>
            With love, care, and a vision to help more people feel confident in
            their natural beauty, we decided to bring this product online.
            Today, our brand is more than just an oil—it's a promise of purity,
            trust, and empowerment for everyone seeking real, lasting results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
