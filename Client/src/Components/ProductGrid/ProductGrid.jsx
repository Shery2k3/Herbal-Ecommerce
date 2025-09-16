import ProductCard from "../ProductCard/ProductCard";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";
import styles from "./ProductGrid.module.css";

const ProductGrid = ({ products }) => {
  return (
    <div className={styles.grid}>
      {products
        ? products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        : [1, 2, 3].map((skeletonIndex) => (
            <ProductCardSkeleton key={skeletonIndex} />
          ))}
    </div>
  );
};

export default ProductGrid;
