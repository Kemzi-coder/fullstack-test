import "./global.scss";
import "react-toastify/dist/ReactToastify.css";
import {Metadata} from "next";
import {Montserrat} from "next/font/google";
import {ReactNode} from "react";
import {ToastContainer} from "react-toastify";

const montserrat = Montserrat({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "Payment",
	description: "Created by Max Kyrychenko",
	authors: [
		{
			name: "Max Kyrychenko",
			url: "https://github.com/Kemzi-coder"
		}
	],
	creator: "Max Kyrychenko",
	publisher: "Max Kyrychenko"
};

const RootLayout = async ({children}: {children: ReactNode}) => (
	<html lang="en">
		<body className={montserrat.className}>
			<main>{children}</main>
			<ToastContainer />
		</body>
	</html>
);

export default RootLayout;
