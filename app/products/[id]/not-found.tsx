import Link from "next/link";
import styles from "../../page.module.css";

export default function ProductNotFound() {
  return (
    <main className={styles.main}>
      <h1>상품을 찾을 수 없습니다.</h1>
      <p>삭제되었거나 존재하지 않는 상품입니다.</p>
      <Link href="/">상품 목록으로 돌아가기</Link>
    </main>
  );
}
