import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const actionApi = createApi({
  reducerPath: "actionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    getBasket: builder.query({
      query: () => "/basket",
      providesTags: ["Basket"],
    }),
    addToBasket: builder.mutation({
      query: (name) => ({
        url: "/basket",
        method: "POST",
        body: name,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Basket"],
    }),
    deleteFromBasket: builder.mutation({
      query: (id) => ({
        url: `/basket/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Basket"],
    }),
  }),
});

export const {
  useAddToBasketMutation,
  useGetBasketQuery,
  useDeleteFromBasketMutation,
} = actionApi;
