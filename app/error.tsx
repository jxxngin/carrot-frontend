"use client";

import styles from "./page.module.css";

type ErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorPage({ retry }: ErrorPageProps) {
  return (
    <main className={styles.main}>
      <h1>상품 목록을 불러오지 못했습니다.</h1>
      <p>잠시 후 다시 시도해주세요.</p>
      <button type="button" className={styles.retryButton} onClick={() => retry()}>
        다시 시도
      </button>
    </main>
  );
}
