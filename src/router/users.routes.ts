import type {RouteRecordRaw} from 'vue-router';

export const usersRoutes: RouteRecordRaw[] = [
	{
		path: '/users/current',
		name: 'users/current',
		component: () => import('@/views/_users/ManageUser/PageManageUser.vue'),
		meta: {
			requiresAuth: true,
			accessList: ['ADMIN', 'MANAGER', 'USER'],
		},
	},
];