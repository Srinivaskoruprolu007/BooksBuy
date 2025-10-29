import { Link } from "react-router-dom";
import { useBooks, useDeleteBook } from "../hooks/useBooks";
const Books = () => {
  const { data: books, isLoading, error } = useBooks();

  const { mutate: deleteBook, isPending: isDeleting } = useDeleteBook();
  if (isLoading)
    return <div className="text-center py-10">Loading books...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-10">
        Error : {error.message}
      </div>
    );
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Books</h1>
        <Link
          to={"/books/new"}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Book
        </Link>
      </div>
      {books.length === 0 ? (
        <p className="text-center py-10">No books yet. Add one</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 shadow-sm">
              {book.cover_url && (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
              {book.isbn && (
                <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
              )}
              <div className="mt-4 flex gap-2">
                <Link
                  to={`/books/${book.id}/edit`}
                  className="text-indigo-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBook(book.id)}
                  disabled={isDeleting}
                  className="text-red-600 hover:underline disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Books;
