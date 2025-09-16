import "./Loader.css";
import logo from "../../../public/images/logo.png";
import techlone from "../../../public/images/techlone.png";

const Loader = () => {
  return (
    <>
      <div className="pre-loader">
        <div className="logo-section">
          <img className="" src={logo} alt="" />
          <h2>Herbia Logo</h2>
        </div>
        <div className="credit-section">
          <p>powered by</p>
          <img src={techlone} alt="" />
        </div>
      </div>
    </>
  );
};

export default Loader;
