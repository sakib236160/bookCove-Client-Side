import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ContactUs from "../components/ContactUs";
import FAQ from "../components/FAQ";
import LibraryInsights from "../components/LibraryInsights";
import Testimonials from "../components/Testimonials";
import { Helmet } from "react-helmet-async";


const Home = () => {
    return (
        <div>
            <Helmet>
        <title>BookNest</title>
      </Helmet>
            <Banner></Banner>
            <Categories></Categories>
            <hr className="mx-auto w-1/2 max-w-prose border-blue-500 " />
            <LibraryInsights></LibraryInsights>
            <hr className="mx-auto w-1/2 max-w-prose border-blue-500 " />
            <Testimonials></Testimonials>
            <hr className="mx-auto w-1/2 max-w-prose border-blue-500 " />
            <FAQ></FAQ>
            <hr className="mx-auto w-1/2 max-w-prose border-blue-500 " />
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;