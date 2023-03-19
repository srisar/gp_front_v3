import type { RouteRecordRaw } from "vue-router";
import { USERS_ALL } from "@/_backend/models/users/UserTypes";

const PREFIX = "/app";

export const appRoutes: RouteRecordRaw[] = [
	{
		path: PREFIX,
		name: "app/index",
		component: () => import("@/pages/app/index.vue"),
		meta: {
			requiresAuth: true,
			accessList: USERS_ALL,
		},
	},
	{
		path: PREFIX + "/user/manage",
		name: "app/user/manage",
		component: () => import("@/pages/app/user/manage.vue"),
		meta: {
			requiresAuth: true,
			accessList: USERS_ALL,
		},
	},
];
