import { useAPIFetch } from '@/services/FetchService';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import type { UserGet } from '@/_backend/models/users/UserGet';
import type { UserPatch } from '@/_backend/models/users/UserPatch';
import type { UserPasswordPatch } from '@/_backend/models/users/UserPasswordPatch';
import type { PaginatedItems } from '@/_backend/models/PaginatedItems';
import type { UserPost } from '@/_backend/models/users/UserPost';

/**
 * API: Fetch all users
 */
export const useApiFetchUsers = (page: Ref, role: Ref) => {
    const url = ref('users/all');

    const { data, error, isFetching, execute: fetch, canAbort, abort, get } = useAPIFetch(url).json();

    const users = computed<UserGet[]>(() => {
        if (error != null && data.value) {
            return data.value.data;
        }
        return [];
    });

    const paginatedUsers = computed<PaginatedItems<UserGet>>(() => {
        if (error != null && data.value) {
            return data.value;
        }
    });

    const execute = async () => {
        let searchParams = new URLSearchParams();
        searchParams.append('page', page.value.toString());
        if (role.value !== 'ALL') searchParams.append('role', role.value);

        url.value = 'users/all?' + searchParams.toString();
        console.log(url.value);
        get();

        await fetch();
    };

    return { error, isFetching, users, canAbort, abort, paginatedUsers, execute };
};

/**
 * API: Fetch single user
 */
export function useApiFetchUser(userId: number) {
    const urlParam = new URLSearchParams({ id: userId.toString() });

    const { data, error, isFetching, execute, canAbort, abort } = useAPIFetch('users/single?' + urlParam.toString()).json();

    const user = computed<UserGet>(() => {
        if (error.value == null) {
            return data.value;
        }
        return {};
    });

    return { error, isFetching, execute, canAbort, abort, data, user };
}

/**
 * API: Update user
 */
export function useApiUpdateUser() {
    const { data, error, isFetching, execute, patch } = useAPIFetch('users/update').json();

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

    return { error, errorMessage, isFetching, updateUser, updatedUser };
}

/**
 * API: Update password
 */
export function useApiUpdateUserPassword() {
    const { data, error, isFetching, execute, patch } = useAPIFetch('users/single/update-password').json();

    const updatedUser = computed<UserGet>(() => {
        if (error != null) {
            return data.value;
        }
        return {};
    });

    const errorMessage = computed(() => {
        return data.value.error;
    });

    const updatePassword = async (data: UserPasswordPatch) => {
        patch({ ...data });

        await execute();
    };

    return { error, errorMessage, isFetching, updatePassword, updatedUser };
}

/**
 * API: Create user
 */
export function useApiCreateUser(userToPost: Ref<UserPost>) {
    const { data, error, isFetching, execute: exec, post } = useAPIFetch('users/create').json();

    const createdUser = computed<UserGet>(() => {
        if (error != null) {
            return data.value;
        }
        return {};
    });

    const errorMessage = computed(() => {
        return data.value.error;
    });

    const execute = async () => {
        post({
            email: userToPost.value.email,
            full_name: userToPost.value.full_name,
            role: userToPost.value.role,
            password: userToPost.value.password,
        });

        await exec();
    };

    return { error, isFetching, execute, errorMessage, createdUser };
}
