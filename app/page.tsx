import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";
import styles from "./page.module.css";

const products: Product[] = [
  {
    id: 1,
    title: "원목 책상",
    price: 25000,
    location: "역삼동",
  },
  {
    id: 2,
    title: "무선 키보드",
    price: 15000,
    location: "잠실동",
  },
  {
    id: 3,
    title: "책꽂이 나눔",
    price: 0,
    location: "서초동",
  },
];

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.brand}>당근 클론</span>
          <span className={styles.sectionLabel}>중고거래</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>중고거래 상품</h1>
          <p>총 {products.length}개</p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}
