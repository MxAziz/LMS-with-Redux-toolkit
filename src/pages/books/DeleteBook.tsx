"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteBookMutation } from "@/redux/Api/bookApi";
import { toast } from "sonner";

interface DeleteBookProps {
  bookId: string;
  refetch: () => void;
}

const DeleteBookButton = ({ bookId, refetch }: DeleteBookProps) => {
  const [deleteBook] = useDeleteBookMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteBook(bookId).unwrap();
      if (res.success) {
        setIsDeleting(false);
        toast.success("Book deleted successfully!");
        refetch();
      }
    } catch (error) {
      console.error("Failed to delete book:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gradient-to-br from-[#226957] to-[#687fc3] text-white border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            This action cannot be undone. This will permanently delete the book
            from the library.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBookButton;