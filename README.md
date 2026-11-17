# 모바일 청첩장

Next.js 16 (App Router) · TypeScript · CSS Modules

- 배포 주소: https://js-wedding-eight.vercel.app (QR 코드에 인쇄된 주소 — **도메인·프로젝트 이름 변경 금지**)
- 배포: Vercel ↔ GitHub `main` 브랜치 연결. `main` 에 push 하면 자동 배포됩니다.

## 내용 수정

- **예식 정보 전부**: `src/config/wedding.ts` 한 파일만 고치면 됩니다. (`TODO` 표시 참고)
- **사진**: `public/images/` 에 넣고 config 의 경로와 맞춰 주세요.
  - `main.jpg` 메인 사진 (세로 3:4 권장)
  - `gallery/01.jpg ...` 갤러리 (개수 자유, config 의 배열 순서대로 표시)
  - `og.jpg` 카카오톡 공유 썸네일 (1200×630, 300KB 이하 권장)
  - 원본이 커도 next/image 가 자동으로 리사이즈·WebP/AVIF 변환합니다. 다만 업로드 전 장변 2000px 정도로 줄여 두면 빌드·배포가 가볍습니다.

## 로컬 실행

```bash
cp .env.example .env.local   # 값 채우기
npm install
npm run dev                  # http://localhost:3000
npm run build                # 배포 전 빌드 확인
```

## 환경변수

| 이름 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 배포 주소 (예: `https://our-wedding.vercel.app`). OG 이미지·카카오 공유 썸네일의 절대 경로에 사용 |
| `NEXT_PUBLIC_KAKAO_JS_KEY` | 카카오 JavaScript 키. 카카오톡 공유 + 카카오맵 지도 |
| `PREVIEW_SECRET` | 오픈 전 미리보기 비밀값 (아래 참고) |
| `SITE_OPEN` | `true` 면 모두에게 공개. 없거나 다른 값이면 안내 페이지 |

키는 코드에 넣지 않고 `.env.local`(로컬)과 Vercel 환경변수로만 관리합니다.

## 오픈 전 비공개 모드

`SITE_OPEN` 이 `true` 가 아니면 방문자에게는 **안내 페이지**(`src/app/coming-soon`)가 보이고,
본인만 실제 청첩장을 볼 수 있습니다. (`src/proxy.ts`)

- 내 기기에서 보기: `https://<주소>/?preview=<PREVIEW_SECRET 값>` 에 한 번 접속 → 그 브라우저에 1년간 기억
  - 휴대폰·PC·카카오톡 인앱 브라우저는 각각 따로 한 번씩 접속해야 합니다.
- 남들에게 보이는 화면 확인: `/?preview=off`
- 환경변수(`PREVIEW_SECRET` 등)를 바꾼 뒤에는 반드시 재배포해야 반영됩니다.
- 정식 공개: Vercel 환경변수 `SITE_OPEN=true` 로 바꾸고 Redeploy
- 공개 전 링크가 공유돼도 미리보기에는 이름·일정이 나오지 않습니다. 공개 후에는 카카오 공유 디버거에서 캐시를 초기화하세요.

## 배포 설정 체크리스트

### 1. Vercel
1. Settings → Git → **Production Branch 가 `main`** 인지 확인
2. Project → Settings → Environment Variables 에 위 값들을 **Production / Preview** 모두 등록
3. 환경변수 추가·변경 후에는 **Redeploy** 해야 반영됩니다 (`NEXT_PUBLIC_*` 는 빌드 시점에 들어감)
4. (선택) Settings → Domains 에서 커스텀 도메인 연결 → `NEXT_PUBLIC_SITE_URL` 도 그 주소로 변경

### 2. 카카오 developers (https://developers.kakao.com)
1. 내 애플리케이션 → 애플리케이션 추가
2. 앱 키 → **JavaScript 키** 복사 → `NEXT_PUBLIC_KAKAO_JS_KEY`
3. 앱 → 플랫폼 → **Web 사이트 도메인**에 등록
   - `https://<프로젝트>.vercel.app` (배포 주소), 커스텀 도메인, `http://localhost:3000`
4. 카카오맵 사용 설정: 제품 설정 → **카카오맵** 활성화 (지도가 회색이면 대부분 이 설정 또는 도메인 미등록)

### 3. 카카오톡 미리보기 갱신
카카오톡은 링크 미리보기를 캐시합니다. 사진·문구를 바꾼 뒤에는
[카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 URL 을 넣고 **캐시 초기화** 하세요.

## 구조

```
src/
  config/wedding.ts      ← 예식 정보 (여기만 수정)
  app/layout.tsx         메타데이터(OG), 폰트
  app/page.tsx           섹션 순서
  components/            Hero, Greeting, Calendar, Gallery, Location, Accounts, Share ...
  lib/                   날짜(KST 고정), 클립보드, 카카오 SDK 로더
```
