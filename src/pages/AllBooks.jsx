import axios from "axios";
import { useEffect, useState } from "react";

export default function AllBooks() {
  const [view, setView] = useState("card");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/books`
    )
    setBooks(data)
  };
  
  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-8">
      <h1 className="mb-8 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white">
        All Books
      </h1>
      <section className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <button className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600">
          Show Available Books
        </button>
        <select className="rounded-lg border px-4 py-2 font-semibold">
          <option value="">Sort By Name</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
        <select
          className="rounded-lg border px-4 py-2 font-semibold"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>
      </section>

      {/* Card View */}
      {view === "card" && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <div key={book._id} className="flex flex-col gap-4 rounded-lg border p-4 shadow">
            <img
              className="aspect-video w-full rounded-lg object-contain"
              alt="Book Cover"
              src={book.image} 
            />
            <p className="rounded-lg bg-blue-100 px-4 py-1 text-center text-sm font-semibold text-blue-600">
              {book.category} 
            </p>
            <div className="flex-1">
              <h3 className="text-center font-bold">{book.name}</h3> 
              <p className="text-center text-sm italic">{book.authorName}</p> 
            </div>
            <div className="rounded-lg bg-blue-50 p-4">
              <p>
                <span className="font-semibold">Quantity:</span> {book.quantity} 
              </p>
              <p className="font-semibold">Rating: {book.rating}/5</p> 
            </div>
            <button className="block w-full rounded-lg bg-blue-500 px-4 py-1.5 text-center font-semibold text-white transition-colors hover:bg-blue-600">
              Update
            </button>
          </div>
        ))}
      </section>
      )}

      {/* Table View */}
      {view === "table" && (
        <section className="overflow-x-auto mt-8">
          <table className="w-full max-w-screen-xl border-collapse">
            <thead className="bg-blue-50 text-center">
              <tr>
                <th className="px-4 py-2">Cover</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 text-center">
                <td className="px-4 py-2">
                  <img
                    className="w-8 rounded-lg object-contain"
                    alt="Book Cover"
                  />
                </td>
                <td className="px-4 py-2">Book Name</td>
                <td className="px-4 py-2">Author Name</td>
                <td className="px-4 py-2">
                  <p className="rounded-lg bg-blue-100 px-3 py-1 text-center text-sm font-semibold text-blue-600">
                    Category
                  </p>
                </td>
                <td className="px-4 py-2">10</td>
                <td className="px-4 py-2">4.5/5</td>
                <td className="px-4 py-2">
                  <button className="block rounded-lg bg-blue-500 px-4 py-1.5 text-center font-semibold text-white transition-colors hover:bg-blue-600">
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      )}
    </section>
  );
}




