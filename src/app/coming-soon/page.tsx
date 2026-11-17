import type { Metadata } from "next";
import styles from "./page.module.css";

// 공개 전 링크가 공유돼도 이름·일정이 미리보기에 나오지 않도록 일반 문구 사용
export const metadata: Metadata = {
  title: "모바일 청첩장",
  description: "곧 찾아뵙겠습니다.",
  openGraph: { title: "모바일 청첩장", description: "곧 찾아뵙겠습니다.", images: [] },
  twitter: { title: "모바일 청첩장", description: "곧 찾아뵙겠습니다.", images: [] },
};

export default function ComingSoon() {
  return (
    <main className={`page ${styles.wrap}`}>
      <span className="eyebrow">COMING SOON</span>
      <h1 className={styles.title}>청첩장을 준비하고 있습니다</h1>
      <p className={styles.desc}>
        소중한 분들께 전해드릴
        <br />
        모바일 청첩장을 정성껏 준비 중입니다.
        <br />
        곧 찾아뵙겠습니다.
      </p>
    </main>
  );
}
