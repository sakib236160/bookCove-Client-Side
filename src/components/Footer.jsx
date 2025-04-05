import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-blue-50 dark:bg-gray-900 shadow-inner mt-10">
      <div className="mx-auto w-11/12 max-w-screen-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-t border-blue-200 dark:border-gray-700">
          {/* Left Side - Text */}
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center sm:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold text-blue-500">BookCove</span>. All
            rights reserved.
          </p>

          {/* Right Side - Icons */}
          <div className="flex gap-4">
            <a
              href="mailto:info@BookCove.com"
              target="_blank"
              rel="noreferrer"
              title="Email us"
              className="transition hover:scale-110 hover:text-red-500"
            >
              <IoMail size={20} />
            </a>
            <a
              href="https://twitter.com/BookCove"
              target="_blank"
              rel="noreferrer"
              title="Follow us on Twitter"
              className="transition hover:scale-110 hover:text-blue-400"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://facebook.com/BookCove"
              target="_blank"
              rel="noreferrer"
              title="Visit our Facebook page"
              className="transition hover:scale-110 hover:text-blue-500"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://linkedin.com/company/BookCove"
              target="_blank"
              rel="noreferrer"
              title="Connect on LinkedIn"
              className="transition hover:scale-110 hover:text-blue-600"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}