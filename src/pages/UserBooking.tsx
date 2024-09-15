// UserBookingsPage.tsx
import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/feature/auth/authSlice';
import { useGetUserBookingsQuery } from '../redux/feature/Booking/bookingApi';
// types.ts
export interface TUser {
  userEmail: string;
  // Add other properties if necessary
}

export interface Booking {
  _id: string;
  service: {
    name: string;
  };
  slot: {
    startTime: string;
    endTime: string;
    date: string;
  };
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: string;
  registrationPlate: string;
}

const UserBookingsPage = () => {
  const user = useAppSelector(selectCurrentUser) as TUser; // Cast to TUser
  const { data, isLoading, isError } = useGetUserBookingsQuery(user?.userEmail || '');

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading your bookings.</div>;

  // Ensure `data` is an array
  const bookings: Booking[] = data?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Bookings</h1>
      {bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Plate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking: Booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.service.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Start: {booking.slot.startTime} End: {booking.slot.endTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.slot.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.vehicleType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.vehicleBrand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.vehicleModel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.manufacturingYear}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.registrationPlate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No bookings found.</div>
      )}
    </div>
  );
};

export default UserBookingsPage;
