import type { BaseAttributes } from "@/_backend/models/BaseAttributes";
import type { EnumUserRole } from "@/_backend/models/users/EnumUserRole";
import type { EnumUserStatus } from "@/_backend/models/users/EnumUserStatus";

export interface UserGet extends BaseAttributes {
    email: string;
    full_name: string;
    role: EnumUserRole;
    status: EnumUserStatus;
    profile_pic: string;
}
