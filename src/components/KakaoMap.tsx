"use client";

import { useEffect, useRef, useState } from "react";
import { KAKAO_JS_KEY, loadKakaoMaps } from "@/lib/kakao";
import styles from "./Location.module.css";

type Props = { lat: number; lng: number; name: string };

export default function KakaoMap({ lat, lng, name }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "ready" | "error">(KAKAO_JS_KEY ? "idle" : "error");

  useEffect(() => {
    const el = ref.current;
    if (!el || !KAKAO_JS_KEY) return;
    let cancelled = false;

    const init = async () => {
      try {
        const kakao = await loadKakaoMaps();
        if (cancelled) return;
        const center = new kakao.maps.LatLng(lat, lng);
        const map = new kakao.maps.Map(el, { center, level: 3 });
        // 페이지 스크롤이 지도에 걸리지 않도록 드래그·확대 비활성화
        map.setDraggable(false);
        map.setZoomable(false);
        new kakao.maps.Marker({ position: center, map, title: name });
        const relayout = () => {
          map.relayout();
          map.setCenter(center);
        };
        window.addEventListener("resize", relayout);
        setStatus("ready");
        cleanup = () => window.removeEventListener("resize", relayout);
      } catch {
        if (!cancelled) setStatus("error");
      }
    };
    let cleanup = () => {};

    // 지도 근처까지 스크롤했을 때만 SDK 를 불러옴
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          init();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      cleanup();
    };
  }, [lat, lng, name]);

  return (
    <div className={styles.map}>
      <div ref={ref} className={styles.mapCanvas} aria-label={`${name} 위치 지도`} role="img" />
      {status === "error" && (
        <div className={styles.mapFallback}>
          지도를 불러오지 못했어요.
          <br />
          아래 버튼으로 지도 앱에서 확인해 주세요.
        </div>
      )}
    </div>
  );
}
