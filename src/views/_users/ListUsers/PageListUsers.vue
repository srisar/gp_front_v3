<template>
    <BaseAppLayout>
        <template #title>All users</template>

        <!-- region :Menubar: -->
        <MenuBarContainer>
            <MenuBarItem label="User type">
                <ListBox :list-items="menuUserTypes" v-model="queryFetchUsers.role" :has-footer="false" :has-label="false" class="w-56" />
            </MenuBarItem>
            <MenuBarItem>
                <ButtonPrimary @click="doFilter()">Filter</ButtonPrimary>
            </MenuBarItem>
        </MenuBarContainer>
        <!-- endregion :Menubar: -->

        <!-- region :Page: -->
        <PageContainer>
            <SectionSmall v-if="apiFetchUsers.users.length > 0 && !apiFetchUsers.isFetching">
                <!-- start:Users list -->
                <UsersList :users="apiFetchUsers.users" />
                <!-- end:Users list -->

                <PaginationContainer class="mt-5" @click="toPage" :pagination-data="apiFetchUsers.paginatedUsers" />
            </SectionSmall>

            <LoadingPlaceholder v-if="apiFetchUsers.isFetching">Fetching all users</LoadingPlaceholder>
        </PageContainer>
        <!-- endregion :Page: -->
    </BaseAppLayout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useApiFetchUsers } from "@/_backend/api/users/UsersApi";
import BaseAppLayout from "@/layout/BaseAppLayout.vue";
import LoadingPlaceholder from "@/components/LoadingPlaceholder.vue";
import UsersList from "@/views/_users/ListUsers/UsersList.vue";
import PaginationContainer from "@/components/pagination/PaginationContainer.vue";
import SectionSmall from "@/components/containers/SectionSmall.vue";
import ListBox from "@/components/form/lists/ListBox.vue";
import MenuBarContainer from "@/components/containers/menubar/MenuBarContainer.vue";
import MenuBarItem from "@/components/containers/menubar/MenuBarItem.vue";
import ButtonPrimary from "@/components/form/button/ButtonPrimary.vue";
import type { ListBoxItem } from "@/components/form/lists/ListBoxItem";
import PageContainer from "@/components/containers/PageContainer.vue";
import type { QueryFetchUsers } from "@/_backend/models/users/query/QueryFetchUsers";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Init */

const queryFetchUsers = ref({
    page: 1,
    role: "ALL",
} as QueryFetchUsers);

const apiFetchUsers = reactive(useApiFetchUsers(queryFetchUsers));

onMounted(async () => {
    await apiFetchUsers.execute();
});

/**
 * Handle: Pagination event
 */
const toPage = async (_page: number) => {
    queryFetchUsers.value.page = _page;
    await apiFetchUsers.execute();
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Filter */

const menuUserTypes = [
    { key: "ALL", value: "All" },
    { key: "ADMIN", value: "Administrator" },
    { key: "MANAGER", value: "Manager" },
    { key: "USER", value: "User" },
] as ListBoxItem[];

/**
 * Handle: fetch based on filter
 */
const doFilter = async () => {
    queryFetchUsers.value.page = 1;
    await apiFetchUsers.execute();
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
