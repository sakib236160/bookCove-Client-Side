import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import AuthContext from "../provider/AuthContext";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [isBorrowed, setIsBorrowed] = useState(false);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const fetchBookDetails = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
      setBook(data);
      setIsBorrowed(data.isBorrowed);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
    setLoading(false);
  };

  const handleBorrow = async () => {
    if (!returnDate) return toast.error("Please select a return date!");

    const borrowData = { 
      bookId: id, 
      userName: user?.displayName, 
      userEmail: user?.email, 
      returnDate 
    };

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/borrow`, borrowData);
      toast.success(data.message);
      setShowModal(false);
      setIsBorrowed(true);
      navigate("/borrowed-books");
    } catch (error) {
      toast.error("Error borrowing book!");
    }
  };

  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-8">
      <h1 className="mb-8 flex items-center justify-center rounded-lg border bg-blue-500 p-4 text-2xl font-semibold text-white">
        Book Details
      </h1>

      {loading ? (
        <Loading />
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-blue-50 p-4 dark:bg-gray-900">
            <img 
              src={book?.image} 
              alt={book?.name} 
              className="w-full max-w-xs rounded-lg object-cover"
            />
          </div>

          <div className="sm:col-span-1 md:col-span-2">
            <h2 className="text-2xl font-semibold">{book?.name}</h2>
            <p className="mb-4">{book?.authorName}</p>
            <p className={`mb-4 inline-block rounded-lg  px-4 py-1
                 ${book.category === 'Science Fiction' && 'bg-blue-100 text-blue-600'}
                        ${book.category === 'Business' && 'bg-blue-100 text-green-600'} 
                        ${book.category === 'Personal Development' && 'bg-blue-100 text-red-400'} 
                        ${book.category === 'History' && 'bg-blue-100 text-yellow-500'} 
             text-center text-sm font-semibold `}>
              {book?.category}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Quantity:</span> {book?.quantity}
            </p>

            <div className="mb-3 flex items-center gap-4">
              <p className="font-semibold">Rating:</p>
              <ReactStars 
                key={book?._id} 
                count={5} 
                value={book?.rating} 
                isHalf={true} 
                size={24} 
                edit={false} 
              />
              <span className="text-sm">{book?.rating}/5</span>
            </div>

            <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-gray-900">
              <p className="mb-2 font-semibold">Short Description:</p>
              <p>{book?.shortDescription}</p>
            </div>

            <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-gray-900">
              <p className="mb-2 font-semibold">Book Content:</p>
              <p>{book?.bookContent}</p>
            </div>

            {!isBorrowed ? (
              <button
                onClick={() => setShowModal(true)}
                className={`w-full rounded-lg px-4 py-2 font-semibold text-white ${
                  book?.quantity === 0 ? "cursor-not-allowed bg-gray-400 opacity-50" : "bg-blue-500"
                }`}
                disabled={book?.quantity === 0}
              >
                {book?.quantity > 0 ? "Borrow this book" : "Out of Stock"}
              </button>
            ) : (
              <button className="w-full cursor-not-allowed rounded-lg bg-gray-400 px-4 py-2 font-semibold text-white opacity-50" disabled>
                Borrowed
              </button>
            )}
          </div>
        </section>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="w-96 bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Borrow Book</h2>
            
            {/* Display user info */}
            {user && (
              <div className="mb-4">
                <p><strong>Name:</strong> {user.displayName}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
            )}

            <label className="block mb-2">Select Return Date:</label>
            <input 
              type="date" 
              value={returnDate} 
              onChange={(e) => setReturnDate(e.target.value)} 
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleBorrow} className="px-4 py-2 bg-blue-500 text-white rounded">
                Confirm Borrow
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}