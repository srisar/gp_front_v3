import type { RouteRecordRaw } from "vue-router";

export const authRoutes: RouteRecordRaw[] = [
	{
		path: "/signin",
		name: "auth/signin",
		component: () => import("@/pages/public/auth/signin.vue"),
	},

	{
		path: "/signup",
		name: "auth/signup",
		component: () => import("@/pages/public/auth/signup.vue"),
	},

	{
		path: "/logout",
		name: "auth/logout",
		component: () => import("@/pages/public/auth/logout.vue"),
	},
];
