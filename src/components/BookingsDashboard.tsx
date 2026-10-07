"use client";

import { useState } from "react";
import type { BookingCardProps } from "./BookingCard";
import BaseModal from "./BaseModal";
import BookingsTable, { type BookingTableItem } from "./BookingsTable";
import styles from "./BookingsDashboard.module.css";

const initialBookings: BookingTableItem[] = [
  { id: "booking-1", desk: "A12", floor: "1", date: "2026-10-05", active: true },
  { id: "booking-2", desk: "B08", floor: "2", date: "2026-10-06", active: false },
  { id: "booking-3", desk: "C03", floor: "3", date: "2026-10-07", active: true },
];

export default function BookingsDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState(initialBookings);

  function handleAddBooking(booking: BookingCardProps) {
    setBookings((currentBookings) => [
      ...currentBookings,
      { ...booking, id: crypto.randomUUID() },
    ]);
  }

  function handleDeleteBooking(id: string) {
    setBookings((currentBookings) =>
      currentBookings.filter((booking) => booking.id !== id),
    );
  }

  return (
    <>
      <header className={styles.pageHeading}>
        <div>
          <p className={styles.eyebrow}>WORKSPACE / OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className={styles.intro}>A clear view of your desk reservations.</p>
        </div>
        <button
          className={styles.modalTrigger}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Create booking
        </button>
      </header>

      <section id="bookings" aria-label="Desk bookings">
        <BookingsTable
          bookings={bookings}
          onDeleteBooking={handleDeleteBooking}
        />
      </section>

      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddBooking={handleAddBooking}
      />
    </>
  );
}