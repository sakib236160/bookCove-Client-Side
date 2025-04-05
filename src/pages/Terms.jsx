import { Helmet } from "react-helmet-async";

const Terms = () => {
    return (
        <div>
           <Helmet>
        <title>Terms & Conditions | BookCove</title>
      </Helmet>
            <section className="mx-auto w-11/12 max-w-screen-xl py-8">
        <h1 className="mb-8 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white">
          Terms & Conditions
        </h1>
        <section className="rounded-lg p-6 shadow dark:shadow-gray-700">
          <p className="mb-4">
            Welcome to BookCove! These terms and conditions outline the rules
            and regulations for the use of BookCove's Website.
          </p>
          <p className="mb-4">
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use BookCove if you do not agree to
            take all of the terms and conditions stated on this page.
          </p>
          <p className="mb-4">
            We employ the use of cookies. By accessing BookCove, you agreed to
            use cookies in agreement with the BookCove's Privacy Policy.
          </p>
          <p className="mb-4">
            Unless otherwise stated, BookCove and/or its licensors own the
            intellectual property rights for all material on BookCove. All
            intellectual property rights are reserved. You may access this from
            BookCove for your own personal use subjected to restrictions set in
            these terms and conditions.
          </p>
          <p className="mb-4">
            Parts of this website offer an opportunity for users to post and
            exchange opinions and information in certain areas of the website.
            BookCove does not filter, edit, publish or review Comments prior to
            their presence on the website. Comments do not reflect the views and
            opinions of BookCove, its agents, and/or affiliates.
          </p>
          <p className="font-semibold">Sincerely,</p>
          <p>The BookCove Team</p>
        </section>
      </section>
        </div>
    );
};

export default Terms;