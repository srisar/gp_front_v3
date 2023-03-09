export interface UserPasswordUpdate {
	user_id: number;
	old_password: string;
	new_password: string;
	confirm_new_password: string;
}
