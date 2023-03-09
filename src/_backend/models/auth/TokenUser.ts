import type { EnumUserRole } from "@/_backend/models/users/EnumUserRole";
import type { EnumUserStatus } from "@/_backend/models/users/EnumUserStatus";

export interface TokenUser {
	id: number;
	full_name: string;
	email: string;
	role: EnumUserRole;
	status: EnumUserStatus;
	profile_pic: string;
}
