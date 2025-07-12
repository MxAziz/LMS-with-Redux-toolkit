import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/Api/bookApi";
import { Album, BrushCleaning, Edit, Eye, Plus } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { IBook } from './../../types/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip"
import MobileCard from "./MobileCard";

const Books = () => {
  const { data: books, isLoading, refetch } = useGetBooksQuery({});


  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-500 text-lg">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold ">All Books</h1>
        </div>
        <Button asChild className="w-full bg-[#226957] sm:w-auto">
          <Link to="/create-book">
            <Plus className="h-4 w-4 mr-2" />
            Add New Book
          </Link>
        </Button>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {books?.data?.map((book: IBook) => (
            <MobileCard key={book._id} book={book} />
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block shadow-sm rounded-lg border overflow-hidden">
        <Table>
          <TableHeader className="bg-[#226957]">
            <TableRow>
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Author</TableHead>
              <TableHead className="text-white">Genre</TableHead>
              <TableHead className="text-white">ISBN</TableHead>
              <TableHead className="text-white">Copies</TableHead>
              <TableHead className="text-white">Availability</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books?.data?.map((book: IBook) => (
              <TableRow key={book._id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  <Badge variant={book.available ? "default" : "secondary"}>
                    {book.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/books/${book._id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Book</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/edit-book/${book._id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Book</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        {book.available && book.copies > 0 && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/borrow/${book._id}`}>
                              <Album className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Borrow Book</p>
                      </TooltipContent>
                    </Tooltip>
                    {/* <DeleteBookButton bookId={book._id} refetch={refetch} /> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {books?.data?.length === 0 && (
        <div className="text-center py-12">
          <div className="flex flex-col items-center">
            <BrushCleaning className="size-36"></BrushCleaning>
            <p className="text-gray-500 text-lg">No books found.</p>
          </div>
          <Button asChild className="mt-4">
            <Link to="/create-book">Add your first book</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Books;