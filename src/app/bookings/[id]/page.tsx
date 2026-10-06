import Link from "next/link";
import BookingCard, { type BookingCardProps } from "../../../components/BookingCard";
import styles from "../../page.module.css";

interface DeskBooking extends BookingCardProps {
	id: string;
}

const bookings: DeskBooking[] = [
	{ id: "booking-1", desk: "A12", floor: "1", date: "2026-10-05", active: true },
	{ id: "booking-2", desk: "B08", floor: "2", date: "2026-10-06", active: false },
	{ id: "booking-3", desk: "C03", floor: "3", date: "2026-10-07", active: true },
];

interface BookingDetailsPageProps {
	params: Promise<{ id: string }>;
}

export default async function BookingDetailsPage({
	params,
}: BookingDetailsPageProps) {
	const { id } = await params;
	const booking = bookings.find((item) => item.id === id);

	if (!booking) {
		return (
			<div className={styles.page}>
				<main className={styles.main}>
					<h1>Booking unavailable</h1>
					<p>This desk booking does not exist or has been removed.</p>
					<Link href="/">Return to the home page</Link>
				</main>
			</div>
		);
	}

	const { id: bookingId, ...bookingDetails } = booking;

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<Link href="/">Back to bookings</Link>
				<h1>Booking details</h1>
				<p>Booking ID: {bookingId}</p>
				<BookingCard {...bookingDetails} />
			</main>
		</div>
	);
}
