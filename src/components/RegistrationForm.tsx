"use client";

import { useId, useRef, useState } from "react";
import type * as React from "react";
import type { BookingCardProps } from "./BookingCard";
import styles from "./RegistrationForm.module.css";

type BookingField = "desk" | "floor" | "date";
type FieldErrors = Partial<Record<BookingField, string>>;

interface RegistrationFormProps {
  onAddBooking: (booking: BookingCardProps) => void;
}

export default function RegistrationForm({ onAddBooking }: RegistrationFormProps) {
  const formId = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const deskInput = useRef<HTMLInputElement>(null);
  const floorInput = useRef<HTMLInputElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);

  function clearFieldError(field: BookingField, value: string) {
    if (!value.trim()) {
      return;
    }

    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const desk = String(formData.get("desk") ?? "").trim();
    const floor = String(formData.get("floor") ?? "").trim();
    const date = String(formData.get("date") ?? "");
    const nextErrors: FieldErrors = {};

    if (!desk) {
      nextErrors.desk = "Enter a desk.";
    }
    if (!floor) {
      nextErrors.floor = "Enter a floor.";
    }
    if (!date) {
      nextErrors.date = "Choose a date.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.desk) {
        deskInput.current?.focus();
      } else if (nextErrors.floor) {
        floorInput.current?.focus();
      } else {
        dateInput.current?.focus();
      }
      return;
    }

    onAddBooking({ desk, floor, date, active: true });
    setErrors({});
    form.reset();
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      aria-label="New desk booking"
      noValidate
    >
      <h2>New booking</h2>
      {Object.keys(errors).length > 0 && (
        <p className={styles.errorSummary} role="alert">
          Please correct the highlighted fields.
        </p>
      )}
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor={`${formId}-desk`}>Desk</label>
          <input
            ref={deskInput}
            id={`${formId}-desk`}
            name="desk"
            type="text"
            required
            aria-invalid={Boolean(errors.desk)}
            aria-describedby={errors.desk ? `${formId}-desk-error` : undefined}
            onChange={(event) => clearFieldError("desk", event.currentTarget.value)}
          />
          {errors.desk && (
            <p className={styles.fieldError} id={`${formId}-desk-error`}>
              {errors.desk}
            </p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${formId}-floor`}>Floor</label>
          <input
            ref={floorInput}
            id={`${formId}-floor`}
            name="floor"
            type="text"
            required
            aria-invalid={Boolean(errors.floor)}
            aria-describedby={errors.floor ? `${formId}-floor-error` : undefined}
            onChange={(event) => clearFieldError("floor", event.currentTarget.value)}
          />
          {errors.floor && (
            <p className={styles.fieldError} id={`${formId}-floor-error`}>
              {errors.floor}
            </p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${formId}-date`}>Date</label>
          <input
            ref={dateInput}
            id={`${formId}-date`}
            name="date"
            type="date"
            required
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? `${formId}-date-error` : undefined}
            onChange={(event) => clearFieldError("date", event.currentTarget.value)}
          />
          {errors.date && (
            <p className={styles.fieldError} id={`${formId}-date-error`}>
              {errors.date}
            </p>
          )}
        </div>
      </div>
      <button type="submit">Add booking</button>
    </form>
  );
}