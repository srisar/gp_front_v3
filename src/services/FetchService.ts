import {createFetch} from '@vueuse/core';
import {AppInfo} from '@/utilities/AppInfo';
import {useAuth} from '@/services/Auth';

/**
 * Fetch instance that uses auth token
 */
export const useAPIFetch = createFetch({
	baseUrl: AppInfo.getApiBaseURL,
	options: {

		immediate: false,

		/**
		 * inject authentication header
		 */
		async beforeFetch({options, cancel}) {

			const auth = useAuth();

			if (auth.getToken !== '') {
				// @ts-ignore
				options.headers.Authorization = `Bearer ${auth.getToken}`;
			} else {
				cancel();
			}

			return {
				options,
			};

		},

		/**
		 * Intercept response and check for not-authorized response code
		 */
		onFetchError(ctx) {

			const auth = useAuth();

			if (ctx.response?.status === 401) {
				auth._resetToken();
			}

			return ctx;
		},

	},
	fetchOptions: {
		mode: 'cors',
	},
});


/**
 * Fetch instance used in authentication process
 */
export const useLoginFetch = createFetch({
	baseUrl: AppInfo.getApiBaseURL,
	options: {
		immediate: false,
	},
})('login').json();

