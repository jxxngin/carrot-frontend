import ProductCard from "@/components/ProductCard";
import { normalizeKeyword, normalizePage } from "@/lib/product-search";
import actionStyles from "@/styles/ActionLink.module.css";
import type { ProductPageResponse } from "@/types/product";
import Link from "next/link";
import styles from "./page.module.css";

type HomeProps = {
  searchParams: Promise<{
    keyword?: string | string[];
    page?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const keyword = normalizeKeyword(params.keyword);
  const currentPage = normalizePage(params.page);

  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL 환경 변수가 설정되지 않았습니다.");
  }

  const apiUrl = new URL(`${apiBaseUrl}/api/products`);

  apiUrl.searchParams.set("page", String(currentPage - 1));
  apiUrl.searchParams.set("size", "6");

  if (keyword) {
    apiUrl.searchParams.set("keyword", keyword);
  }

  const response = await fetch(apiUrl, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`상품 목록 조회에 실패했습니다: ${response.status}`);
  }

  const productPage: ProductPageResponse = await response.json();
  const products = productPage.content;

  function pageHref(page: number) {
    return {
      pathname: "/",
      query: keyword ? { keyword, page } : { page },
    };
  }

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
            <Link href="/" className={actionStyles.secondary}>
              전체 보기
            </Link>
          </div>
        </form>

        <div className={styles.heading}>
          <h1>중고거래 상품</h1>
          <p>
            {keyword ? `"${keyword}" 검색 결과` : "전체 상품"} · 총 {productPage.totalElements}개
          </p>
          <Link href="/products/new" className={actionStyles.primary}>
            + 상품 등록
          </Link>
        </div>

        {products.length === 0 ? (
          <p>
            {productPage.totalElements > 0
              ? "이 페이지에는 상품이 없습니다. 이전 페이지로 이동해주세요."
              : keyword
                ? `"${keyword}"에 해당하는 상품이 없습니다.`
                : "아직 등록된 상품이 없습니다."}
          </p>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} keyword={keyword} />
            ))}
          </div>
        )}

        {(productPage.totalPages > 0 || currentPage > 1) && (
          <nav className={styles.pagination} aria-label="상품 목록 페이지">
            {currentPage > 1 && (
              <Link
                href={pageHref(Math.min(currentPage - 1, Math.max(productPage.totalPages, 1)))}
                className={actionStyles.secondary}
              >
                이전
              </Link>
            )}

            <span aria-current="page">
              {currentPage}페이지 / 총 {productPage.totalPages}페이지
            </span>

            {productPage.hasNext && (
              <Link href={pageHref(currentPage + 1)} className={actionStyles.secondary}>
                다음
              </Link>
            )}
          </nav>
        )}
      </main>
    </>
  );
}
