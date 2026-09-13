"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { CreateProductState } from "./action-state";
import { createProduct } from "./actions";
import styles from "./page.module.css";

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
        <div className={styles.field}>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="상품 제목을 입력해주세요"
            defaultValue={state.values.title}
            readOnly={pending}
            aria-invalid={Boolean(titleError)}
            aria-describedby={titleError ? "title-error" : undefined}
            required
          />
          {titleError && (
            <p id="title-error" className={styles.error}>
              {titleError}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="price">가격</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            max="2147483647"
            step="1"
            placeholder="0"
            defaultValue={state.values.price}
            readOnly={pending}
            aria-invalid={Boolean(priceError)}
            aria-describedby={priceError ? "price-help price-error" : "price-help"}
            required
          />
          <small id="price-help">나눔은 0원을 입력해주세요.</small>
          {priceError && (
            <p id="price-error" className={styles.error}>
              {priceError}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="location">거래 지역</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="예: 잠실동"
            defaultValue={state.values.location}
            readOnly={pending}
            aria-invalid={Boolean(locationError)}
            aria-describedby={locationError ? "location-error" : undefined}
            required
          />
          {locationError && (
            <p id="location-error" className={styles.error}>
              {locationError}
            </p>
          )}
        </div>

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
