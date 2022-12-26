<template>
    <BaseAppLayout>
        <div>
            <div>Is Fetching: {{ fetchUsers.isFetching }}</div>

            <div class="mb-5 flex gap-5">
                <button class="btn" @click="fetchUsers.execute()">Fetch users</button>

                <div v-if="fetchUsers.canAbort">
                    <button class="btn-primary btn" @click="fetchUsers.abort()">Cancel request</button>
                </div>
            </div>

            <div v-for="user in fetchUsers.users">
                {{ user.email }}
                {{ user.full_name }}
            </div>
        </div>

        <div v-if="fetchUser.user">
            {{ fetchUser.user.full_name }}
        </div>
    </BaseAppLayout>
</template>

<script setup lang="ts">
import BaseAppLayout from '@/layout/BaseAppLayout.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useApiFetchUser, useApiFetchUsers } from '@/_backend/api/users/UsersApi';

const fetchUsers = reactive(useApiFetchUsers());

const fetchUser = reactive(useApiFetchUser(1));

onMounted(() => {
    fetchUser.execute();
});
</script>

<style scoped></style>
