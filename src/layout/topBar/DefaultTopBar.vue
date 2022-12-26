<template>
    <div class="z-50 flex shrink-0 justify-end">
        <div class="dropdown-end dropdown">
            <button class="btn-secondary btn-circle btn" tabindex="0">User</button>
            <ul tabindex="0" class="dropdown-content menu z-50 w-52 rounded bg-base-100 p-2 shadow">
                <li>
                    <button @click="toManageUser()">
                        <IconUser class="" />
                        Manage user
                    </button>
                </li>
                <li>
                    <button @click="doLogout()">
                        <IconSignOut />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import IconUser from '@/assets/icons/elements/IconUser.vue';
import IconSignOut from '@/assets/icons/actions/IconSignOut.vue';
import { useAuth } from '@/services/Auth';

const auth = useAuth();
const router = useRouter();

/**
 * Handle:
 */
const doLogout = () => {
    router.push({
        name: 'auth/logout',
    });
};

/**
 * Handle:
 */
const toManageUser = () => {
    router.push({
        name: 'user/manage',
        params: {
            id: auth.getUser.id,
        },
    });
};
</script>

<style scoped></style>
