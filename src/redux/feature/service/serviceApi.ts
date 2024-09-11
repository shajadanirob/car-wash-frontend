import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllService: builder.query({
            query: () => ({
                url: '/services',
                method: 'GET',
               
            }),
            providesTags: ['service'],
        }),
        getSingleServices: builder.query({
            query: (id) => ({
              url: `/services/${id}`,
              method: 'GET',
            }),
            providesTags:['service']
          }),

          createService: builder.mutation({
            query: (product) => ({
              url: '/services',
              method: 'POST',
              body: product,
            }),
            invalidatesTags:['service']
          }),
          updateService: builder.mutation({
            query: ({ id, updatedProduct }) => ({
              url: `/services/${id}`,
              method: 'PATCH',
              body: updatedProduct,
            }),
            invalidatesTags:['service']
          }),
          deleteService: builder.mutation({
            query: (ServiceId) => ({
              url: `/services/${ServiceId}`,
              method: 'DELETE',
            }),
            invalidatesTags:['service']
          }),


    }),
});

export const { 
    useGetAllServiceQuery, 
    useGetSingleServicesQuery ,
    useDeleteServiceMutation,
    useCreateServiceMutation,
    useUpdateServiceMutation
} = authApi;
