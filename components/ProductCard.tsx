import type { Product } from "@/types/product";
import Link from "next/link";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
  keyword?: string;
};

export default function ProductCard({ product, keyword = "" }: ProductCardProps) {
  return (
    <Link
      href={{
        pathname: `/products/${product.id}`,
        query: keyword ? { keyword } : {},
      }}
      className={styles.link}
    >
      <article className={styles.card}>
        <p className={styles.location}>{product.location}</p>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>
          {product.price === 0 ? "나눔" : `${product.price.toLocaleString("ko-KR")}원`}
        </p>
      </article>
    </Link>
  );
}
