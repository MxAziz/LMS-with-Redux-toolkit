import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const bookApi = createApi({
  reducerPath: "bookApi", // jekono name deya jete pare (unique hote hobe)
  baseQuery: fetchBaseQuery({ baseUrl: "https://lms-server-iota.vercel.app/api/" }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query({
        query: () => "books",
        providesTags: ["Book"]
    }),
    getBookById: builder.query({
      query: (id) => `books/${id}`,
      providesTags: ["Book"]
    }),
  }),
});


export const { useGetBooksQuery, useGetBookByIdQuery } = bookApi;