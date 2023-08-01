import {WithId} from "mongodb";
import {UserToDb} from "../../db/models";

class UserDto {
	id: string;
	fullName: string;
	email: string;

	constructor(user: WithId<UserToDb>) {
		this.id = user._id.toString();
		this.fullName = user.fullName;
		this.email = user.email;
	}
}

export default UserDto;
