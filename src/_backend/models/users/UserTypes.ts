
/*
 * Constants for user roles
 */

export const USER_ADMIN = 'ADMIN';
export const USER_MANAGER = 'MANAGER';
export const USER_USER = 'USER';

export const USERS_ADMINS_MANAGERS = [USER_ADMIN, USER_MANAGER];
export const USERS_ALL = [...USERS_ADMINS_MANAGERS, USER_USER];