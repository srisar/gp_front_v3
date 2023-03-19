import type { RouteRecordRaw } from "vue-router";

const PREFIX = "/app"

export const appRoutes: RouteRecordRaw[] = [
	{
		path: PREFIX,
		name: "app/index",
		component: () => import("@/pages/app/index.vue"),
	},
	{
		path: PREFIX + "/user/manage",
		name: "app/user/manage",
		component: () => import("@/pages/app/user/manage.vue"),
	},
];
