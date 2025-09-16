import { useState, useEffect } from "react";
import { Tabs } from "antd";
import BranchModal from "../../Components/BranchModal/BranchModal.jsx";
import "./Home.css";
import { useCart } from "../../Components/Cart/CartContext.jsx";
import ShowCart from "../../Components/Show Cart/ShowCart.jsx";
import banner2 from "../../../public/images/banner.png";
import { useAreaContext } from "../../Pages/Cart/components/localarea.jsx";
import { useCategories } from "../../api/hooks/useMenu.js";
import ProductGrid from "../../Components/ProductGrid/ProductGrid.jsx";
import Banner2 from "../../Components/Banner/Banner2.jsx";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const carouselSettings = {
  dots: false,
  autoplaySpeed: 2000,
  slidesToScroll: 1,
  waitForAnimate: true,
};

const { TabPane } = Tabs;

const Home = () => {
  const { totalItems } = useCart();
  const { cityId } = useAreaContext();

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useCategories();

  const [activeTab, setActiveTab] = useState("");

  // Reset activeTab when city changes to ensure fresh category selection
  useEffect(() => {
    setActiveTab(""); // Reset tab when city changes
  }, []);

  // Set the first category as active tab when categoriesData is loaded
  useEffect(() => {
    if (categoriesData && categoriesData.length > 0 && !activeTab) {
      setActiveTab(categoriesData[0]?.category);
    }
  }, [categoriesData, activeTab]);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <>
      {<BranchModal />}
      {totalItems() !== 0 && <ShowCart />}

      <Banner2 img={banner2} />

      {/* {categoriesData && (
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          className="tab-menu"
        >
          {categoriesData &&
            categoriesData
              .filter((category) => category.items && category.items.length > 0)
              .map((category) => (
                <TabPane
                  tab={category?.category}
                  key={category?.category}
                  className="tab-item"
                />
              ))}
        </Tabs>
      )} */}
      <div className="food-menu">
        {!isLoadingCategories && cityId ? (
          categoriesData &&
          categoriesData
            .filter(
              (category) =>
                // category.category === activeTab &&
                category.items && category.items.length > 0
            )
            .map((category) => (
              <div key={category.category} className="catagory-section">
                <h2
                  style={{
                    color: "var(--primary)",
                    textAlign: "center",
                    fontFamily: "var(--font-accent)",
                    fontWeight: "800",
                    fontSize: "4rem",
                  }}
                >
                  {category?.category}
                </h2>
                <div className="catagory">
                  <ProductGrid products={category.items} />
                </div>
              </div>
            ))
        ) : (
          <div className="catagory-section">
            <h2
              style={{
                color: "var(--primary)",
                textAlign: "center",
                fontFamily: "var(--font-accent)",
                fontWeight: "800",
                fontSize: "4rem",
              }}
            >
              Menu
            </h2>
            <div className="catagory">
              <ProductGrid />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
