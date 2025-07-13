
import App from "@/App";
import ErrorPage from "@/layout/ErrorPage";
import BookDetails from "@/pages/books/BookDetails";
import Books from "@/pages/books/Books";
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
    ],
  },
]);

export default router;