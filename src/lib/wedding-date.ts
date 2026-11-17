import { wedding } from "@/config/wedding";

const DAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];
const DAYS_EN = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

/** 기기 시간대와 상관없이 한국 시간 기준의 연/월/일/시/분/요일 */
export function kstParts(date: Date) {
  const k = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return {
    year: k.getUTCFullYear(),
    month: k.getUTCMonth() + 1,
    day: k.getUTCDate(),
    hour: k.getUTCHours(),
    minute: k.getUTCMinutes(),
    weekday: k.getUTCDay(),
  };
}

export const weddingDate = new Date(wedding.date);
export const wd = kstParts(weddingDate);

export function formatKoreanTime(hour: number, minute: number) {
  const ampm = hour < 12 ? "오전" : "오후";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${ampm} ${h}시${minute ? ` ${minute}분` : ""}`;
}

/** 예) 2027년 5월 15일 토요일 오후 12시 */
export const dateTextKo = `${wd.year}년 ${wd.month}월 ${wd.day}일 ${DAYS_KO[wd.weekday]}요일 ${formatKoreanTime(wd.hour, wd.minute)}`;

/** 예) 2027. 05. 15. SAT 12:00 PM */
export const dateTextEn = (() => {
  const h12 = wd.hour % 12 === 0 ? 12 : wd.hour % 12;
  const ap = wd.hour < 12 ? "AM" : "PM";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${wd.year}. ${pad(wd.month)}. ${pad(wd.day)}. ${DAYS_EN[wd.weekday]} ${h12}:${pad(wd.minute)} ${ap}`;
})();

export { DAYS_KO, DAYS_EN };
