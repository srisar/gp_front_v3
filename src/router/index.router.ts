import {createRouter, createWebHistory} from 'vue-router';
import {authRoutes} from '@/router/auth.routes';
import {usersRoutes} from '@/router/users.routes';


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
				accessList: ['ADMIN', 'MANAGER', 'USER'],
			},
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('@/views/PageAbout.vue'),
			meta: {
				requiresAuth: true,
				accessList: ['ADMIN', 'MANAGER', 'USER'],
			},
		},
		...routes,
	],
});

export default router;
