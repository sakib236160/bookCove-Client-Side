import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading"; 

export default function CategoryBooks() {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); 
    fetchBooksByCategory();
  }, [category]);

  const fetchBooksByCategory = async () => {
    setTimeout(async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/books?category=${category}`
        );
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
      setLoading(false);
    }, 3000); 
  };

  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-16">
      <h1 className="mb-8 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white">
        {category} Books
      </h1>

      {loading ? (
        <Loading /> 
      ) : books.length > 0 ? (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <div key={book._id} className="flex flex-col gap-4 rounded-lg border p-4 shadow">
              <img className="aspect-video w-full rounded-lg object-contain" alt="Book Cover" src={book.image} />
              <p className="rounded-lg bg-blue-100 px-4 py-1 text-center text-sm font-semibold text-blue-600">
                {book.category}
              </p>
              <h3 className="text-center font-bold">{book.name}</h3>
              <p className="text-center text-sm italic">{book.authorName}</p>
              <p>
                <span className="font-semibold">Quantity:</span> {book.quantity}
              </p>
              <p className="font-semibold">Rating: {book.rating}/5</p>
              <Link to={`/book/${book._id}`}>
                <button className="block w-full rounded-lg bg-blue-500 px-4 py-1.5 text-center font-semibold text-white transition-colors hover:bg-blue-600">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </section>
      ) : (
        <p className="text-center text-lg font-semibold text-gray-500">No books available in this category.</p>
      )}
    </section>
  );
}



// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Loading from "../components/Loading";

// export default function CategoryBooks() {
//   const { category } = useParams();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(fetchBooksByCategory, 3000);
//   }, [category]);

//   const fetchBooksByCategory = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books?category=${category}`);
//       setBooks(data);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <section className="mx-auto w-11/12 max-w-screen-xl py-16">
//       <h1 className="mb-8 text-center text-2xl font-semibold text-white bg-blue-500 p-4 rounded-lg">
//         {category} Books
//       </h1>

//       {loading ? <Loading /> : books.length > 0 ? (
//         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {books.map((book) => (
//             <div key={book._id} className="border p-4 shadow rounded-lg flex flex-col gap-4">
//               <img className="w-full rounded-lg object-contain aspect-video" src={book.image} alt="Book Cover" />
//               <h3 className="text-center font-bold">{book.name}</h3>
//               <p className="text-center italic">{book.authorName}</p>
//               <p><span className="font-semibold">Quantity:</span> {book.quantity}</p>
//               <p className="font-semibold">Rating: {book.rating}/5</p>
//               <button className="w-full bg-blue-500 text-white p-2 rounded-lg">View Details</button>
//             </div>
//           ))}
//         </section>
//       ) : (
//         <p className="text-center text-lg font-semibold text-gray-500">No books available.</p>
//       )}
//     </section>
//   );
// }
