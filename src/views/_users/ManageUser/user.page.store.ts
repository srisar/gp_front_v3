import {createPinia, defineStore} from 'pinia';
import type {UserGet} from '@/_backend/models/users/UserGet';

export const usePageStoreUser = defineStore('page:users/current', {

	state: () => ({

		user: {} as UserGet,

	}),

	getters: {},

	actions: {}

});