import { wedding } from "@/config/wedding";
import Contacts from "./Contacts";
import styles from "./Greeting.module.css";

export default function Greeting() {
  const { greeting, groom, bride } = wedding;
  return (
    <section className="section" aria-labelledby="greeting-title">
      <div className="reveal">
        <span className="eyebrow">INVITATION</span>
        <h2 id="greeting-title" className="section-title">
          {greeting.title}
        </h2>
        <p className={styles.message}>{greeting.message}</p>
      </div>

      <div className={`${styles.families} reveal`}>
        <FamilyRow
          father={groom.father.name}
          mother={groom.mother.name}
          relation={groom.relation}
          name={groom.firstName}
        />
        <FamilyRow
          father={bride.father.name}
          mother={bride.mother.name}
          relation={bride.relation}
          name={bride.firstName}
        />
      </div>

      <div className="reveal">
        <Contacts />
      </div>
    </section>
  );
}

function FamilyRow(props: { father: string; mother: string; relation: string; name: string }) {
  return (
    <p className={styles.family}>
      <span className={styles.parents}>
        {props.father} <span className={styles.dot}>·</span> {props.mother}
      </span>
      <span className={styles.of}>의 {props.relation}</span>
      <strong className={styles.child}>{props.name}</strong>
    </p>
  );
}
