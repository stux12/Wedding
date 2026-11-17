import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 오픈 전 비공개 모드
 *
 * - SITE_OPEN=true            → 모두에게 청첩장 공개
 * - 그 외(기본)                → 방문자에게는 안내 페이지(/coming-soon)를 보여줌
 * - /?preview=<PREVIEW_SECRET> → 이 브라우저에 쿠키를 저장해 청첩장을 볼 수 있게 함
 * - /?preview=off              → 쿠키 삭제 (다른 사람에게 보이는 화면 확인용)
 * - 공개 전에는 /images/* 와 이미지 최적화 경로(/_next/image)도 같은 쿠키가 있어야 열립니다.
 */
const COOKIE = "wedding_preview";

export function proxy(request: NextRequest) {
  if (process.env.SITE_OPEN === "true") return NextResponse.next();

  const secret = process.env.PREVIEW_SECRET;
  const { searchParams } = request.nextUrl;
  const param = searchParams.get("preview");

  if (param !== null) {
    const clean = request.nextUrl.clone();
    clean.searchParams.delete("preview");
    const res = NextResponse.redirect(clean);
    if (param === "off") {
      res.cookies.delete(COOKIE);
    } else if (secret && param === secret) {
      res.cookies.set(COOKIE, secret, {
        httpOnly: true,
        secure: request.nextUrl.protocol === "https:",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return res;
  }

  const allowed = !!secret && request.cookies.get(COOKIE)?.value === secret;
  if (allowed) return NextResponse.next();

  // 공개 전에는 사진도 미리보기 쿠키가 있는 브라우저에서만
  if (request.nextUrl.pathname !== "/") {
    return new NextResponse("Not Found", { status: 404 });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.rewrite(url);
}

export const config = {
  // 메인 페이지와 사진만 막습니다. JS·CSS 등 정적 파일과 안내 페이지는 그대로 통과.
  matcher: ["/", "/images/:path*", "/_next/image"],
};
