import type { Product } from "@/types/product";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.location}>{product.location}</p>
      <h2 className={styles.title}>{product.title}</h2>
      <p className={styles.price}>
        {product.price === 0
          ? "나눔"
          : `${product.price.toLocaleString("ko-KR")}원`}
      </p>
    </article>
  );
}