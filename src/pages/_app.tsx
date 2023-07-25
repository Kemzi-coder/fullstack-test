import "@/styles/global.scss";
import type {AppProps} from "next/app";
import {Montserrat} from "next/font/google";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({subsets: ["latin"]});

const App = ({Component, pageProps}: AppProps) => {
	return (
		<>
			<div className={montserrat.className}>
				<Component {...pageProps} />
			</div>
			<ToastContainer />
		</>
	);
};

export default App;
