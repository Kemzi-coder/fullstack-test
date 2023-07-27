import {User, UserFromDb} from "../../db/models";

class UserDto {
	id: string;
	fullName: User["fullName"];
	email: User["email"];

	constructor(doc: UserFromDb) {
		this.id = doc._id.toString();
		this.fullName = doc.fullName;
		this.email = doc.email;
	}
}

export default UserDto;
