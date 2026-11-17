import type { Metadata, Viewport } from "next";
import styles from "./page.module.css";

/**
 * 오픈 전 안내 페이지.
 * 기존에 js-wedding-eight.vercel.app 에 올려 두었던 안내 페이지와 같은 문구·디자인입니다.
 * 공개 전 링크가 공유돼도 이름·일정이 미리보기에 나오지 않도록 일반 문구만 사용합니다.
 */
export const metadata: Metadata = {
  title: "모바일 청첩장",
  description: "모바일 청첩장 준비중입니다.",
  robots: { index: false, follow: false },
  openGraph: { type: "website", title: "모바일 청첩장", description: "모바일 청첩장 준비중입니다.", images: [] },
  twitter: { card: "summary", title: "모바일 청첩장", description: "모바일 청첩장 준비중입니다.", images: [] },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
};

export default function ComingSoon() {
  return (
    <main className={styles.main}>
      <section className={styles.frame}>
        <p className={styles.label}>WEDDING INVITATION</p>
        <div className={styles.divider}>
          <span className={styles.diamond} />
        </div>
        <h1 className={styles.title}>
          모바일 청첩장
          <br />
          준비중입니다.
        </h1>
        <p className={styles.sub}>곧 예쁜 모습으로 찾아뵙겠습니다.</p>
        <div className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}
