import {User, UserFromDb} from "../../db/models";

class UserDto {
	id: string;
	fullName: User["fullName"];
	email: User["email"];
	customerId: User["customerId"];

	constructor(doc: UserFromDb) {
		this.id = doc._id.toString();
		this.fullName = doc.fullName;
		this.email = doc.email;
		this.customerId = doc.customerId;
	}
}

export default UserDto;
