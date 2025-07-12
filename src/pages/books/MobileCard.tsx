import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Link } from "react-router";
import { Album, Edit, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IBook } from "@/types/types";

interface MobileCardProps {
  book: IBook;
}

const MobileCard = ({ book }: MobileCardProps) => {
  return (
    <Card className="h-full overflow-hidden shadow-2xl shadow-gray-200 bg-gradient-to-br from-[#226957] to-[#199f73] text-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight ">
              {book.title}
            </CardTitle>
            <p className="text-sm mt-1 truncate">by {book.author}</p>
          </div>
          <div className="shrink-0">
            <Badge variant={book.available ? "default" : "secondary"}>
              {book.available ? "Available" : "Unavailable"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-sm">
          <div className="flex">
            <span className="">Genre:</span>
            <span className="font-medium truncate ml-1">{book.genre}</span>
          </div>
          <div className="flex items-center">
            <span className="">ISBN:</span>
            <span className="font-mono text-xs truncate ml-1">{book.isbn}</span>
          </div>
          <div className="flex">
            <span className="">Copies:</span>
            <span className="font-medium ml-1">{book.copies}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 min-w-0 bg-transparent"
          >
            <Link to={`/books/${book._id}`}>
              <Eye className="h-3 w-3 mr-1" />
              View
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 min-w-0 bg-transparent"
          >
            <Link to={`/edit-book/${book._id}`}>
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Link>
          </Button>
          {book.available && book.copies > 0 && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 min-w-0 bg-transparent"
            >
              <Link to={`/borrow/${book._id}`}>
                <Album className="h-3 w-3 mr-1" />
                Borrow
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileCard;