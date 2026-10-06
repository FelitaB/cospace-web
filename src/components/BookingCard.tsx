import Link from "next/link";
import styles from "./BookingCard.module.css";

export interface BookingCardProps {
  desk: string;
  floor: string;
  date: string;
  active: boolean;
}

type BookingCardComponentProps = BookingCardProps & { bookingId?: string };

export default function BookingCard({
  bookingId,
  desk,
  floor,
  date,
  active,
}: BookingCardComponentProps) {
  const card = (
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

  if (!bookingId) {
    return card;
  }

  return (
    <Link className={styles.link} href={`/bookings/${encodeURIComponent(bookingId)}`}>
      {card}
    </Link>
  );
}