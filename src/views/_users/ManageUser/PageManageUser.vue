<template>
	<BaseAppLayout>
		<template #title>Manage Current User</template>
		
		<!-- start:Manage user -->
		<div v-if='fetchUserApi.user' class='flex flex-col gap-5'>
			<FormContainer class='max-w-2xl'>
				<FormHeader> Manage user information</FormHeader>
				
				<FormRow columns='2'>
					<TextField v-model='user.full_name' :invalid='vuelidate.full_name.$error' required>
						<template #label>Full name</template>
						<template #footer v-if='vuelidate.full_name.$error'>
							<TextLabel type='error'>Full name is required</TextLabel>
						</template>
					</TextField>
					
					<TextField v-model='fetchUserApi.user.email' required readonly placeholder='Your email'>
						<template #label>Email</template>
						<template #footer>
							<TextLabel type='warning'>Email cannot be changed</TextLabel>
						</template>
					</TextField>
				</FormRow>
				
				<FormRow columns='2'>
					<ListBox :list-items='userRoles' v-model='user.role' :disabled='user.id === 1'>
						<template #label>Role</template>
					</ListBox>
				</FormRow>
				
				<FormFooter>
					<ButtonPrimary @click='doUpdate()' :loading='updateUserApi.isFetching'>Update</ButtonPrimary>
					<ButtonGhost @click='doCancel()'>Cancel</ButtonGhost>
				</FormFooter>
				
				<FormFooter v-if='updateUserApi.error'>
					{{ updateUserApi.errorMessage }}
				</FormFooter>
			</FormContainer>
			
			<!-- start:manage user password -->
			
			<UpdatePassword />
			
			<!-- end:manage user password -->
		</div>
		<!-- end:Manage user -->
		
		<LoadingPlaceholder v-if='fetchUserApi.isFetching'> Fetching user</LoadingPlaceholder>
	</BaseAppLayout>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, computed } from 'vue';
import BaseAppLayout from '@/layout/BaseAppLayout.vue';
import { useAuth } from '@/services/Auth';
import TextField from '@/components/form/fields/TextField.vue';
import FormRow from '@/components/form/containers/FormRow.vue';
import ButtonPrimary from '@/components/form/button/ButtonPrimary.vue';
import FormFooter from '@/components/form/containers/FormFooter.vue';
import ButtonGhost from '@/components/form/button/ButtonGhost.vue';
import FormContainer from '@/components/form/containers/FormContainer.vue';
import ListBox from '@/components/form/lists/ListBox.vue';
import type { ListBoxItem } from '@/components/form/lists/ListBoxItem';
import LoadingPlaceholder from '@/components/LoadingPlaceholder.vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import TextLabel from '@/components/form/labels/TextLabel.vue';
import { useFetchUserApi, useUpdateUserApi } from '@/_backend/api/users/UsersApi';
import FormHeader from '@/components/form/containers/FormHeader.vue';
import UpdatePassword from '@/views/_users/ManageUser/UpdatePassword.vue';
import { usePageStoreUser } from '@/views/_users/ManageUser/user.page.store';
import type { UserPatch } from '@/_backend/models/users/UserPatch';
import { useRoute } from 'vue-router';
import GPDialog from '@/components/gp_dialog/GPDialog.vue';
import { useGPNotifications } from '@/components/gp_message_box/GPMessageBox.store';
import { promiseTimeout } from '@vueuse/core';

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Store, route */

const storeMessageBox = useGPNotifications();

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
const fetchUserApi = reactive(useFetchUserApi(urlParams.id));

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

const updateUserApi = reactive(useUpdateUserApi());

/**
 * Update user
 */
const doUpdate = async () => {
	const validated = await vuelidate.value.$validate();
	if (!validated) return false;
	
	try {
		
		throw new Error('Hello');
		await updateUserApi.updateUser(user.value);
		
		
		storeMessageBox.showSuccess('User updated successfully', true);
		
	} catch (e: any) {
		console.error(e);
		storeMessageBox.showAlert('Something happened!');
	}
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Cancel */

/**
 * Handle:
 */
const doCancel = async () => {

};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
