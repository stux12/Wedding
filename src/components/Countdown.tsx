"use client";

import { useEffect, useState } from "react";
import styles from "./Countdown.module.css";

type Props = { target: string; groomName: string; brideName: string };

const DAY = 24 * 60 * 60 * 1000;

function kstDayIndex(ms: number) {
  return Math.floor((ms + 9 * 60 * 60 * 1000) / DAY);
}

export default function Countdown({ target, groomName, brideName }: Props) {
  const targetMs = new Date(target).getTime();
  // 서버 렌더링 시에는 시간이 없으므로 마운트 후에만 표시 (hydration 불일치 방지)
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = now === null ? null : Math.max(0, targetMs - now);
  const units =
    diff === null
      ? null
      : [
          { label: "DAYS", value: Math.floor(diff / DAY) },
          { label: "HOUR", value: Math.floor((diff / 3_600_000) % 24) },
          { label: "MIN", value: Math.floor((diff / 60_000) % 60) },
          { label: "SEC", value: Math.floor((diff / 1000) % 60) },
        ];

  // D-day 는 날짜 기준(한국 시간)으로 계산
  const dday = now === null ? null : kstDayIndex(targetMs) - kstDayIndex(now);

  let message: React.ReactNode = " ";
  if (dday !== null) {
    if (dday > 0)
      message = (
        <>
          {groomName} <span className={styles.heart}>♥</span> {brideName}의 결혼식이{" "}
          <strong>{dday}일</strong> 남았습니다.
        </>
      );
    else if (dday === 0) message = <>오늘은 {groomName} <span className={styles.heart}>♥</span> {brideName}의 결혼식 날입니다.</>;
    else message = <>{groomName} <span className={styles.heart}>♥</span> {brideName}의 결혼식에 와주셔서 감사합니다.</>;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.units} aria-hidden={units === null}>
        {(units ?? [
          { label: "DAYS", value: null },
          { label: "HOUR", value: null },
          { label: "MIN", value: null },
          { label: "SEC", value: null },
        ]).map((u, i) => (
          <div key={u.label} className={styles.unitWrap}>
            {i > 0 && <span className={styles.colon}>:</span>}
            <div className={styles.unit}>
              <span className={styles.label}>{u.label}</span>
              <span className={styles.value}>
                {u.value === null ? "--" : String(u.value).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
