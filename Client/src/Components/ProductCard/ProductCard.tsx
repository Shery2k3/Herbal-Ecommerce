import { message } from "antd";
import styles from "./ProductCard.module.css";
import { useCart } from "../Cart/CartContext";
import dummy from "/images/dummy.jpg";

const ProductCard = ({ product }) => {
  const { addToCart, totalItems, cart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
  };
  return (
    <div className={styles.card}>
      <div>
        <div className={styles.imageContainer}>
          <img
            // src={product.image}
            src={dummy}
            alt={product.title}
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <button
            className={styles.addButton}
            onClick={() => {
              message.success("Item Added to cart");
              handleAddToCart({
                image: product.image,
                title: product.title,
                price: product.price,
              });
            }}
          >
            Add to Cart
          </button>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.price}>Rs. {product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
