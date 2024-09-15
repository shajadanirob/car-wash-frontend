// baseApi.ts
import { baseApi } from '../../api/baseApi';

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (newBooking) => ({
        url: 'bookings',
        method: 'POST',
        body: newBooking,
      }),
      invalidatesTags: ['Booking', 'Slot'],
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: 'bookings',
        method: 'GET',
      }),
      providesTags: ['Booking'],
    }),
    getUserBookings: builder.query({
      query: (email) => ({
        url: `bookings/${email}`,
        method: 'GET',
      }),
      providesTags: ['Booking'],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
} = bookingApi;
