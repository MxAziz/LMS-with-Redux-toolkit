import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://lms-server-iota.vercel.app/api/",
  }),
  tagTypes: ["Book"], // data cache kore rakhe. (multiple tag thakte pare)
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "books",
      providesTags: ["Book"],
    }),
    getBookById: builder.query({
      query: (id) => `books/${id}`,
      providesTags: ["Book"],
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Book"],
    }),
    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: "/borrow/",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Book"],
    }),
    getBorrowedBooksSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["Book"],
    }),
  }),
});


export const { useGetBooksQuery, useGetBookByIdQuery, useBorrowBookMutation, useGetBorrowedBooksSummaryQuery } = bookApi;