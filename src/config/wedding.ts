/**
 * 청첩장에 들어가는 모든 정보는 이 파일 하나에서 관리합니다.
 * TODO 표시가 있는 값은 실제 정보로 바꿔 주세요.
 *
 * 사진은 /public/images 아래에 두고, 여기에는 /images/... 경로로 적습니다.
 */

export type Person = {
  name: string;
  /** 연락처 (하이픈 포함 가능). 빈 문자열이면 버튼이 표시되지 않습니다. */
  phone: string;
};

export type Account = {
  /** 예: "신랑", "신랑 아버지" */
  label: string;
  holder: string;
  bank: string;
  number: string;
  /** 카카오페이 송금 링크 (선택) */
  kakaoPay?: string;
};

export const wedding = {
  groom: {
    name: "김신랑", // TODO
    firstName: "신랑", // 인사말·공유 문구 등에 쓰는 이름(성 제외) TODO
    phone: "010-0000-0000", // TODO
    relation: "장남", // TODO 장남/차남/아들 등
    father: { name: "김아버지", phone: "010-0000-0000" }, // TODO
    mother: { name: "박어머니", phone: "010-0000-0000" }, // TODO
  },
  bride: {
    name: "이신부", // TODO
    firstName: "신부", // TODO
    phone: "010-0000-0000", // TODO
    relation: "장녀", // TODO
    father: { name: "이아버지", phone: "010-0000-0000" }, // TODO
    mother: { name: "최어머니", phone: "010-0000-0000" }, // TODO
  },

  /** 혼주(양가 부모님) 연락처도 표시할지 */
  showParentContacts: false, // TODO 예/아니오

  /**
   * 예식 일시 (한국 시간). ISO 형식으로 적어 주세요.
   * 예) 2027년 5월 15일 토요일 오후 12시 → "2027-05-15T12:00:00+09:00"
   */
  date: "2027-05-15T12:00:00+09:00", // TODO

  venue: {
    name: "그랜드 웨딩홀", // TODO 예식장 이름
    hall: "3층 그랜드홀", // TODO 층·홀
    address: "서울특별시 중구 세종대로 110", // TODO 도로명 주소
    tel: "02-000-0000", // TODO 예식장 대표번호 (없으면 "")
    /** 지도 표시·길찾기에 쓰는 좌표. 네이버/카카오맵에서 장소를 찍어 확인하세요. */
    lat: 37.5663, // TODO
    lng: 126.9779, // TODO
  },

  /** 오시는 길 안내. 항목을 지우거나 추가해도 됩니다. */
  transport: [
    {
      title: "지하철",
      lines: [
        "1·2호선 시청역 5번 출구 도보 3분", // TODO
      ],
    },
    {
      title: "버스",
      lines: [
        "간선 000, 000 / 지선 0000 — 시청앞 정류장 하차", // TODO
      ],
    },
    {
      title: "주차",
      lines: [
        "건물 지하 주차장 이용 (2시간 무료)", // TODO
        "주차 공간이 협소하니 가급적 대중교통을 이용해 주세요.",
      ],
    },
  ],

  greeting: {
    title: "소중한 분들을 초대합니다",
    // 줄바꿈은 그대로 반영됩니다. TODO
    message: `서로가 마주 보며 다져온 사랑을
이제 함께 한곳을 바라보며
걸어가고자 합니다.

저희 두 사람이 사랑의 이름으로
지켜나갈 수 있도록
앞날을 축복해 주시면
감사하겠습니다.`,
  },

  images: {
    /** 메인 대표 사진 (세로 사진 권장, 약 3:4) */
    main: "/images/main.jpg",
    /** 갤러리 사진. 순서대로 표시됩니다. */
    gallery: [
      "/images/gallery/01.jpg",
      "/images/gallery/02.jpg",
      "/images/gallery/03.jpg",
      "/images/gallery/04.jpg",
      "/images/gallery/05.jpg",
      "/images/gallery/06.jpg",
      "/images/gallery/07.jpg",
      "/images/gallery/08.jpg",
      "/images/gallery/09.jpg",
    ],
    /** 카카오톡/링크 공유 썸네일. 1200x630(가로) 또는 800x800(정사각) 권장, 300KB 이하 */
    og: "/images/og.jpg",
  },

  accounts: {
    groom: [
      { label: "신랑", holder: "김신랑", bank: "OO은행", number: "000-0000-0000-00" }, // TODO
      { label: "신랑 아버지", holder: "김아버지", bank: "OO은행", number: "000-0000-0000-00" },
      { label: "신랑 어머니", holder: "박어머니", bank: "OO은행", number: "000-0000-0000-00" },
    ] as Account[],
    bride: [
      { label: "신부", holder: "이신부", bank: "OO은행", number: "000-0000-0000-00" }, // TODO
      { label: "신부 아버지", holder: "이아버지", bank: "OO은행", number: "000-0000-0000-00" },
      { label: "신부 어머니", holder: "최어머니", bank: "OO은행", number: "000-0000-0000-00" },
    ] as Account[],
  },

  /** 방명록 표시 여부 */
  guestbook: false, // TODO 예/아니오

  share: {
    /**
     * 카카오톡/OG 미리보기 제목·설명.
     * 비워두면 이름·일시·장소로 자동 생성됩니다.
     */
    title: "" as string,
    description: "" as string,
  },
} as const;

export type Wedding = typeof wedding;
