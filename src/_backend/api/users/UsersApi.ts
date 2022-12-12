import {useAPIFetch} from '@/services/FetchService';
import {computed} from 'vue';
import type {UserGet} from '@/_backend/models/users/UserGet';
import type {UserPatch} from '@/_backend/models/users/UserPatch';


/**
 * Fetch all users
 */
export function useFetchUsersApi() {

	const {data, error, isFetching, execute, canAbort, abort} = useAPIFetch('users/all').json();

	const users = computed<UserGet[]>(() => {

		if (error != null && data.value) {
			return data.value;
		}
		return [];
	});

	return {error, isFetching, execute, users, canAbort, abort};
}


/**
 * Fetch single user
 */
export function useFetchUserApi(userId: number) {

	const urlParam = new URLSearchParams({id: userId.toString()});

	const {data, error, isFetching, execute, canAbort, abort} = useAPIFetch('users/single?' + urlParam.toString()).json();

	const user = computed<UserGet>(() => {
		if (error.value == null) {
			return data.value;
		}
		return {};
	});

	return {error, isFetching, execute, canAbort, abort, data, user};

}


/**
 * Update user
 */
export function useUpdateUserApi() {

	const {data, error, isFetching, execute, patch} = useAPIFetch('users/update').json();

	const updatedUser = computed<UserGet>(() => {
		if (error != null) {
			return data.value;
		}
		return {};
	});


	const errorMessage = computed(() => {
		return data.value.error;
	});


	const updateUser = async (user: UserPatch) => {
		patch({
			id: user.id,
			full_name: user.full_name,
			role: user.role,
		});

		await execute();
	};


	return {error, errorMessage, isFetching, updateUser, updatedUser};

}
