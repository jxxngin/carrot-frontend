"use client";

import ProductFormField from "@/components/ProductFormField";
import styles from "@/styles/ProductForm.module.css";
import Link from "next/link";
import { useActionState } from "react";
import type { CreateProductState } from "./action-state";
import { createProduct } from "./actions";

const initialState: CreateProductState = {
  message: "",
  errors: [],
  values: {
    title: "",
    price: "",
    location: "",
  },
};

export default function NewProductPage() {
  const [state, formAction, pending] = useActionState(createProduct, initialState);

  const titleError = state.errors.find((error) => error.field === "title")?.message;
  const priceError = state.errors.find((error) => error.field === "price")?.message;
  const locationError = state.errors.find((error) => error.field === "location")?.message;

  return (
    <main className={styles.main}>
      <Link href="/">← 상품 목록으로</Link>
      <h1>상품 등록</h1>

      <form action={formAction} className={styles.form}>
        <ProductFormField
          name="title"
          label="제목"
          defaultValue={state.values.title}
          pending={pending}
          error={titleError}
          placeholder="상품 제목을 입력해주세요"
        />

        <ProductFormField
          name="price"
          label="가격"
          type="number"
          min={0}
          max={2147483647}
          step={1}
          defaultValue={state.values.price}
          pending={pending}
          error={priceError}
          helpText="나눔은 0원을 입력해주세요."
        />

        <ProductFormField
          name="location"
          label="거래 지역"
          defaultValue={state.values.location}
          pending={pending}
          error={locationError}
          placeholder="예: 잠실동"
        />

        <p role="status" className={styles.error}>
          {state.message}
        </p>

        <button className={styles.submitButton} type="submit" disabled={pending}>
          {pending ? "등록 중..." : "등록하기"}
        </button>
      </form>
    </main>
  );
}
