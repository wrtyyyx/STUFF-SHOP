import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fakestoreapi.com',
    }),
    tagTypes: ['Items'],
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => '/products',
            providesTags: (result = []) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Items', id })), { type: 'Items', id: 'LIST' }]
                    : [{ type: 'Items', id: 'LIST' }],
        }),
        getItemsByCat: builder.query({
            query: (cat) => `/products/category/${cat}`,
            providesTags: (result = []) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Items', id })), { type: 'Items', id: 'LIST' }]
                    : [{ type: 'Items', id: 'LIST' }],
        }),
        getItem: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Items', id }],
        }),
        searchItem: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Items', id }],
        }),
    }),
});

export const { useGetItemsQuery, useGetItemQuery, useGetItemsByCatQuery } = itemsApi;
