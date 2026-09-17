import type { Product } from "@/types/product";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../page.module.css";
import DeleteProductButton from "./DeleteProductButton";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    keyword?: string | string[];
  }>;
};

export default async function ProductDetailPage({ params, searchParams }: ProductDetailPageProps) {
  const { id } = await params;
  const query = await searchParams;

  const rawKeyword = query.keyword;
  const keyword = (Array.isArray(rawKeyword) ? rawKeyword[0] : (rawKeyword ?? "")).trim();

  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }

  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL 환경 변수가 설정되지 않았습니다.");
  }

  const response = await fetch(`${apiBaseUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`상품 상세 조회에 실패했습니다: ${response.status}`);
  }

  const product: Product = await response.json();

  return (
    <main className={styles.main}>
      <Link
        href={{
          pathname: "/",
          query: keyword ? { keyword } : {},
        }}
      >
        {keyword ? "← 검색 결과로" : "← 상품 목록으로"}
      </Link>
      <h1>{product.title}</h1>
      <p>{product.location}</p>
      <p>{product.price === 0 ? "나눔" : `${product.price.toLocaleString("ko-KR")}원`}</p>
      <Link href={`/products/${product.id}/edit`}>상품 수정</Link>
      <DeleteProductButton productId={product.id} />
    </main>
  );
}
