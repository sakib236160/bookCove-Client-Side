import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../provider/AuthContext";

export default function AllBooks() {
  const { user } = useContext(AuthContext);
  const [view, setView] = useState("card");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books`,{
        withCredentials: true
      });
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleSort = (order) => {
    setLoading(true);
    setSortOrder(order);

    setTimeout(() => {
      setLoading(false);
      const sortedBooks = [...books].sort((a, b) => {
        if (order === "Ascending") return a.name.localeCompare(b.name);
        if (order === "Descending") return b.name.localeCompare(a.name);
        return 0;
      });
      setBooks(sortedBooks);
    }, 3000);
  };

  const handleViewChange = (selectedView) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView(selectedView);
    }, 3000);
  };

  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-8">
      <h1 className="mb-8 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white">
        All Books
      </h1>
      <section className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={fetchAllBooks}
          className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
        >
          Show Available Books
        </button>
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="rounded-lg border px-4 py-2 font-semibold"
        >
          <option value="">Sort By Name</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
        <select
          className="rounded-lg border px-4 py-2 font-semibold"
          value={view}
          onChange={(e) => handleViewChange(e.target.value)}
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>
      </section>

      {loading ? (
        <div className="flex justify-center py-4">
          <Loading />
        </div>
      ) : (
        <>
          {view === "card" && (
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="flex flex-col gap-4 rounded-lg border p-4 shadow"
                >
                  <img
                    className="aspect-video w-full rounded-lg object-contain"
                    alt="Book Cover"
                    src={book.image}
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
                    <h3 className="text-center font-bold">{book.name}</h3>
                    <p className="text-center text-sm italic">{book.authorName}</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p>
                      <span className="font-semibold">Quantity:</span> {book.quantity}
                    </p>
                    <div className="flex flex-wrap items-center space-x-3">
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
                  </div>

                  <button
                    onClick={() => {
                      if (book.email === user.email) {
                        navigate(`/update-book/${book._id}`);
                      }
                    }}
                    className={`block w-full rounded-lg px-4 py-1.5 text-center font-semibold text-white transition-colors ${book?.email !== user?.email ? "cursor-not-allowed bg-gray-400 opacity-50" : "bg-blue-500 hover:bg-blue-600"}`}
                    disabled={book.email !== user.email}
                  >
                    Update
                  </button>
                </div>
              ))}
            </section>
          )}

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
                  {books.map((book) => (
                    <tr
                      key={book._id}
                      className="border-b border-gray-200 text-center"
                    >
                      <td className="px-4 py-2">
                        <img
                          className="w-16 h-20 rounded-lg object-contain"
                          alt="Book Cover"
                          src={book.image}
                        />
                      </td>
                      <td className="px-4 py-2">{book.name}</td>
                      <td className="px-4 py-2">{book.authorName}</td>
                      <td className="px-4 py-2">
                        <p className={`rounded-lg  px-4 py-1
                          ${book.category === 'Science Fiction' && 'bg-blue-100 text-blue-600'}
                          ${book.category === 'Business' && 'bg-blue-100 text-green-600'} 
                          ${book.category === 'Personal Development' && 'bg-blue-100 text-red-400'} 
                          ${book.category === 'History' && 'bg-blue-100 text-yellow-500'} 
                        text-center text-sm font-semibold`}>
                          {book.category}
                        </p>
                      </td>
                      <td className="px-4 py-2">{book.quantity}</td>
                      <td className="px-4 py-2">
                        <ReactStars
                          count={5}
                          value={book.rating}
                          isHalf={true}
                          size={20}
                          edit={false}
                        />
                        <span className="text-sm">{book.rating}/5</span>
                      </td>
                      <td className="px-4 py-2">
                        {book.email === user.email ? (
                          <Link to={`/update-book/${book._id}`}>
                            <button className="block rounded-lg bg-blue-500 px-4 py-1.5 text-center font-semibold text-white transition-colors hover:bg-blue-600">
                              Update
                            </button>
                          </Link>
                        ) : (
                          <button className="block rounded-lg bg-gray-400 px-4 py-1.5 text-center font-semibold text-white cursor-not-allowed">
                            Update
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </>
      )}
    </section>
  );
}
