import type {EnumUserRole} from "@/_backend/models/users/EnumUserRole";
import type {EnumUserStatus} from "@/_backend/models/users/EnumUserStatus";
import type {BaseAttributes} from "@/_backend/models/BaseAttributes";


export interface IUserAttributes extends BaseAttributes {
	email?: string;
	full_name?: string;
	profile_pic?: string;
	role?: EnumUserRole;
	status?: EnumUserStatus;
}