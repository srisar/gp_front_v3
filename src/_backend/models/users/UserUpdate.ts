import type { EnumUserRole } from "@/_backend/models/users/EnumUserRole";

export interface UserUpdate {
   id: number;
   full_name: string;
   role: EnumUserRole;
}
