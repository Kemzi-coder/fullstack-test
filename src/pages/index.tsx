import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import styles from "@/styles/Home.module.scss";
import {Montserrat} from "next/font/google";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({subsets: ["latin"]});

const Home = () => {
	return (
		<>
			<Head>
				<title>Payment Page</title>
			</Head>
			<main className={montserrat.className}>
				<section>
					<div className="container">
						<div className={styles.grid}>
							<div className={styles.section}>
								<CheckoutForm />
							</div>
							<div className={styles.section}>Refunds</div>
							<div className={styles.section}>Subscriptions</div>
							<div className={styles.section}>User management</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Home;
