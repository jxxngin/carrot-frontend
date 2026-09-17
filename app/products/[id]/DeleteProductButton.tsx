"use client";

import { useActionState } from "react";
import { deleteProduct } from "./delete-actions";
import type { DeleteProductState } from "./delete-state";
import styles from "./DeleteProductButton.module.css";

type DeleteProductButtonProps = {
  productId: number;
  keyword: string;
};

const initialState: DeleteProductState = {
  message: "",
};

export default function DeleteProductButton({ productId, keyword }: DeleteProductButtonProps) {
  const deleteProductWithId = deleteProduct.bind(null, productId, keyword);

  const [state, formAction, pending] = useActionState(deleteProductWithId, initialState);

  return (
    <form
      action={formAction}
      className={styles.form}
      onSubmit={(event) => {
        if (pending) {
          event.preventDefault();
          return;
        }

        if (!window.confirm("이 상품을 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.")) {
          event.preventDefault();
        }
      }}
    >
      <button type="submit" className={styles.button} disabled={pending}>
        {pending ? "삭제 중..." : "상품 삭제"}
      </button>
      <p role="status" className={styles.error}>
        {state.message}
      </p>
    </form>
  );
}
