import Image from "next/image";
import { wedding } from "@/config/wedding";
import { dateTextKo, dateTextEn } from "@/lib/wedding-date";
import styles from "./Hero.module.css";

export default function Hero() {
  const { groom, bride, venue, images } = wedding;
  return (
    <header className={styles.hero}>
      <p className={styles.date}>{dateTextEn}</p>
      <div className={styles.photo}>
        <Image
          src={images.main}
          alt={`${groom.name}, ${bride.name} 웨딩 사진`}
          fill
          preload
          quality={85}
          sizes="(max-width: 430px) 100vw, 430px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <h1 className={styles.names}>
        <span>{groom.name}</span>
        <span className={styles.amp} aria-label="그리고">
          &amp;
        </span>
        <span>{bride.name}</span>
      </h1>
      <p className={styles.info}>
        {dateTextKo}
        <br />
        {venue.name} {venue.hall}
      </p>
    </header>
  );
}
