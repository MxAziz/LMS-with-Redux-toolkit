import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetBookByIdQuery, useUpdateBookMutation } from "@/redux/Api/bookApi";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "Genre is required"),
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string().optional(),
  copies: z.coerce.number().min(0, "Copies must be 0 or more"),
  available: z.boolean().optional(),
});

type EditBookFormValues = z.infer<typeof formSchema>;

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading } = useGetBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<EditBookFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });

  // ✅ Properly pre-fill using reset()
  useEffect(() => {
    if (book) {
      reset({
        title: book.data.title,
        author: book.data.author,
        genre: book.data.genre,
        isbn: book.data.isbn,
        description: book.data.description,
        copies: book.data.copies,
        available: book.data.available,
      });
    }
  }, [book, reset]);


  const onSubmit = async (data: EditBookFormValues) => {
    if (data.copies === 0) data.available = false;
    try {
      await updateBook({ id, ...data }).unwrap();
      toast.success("Book updated successfully");
      navigate("/books");
    } catch (err) {
        console.error("Failed to update book:", err);
      toast.error("Failed to update book");
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  // TODO: Update the ui style.
  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-gradient-to-br from-[#226957] to-[#687fc3] text-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div>
            <Label className="mb-2">Title</Label>
            <Input defaultValue={book?.data?.title} {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Author</Label>
            <Input {...register("author")} />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div>
            <Label className="mb-2">Genre</Label>
            <Input {...register("genre")} autoComplete="on" />
            {errors.genre && (
              <p className="text-red-500 text-sm">{errors.genre.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">ISBN</Label>
            <Input {...register("isbn")} />
            {errors.isbn && (
              <p className="text-red-500 text-sm">{errors.isbn.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="mb-2">Description</Label>
          <Textarea {...register("description")} />
        </div>

        <div>
          <Label className="mb-2">Copies</Label>
          <Input
            type="number"
            {...register("copies", { valueAsNumber: true })}
          />
          {errors.copies && (
            <p className="text-red-500 text-sm">{errors.copies.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="available"
            className="cursor-pointer"
            checked={watch("available")}
            onCheckedChange={(checked) => setValue("available", checked)}
          />
          <Label htmlFor="available">Available</Label>
        </div>

        <Button className="cursor-pointer" type="submit">
          Update Book
        </Button>
      </form>
    </div>
  );
}
