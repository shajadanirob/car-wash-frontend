import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useGetAvailableSlotsQuery, useCreateSlotMutation, useUpdateSlotMutation } from '../redux/feature/slots/slotApi';
import { useGetAllServiceQuery } from '../redux/feature/service/serviceApi';


const SlotManagement = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [newSlot, setNewSlot] = useState({ startTime: '', endTime: '' });

  const { data: servicesData } = useGetAllServiceQuery('');
  const { data: slotsData, refetch } = useGetAvailableSlotsQuery({ serviceId: selectedService, date: selectedDate });
  const [createSlot] = useCreateSlotMutation();
  const [updateSlot] = useUpdateSlotMutation();

  useEffect(() => {
    if (selectedService && selectedDate) {
      refetch();
    }
  }, [selectedService, selectedDate, refetch]);

  // Filter out deleted services
  const availableServices = servicesData?.data.filter((service: any) => !service.isDeleted) || [];

  const handleCreateSlot = async () => {
    if (!newSlot.startTime || !newSlot.endTime || !selectedService || !selectedDate) {
      toast.error('Please provide all required fields.');
      return;
    }
    try {
      await createSlot({
        service: selectedService,
        date: selectedDate,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
      }).unwrap();
      toast.success('Slot created successfully');
      setNewSlot({ startTime: '', endTime: '' });
      refetch();
    } catch (err) {
      toast.error('Failed to create slot');
    }
  };

  const handleUpdateSlot = async (id: string, currentStatus: string) => {
    if (currentStatus === 'booked') {
      toast.error('Cannot update a booked slot');
      return;
    }

    const newStatus = currentStatus === 'available' ? 'canceled' : 'available';

    try {
      await updateSlot({ id, isBooked: newStatus }).unwrap();
      toast.success('Slot updated successfully');
      refetch();
    } catch (err) {
      toast.error('Failed to update slot');
    }
  };

  const handleSlotClick = (slotId: string, currentStatus: string) => {
    if (currentStatus === 'booked') {
      toast.error('Cannot update a booked slot');
    } else {
      handleUpdateSlot(slotId, currentStatus);
    }
  };

  const renderSlots = () => {
    if (!slotsData || !slotsData.data.length) {
      return <p>No available slots</p>;
    }
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {slotsData.data.map((slot: any) => (
              <tr key={slot._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{slot.startTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{slot.endTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      slot.isBooked === 'booked' ? 'bg-red-100 text-red-800' : slot.isBooked === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {slot.isBooked.charAt(0).toUpperCase() + slot.isBooked.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleSlotClick(slot._id, slot.isBooked)}
                    disabled={slot.isBooked === 'booked'}
                    className={`px-4 py-2 rounded ${slot.isBooked === 'booked' ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                  >
                    {slot.isBooked === 'available' ? 'Cancel Slot' : 'Reinstate Slot'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Slot Management</h1>

      <div className="mb-4">
        <label className="block mb-2">Select Service:</label>
        <div className="relative">
          <select
            onChange={(e) => setSelectedService(e.target.value)}
            value={selectedService}
            className="block w-full px-4 py-2 border rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a service</option>
            {availableServices.map((service: any) => (
              <option key={service._id} value={service._id}>{service.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Select Date:</label>
        <input
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
          value={selectedDate}
          className="block w-full px-4 py-2 border rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Create Slot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="time"
            placeholder="Start Time"
            value={newSlot.startTime}
            onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
            className="px-4 py-2 border rounded w-full"
          />
          <input
            type="time"
            placeholder="End Time"
            value={newSlot.endTime}
            onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
            className="px-4 py-2 border rounded w-full"
          />
          <button
            onClick={handleCreateSlot}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 w-full md:w-auto"
          >
            Create Slot
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Available Slots</h2>
        {renderSlots()}
      </div>
    </div>
  );
};

export default SlotManagement;
