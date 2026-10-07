"use client";

import { useId, useRef, useState } from "react";
import type * as React from "react";
import type { BookingCardProps } from "./BookingCard";
import styles from "./CreateBookingForm.module.css";

type BookingField = "desk" | "floor" | "date";
type FieldErrors = Partial<Record<BookingField, string>>;

interface BookingFormValues {
	desk: string;
	floor: string;
	date: string;
}

interface CreateBookingFormProps {
	onAddBooking: (booking: BookingCardProps) => void;
}

function isValidDate(value: string): boolean {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		return false;
	}

	const [year, month, day] = value.split("-").map(Number);
	const parsedDate = new Date(`${value}T00:00:00`);

	return (
		!Number.isNaN(parsedDate.getTime()) &&
		parsedDate.getFullYear() === year &&
		parsedDate.getMonth() + 1 === month &&
		parsedDate.getDate() === day
	);
}

function isDateInPast(value: string): boolean {
	const selectedDate = new Date(`${value}T00:00:00`);
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return selectedDate < today;
}

function isInteger(value: string): boolean {
	return /^\d+$/.test(value.trim());
}

function validateBooking(values: BookingFormValues): FieldErrors {
	const nextErrors: FieldErrors = {};

	if (values.desk.trim().length < 3) {
		nextErrors.desk = "Desk name must be at least 3 characters long.";
	}
	if (!isInteger(values.floor)) {
		nextErrors.floor = "Floor must be a whole number.";
	}
	if (!isValidDate(values.date)) {
		nextErrors.date = "Enter a valid date.";
	} else if (isDateInPast(values.date)) {
		nextErrors.date = "Date cannot be in the past.";
	}

	return nextErrors;
}

export default function CreateBookingForm({
	onAddBooking,
}: CreateBookingFormProps) {
	const formId = useId();
	const [desk, setDesk] = useState("");
	const [floor, setFloor] = useState("");
	const [date, setDate] = useState("");
	const [errors, setErrors] = useState<FieldErrors>({});
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const deskInput = useRef<HTMLInputElement>(null);
	const floorInput = useRef<HTMLInputElement>(null);
	const dateInput = useRef<HTMLInputElement>(null);

	function clearFieldError(field: BookingField, value: string) {
		const isFieldValid =
			field === "desk"
				? value.trim().length >= 3
				: field === "floor"
					? isInteger(value)
					: isValidDate(value) && !isDateInPast(value);

		if (!isFieldValid) {
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

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (isLoading) {
			return;
		}

		const trimmedDesk = desk.trim();
		const trimmedFloor = floor.trim();
		const nextErrors = validateBooking({
			desk: trimmedDesk,
			floor: trimmedFloor,
			date,
		});

		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			setSuccessMessage("");
			if (nextErrors.desk) {
				deskInput.current?.focus();
			} else if (nextErrors.floor) {
				floorInput.current?.focus();
			} else {
				dateInput.current?.focus();
			}
			return;
		}

		setIsLoading(true);
		setSuccessMessage("");
		await new Promise<void>((resolve) => window.setTimeout(resolve, 2000));

		onAddBooking({ desk: trimmedDesk, floor: trimmedFloor, date, active: true });
		setErrors({});
		setDesk("");
		setFloor("");
		setDate("");
		deskInput.current?.focus();
		setSuccessMessage("Booking created successfully.");
		setIsLoading(false);
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
						className={errors.desk ? styles.invalidInput : undefined}
						value={desk}
						required
						aria-invalid={Boolean(errors.desk)}
						aria-describedby={errors.desk ? `${formId}-desk-error` : undefined}
						onChange={(event) => {
							const value = event.currentTarget.value;
							setDesk(value);
							setSuccessMessage("");
							clearFieldError("desk", value);
						}}
					/>
					{errors.desk && (
						<p
							className={styles.fieldError}
							id={`${formId}-desk-error`}
							aria-live="polite"
						>
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
						inputMode="numeric"
						className={errors.floor ? styles.invalidInput : undefined}
						value={floor}
						required
						aria-invalid={Boolean(errors.floor)}
						aria-describedby={errors.floor ? `${formId}-floor-error` : undefined}
						onChange={(event) => {
							const value = event.currentTarget.value;
							setFloor(value);
							setSuccessMessage("");
							clearFieldError("floor", value);
						}}
					/>
					{errors.floor && (
						<p
							className={styles.fieldError}
							id={`${formId}-floor-error`}
							aria-live="polite"
						>
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
						className={errors.date ? styles.invalidInput : undefined}
						value={date}
						required
						aria-invalid={Boolean(errors.date)}
						aria-describedby={errors.date ? `${formId}-date-error` : undefined}
						onChange={(event) => {
							const value = event.currentTarget.value;
							setDate(value);
							setSuccessMessage("");
							clearFieldError("date", value);
						}}
					/>
					{errors.date && (
						<p
							className={styles.fieldError}
							id={`${formId}-date-error`}
							aria-live="polite"
						>
							{errors.date}
						</p>
					)}
				</div>
			</div>
			{successMessage && (
				<p className={styles.successMessage} role="status" aria-live="polite">
					{successMessage}
				</p>
			)}
			<button type="submit" disabled={isLoading}>
				{isLoading ? "Saving booking..." : "Add booking"}
			</button>
		</form>
	);
}
