"use client";

import { useState } from "react";
import BookingCard, { type BookingCardProps } from "./BookingCard";
import RegistrationForm from "./RegistrationForm";
import styles from "./BookingList.module.css";

interface DeskBooking extends BookingCardProps {
  id: string;
}

export default function BookingList() {
  const [bookings, setBookings] = useState<DeskBooking[]>([
    { id: "booking-1", desk: "A12", floor: "1", date: "2026-10-05", active: true },
    { id: "booking-2", desk: "B08", floor: "2", date: "2026-10-06", active: false },
    { id: "booking-3", desk: "C03", floor: "3", date: "2026-10-07", active: true },
  ]);
  const [search, setSearch] = useState("");

  function addBooking(booking: BookingCardProps) {
    const newBooking: DeskBooking = { ...booking, id: crypto.randomUUID() };
    setBookings((currentBookings) => [...currentBookings, newBooking]);
    setSearch("");
  }

  const query = search.trim().toLowerCase();
  const visibleBookings = bookings.filter((booking) =>
    [booking.desk, booking.floor, booking.date].some((value) =>
      value.toLowerCase().includes(query),
    ),
  );

  return (
    <section className={styles.list} aria-label="Desk bookings">
      <RegistrationForm onAddBooking={addBooking} />
      <div className={styles.search}>
        <label htmlFor="booking-search">Search bookings</label>
        <input
          id="booking-search"
          type="search"
          placeholder="Desk, floor, or date"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <p className={styles.count} role="status">
        {visibleBookings.length} {visibleBookings.length === 1 ? "booking" : "bookings"}
      </p>
      {visibleBookings.length > 0 ? (
        visibleBookings.map(({ id, ...booking }) => (
          <BookingCard key={id} {...booking} />
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </section>
  );
}