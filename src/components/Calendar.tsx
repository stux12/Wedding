import { wedding } from "@/config/wedding";
import { wd, dateTextKo, DAYS_KO } from "@/lib/wedding-date";
import Countdown from "./Countdown";
import styles from "./Calendar.module.css";

export default function Calendar() {
  // 예식 달의 1일 요일과 말일 (UTC 로 계산해 시간대 영향 없음)
  const firstWeekday = new Date(Date.UTC(wd.year, wd.month - 1, 1)).getUTCDay();
  const lastDay = new Date(Date.UTC(wd.year, wd.month, 0)).getUTCDate();
  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: lastDay }, (_, i) => i + 1),
  ];

  return (
    <section className="section section-soft" aria-labelledby="calendar-title">
      <div className="reveal">
        <span className="eyebrow">WEDDING DAY</span>
        <h2 id="calendar-title" className="section-title">
          {wd.year}. {String(wd.month).padStart(2, "0")}. {String(wd.day).padStart(2, "0")}
        </h2>
        <p className={styles.when}>{dateTextKo}</p>
      </div>

      <div className={`${styles.calendar} reveal`}>
        <p className={styles.month}>{wd.month}월</p>
        <div className={styles.grid} aria-label={`${wd.year}년 ${wd.month}월 달력`}>
          {DAYS_KO.map((d, i) => (
            <span
              key={d}
             
              className={`${styles.head} ${i === 0 ? styles.sun : ""} ${i === 6 ? styles.sat : ""}`}
            >
              {d}
            </span>
          ))}
          {cells.map((day, idx) => {
            const weekday = idx % 7;
            const isWedding = day === wd.day;
            return (
              <span
                key={idx}
               
                aria-label={isWedding ? `${day}일 예식일` : undefined}
                className={[
                  styles.cell,
                  weekday === 0 ? styles.sun : "",
                  weekday === 6 ? styles.sat : "",
                  isWedding ? styles.active : "",
                ].join(" ")}
              >
                {day ?? ""}
              </span>
            );
          })}
        </div>
      </div>

      <div className="reveal">
        <Countdown
          target={wedding.date}
          groomName={wedding.groom.firstName}
          brideName={wedding.bride.firstName}
        />
      </div>
    </section>
  );
}
