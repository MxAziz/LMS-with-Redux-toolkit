import { useGetBookByIdQuery, useUpdateBookMutation, } from "@/redux/Api/bookApi";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

interface IBook {
  title: string;
  description: string;
  author: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  copies: number;
  available?: boolean;
}

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useGetBookByIdQuery(id);

  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const { register, handleSubmit, reset, formState: { errors }, } = useForm<IBook>();

  useEffect(() => {
    if (book?.data) {
      reset({
        title: book.data.title,
        author: book.data.author,
        genre: book.data.genre,
        isbn: book.data.isbn,
        description: book.data.description,
        copies: book.data.copies,
      });
    }
  }, [book?.data, reset]);

  const onSubmit: SubmitHandler<IBook> = async (data) => {
    console.log('submit data ✅',data);
    const updatedBook = { ...data, available: data?.copies === 0 ? false : true, };

    try {
      const res = await updateBook({ bookId: id, body: updatedBook, }).unwrap();

      if (res.success) {
        toast.success("Book has been updated!");
        navigate("/books", { replace: true });

        console.log("✅ Updated book data:", updatedBook);
      }
    } catch (error) {
      toast.error("Failed to update the book.");
      console.error("Error while updating book:", error);
    }
  };

  return (
    <div className="mt-10 min-h-[70vh] ">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <p className="">Update Book Form Loading...</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-12 bg-gradient-to-br from-[#226957] to-[#687fc3] text-white rounded-lg shadow-md mt-10">
          <h1 className="text-2xl font-bold  mb-6 text-center">
            📚 Update Book
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium  mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border  rounded-md  focus:outline-none focus:ring-1 "
                  placeholder="Book title"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Author
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border  rounded-md  focus:outline-none focus:ring-1 "
                  placeholder="Author name"
                  {...register("author", { required: "Author is required" })}
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.author.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Genre */}
              <div>
                <label className="block text-sm font-medium  mb-1">Genre</label>
                <select
                  className="w-full px-3 py-2 border  rounded-md  focus:outline-none focus:ring-1 "
                  {...register("genre", { required: "Genre is required" })}
                >
                  <option value="">Select Genre</option>
                  <option value="FICTION">FICTION</option>
                  <option value="NON_FICTION">NON_FICTION</option>
                  <option value="SCIENCE">SCIENCE</option>
                  <option value="HISTORY">HISTORY</option>
                  <option value="BIOGRAPHY">BIOGRAPHY</option>
                  <option value="FANTASY">FANTASY</option>
                </select>
                {errors.genre && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.genre.message}
                  </p>
                )}
              </div>

              {/* ISBN */}
              <div>
                <label className="block text-sm font-medium  mb-1">ISBN</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border  rounded-md  focus:outline-none focus:ring-2 "
                  placeholder="ISBN number"
                  {...register("isbn", { required: "ISBN is required" })}
                />
                {errors.isbn && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.isbn.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium  mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border  rounded-md  focus:outline-none focus:ring-2 "
                rows={4}
                placeholder="Brief summary of the book"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Copies */}
            <div>
              <label className="block text-sm font-medium  mb-1">Copies</label>
              <input
                type="number"
                min="0"
                className="w-full px-3 py-2 border  rounded-md  focus:outline-none focus:ring-2 "
                {...register("copies", {
                  required: "Copies is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Must be at least 1" },
                })}
              />
              {errors.copies && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.copies.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center bg-black text-white font-medium py-2 px-4 rounded-md transition duration-200 hover:cursor-pointer"
            >
              {isUpdating ? "Updating..." : "Update Book"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditBook;