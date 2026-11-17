"use client";

import { wedding } from "@/config/wedding";
import { copyText } from "@/lib/clipboard";
import { toast } from "@/lib/toast";
import KakaoMap from "./KakaoMap";
import styles from "./Location.module.css";

export default function Location() {
  const { venue, transport } = wedding;
  const name = venue.name;
  const q = encodeURIComponent(name);

  const naverUrl = `https://map.naver.com/p/search/${q}`;
  const kakaoUrl = `https://map.kakao.com/link/to/${q},${venue.lat},${venue.lng}`;

  const openTmap = () => {
    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const params = `goalname=${q}&goalx=${venue.lng}&goaly=${venue.lat}`;

    if (isAndroid) {
      // intent 방식: 앱이 없으면 크롬/카카오톡 인앱이 플레이스토어로 자동 이동
      location.href = `intent://route?${params}#Intent;scheme=tmap;package=com.skt.tmap.ku;end`;
      return;
    }
    if (isIOS) {
      const start = Date.now();
      location.href = `tmap://route?${params}`;
      setTimeout(() => {
        // 앱이 열렸다면 페이지가 백그라운드로 가서 타이머가 늦게 실행됨
        if (!document.hidden && Date.now() - start < 2500) {
          location.href = "https://apps.apple.com/kr/app/id431589174";
        }
      }, 1500);
      return;
    }
    toast("티맵은 모바일에서 이용할 수 있어요.");
  };

  return (
    <section id="location" className="section section-soft" aria-labelledby="location-title">
      <div className="reveal">
        <span className="eyebrow">LOCATION</span>
        <h2 id="location-title" className="section-title">
          오시는 길
        </h2>
        <p className={styles.venue}>
          {venue.name} <span className={styles.hall}>{venue.hall}</span>
        </p>
        <p className={styles.address}>{venue.address}</p>
        {venue.tel && (
          <a className={styles.tel} href={`tel:${venue.tel.replace(/[^0-9]/g, "")}`}>
            Tel. {venue.tel}
          </a>
        )}
      </div>

      <div className={`${styles.mapWrap} reveal`}>
        <KakaoMap lat={venue.lat} lng={venue.lng} name={venue.name} />
      </div>

      <div className={`${styles.navButtons} reveal`}>
        <a className={styles.navBtn} href={naverUrl} target="_blank" rel="noopener noreferrer">
          <span className={`${styles.badge} ${styles.naver}`}>N</span>네이버지도
        </a>
        <a className={styles.navBtn} href={kakaoUrl} target="_blank" rel="noopener noreferrer">
          <span className={`${styles.badge} ${styles.kakao}`}>K</span>카카오맵
        </a>
        <button type="button" className={styles.navBtn} onClick={openTmap}>
          <span className={`${styles.badge} ${styles.tmap}`}>T</span>티맵
        </button>
      </div>

      <button
        type="button"
        className={`btn ${styles.copy} reveal`}
        onClick={() => copyText(venue.address, "주소가 복사되었습니다.")}
      >
        주소 복사하기
      </button>

      <dl className={`${styles.guide} reveal`}>
        {transport.map((t) => (
          <div key={t.title} className={styles.guideItem}>
            <dt>{t.title}</dt>
            {t.lines.map((line) => (
              <dd key={line}>{line}</dd>
            ))}
          </div>
        ))}
      </dl>
    </section>
  );
}
