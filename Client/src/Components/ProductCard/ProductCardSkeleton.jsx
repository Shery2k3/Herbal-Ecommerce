import styles from "./ProductCardSkeleton.module.css";

const ProductCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <div className={styles.imageSkeleton}></div>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.buttonSkeleton}></div>
          <div className={styles.titleSkeleton}></div>
          <div className={styles.priceSkeleton}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;