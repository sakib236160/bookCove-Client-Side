import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../provider/AuthContext";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function BorrowedBooks() {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBorrowedBooks();
  }, [user]);

  const fetchBorrowedBooks = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/borrowed-books?email=${user.email}`,
        { withCredentials: true }
      );
      setBorrowedBooks(data);
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
    }
    setLoading(false);
  };

  const handleReturnBook = async (id, bookId) => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/return-book/${id}`, {
        data: { bookId },
      });
      toast.success(data.message);
      fetchBorrowedBooks(); // Update the list after returning
    } catch (error) {
      toast.error("Error returning book!");
    }
  };

  return (
    <>
       <Helmet>
        <title>Borrowed Books | BookCove</title>
      </Helmet>
      <section className="mx-auto w-11/12 max-w-screen-xl py-8">
        <h1 className="mb-8 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white">
          Borrowed Books
        </h1>
        {loading ? (
          <Loading />
        ) : borrowedBooks.length === 0 ? (
          <p className="text-center text-gray-400">No borrowed books found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {borrowedBooks.map((book) => (
              <div
                key={book._id}
                className="flex flex-col gap-4 rounded-lg border p-4 shadow dark:border-gray-700 bg-blue-50 dark:bg-gray-900"
              >
                <img
                  src={book.image}
                  alt={book.name}
                  className="aspect-video w-full rounded-lg object-contain"
                />
                <p className={`rounded-lg  px-4 py-1
                        ${book.category === 'Science Fiction' && 'bg-blue-100 text-blue-600'}
                        ${book.category === 'Business' && 'bg-blue-100 text-green-600'} 
                        ${book.category === 'Personal Development' && 'bg-blue-100 text-red-400'} 
                        ${book.category === 'History' && 'bg-blue-100 text-yellow-500'} 
                     text-center text-sm font-semibold`}>
                    {book.category}
                  </p>
                <div className="flex-1">
                  <h3 className="text-center font-bold">{book?.name}</h3>
                </div>
                <div className="space-y-1 rounded-lg bg-blue-50 p-4 dark:bg-gray-900">
                  <p className="text-sm">
                    <span className="font-semibold">Borrowed Date:</span> {new Date(book.borrowedDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Return Date:</span> {new Date(book.returnDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleReturnBook(book._id, book.bookId)}
                  className="w-full rounded-lg bg-blue-500 text-white px-4 py-2 font-semibold transition-colors hover:bg-red-600"
                >
                  Return Book
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}