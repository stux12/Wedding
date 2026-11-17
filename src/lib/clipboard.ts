import { toast } from "@/lib/toast";

/**
 * 클립보드 복사. 카카오톡 인앱 브라우저·구형 iOS 처럼 navigator.clipboard 가
 * 막혀 있는 환경을 위해 execCommand 방식으로 한 번 더 시도합니다.
 */
export async function copyText(text: string, successMessage = "복사되었습니다.") {
  let ok = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      ok = true;
    }
  } catch {
    ok = false;
  }
  if (!ok) ok = legacyCopy(text);
  toast(ok ? successMessage : "복사에 실패했어요. 길게 눌러 직접 복사해 주세요.");
  return ok;
}

function legacyCopy(text: string) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  // iOS 에서 화면이 확대·스크롤되지 않도록
  ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;font-size:16px;";
  document.body.appendChild(ta);
  const range = document.createRange();
  range.selectNodeContents(ta);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
  ta.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  sel?.removeAllRanges();
  document.body.removeChild(ta);
  return ok;
}
