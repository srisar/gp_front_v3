import {createPinia, defineStore} from 'pinia';
import type {User} from '@/_backend/models/auth/User';

export const usePageStoreUser = defineStore('Page: User', {

	state: () => ({

		user: {} as User,

	}),

	getters: {},

	actions: {}

});