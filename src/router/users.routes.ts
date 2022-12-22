import type {RouteRecordRaw} from 'vue-router';

export const usersRoutes: RouteRecordRaw[] = [
	{
		path: '/users/:id/manage',
		name: 'user/manage',
		component: () => import('@/views/_users/ManageUser/PageManageUser.vue'),
		meta: {
			requiresAuth: true,
			accessList: ['ADMIN', 'MANAGER', 'USER'],
		},
	},
	{
		path: '/users/all',
		name:'users/all',
		component: () => import('@/views/_users/ListUsers/PageListUsers.vue'),
		meta: {
			requiresAuth: true,
			accessList: ['ADMIN', 'MANAGER'],
		},
	},
];