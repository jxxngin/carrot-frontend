"use client";

import { Product } from "@/types/product";
import styles from "./page.module.css";

type EditProductFormProps = {
  product: Product;
};

export default function EditProductForm({ product }: EditProductFormProps) {
  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title">제목</label>
        <input id="title" name="title" type="text" defaultValue={product.title} required />
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
          defaultValue={product.price}
          aria-describedby="price-help"
          required
        />
        <small id="price-help">나눔은 0원을 입력해주세요.</small>
      </div>

      <div className={styles.field}>
        <label htmlFor="location">거래 지역</label>
        <input id="location" name="location" type="text" defaultValue={product.location} required />
      </div>

      <button className={styles.submitButton} type="button" disabled>
        수정하기
      </button>
    </form>
  );
}
