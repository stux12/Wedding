"use client";

import { useState } from "react";
import { wedding } from "@/config/wedding";
import type { Person } from "@/config/wedding";
import styles from "./Contacts.module.css";

type Row = { role: string; person: Person; side: "groom" | "bride" };

export default function Contacts() {
  const [open, setOpen] = useState(false);
  const { groom, bride, showParentContacts } = wedding;

  const groomRows: Row[] = [
    { role: "신랑", person: groom, side: "groom" },
    ...(showParentContacts
      ? ([
          { role: "신랑 아버지", person: groom.father, side: "groom" },
          { role: "신랑 어머니", person: groom.mother, side: "groom" },
        ] as Row[])
      : []),
  ];
  const brideRows: Row[] = [
    { role: "신부", person: bride, side: "bride" },
    ...(showParentContacts
      ? ([
          { role: "신부 아버지", person: bride.father, side: "bride" },
          { role: "신부 어머니", person: bride.mother, side: "bride" },
        ] as Row[])
      : []),
  ];

  const rows = [...groomRows, ...brideRows].filter((r) => r.person.phone);
  if (rows.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className="btn"
        aria-expanded={open}
        aria-controls="contact-list"
        onClick={() => setOpen((v) => !v)}
      >
        연락하기 <span className={`${styles.chevron} ${open ? styles.up : ""}`} aria-hidden>⌄</span>
      </button>

      <div id="contact-list" className={`${styles.panel} ${open ? styles.open : ""}`}>
        <div className={styles.inner}>
          <ul className={styles.list}>
            {rows.map((r) => {
              const tel = r.person.phone.replace(/[^0-9+]/g, "");
              return (
                <li key={r.role} className={styles.row}>
                  <span className={`${styles.role} ${styles[r.side]}`}>{r.role}</span>
                  <span className={styles.name}>{r.person.name}</span>
                  <span className={styles.actions}>
                    <a href={`tel:${tel}`} aria-label={`${r.role}에게 전화하기`} className={styles.icon}>
                      <PhoneIcon />
                    </a>
                    <a href={`sms:${tel}`} aria-label={`${r.role}에게 문자하기`} className={styles.icon}>
                      <SmsIcon />
                    </a>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function SmsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
