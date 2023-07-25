import {User, UserFromDb} from "../../db/models";

class UserDto {
	id: string;
	firstName: User["firstName"];
	lastName: User["lastName"];
	email: User["email"];

	constructor(doc: UserFromDb) {
		this.id = doc._id.toString();
		this.firstName = doc.firstName;
		this.lastName = doc.lastName;
		this.email = doc.email;
	}
}

export default UserDto;
