import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IBorrowedBook } from "@/types/types";
import { useGetBorrowedBooksSummaryQuery } from "@/redux/Api/bookApi";

const BorrowBooksSummary = () => {
  const { data: summaryData = [], isLoading } = useGetBorrowedBooksSummaryQuery(
    {}
  );

  const summary = summaryData?.data || [];

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className=" text-lg">
          Loading borrowed books summary...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold ">Borrow Summary</h1>
      </div>

      <Card className="bg-gradient-to-br from-[#226957] to-[#678fc3] text-white shadow-xl border-none">
        <CardHeader>
          <CardTitle>Borrowed Books Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {summary.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No books have been borrowed yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white text-lg">Book Title</TableHead>
                  <TableHead className="text-white text-lg">ISBN</TableHead>
                  <TableHead className="text-white text-lg">Total Quantity Borrowed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.map((item: IBorrowedBook, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.book.title}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {item.book.isbn}
                    </TableCell>
                    <TableCell>{item.totalQuantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowBooksSummary;