"use client";

import { wedding } from "@/config/wedding";
import { copyText } from "@/lib/clipboard";
import { KAKAO_JS_KEY, loadKakaoShare } from "@/lib/kakao";
import { toast } from "@/lib/toast";
import styles from "./Share.module.css";

type Props = { siteUrl: string; title: string; description: string };

export default function Share({ siteUrl, title, description }: Props) {
  const pageUrl = () => (typeof window !== "undefined" ? location.origin : siteUrl);

  const shareKakao = async () => {
    if (!KAKAO_JS_KEY) {
      toast("카카오톡 공유 설정이 아직 되지 않았어요.");
      return;
    }
    try {
      const Kakao = await loadKakaoShare();
      const url = pageUrl();
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title,
          description,
          imageUrl: `${siteUrl}${wedding.images.og}`,
          imageWidth: 1200,
          imageHeight: 630,
          link: { mobileWebUrl: url, webUrl: url },
        },
        buttons: [
          { title: "청첩장 보기", link: { mobileWebUrl: url, webUrl: url } },
          {
            title: "위치 보기",
            link: {
              mobileWebUrl: `${url}/#location`,
              webUrl: `${url}/#location`,
            },
          },
        ],
      });
    } catch {
      toast("카카오톡 공유를 불러오지 못했어요.");
    }
  };

  return (
    <section className={`section ${styles.share}`} aria-label="공유하기">
      <div className={`${styles.buttons} reveal`}>
        <button type="button" className={`${styles.btn} ${styles.kakao}`} onClick={shareKakao}>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="currentColor"
              d="M12 3C6.48 3 2 6.47 2 10.75c0 2.77 1.86 5.2 4.66 6.57-.15.52-.97 3.35-1 3.57 0 0-.02.17.09.23.11.07.24.02.24.02.32-.05 3.7-2.43 4.28-2.84.56.08 1.14.12 1.73.12 5.52 0 10-3.47 10-7.75S17.52 3 12 3z"
            />
          </svg>
          카카오톡으로 공유하기
        </button>
        <button
          type="button"
          className={styles.btn}
          onClick={() => copyText(pageUrl(), "청첩장 링크가 복사되었습니다.")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
            <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
          </svg>
          링크 복사하기
        </button>
      </div>
      <p className={styles.footer}>
        {wedding.groom.name} <span aria-hidden>♥</span> {wedding.bride.name}
      </p>
    </section>
  );
}
