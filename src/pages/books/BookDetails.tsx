import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBookByIdQuery } from "@/redux/Api/bookApi";
import { Album, ArrowLeft, Edit } from "lucide-react";
import { Link, useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams();
  const { data: bookData, isLoading } = useGetBookByIdQuery(id);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-6 text-center">
        <p className="text-lg text-muted-foreground animate-pulse">Loading book details...</p>
      </div>
    );
  }

  const book = bookData?.data;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild className="p-2 bg-[#226957] text-white hover:bg-[#678fc3] hover:text-white">
            <Link to="/books">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">📘 Book Overview</h1>
        </div>
        <Badge
          variant="outline"
          className={`text-sm px-4 py-1.5 rounded-full border-none ${
            book.available
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
              : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
          }`}
        >
          {book.available ? "Available" : "Unavailable"}
        </Badge>
      </div>

      {/* Book Info */}
      <Card className="bg-gradient-to-br from-[#226957] to-[#678fc3] text-white shadow-xl border-none">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-2xl sm:text-3xl font-bold break-words leading-snug">
            {book.title}
          </CardTitle>
          <p className="text-base sm:text-lg">by {book.author}</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium uppercase ">Description</h3>
              <p className="text-base leading-relaxed">{book.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold">Genre</h4>
                <p>{book.genre}</p>
              </div>
              <div>
                <h4 className="font-semibold">ISBN</h4>
                <p className="break-all font-mono">{book.isbn}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Copies Available</h4>
              <p className="">{book.copies} copies</p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white/5 rounded-xl p-5 shadow-md h-fit">
            <h3 className="text-lg font-semibold mb-4 text-white">Actions</h3>
            <div className="space-y-3">
              <Button asChild className="w-full hover:scale-[1.02] bg-white text-black hover:bg-[#226957] hover:text-white transition-transform">
                <Link to={`/edit-book/${book._id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Book
                </Link>
              </Button>

              {book.available && book.copies > 0 && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-white text-black hover:bg-[#226957] hover:text-white border-none hover:scale-[1.02] transition-transform"
                >
                  <Link to={`/borrow/${book._id}`}>
                    <Album className="h-4 w-4 mr-2" />
                    Borrow Book
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetails;
