import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCreateBookingMutation } from '../redux/feature/Booking/bookingApi';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { service, selectedSlot, selectedDate } = location.state || {};

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [manufacturingYear, setManufacturingYear] = useState('');
  const [registrationPlate, setRegistrationPlate] = useState('');
  const [errors, setErrors] = useState({});

  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const handlePayNow = async () => {
    // Validate inputs
    if (!userName || !email || !vehicleType || !vehicleBrand || !vehicleModel || !manufacturingYear || !registrationPlate) {
      toast.error('Please fill in all fields');
      return;
    }

    const bookingData = {
      customer: userName,
      email,
      service: service?._id,
      slot: selectedSlot?._id,
      date: selectedDate,
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear: parseInt(manufacturingYear, 10),
      registrationPlate,
    };

    try {
      const response = await createBooking(bookingData).unwrap();
      // Redirect to payment page
      window.location.href = `https://sandbox.aamarpay.com?amount=${service?.price}&transaction_id=${response.transactionId}&currency=BDT&success_url=${encodeURIComponent('http://localhost:3000/success')}&fail_url=${encodeURIComponent('http://localhost:3000/fail')}`;
    } catch (error) {
      console.error('Failed to create booking:', error);
      if (error.data && error.data.err && error.data.err.issues) {
        const errorDetails = error.data.err.issues.reduce((acc, issue) => {
          acc[issue.path[1]] = issue.message;
          return acc;
        }, {});
        setErrors(errorDetails);
      } else {
        toast.error('Failed to create booking');
      }
    }
  };

  if (!service || !selectedSlot || !selectedDate) {
    return <div>Error: Missing booking details</div>;
  }

  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto p-4">
      <div className="md:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-4">{service.name}</h2>
        <p className="mb-4 text-gray-700">{service.description}</p>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Selected Time Slot</h3>
          <p>{selectedDate} - {selectedSlot.startTime} to {selectedSlot.endTime}</p>
        </div>
        {service.image && (
          <div>
            <img src={service.image} alt={service.name} className="rounded-lg shadow-lg w-full" />
          </div>
        )}
      </div>

      <div className="md:w-1/2 p-4">
        <h3 className="text-2xl font-semibold mb-4">User Information</h3>
        <div className="mb-4">
          <label className="block mb-2 font-medium">User Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          {errors.customer && <p className="text-red-500 text-sm">{errors.customer}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Vehicle Type</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          >
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="truck">Truck</option>
            <option value="SUV">SUV</option>
            <option value="van">Van</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="bus">Bus</option>
            <option value="electricVehicle">Electric Vehicle</option>
            <option value="hybridVehicle">Hybrid Vehicle</option>
            <option value="bicycle">Bicycle</option>
            <option value="tractor">Tractor</option>
          </select>
          {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Vehicle Brand</label>
          <input
            type="text"
            value={vehicleBrand}
            onChange={(e) => setVehicleBrand(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          {errors.vehicleBrand && <p className="text-red-500 text-sm">{errors.vehicleBrand}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Vehicle Model</label>
          <input
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          {errors.vehicleModel && <p className="text-red-500 text-sm">{errors.vehicleModel}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Manufacturing Year</label>
          <input
            type="number"
            value={manufacturingYear}
            onChange={(e) => setManufacturingYear(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          {errors.manufacturingYear && <p className="text-red-500 text-sm">{errors.manufacturingYear}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Registration Plate</label>
          <input
            type="text"
            value={registrationPlate}
            onChange={(e) => setRegistrationPlate(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          {errors.registrationPlate && <p className="text-red-500 text-sm">{errors.registrationPlate}</p>}
        </div>
        <button
          onClick={handlePayNow}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition duration-150 w-full"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
