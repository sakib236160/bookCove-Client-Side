import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CategoryBooks() {
  const { category } = useParams(); 
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooksByCategory();
  }, [category]);

  const fetchBooksByCategory = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/books?category=${category}`
    );
    setBooks(data);
  };

  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-16">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Books in {category} Category
      </h2>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="flex flex-col gap-4 rounded-lg border p-4 shadow">
              <img
                className="aspect-video w-full rounded-lg object-contain"
                alt="Book Cover"
                src={book.image}
              />
              <h3 className="text-center font-bold">{book.name}</h3>
              <p className="text-center text-sm italic">{book.authorName}</p>
              <p>
                <span className="font-semibold">Quantity:</span> {book.quantity}
              </p>
              <p className="font-semibold">Rating: {book.rating}/5</p>
            </div>
          ))
        ) : (
          <p>No books available in this category.</p>
        )}
      </section>
    </section>
  );
}
