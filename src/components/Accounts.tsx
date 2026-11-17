"use client";

import { useState } from "react";
import { wedding } from "@/config/wedding";
import type { Account } from "@/config/wedding";
import { copyText } from "@/lib/clipboard";
import styles from "./Accounts.module.css";

export default function Accounts() {
  const { groom, bride } = wedding.accounts;
  return (
    <section className="section" aria-labelledby="accounts-title">
      <div className="reveal">
        <span className="eyebrow">ACCOUNT</span>
        <h2 id="accounts-title" className="section-title">
          마음 전하실 곳
        </h2>
        <p className={styles.desc}>
          참석이 어려우신 분들을 위해
          <br />
          계좌번호를 기재하였습니다.
          <br />
          너그러운 마음으로 양해 부탁드립니다.
        </p>
      </div>

      <div className={`${styles.groups} reveal`}>
        {groom.length > 0 && <Group id="groom" title="신랑측 계좌번호" accounts={groom} />}
        {bride.length > 0 && <Group id="bride" title="신부측 계좌번호" accounts={bride} />}
      </div>
    </section>
  );
}

function Group({ id, title, accounts }: { id: string; title: string; accounts: Account[] }) {
  const [open, setOpen] = useState(false);
  const panelId = `accounts-${id}`;
  return (
    <div className={styles.group}>
      <button
        type="button"
        className={`${styles.header} ${styles[id]}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <svg
          className={`${styles.chevron} ${open ? styles.up : ""}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div id={panelId} className={`${styles.panel} ${open ? styles.open : ""}`}>
        <div className={styles.inner}>
          <ul className={styles.list}>
            {accounts.map((a) => (
              <li key={`${a.label}-${a.number}`} className={styles.item}>
                <div className={styles.info}>
                  <p className={styles.label}>
                    {a.label} <span className={styles.holder}>{a.holder}</span>
                  </p>
                  <p className={styles.number}>
                    {a.bank} {a.number}
                  </p>
                </div>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.copy}
                    onClick={() =>
                      copyText(`${a.bank} ${a.number.replace(/[^0-9]/g, "")}`, "계좌번호가 복사되었습니다.")
                    }
                    aria-label={`${a.label} 계좌번호 복사`}
                  >
                    복사
                  </button>
                  {a.kakaoPay && (
                    <a className={styles.pay} href={a.kakaoPay} target="_blank" rel="noopener noreferrer">
                      pay
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
