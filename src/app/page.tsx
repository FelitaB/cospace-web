import DashboardWorkspace from "../components/DashboardWorkspace";
import BookingsDashboard from "../components/BookingsDashboard";

export default function Home() {
  return (
    <DashboardWorkspace>
      <BookingsDashboard />
    </DashboardWorkspace>
  );
}
