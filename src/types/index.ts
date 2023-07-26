interface Product {
	id: string;
	name: string;
	priceId: string;
}

interface ProductFromApi {
	id: string;
	name: string;
	default_price: string;
	description: string;
}

interface User {
	fullName: string;
	email: string;
}

export type {Product, ProductFromApi, User};
