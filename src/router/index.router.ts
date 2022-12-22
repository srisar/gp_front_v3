import {createRouter, createWebHistory} from 'vue-router';
import {authRoutes} from '@/router/auth.routes';
import {usersRoutes} from '@/router/users.routes';
import {useAuth} from '@/services/Auth';
import {nextTick} from 'vue';
import {USERS_ALL} from '@/_backend/models/users/UserTypes';


declare module 'vue-router' {
	interface RouteMeta {
		requiresAuth: boolean;
		accessList: string[];
	}
}


const routes = [
	...authRoutes,
	...usersRoutes,
];


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/PageHome.vue'),
			meta: {
				requiresAuth: true,
				accessList: [...USERS_ALL],
			},
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('@/views/PageAbout.vue'),
			meta: {
				requiresAuth: true,
				accessList: [...USERS_ALL],
			},
		},
		...routes,
	],
});


/*
 * Route guard
 */
router.beforeEach(async (to, from) => {

	const auth = useAuth();
	if (to.meta.requiresAuth) {
		if (!to.meta.accessList.includes(auth.getUser.role)) {
			return {name: 'auth/login'};
		}
	}

});

export default router;
