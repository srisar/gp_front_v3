export interface QueryFetchUsers {
    page: number;
    role: "ALL" | "USER" | "ADMIN" | "MANAGER";
}
