<template>
    <BaseAppLayout>
        <template #title>Manage Current User</template>

        <PageContainer>
            <!-- region :Page: -->
            <SectionSmall v-if="fetchUserApi.user">
                <FormContainer class="">
                    <FormHeader>Manage user information</FormHeader>

                    <FormRow columns="2">
                        <TextField v-model="user.full_name" :invalid="vuelidate.full_name.$error" required>
                            <template #label>Full name</template>
                            <template #footer v-if="vuelidate.full_name.$error">
                                <TextLabel type="error">Full name is required</TextLabel>
                            </template>
                        </TextField>

                        <TextField v-model="fetchUserApi.user.email" required readonly placeholder="Your email">
                            <template #label>Email</template>
                            <template #footer>
                                <TextLabel type="warning">Email cannot be changed</TextLabel>
                            </template>
                        </TextField>
                    </FormRow>

                    <FormRow columns="2">
                        <ListBox :list-items="userRoles" v-model="user.role" :disabled="user.id === 1">
                            <template #label>Role</template>
                        </ListBox>
                    </FormRow>

                    <FormFooter>
                        <ButtonPrimary @click="doUpdate()" :loading="apiUpdateUser.isFetching">Update</ButtonPrimary>
                        <ButtonGhost @click="doCancel()">Cancel</ButtonGhost>
                    </FormFooter>

                    <FormFooter v-if="apiUpdateUser.error">
                        {{ apiUpdateUser.errorMessage }}
                    </FormFooter>
                </FormContainer>
            </SectionSmall>

            <SectionSmall>
                <!-- region :Update password: -->
                <UpdatePassword />
                <!-- endregion :Update password: -->
            </SectionSmall>

            <!-- endregion :Page: -->
        </PageContainer>

        <LoadingPlaceholder v-if="fetchUserApi.isFetching">Fetching user</LoadingPlaceholder>
    </BaseAppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMessageBox } from '@/components/gp_message_box/GPMessageBox.store';
import { useApiUpdateUser, useApiFetchUser } from '@/_backend/api/users/UsersApi';
import { usePageStoreUser } from '@/views/_users/ManageUser/user.page.store';
import BaseAppLayout from '@/layout/BaseAppLayout.vue';
import TextField from '@/components/form/fields/TextField.vue';
import FormRow from '@/components/form/containers/FormRow.vue';
import ButtonPrimary from '@/components/form/button/ButtonPrimary.vue';
import FormFooter from '@/components/form/containers/FormFooter.vue';
import ButtonGhost from '@/components/form/button/ButtonGhost.vue';
import FormContainer from '@/components/form/containers/FormContainer.vue';
import ListBox from '@/components/form/lists/ListBox.vue';
import LoadingPlaceholder from '@/components/LoadingPlaceholder.vue';
import useVuelidate from '@vuelidate/core';
import TextLabel from '@/components/form/labels/TextLabel.vue';
import UpdatePassword from '@/views/_users/ManageUser/UpdatePassword.vue';
import FormHeader from '@/components/form/containers/FormHeader.vue';
import { required } from '@vuelidate/validators';
import type { ListBoxItem } from '@/components/form/lists/ListBoxItem';
import type { UserPatch } from '@/_backend/models/users/UserPatch';
import PageContainer from '@/components/containers/PageContainer.vue';
import SectionSmall from '@/components/containers/SectionSmall.vue';
import SectionMedium from '@/components/containers/SectionMedium.vue';

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Store, route */

const messageBox = useMessageBox();

const pageStore = usePageStoreUser();
const route = useRoute();

const urlParams = {
    id: parseInt(route.params.id.toString()),
};
/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Fetch user */

// const auth = useAuth();
const fetchUserApi = reactive(useApiFetchUser(urlParams.id));

/*
 * Fetch user
 */
onMounted(async () => {
    await fetchUserApi.execute();

    pageStore.user = fetchUserApi.user;

    user.value.id = fetchUserApi.user?.id;
    user.value.full_name = fetchUserApi.user?.full_name;
    user.value.role = fetchUserApi.user?.role;
});

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Update user */

const user = ref({} as UserPatch);
const userRoles = [
    { key: 'ADMIN', value: 'Administrator' },
    { key: 'USER', value: 'User' },
    { key: 'MANAGER', value: 'Manager' },
] as ListBoxItem[];

const formRules = computed(() => ({
    full_name: { required },
}));

const vuelidate = useVuelidate(formRules, user);

const apiUpdateUser = reactive(useApiUpdateUser());

/**
 * Update user
 */
const doUpdate = async () => {
    const validated = await vuelidate.value.$validate();
    if (!validated) return false;

    try {
        await apiUpdateUser.updateUser(user.value);
        messageBox.showSuccess('User updated successfully', true);
    } catch (e: any) {
        console.error(e);
        messageBox.showAlert('Failed to update');
    }
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Cancel */

/**
 * Handle:
 */
const doCancel = async () => {};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
