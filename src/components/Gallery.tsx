"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import styles from "./Gallery.module.css";

const INITIAL_COUNT = 9;

export default function Gallery() {
  const photos = wedding.images.gallery;
  const [expanded, setExpanded] = useState(photos.length <= INITIAL_COUNT);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = expanded ? photos : photos.slice(0, INITIAL_COUNT);

  return (
    <section className="section" aria-labelledby="gallery-title">
      <div className="reveal">
        <span className="eyebrow">GALLERY</span>
        <h2 id="gallery-title" className="section-title">
          우리의 순간
        </h2>
      </div>

      <ul className={`${styles.grid} reveal`}>
        {visible.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              className={styles.thumb}
              onClick={() => setOpenIndex(i)}
              aria-label={`사진 ${i + 1} 크게 보기`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 430px) 33vw, 143px"
                style={{ objectFit: "cover" }}
              />
            </button>
          </li>
        ))}
      </ul>

      {!expanded && (
        <button type="button" className={`btn ${styles.more}`} onClick={() => setExpanded(true)}>
          사진 더보기
        </button>
      )}

      {openIndex !== null && (
        <Lightbox photos={photos} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  );
}

function Lightbox({
  photos,
  startIndex,
  onClose,
}: {
  photos: readonly string[];
  startIndex: number;
  onClose: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(startIndex);
  const closedByPop = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // 처음 연 사진 위치로 즉시 이동
  useEffect(() => {
    const el = trackRef.current;
    if (el) el.scrollLeft = startIndex * el.clientWidth;
  }, [startIndex]);

  // 배경 스크롤 잠금 (iOS Safari 는 overflow:hidden 만으로는 안 되므로 position:fixed 사용)
  useEffect(() => {
    const y = window.scrollY;
    const body = document.body;
    const prev = body.style.cssText;
    body.style.cssText += `;position:fixed;top:-${y}px;left:0;right:0;overflow:hidden;`;
    return () => {
      body.style.cssText = prev;
      window.scrollTo(0, y);
    };
  }, []);

  // 안드로이드/카카오톡 뒤로가기로 닫히도록 history 한 칸 추가
  useEffect(() => {
    history.pushState({ lightbox: true }, "");
    const onPop = () => {
      closedByPop.current = true;
      onCloseRef.current();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const close = useCallback(() => {
    if (!closedByPop.current && history.state?.lightbox) history.back();
    else onCloseRef.current();
  }, []);

  const go = useCallback(
    (next: number) => {
      const el = trackRef.current;
      if (!el) return;
      const i = Math.max(0, Math.min(photos.length - 1, next));
      el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    },
    [photos.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, go, index]);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="사진 크게 보기">
      <div className={styles.topbar}>
        <span className={styles.counter}>
          {index + 1} / {photos.length}
        </span>
        <button type="button" className={styles.close} onClick={close} aria-label="닫기">
          ✕
        </button>
      </div>

      <div ref={trackRef} className={styles.track} onScroll={onScroll}>
        {photos.map((src, i) => (
          <div key={src} className={styles.slide}>
            <Image
              src={src}
              alt={`사진 ${i + 1}`}
              fill
              sizes="(max-width: 430px) 100vw, 430px"
              quality={85}
              loading={Math.abs(i - startIndex) <= 1 ? "eager" : "lazy"}
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>

      {index > 0 && (
        <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => go(index - 1)} aria-label="이전 사진">
          ‹
        </button>
      )}
      {index < photos.length - 1 && (
        <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => go(index + 1)} aria-label="다음 사진">
          ›
        </button>
      )}
    </div>
  );
}
