import {Metadata} from "next";
import HomePage from "./(home)";

export const metadata: Metadata = {
	title: "Payment page"
};

const Home = () => {
	return <HomePage />;
};

export default Home;
