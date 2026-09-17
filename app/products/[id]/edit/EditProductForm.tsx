"use client";

import ProductFormField from "@/components/ProductFormField";
import styles from "@/styles/ProductForm.module.css";
import { Product } from "@/types/product";
import { useActionState } from "react";
import { updateProduct } from "./action";
import type { UpdateProductState } from "./action-state";

type EditProductFormProps = {
  product: Product;
  keyword: string;
};

export default function EditProductForm({ product, keyword }: EditProductFormProps) {
  const initialState: UpdateProductState = {
    message: "",
    errors: [],
    values: {
      title: product.title,
      price: String(product.price),
      location: product.location,
    },
  };

  const updateProductWithId = updateProduct.bind(null, product.id, keyword);

  const [state, formAction, pending] = useActionState(updateProductWithId, initialState);

  const titleError = state.errors.find((error) => error.field === "title")?.message;
  const priceError = state.errors.find((error) => error.field === "price")?.message;
  const locationError = state.errors.find((error) => error.field === "location")?.message;

  return (
    <form action={formAction} className={styles.form}>
      <ProductFormField
        name="title"
        label="제목"
        defaultValue={state.values.title}
        pending={pending}
        error={titleError}
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
      />

      <p role="status" className={styles.error}>
        {state.message}
      </p>

      <button className={styles.submitButton} type="submit" disabled={pending}>
        {pending ? "수정 중..." : "수정하기"}
      </button>
    </form>
  );
}
