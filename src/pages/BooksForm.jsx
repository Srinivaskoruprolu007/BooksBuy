import { useNavigate, useParams } from "react-router-dom";
import { useBooks, useCreateBook, useUpdateBook } from "../hooks/useBooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema } from "../schemas/bookSchema";
import { useEffect } from "react";

const BooksForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: books = [] } = useBooks();
  const existedBook = books.find((book) => book.id === parseInt(id));

  const { mutate: createBook, isPending: isCreating } = useCreateBook();
  const { mutate: updateBook, isPending: isUpdating } = useUpdateBook();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
  });

  useEffect(() => {
    if (isEdit && existedBook) {
      reset(existedBook);
    }
  }, [isEdit, existedBook, reset]);

  const onSubmit = (data) => {
    if (isEdit) {
      updateBook(
        { id: parseInt(id), ...data },
        {
          onSuccess: () => navigate("/books"),
        }
      );
    } else {
      createBook(data, {
        onSuccess: () => navigate("/books"),
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Book" : "Add Book"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            {...register("title")}
            className="w-full p-2 border rounded"
            placeholder="The Art of Coding"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block mb-1 font-medium">Author</label>
          <input
            {...register("author")}
            className="w-full p-2 border rounded"
            placeholder="Ada Lovelace"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            {...register("category")}
            className="w-full p-2 border rounded"
            placeholder="Science Fiction"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isCreating || isUpdating}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isEdit
              ? isUpdating
                ? "Updating..."
                : "Update Book"
              : isCreating
              ? "Adding..."
              : "Add Book"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/books")}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BooksForm;
