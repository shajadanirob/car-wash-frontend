// src/redux/feature/slots/slotApi.ts
import { baseApi } from '../../api/baseApi';

// Create the API service
export const slotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch available slots for a service on a specific date
    getAvailableSlots: builder.query({
      query: ({ serviceId, date }) => ({
        url: 'slots/availability',
        method: 'GET',
        params: { serviceId, date },
      }),
      providesTags: ['Slot'],
    }),
    // Create a new slot
    createSlot: builder.mutation({
      query: (newSlot) => ({
        url: '/slots',
        method: 'POST',
        body: newSlot,
      }),
      invalidatesTags: ['Slot'],
    }),
    // Update a slot
    updateSlot: builder.mutation({
      query: ({ id, isBooked }) => ({
        url: `/slots/${id}`,
        method: 'PATCH',
        body: { isBooked },
      }),
      invalidatesTags: ['Slot'],
    }),
  }),
});

export const {
  useGetAvailableSlotsQuery,
  useCreateSlotMutation,
  useUpdateSlotMutation,
} = slotsApi;
