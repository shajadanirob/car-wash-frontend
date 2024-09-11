/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../feature/auth/authSlice";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders:(headers,{getState})=> {
    const token = (getState()as RootState).auth.token;

    if(token){
        headers.set(`authorization` , `Bearer ${token}`)
    }
    return headers
   }
});


const baseQueryWithRefreshToken : BaseQueryFn<FetchArgs,BaseQueryApi,DefinitionType> =async (arg ,api ,extraOptions) : Promise<any> =>{
    let result = await baseQuery(arg,api,extraOptions) 
    console.log(result);
    if (result?.error?.status === 401) {
        //* Send Refresh
        console.log('Sending refresh token');
    
        const res = await fetch('http://localhost:5000/api/auth/refreshToken', {
          method: 'POST',
          credentials: 'include',
        });
    
        const data = await res.json();
    
        if (data?.data?.accessToken) {
          const user = (api.getState() as RootState).auth.user;
    
          api.dispatch(
            setUser({
              user,
              token: data.data.accessToken,
            })
          );
    
          result = await baseQuery(arg, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      }
    
      return result;
}


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes:['service','Slot','Booking'],
  endpoints: () => ({}),
  
});
