import { baseApi } from '../../api/baseApi';

// Create the API service
export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new booking
    createBooking: builder.mutation({
      query: (newBooking) => ({
        url: 'bookings',
        method: 'POST',
        body: newBooking,
      }),
      invalidatesTags: ['Booking', 'Slot'],
    }),
    // Fetch booking details by ID
    getBookingDetails: builder.query({
      query: (bookingId) => ({
        url: `bookings/${bookingId}`,
        method: 'GET',
      }),
      providesTags: ['Booking'],
    }),
    // Fetch all bookings (admin use)
    getAllBookings: builder.query({
      query: () => ({
        url: 'bookings',
        method: 'GET',
      }),
      providesTags: ['Booking'],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingDetailsQuery,
  useGetAllBookingsQuery,
} = bookingApi;
