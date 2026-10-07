import styles from "./BookingsTable.module.css";

export interface BookingTableItem {
  id: string;
  desk: string;
  floor: string;
  date: string;
  active: boolean;
}

interface BookingsTableProps {
  bookings: BookingTableItem[];
  onDeleteBooking: (id: string) => void;
}

export default function BookingsTable({
  bookings,
  onDeleteBooking,
}: BookingsTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <caption className={styles.caption}>Desk bookings</caption>
        <thead>
          <tr>
            <th scope="col">Desk</th>
            <th scope="col">Floor</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col"><span className={styles.visuallyHidden}>Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.desk}</td>
              <td>{booking.floor}</td>
              <td>{booking.date}</td>
              <td>
                <span
                  className={
                    booking.active ? styles.active : styles.inactive
                  }
                >
                  {booking.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <button
                  className={styles.deleteButton}
                  type="button"
                  aria-label={`Delete booking for desk ${booking.desk}`}
                  onClick={() => onDeleteBooking(booking.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}