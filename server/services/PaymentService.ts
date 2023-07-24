import UserService from "./UserService";

class PaymentService {
	static async test() {
		const user = await UserService.create({
			email: "email@gmail.com",
			firstName: "Name",
			lastName: "Surname"
		});
		return user;
	}
}

export default PaymentService;
