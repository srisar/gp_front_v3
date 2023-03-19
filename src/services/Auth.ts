import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { isEmpty } from "lodash";
import { useLoginFetch } from "@/services/FetchService";
import { EnumUserRole } from "@/_backend/models/users/EnumUserRole";
import type { TokenUser } from "@/_backend/models/auth/TokenUser";

/*
 * Constants
 */
const STORE_AUTH_TOKEN = "xx-public-token";
const STORE_AUTH_USER = "xx-public-user";

/**
 * Store: Auth
 */
export const useAuth = defineStore("public", {
	state: () => ({
		_token: useStorage(STORE_AUTH_TOKEN, ""),
		_user: useStorage(STORE_AUTH_USER, {} as TokenUser),

		email: "admin@example.com",
		password: "admin",

		loginFetch: useLoginFetch,
	}),

	getters: {
		getToken(state) {
			return state._token;
		},

		getUser(state): TokenUser {
			return state._user;
		},

		getUserId(state): number {
			return state._user.id;
		},

		hasValidToken(state) {
			return !isEmpty(state._token) || !isEmpty(state._user);
		},

		isAdminUser(state) {
			return state._user.role === EnumUserRole.ADMIN;
		},

		isAppUser(state) {
			return state._user.role === EnumUserRole.USER;
		},
	},

	actions: {
		_setToken(token: string, user: TokenUser) {
			this._token = token;
			this._user = user;
		},

		_resetToken() {
			this._token = "";
			this._user = {} as TokenUser;
		},

		/**
		 * Try login user
		 */
		async tryLogin() {
			this.loginFetch.post({
				email: this.email,
				password: this.password,
			});

			await this.loginFetch.execute();

			if (this.loginFetch.error == null) {
				const data = this.loginFetch.data;
				this._setToken(data.token, data.user);

				return true;
			}
			return false;
		},

		/**
		 * Logout, clear token
		 */
		logout() {
			this._resetToken();
		},
	},
});
