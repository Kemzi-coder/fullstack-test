import {Metadata} from "next";
import HomePage from "./(home)";
import {AuthProtection} from "@/components";

export const metadata: Metadata = {
	title: "Home page"
};

const Home = () => {
	return (
		<AuthProtection>
			<HomePage />
		</AuthProtection>
	);
};

export default Home;
