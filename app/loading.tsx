import styles from "./page.module.css";

export default function Loading() {
  return (
    <main className={styles.main}>
      <p role="status">상품 목록을 불러오는 중입니다...</p>
    </main>
  );
}
