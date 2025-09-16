// import Banner2 from "../../../public/images/banner.jpg";
import { useEffect } from "react";
import MenuInfo from "../../Components/MenuInfo/MenuInfo";
import AboutSection from "../../Components/AboutSection/AboutSection";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AboutSection />
      <MenuInfo />
    </>
  );
};

export default AboutUs;
