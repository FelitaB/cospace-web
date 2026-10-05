"use client";

import { useId, useState } from "react";
import type * as React from "react";
import type { BookingCardProps } from "./BookingCard";
import styles from "./RegistrationForm.module.css";

interface RegistrationFormProps {
  onAddBooking: (booking: BookingCardProps) => void;
}

export default function RegistrationForm({ onAddBooking }: RegistrationFormProps) {
  const formId = useId();
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const desk = String(formData.get("desk") ?? "").trim();
    const floor = String(formData.get("floor") ?? "").trim();
    const date = String(formData.get("date") ?? "");

    if (!desk || !floor || !date) {
      setError("Enter a desk, floor, and date.");
      return;
    }

    onAddBooking({ desk, floor, date, active: true });
    setError("");
    form.reset();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label="New desk booking">
      <h2>New booking</h2>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor={`${formId}-desk`}>Desk</label>
          <input id={`${formId}-desk`} name="desk" type="text" required />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${formId}-floor`}>Floor</label>
          <input id={`${formId}-floor`} name="floor" type="text" required />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${formId}-date`}>Date</label>
          <input id={`${formId}-date`} name="date" type="date" required />
        </div>
      </div>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Add booking</button>
    </form>
  );
}