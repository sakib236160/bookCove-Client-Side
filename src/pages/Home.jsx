import Banner from "../components/Banner";
import FAQ from "../components/FAQ";
import LibraryInsights from "../components/LibraryInsights";
import Testimonials from "../components/Testimonials";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LibraryInsights></LibraryInsights>
            <hr className="mx-auto w-1/2 max-w-prose border-blue-500 " />
            <Testimonials></Testimonials>
            <hr className="mx-auto w-1/2 max-w-prose border-blue-500 " />
            <FAQ></FAQ>
        </div>
    );
};

export default Home;