import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/services/Auth";
import { USERS_ALL } from "@/_backend/models/users/UserTypes";
import { adminRoutes } from "@/router/admin/adminRoutes";
import { appRoutes } from "@/router/app/appRoutes";
import { authRoutes } from "@/router/public/authRoutes";

/**
 * Route meta data declarations
 */
declare module "vue-router" {
	interface RouteMeta {
		requiresAuth: boolean;
		accessList: string[];
	}
}

/* ------------------------------------------------------------------------------------------------------------------ */

/*
 * Routes
 */
const routes = [
	...authRoutes, //
	...adminRoutes,
	...appRoutes,
];

/**
 * Router instance
 */
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "public/index",
			component: () => import("@/pages/public/index.vue"),
			meta: {
				requiresAuth: false,
				accessList: [...USERS_ALL],
			},
		},
		...routes,
	],
});

/* ------------------------------------------------------------------------------------------------------------------ */

/*
 * Route guard for authentication
 */
router.beforeEach(async (to, from) => {
	const auth = useAuth();
	if (to.meta.requiresAuth) {
		if (!to.meta.accessList.includes(auth.getUser.role)) {
			return { name: "auth/signin" };
		}
	}
});

export default router;
