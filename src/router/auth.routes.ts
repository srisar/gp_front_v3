import type {RouteRecordRaw} from 'vue-router';


export const authRoutes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'auth/login',
		component: () => import('@/views/_auth/PageLogin.vue'),
	},
	{
		path: '/logout',
		name: 'auth/logout',
		component: () => import('@/views/_auth/PageLogout.vue'),
	},
];