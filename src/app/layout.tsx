import {AuthProvider, PaymentProvider} from "@/providers";
import {Metadata} from "next";
import {Montserrat} from "next/font/google";
import {ReactNode} from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./global.scss";
import Header from "./(header)";

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

const RootLayout = ({children}: {children: ReactNode}) => {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<AuthProvider>
					<PaymentProvider>
						<Header />
						<main className="main">{children}</main>
						<ToastContainer />
					</PaymentProvider>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
