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
    updateBook: builder.mutation({
      query: ({id, ...updateBook}) => ({
        url: `books/${id}`,
        method: "PATCH",
        body: updateBook
      }),
      invalidatesTags: ["Book"]
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
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


export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowedBooksSummaryQuery,
} = bookApi;