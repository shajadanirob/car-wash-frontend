/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setUser } from '../feature/auth/authSlice';

// Define the base query
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://assignment-three-two-ruddy.vercel.app/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Define the base query with token refresh logic
const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (arg, api, extraOptions): Promise<any> => {
  let result = await baseQuery(arg, api, extraOptions);
  console.log(result);

  if (result?.error?.status === 401) {
    // Send Refresh Token
    console.log('Sending refresh token');

    const res = await fetch('https://assignment-three-two-ruddy.vercel.app/api/auth/refreshToken', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const state = api.getState() as RootState;
      const user = state.auth.user;

      // Ensure user is not null before dispatching
      if (user !== null) {
        api.dispatch(
          setUser({
            user,
            token: data.data.accessToken,
          })
        );

        // Retry the original request
        result = await baseQuery(arg, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// Create the base API
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['service', 'Slot', 'Booking'],
  endpoints: () => ({}),
});
