import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    name: "",
    authorName: "",
    category: "",
    quantity: "",
    rating: "",
    image: "",
    shortDescription: "",
    bookContent: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`,{
        withCredentials: true
      });
      setBook(data);
    } catch (error) {
      console.error("Error fetching book details:", error);
      alert("Error fetching book details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBook = { ...book };
    setLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/books/${id}`, updatedBook,{
        withCredentials:true
      },);
      toast.success("Book updated successfully");
      navigate("/all-book");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Helmet>
        <title>Update Book | BookCove</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <section className="mx-auto w-11/12 max-w-screen-xl py-8">
          <h1 className="mb-8 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white">
            Update Book
          </h1>
          <section className="rounded-lg p-6 shadow">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Image */}
                <div>
                  <label htmlFor="image" className="mb-2 block font-medium">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    placeholder="Enter image URL"
                    value={book.image}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2] dark:border-gray-700 dark:bg-black"
                    required
                  />
                </div>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-2 block font-medium">
                    Book Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter title of the book"
                    value={book.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2] dark:border-gray-700 dark:bg-black"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="mb-2 block font-medium">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={book.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2] dark:border-gray-700 dark:bg-black"
                    required
                  >
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Business">Business</option>
                    <option value="Personal Development">Personal Development</option>
                    <option value="History">History</option>
                  </select>
                </div>

                {/* Author Name */}
                <div>
                  <label htmlFor="authorName" className="mb-2 block font-medium">
                    Author Name
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    placeholder="Enter author name"
                    value={book.authorName}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2] dark:border-gray-700 dark:bg-black"
                    required
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="mb-2 block font-medium">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="Enter quantity"
                    value={book.quantity}
                    onChange={handleChange}
                    min={0}
                    className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2] dark:border-gray-700 dark:bg-black"
                    required
                  />
                </div>

                {/* Rating */}
                <div>
                  <label htmlFor="rating" className="mb-2 block font-medium">
                    Rating
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    placeholder="Enter rating (1-5)"
                    value={book.rating}
                    onChange={handleChange}
                    min={1}
                    max={5}
                    step="0.1"
                    className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2] dark:border-gray-700 dark:bg-black"
                    required
                  />
                </div>

                {/* Short Description */}
                <div className="sm:col-span-2">
                  <label htmlFor="shortDescription" className="mb-2 block font-medium">
                    Short Description
                  </label>
                  <textarea
                    id="shortDescription"
                    name="shortDescription"
                    rows={3}
                    placeholder="Enter short description"
                    value={book.shortDescription}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2] dark:border-gray-700 dark:bg-black"
                    required
                  />
                </div>

                {/* Book Content */}
                <div className="sm:col-span-2">
                  <label htmlFor="bookContent" className="mb-2 block font-medium">
                    Book Content
                  </label>
                  <textarea
                    id="bookContent"
                    name="bookContent"
                    rows={3}
                    placeholder="Enter book content"
                    value={book.bookContent}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2] dark:border-gray-700 dark:bg-black"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-500 py-2 font-bold text-white"
                  >
                    Update Book
                  </button>
                </div>
              </div>
            </form>
          </section>
        </section>
      )}
    </>
  );
}
