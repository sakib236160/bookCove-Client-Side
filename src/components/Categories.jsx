import axios from "axios";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom"; 

export default function Categories() {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/books`
    )
    setBooks(data);
  };

  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-16">
      <section className="space-y-1 text-center">
        <div className="flex items-center justify-center gap-2 text-blue-500">
          <FaBookmark className="text-sm" />
          <h3 className="font-semibold">Explore by Categories</h3>
        </div>

        <h2 className="text-2xl font-semibold">
          Find Books That Match Your Interests
        </h2>
      </section>
      <div className="h-8"></div>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Link for Science Fiction */}
        <Link
          to="/category/Science Fiction"
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-blue-500 p-4"
        >
          <img
            src="../assets/ScienceFiction.png"
            alt="Science Fiction"
            className="h-16 w-16"
          />
          <h3 className="font-semibold">Science Fiction</h3>
        </Link>
        {/* Link for Business */}
        <Link
          to="/category/Business"
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-blue-500 p-4"
        >
          <img src="../assets/Business.png" alt="Business" className="h-16 w-16" />
          <h3 className="font-semibold">Business</h3>
        </Link>
        {/* Link for Personal Development */}
        <Link
          to="/category/Personal Development"
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-blue-500 p-4"
        >
          <img
            src="../assets/PersonalDevelopment.png"
            alt="Personal Development"
            className="h-16 w-16"
          />
          <h3 className="font-semibold">Personal Development</h3>
        </Link>
        {/* Link for History */}
        <Link
          to="/category/History"
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-blue-500 p-4"
        >
          <img src="../assets/History.png" alt="History" className="h-16 w-16" />
          <h3 className="font-semibold">History</h3>
        </Link>
      </section>
    </section>
  );
}
