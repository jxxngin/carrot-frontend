import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";
import Link from "next/link";
import styles from "./page.module.css";

type HomeProps = {
  searchParams: Promise<{
    keyword?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const rawKeyword = params.keyword;
  const keyword = (Array.isArray(rawKeyword) ? rawKeyword[0] : (rawKeyword ?? "")).trim();

  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL 환경 변수가 설정되지 않았습니다.");
  }

  const apiUrl = new URL(`${apiBaseUrl}/api/products`);

  if (keyword) {
    apiUrl.searchParams.set("keyword", keyword);
  }

  const response = await fetch(apiUrl, {
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
        <form action="/" method="get" className={styles.searchForm} role="search">
          <label htmlFor="keyword">상품 제목 검색</label>

          <div className={styles.searchControls}>
            <input
              key={keyword}
              id="keyword"
              name="keyword"
              type="search"
              defaultValue={keyword}
              placeholder="예: 키보드"
            />
            <button type="submit">검색</button>
            <Link href="/">전체 보기</Link>
          </div>
        </form>

        <div className={styles.heading}>
          <h1>중고거래 상품</h1>
          <p>
            {keyword ? `"${keyword}" 검색 결과` : "전체 상품"} · 총 {products.length}개
          </p>
          <Link href="/products/new">상품 등록</Link>
        </div>

        {products.length === 0 ? (
          <p>
            {keyword ? `"${keyword}"에 해당하는 상품이 없습니다.` : "아직 등록된 상품이 없습니다."}
          </p>
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
