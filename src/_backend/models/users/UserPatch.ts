import type {EnumUserRole} from '@/_backend/models/users/EnumUserRole';

export interface UserPatch{
	id: number;
	full_name: string;
	role: EnumUserRole;
}