import Banner from "../components/Banner";
import LibraryInsights from "../components/LibraryInsights";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <hr className="mx-auto w-1/2 max-w-prose border-blue-500 mt-14" />
            <LibraryInsights></LibraryInsights>
        </div>
    );
};

export default Home;