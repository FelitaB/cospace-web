import styles from "./BookingCard.module.css";

export interface BookingCardProps {
  desk: string;
  floor: string;
  date: string;
  active: boolean;
}

export default function BookingCard({
  desk,
  floor,
  date,
  active,
}: BookingCardProps) {
  return (
    <article className={styles.card}>
      <h2>Desk {desk}</h2>
      <dl className={styles.details}>
        <div>
          <dt>Floor</dt>
          <dd>{floor}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{date}</dd>
        </div>
      </dl>
      <p className={active ? styles.active : styles.inactive}>
        {active ? "Active" : "Inactive"}
      </p>
    </article>
  );
}