/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/feature/auth/authSlice';
import { useGetUserBookingsQuery } from '../redux/feature/Booking/bookingApi';

// Define the type for a booking
interface Booking {
  id: string;
  serviceName: string;
  slot: string;
  date: string;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: string;
  registrationPlate: string;
}

const UserBookingsPage: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);

  // Check if user is null or userEmail is missing
  if (!user || !user.userEmail) {
    return <div>Error: User is not logged in or userEmail is missing.</div>;
  }

  const { data: bookings = [], isLoading, isError } = useGetUserBookingsQuery(user.userEmail);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading bookings.</div>;

  return (
    <div>
      <h1>Your Bookings</h1>
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
            <tr key={booking.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.serviceName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.slot}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
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
  );
};

export default UserBookingsPage;
