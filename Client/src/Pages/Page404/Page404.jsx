import { useEffect, useRef } from "react";
import "./Page404.css";
import { Link } from "react-router-dom";

const Page404 = () => {
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
    <section ref={sectionRef} className="page-404-section">
      <div className="error-code">404</div>
      
      <h2 className="error-heading">
        <span className="accent">Oops! </span>This Page Got Lost in the Kitchen!
      </h2>

      <p className="error-info">
        Looks like this page wandered off to find some dumplings and never came back! 
        Don't worry though - our delicious menu is still waiting for you. 
        Head back home and let's get you some amazing dumplings to satisfy that hunger!
      </p>

      <Link to="/" className="home-button">
        Back to Home
      </Link>
    </section>
  );
};

export default Page404;