import { useContext, useState } from "react";
import AuthContext from "../provider/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const AddBook = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = user?.email;
    const form = e.target;
    const image = form.image.value;
    const name = form.name.value;
    const authorName = form.authorName.value;
    const category = form.category.value;
    const quantity = parseInt(form.quantity.value);
    const rating = parseFloat(form.rating.value);
    const shortDescription = form.shortDescription.value;
    const bookContent = form.bookContent.value;

    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 to 5");
      setLoading(false);
      return;
    }

    const formData = {
      email,
      image,
      name,
      authorName,
      category,
      quantity,
      rating,
      shortDescription,
      bookContent,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/add-book`, formData);
      toast.success("Book added successfully!");
      form.reset();
      navigate("/all-book");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book!");
    }
    setLoading(false);
  };

  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-8">
       <Helmet>
        <title>Add Book | BookCove</title>
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="mb-8 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white">
        Add Book
      </h1>
      <section className="rounded-lg p-6 shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="image" className="mb-2 block font-medium">Image</label>
              <input type="url" id="image" name="image" placeholder="Enter image URL" className="w-full rounded-lg border px-4 py-2" required />
            </div>
            <div>
              <label htmlFor="name" className="mb-2 block font-medium">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter book title" className="w-full rounded-lg border px-4 py-2" required />
            </div>
            <div>
              <label htmlFor="category" className="mb-2 block font-medium">Category</label>
              <select id="category" name="category" className="w-full rounded-lg border px-4 py-2" required>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Business">Business</option>
                <option value="Personal Development">Personal Development</option>
                <option value="History">History</option>
              </select>
            </div>
            <div>
              <label htmlFor="authorName" className="mb-2 block font-medium">Author Name</label>
              <input type="text" id="authorName" name="authorName" placeholder="Enter author name" className="w-full rounded-lg border px-4 py-2" required />
            </div>
            <div>
              <label htmlFor="quantity" className="mb-2 block font-medium">Quantity</label>
              <input type="number" id="quantity" name="quantity" placeholder="Enter quantity" min={0} className="w-full rounded-lg border px-4 py-2"  />
            </div>
            <div>
              <label htmlFor="rating" className="mb-2 block font-medium">Rating</label>
              <input type="number" id="rating" name="rating" placeholder="Enter rating (1-5)" min={1} max={5} step="0.1" className="w-full rounded-lg border px-4 py-2" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="shortDescription" className="mb-2 block font-medium">Short Description</label>
              <textarea id="shortDescription" name="shortDescription" rows={3} placeholder="Enter short description" className="w-full rounded-lg border px-4 py-2" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="bookContent" className="mb-2 block font-medium">Book Content</label>
              <textarea id="bookContent" name="bookContent" rows={3} placeholder="Enter book content" className="w-full rounded-lg border px-4 py-2" required />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="w-full rounded-lg bg-blue-500 py-2 font-bold text-white">
                {loading ? "Adding Book..." : "Add Book"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddBook;
