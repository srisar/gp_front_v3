import type { EnumUserRole } from '@/_backend/models/users/EnumUserRole';

export interface UserCreate {
    email: string;
    full_name: string;
    role: EnumUserRole;
    password: string;
    confirm_password: string;
}
