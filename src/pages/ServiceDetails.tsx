import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; // Assuming you're using 'sonner' for toasts
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useGetAvailableSlotsQuery } from '../redux/feature/slots/slotApi';
import { useGetSingleServicesQuery } from '../redux/feature/service/serviceApi';

interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  isBooked: string;
}

const ServiceDetails: React.FC = () => {
  const { id: serviceId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const { data: serviceData, error: serviceError, isLoading: serviceLoading } = useGetSingleServicesQuery(serviceId);
  const { data: slotsData, error: slotsError, isLoading: slotsLoading } = useGetAvailableSlotsQuery({
    serviceId: serviceId || '',
    date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
  });

  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate, slotsData]);

  const handleSlotClick = (slot: Slot) => {
    if (slot.isBooked === 'BOOKED') {
      toast.error('This slot is already booked');
    } else {
      setSelectedSlot(slot);
    }
  };

  const handleBookService = () => {
    if (!selectedSlot) {
      toast.error('Please select a slot');
      return;
    }
    navigate('/booking', {
      state: {
        service: serviceData?.data,
        selectedSlot,
        selectedDate: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
      },
    });
  };

  if (serviceLoading || slotsLoading) return <div>Loading...</div>;
  if (serviceError || slotsError) return <div>Error loading data</div>;

  const service = serviceData?.data;
  const slots = slotsData?.data || [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{service?.name}</h2>
      <p className="mb-6">{service?.description}</p>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date as Date)}
          className="px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Available Time Slots</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {slots.map((slot: Slot) => (
            <button
              key={slot._id}
              onClick={() => handleSlotClick(slot)}
              disabled={slot.isBooked === 'BOOKED'}
              className={`px-4 py-2 rounded ${
                slot.isBooked === 'BOOKED' ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'
              } transition duration-150`}
            >
              {slot.startTime} - {slot.endTime}
            </button>
          ))}
        </div>
      </div>

      {selectedSlot && (
        <div className="mt-6">
          <button
            onClick={handleBookService}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition duration-150"
          >
            Book This Service
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
