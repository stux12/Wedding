"use client";

import { useEffect, useRef, useState } from "react";
import { TOAST_EVENT } from "@/lib/toast";
import styles from "./Toaster.module.css";

export default function Toaster() {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onToast = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMsg(null), 2000);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  return (
    <div className={`${styles.toast} ${msg ? styles.show : ""}`} role="status" aria-live="polite">
      {msg}
    </div>
  );
}
