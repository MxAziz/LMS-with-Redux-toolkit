"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useBorrowBookMutation,
  useGetBookByIdQuery,
} from "@/redux/Api/bookApi";
import { toast } from "sonner";

const BorrowBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [borrowBook] = useBorrowBookMutation();
  const { data: bookData, refetch } = useGetBookByIdQuery(id as string);

  const book = bookData?.data;

  useEffect(() => {
    refetch();
  }, [refetch]);

  useState(() => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    setDueDate(defaultDate.toISOString().split("T")[0]);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await borrowBook({
        book: id,
        quantity,
        dueDate,
      }).unwrap();

      if (res.success) {
        refetch();
        navigate("/borrow-summary");
        toast.success("📚 Book borrowed successfully!");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to borrow book:", error);
      toast.error(error?.data?.message || "❌ Failed to borrow book");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Book Info */}
        <Card className="flex-1 bg-gradient-to-br from-[#226957] to-[#687fc3] text-white shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">📘 Book Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{book?.title}</h3>
              <p className="text-gray-200">by <span className="italic">{book?.author}</span></p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white text-[#226957] font-semibold">
                {book?.copies} copies available
              </Badge>
              <Badge className={`text-white ${book?.available ? "bg-green-600" : "bg-gray-400"}`}>
                {book?.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {book?.description || "No additional description available for this book."}
            </p>
          </CardContent>
        </Card>

        {/* Right: Borrow Form */}
        <Card className="flex-1 bg-white shadow-xl rounded-2xl border-2 border-gray-200">
          <CardHeader className="bg-[#687fc3] text-white rounded-t-2xl">
            <div className="flex items-center">
              <Button
                variant="ghost"
                asChild
                className="mr-4 hover:bg-[#5d71b8] text-white hover:text-white"
              >
                <Link to="/books">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Link>
              </Button>
              <CardTitle className="text-xl">Borrow Form</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="py-8 px-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-gray-700">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    max={book?.copies}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Number.parseInt(e.target.value) || 1)
                    }
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Maximum allowed: {book?.copies}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="text-gray-700">Due Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" type="button" asChild>
                  <Link to="/books">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  className="bg-[#226957] hover:bg-[#687fc3] text-white px-6"
                  disabled={
                    isSubmitting || !book?.available || quantity > book?.copies
                  }
                >
                  {isSubmitting ? "Processing..." : "Borrow Book"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BorrowBook;
