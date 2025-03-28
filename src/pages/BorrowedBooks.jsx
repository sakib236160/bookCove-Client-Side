export default function BorrowedBooks() {
    return (
      <section className="mx-auto w-11/12 max-w-screen-xl py-8">
        <h1 className="mb-8 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white">
          Borrowed Books
        </h1>
  
        {/* Loading State */}
        {/* <div className="flex justify-center items-center min-h-screen"> */}
          {/* Show a loader here */}
          {/* <div className="loader">Loading...</div> */}
        {/* </div> */}
  
        {/* Books List */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Book Card */}
          <div className="flex flex-col gap-4 rounded-lg border p-4 shadow dark:border-gray-700">
            <img
              src="book-image.jpg" // Replace with book image
              className="aspect-video w-full rounded-lg object-contain"
              alt="Book Cover"
            />
            <p className="rounded-lg bg-blue-100 px-4 py-1 text-center text-sm font-semibold text-blue-600">
              Fiction
            </p>
            <div className="flex-1">
              <h3 className="text-center font-bold transition-colors">
                Book Title
              </h3>
            </div>
  
            <div className="space-y-1 rounded-lg bg-blue-50 p-4 dark:bg-gray-900">
              <p>
                <span className="font-semibold">Borrowed Date:</span> 2023-02-01
              </p>
              <p>
                <span className="font-semibold">Return Date:</span> 2023-02-15
              </p>
            </div>
  
            <button
              className="w-full rounded-lg bg-blue-500 px-4 py-1.5 font-semibold text-white transition-colors hover:bg-blue-600"
            >
              Return
            </button>
          </div>
  
          {/* Empty State Message */}
          {/* <h2 className="text-center text-gray-400">
            You currently have no books borrowed.
          </h2> */}
        </section>
      </section>
    );
  }
  





