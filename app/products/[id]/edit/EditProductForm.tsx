"use client";

import { Product } from "@/types/product";
import { useActionState } from "react";
import { updateProduct } from "./action";
import type { UpdateProductState } from "./action-state";
import styles from "./page.module.css";

type EditProductFormProps = {
  product: Product;
};

export default function EditProductForm({ product }: EditProductFormProps) {
  const initialState: UpdateProductState = {
    message: "",
    errors: [],
    values: {
      title: product.title,
      price: String(product.price),
      location: product.location,
    },
  };

  const updateProductWithId = updateProduct.bind(null, product.id);

  const [state, formAction, pending] = useActionState(updateProductWithId, initialState);

  const titleError = state.errors.find((error) => error.field === "title")?.message;
  const priceError = state.errors.find((error) => error.field === "price")?.message;
  const locationError = state.errors.find((error) => error.field === "location")?.message;

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          name="title"
          type="text"
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
        {pending ? "수정 중..." : "수정하기"}
      </button>
    </form>
  );
}
