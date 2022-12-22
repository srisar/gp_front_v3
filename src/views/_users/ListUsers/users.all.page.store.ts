import {defineStore} from 'pinia';
import type {UserGet} from '@/_backend/models/users/UserGet';
import {useFetchUsersApi} from '@/_backend/api/users/UsersApi';


export const usePageStoreAllUsers = defineStore('page:users/all', {
	state: () => ({

		users: [] as UserGet[],

	}),

	getters: {},

	actions: {

		async getAllUsers(){



		},

	}
});