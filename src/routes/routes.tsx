
import App from "@/App";
import ErrorPage from "@/layout/ErrorPage";
import BookDetails from "@/pages/books/BookDetails";
import Books from "@/pages/books/Books";
import CreateBook from "@/pages/books/CreateBook";
import EditBook from "@/pages/books/EditBook";
import BorrowBook from "@/pages/borrow-books/BorrowBook";
import BorrowBooksSummary from "@/pages/borrow-books/BorrowBooksSummary";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Books />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: `/books/:id`,
        element: <BookDetails />,
      },
      {
        path: "/create-book",
        element: <CreateBook />,
      },
      {
        path: "/edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "/borrow/:id",
        element: <BorrowBook />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowBooksSummary></BorrowBooksSummary>
      }
    ],
  },
]);

export default router;