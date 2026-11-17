/* 카카오 JS SDK 로더. 키는 NEXT_PUBLIC_KAKAO_JS_KEY 환경변수에서만 읽습니다. */

export const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? "";

const loading = new Map<string, Promise<void>>();

export function loadScript(src: string, attrs: Record<string, string> = {}) {
  if (loading.has(src)) return loading.get(src)!;
  const p = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    s.onload = () => resolve();
    s.onerror = () => {
      loading.delete(src);
      reject(new Error(`script load failed: ${src}`));
    };
    document.head.appendChild(s);
  });
  loading.set(src, p);
  return p;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    kakao?: any;
    Kakao?: any;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function loadKakaoMaps() {
  if (!KAKAO_JS_KEY) throw new Error("NEXT_PUBLIC_KAKAO_JS_KEY 가 없습니다.");
  await loadScript(
    `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(KAKAO_JS_KEY)}&autoload=false`,
  );
  await new Promise<void>((resolve) => window.kakao.maps.load(() => resolve()));
  return window.kakao;
}

const SHARE_SDK = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

export async function loadKakaoShare() {
  if (!KAKAO_JS_KEY) throw new Error("NEXT_PUBLIC_KAKAO_JS_KEY 가 없습니다.");
  await loadScript(SHARE_SDK, { crossorigin: "anonymous" });
  const Kakao = window.Kakao;
  if (!Kakao.isInitialized()) Kakao.init(KAKAO_JS_KEY);
  return Kakao;
}
