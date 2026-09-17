import styles from "@/styles/ProductForm.module.css";
import type { Product } from "@/types/product";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditProductForm from "./EditProductForm";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    keyword?: string | string[];
  }>;
};

export default async function EditProductPage({ params, searchParams }: EditProductPageProps) {
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
    throw new Error(`상품 조회에 실패했습니다: ${response.status}`);
  }

  const product: Product = await response.json();

  return (
    <main className={styles.main}>
      <Link
        href={{
          pathname: `/products/${product.id}`,
          query: keyword ? { keyword } : {},
        }}
      >
        ← 상품 상세로
      </Link>
      <h1>상품 수정</h1>
      <EditProductForm product={product} keyword={keyword} />
    </main>
  );
}
