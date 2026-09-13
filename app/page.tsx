import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL 환경 변수가 설정되지 않았습니다.");
  }

  const response = await fetch(`${apiBaseUrl}/api/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`상품 목록 조회에 실패했습니다: ${response.status}`);
  }

  const products: Product[] = await response.json();

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
          <Link href="/products/new">상품 등록</Link>
        </div>

        {products.length === 0 ? (
          <p>아직 등록된 상품이 없습니다.</p>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
