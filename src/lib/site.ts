import { wedding } from "@/config/wedding";
import { dateTextKo } from "@/lib/wedding-date";

/** 배포 주소. 환경변수가 없으면 Vercel 이 자동 제공하는 도메인을 사용 */
export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const shareTitle =
  wedding.share.title || `${wedding.groom.name} ♥ ${wedding.bride.name} 결혼합니다`;

export const shareDescription =
  wedding.share.description || `${dateTextKo}\n${wedding.venue.name} ${wedding.venue.hall}`;
