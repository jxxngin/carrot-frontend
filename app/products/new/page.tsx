import Link from "next/link";
import styles from "./page.module.css";

export default function NewProductPage() {
  return (
    <main className={styles.main}>
      <Link href="/">← 상품 목록으로</Link>
      <h1>상품 등록</h1>

      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="상품 제목을 입력해주세요"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="price">가격</label>
          <input id="price" name="price" type="number" min="0" step="1" placeholder="0" required />
          <small>나눔은 0원을 입력해주세요.</small>
        </div>

        <div className={styles.field}>
          <label htmlFor="location">거래 지역</label>
          <input id="location" name="location" type="text" placeholder="예: 잠실동" required />
        </div>

        <button className={styles.submitButton} type="button" disabled>
          등록하기
        </button>
      </form>
    </main>
  );
}
