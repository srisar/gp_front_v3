import type { RouteRecordRaw } from "vue-router";
import { USERS_ADMINS_MANAGERS, USERS_ALL } from "@/_backend/models/users/UserTypes";
import { useAuth } from "@/services/Auth";

export const usersRoutes: RouteRecordRaw[] = [
	{
		path: "/users",
		name: "users",
		component: () => import("@/views/_users/ListUsers/PageListUsers.vue"),
		meta: {
			requiresAuth: true,
			accessList: USERS_ADMINS_MANAGERS,
		},
	},
	{
		path: "/user/:id",
		name: "user/manage",
		component: () => import("@/views/_users/ManageUser/PageManageUser.vue"),
		meta: {
			requiresAuth: true,
			accessList: USERS_ALL,
		},
		beforeEnter: (to) => {
			/*
			 * Validating if the user can access the manage page
			 */

			const auth = useAuth();
			const id = parseInt(to.params.id.toString());

			if (!auth.isAdminUser && id !== auth.getUser.id) {
				return { name: "home" };
			}
		},
	},
	{
		path: "/user/create",
		name: "user/create",
		component: () => import("@/views/_users/CreateUser/PageCreateUser.vue"),
		meta: {
			requiresAuth: true,
			accessList: USERS_ADMINS_MANAGERS,
		},
	},
];
