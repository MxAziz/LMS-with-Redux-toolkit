import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useCreateBookMutation } from "@/redux/Api/bookApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "Genre is required"),
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string().optional(),
  copies: z.number().min(0, "Copies must be 0 or more"),
  available: z.boolean().optional(),
});

export type CreateBookFormValues = z.infer<typeof formSchema>;

export default function CreateBook() {
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateBookFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      available: true,
      copies: 1,
    },
  });

  const onSubmit = async (data: CreateBookFormValues) => {
    try {
      await createBook(data).unwrap();
        toast.success("Book created successfully");
      navigate("/books");
    } catch (err) {
      console.error("Failed to create book:", err);
      toast.error("Failed to create book");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-12 mt-6 bg-gradient-to-br from-[#226957] to-[#687fc3] text-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* first row */}
        <div className="md:flex justify-center items-center space-x-4">
          <div className="w-full">
            <Label className="mb-2">Title *</Label>
            <Input {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="w-full">
            <Label className="mb-2">Author *</Label>
            <Input {...register("author")} />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>
        </div>

        {/* second row */}
        <div className="md:flex justify-center items-center space-x-4">
          <div className="w-full">
            <Label className="mb-2">Genre *</Label>
            <select
              {...register("genre")}
              className="w-full px-4 py-2 rounded-md border text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="" className="bg-[#687fc3]">
                Select Genre
              </option>
              <option value="FICTION" className="bg-[#687fc3]">
                FICTION
              </option>
              <option value="NON_FICTION" className="bg-[#687fc3]">
                NON_FICTION
              </option>
              <option value="SCIENCE" className="bg-[#687fc3]">
                SCIENCE
              </option>
              <option value="HISTORY" className="bg-[#687fc3]">
                HISTORY
              </option>
              <option value="BIOGRAPHY" className="bg-[#687fc3]">
                BIOGRAPHY
              </option>
              <option value="FANTASY" className="bg-[#687fc3]">
                FANTASY
              </option>
            </select>
            {errors.genre && (
              <p className="text-red-500 text-sm">{errors.genre.message}</p>
            )}
          </div>

          <div className="w-full">
            <Label className="mb-2">ISBN *</Label>
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

        <div className="md:flex items-center justify-between space-x-2">
          <div>
            <Label className="mb-2">Copies</Label>
            <Input
              type="number"
              className="w-80"
              {...register("copies", { valueAsNumber: true })}
            />
            {errors.copies && (
              <p className="text-red-500 text-sm">{errors.copies.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2 mt-4 ">
            <Switch
              id="available"
              checked={watch("available")}
              onCheckedChange={(checked) => setValue("available", checked)}
            />
            <Label htmlFor="available">Available</Label>
          </div>
        </div>

        <Button className="cursor-pointer" type="submit">
          Create Book
        </Button>
      </form>
    </div>
  );
}
