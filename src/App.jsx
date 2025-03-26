import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <Navbar></Navbar>
      <Outlet></Outlet>
    <Footer></Footer>
    </>
  );
}

export default App;