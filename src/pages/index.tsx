const Home = () => {
	const handleClick = async () => {
		const response = await fetch("/api/checkout");

		if (!response.ok) {
			throw new Error("Error checking out.");
		}

		const data = await response.json();
		console.log(data);
	};

	return (
		<div>
			<button onClick={handleClick} type="button">Checkout</button>
		</div>
	);
};

export default Home;
