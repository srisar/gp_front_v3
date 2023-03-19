import type { RouteRecordRaw } from "vue-router";
import { USERS_ADMINS_MANAGERS, USERS_ALL } from "@/_backend/models/users/UserTypes";
import { useAuth } from "@/services/Auth";

export const adminRoutes: RouteRecordRaw[] = [
	{
		path: "/admin",
		name: "admin/index",
		component: () => import("@/pages/admin/index.vue"),
		meta: {
			requiresAuth: true,
			accessList: USERS_ADMINS_MANAGERS,
		},
	},

	{
		path: "/admin/users",
		name: "admin/users",
		component: () => import("@/pages/admin/users/list.vue"),
		meta: {
			requiresAuth: true,
			accessList: USERS_ADMINS_MANAGERS,
		},
	},
	{
		path: "/admin/user/:id",
		name: "admin/user/manage",
		component: () => import("@/pages/admin/users/manage.vue"),
		meta: {
			requiresAuth: true,
			accessList: USERS_ALL,
		},
		beforeEnter: (to) => {
			/*
			 * Validating if the user can access the [id] page
			 */

			const auth = useAuth();
			const id = parseInt(to.params.id.toString());

			if (!auth.isAdminUser && id !== auth.getUser.id) {
				return { name: "home" };
			}
		},
	},
	{
		path: "/admin/user/create",
		name: "admin/user/create",
		component: () => import("@/pages/admin/users/create.vue"),
		meta: {
			requiresAuth: true,
			accessList: USERS_ADMINS_MANAGERS,
		},
	},
];
