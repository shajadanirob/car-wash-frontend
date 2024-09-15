import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),

    register: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userInfo,
      }),
    }),

    updateProfile: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/profile',
        method: 'PUT',
        body: userInfo,
      }),
    }),

    getProfileByEmail: builder.query({
      query: (email) => ({
        url: `/auth/profile/${email}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useUpdateProfileMutation, 
  useGetProfileByEmailQuery 
} = authApi;
