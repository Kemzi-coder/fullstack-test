class User {
	firstName: string;
	lastName: string;
	email: string;

	constructor(user) {
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.email = user.email;
	}
}

export default User;
