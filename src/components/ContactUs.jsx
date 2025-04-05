import { motion } from "framer-motion";
import { useEffect } from "react";
// import { Helmet } from "react-helmet-async";
import { FaBookmark } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-16">
      {/* <Helmet>
        <title>Contact Us | Visa Navigator</title>
      </Helmet> */}

      {/* Contact Title */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mb-10 text-center"
      >
        <div className="flex items-center justify-center gap-2 text-blue-500">
                    <FaBookmark className="text-sm" />
                    <h3 className="font-semibold">Contact Us</h3>
                  </div>
        <h3 className="mt-2 text-gray-600">We'd love to hear from you</h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Form */}
        <motion.form
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 rounded-xl border border-gray-200 p-6 shadow-lg"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="rounded-md border p-3 outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="rounded-md border p-3 outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="rounded-md border p-3 outline-none focus:ring-2 focus:ring-indigo-400"
            required
          ></textarea>
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-6 py-3 font-bold text-white hover:bg-indigo-600"
          >
            Send Message
          </button>
        </motion.form>

        {/* Google Map */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="overflow-hidden rounded-xl shadow-lg"
        >
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902373408642!2d90.39068731445672!3d23.75088569441785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b89e66b289df%3A0xdee3b1e65e03db3d!2sDhaka%20University!5e0!3m2!1sen!2sbd!4v1617698983973!5m2!1sen!2sbd"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            className="w-full border-0"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
