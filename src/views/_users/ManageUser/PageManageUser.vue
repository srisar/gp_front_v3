<template>
	
	<BaseAppLayout>
		
		<template #title>Manage Current User</template>
		
		<!-- start:Manage user -->
		<div v-if="fetchUserApi.user" class="flex flex-col gap-5">
			<FormContainer class="max-w-2xl">
				
				<FormHeader>
					Manage user information
				</FormHeader>
				
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
					<ButtonPrimary @click="doUpdate()" :loading="updateUserApi.isFetching">Update</ButtonPrimary>
					<ButtonGhost>Cancel</ButtonGhost>
				</FormFooter>
				
				
				<FormFooter v-if="updateUserApi.error">
					{{ updateUserApi.errorMessage }}
				</FormFooter>
			
			</FormContainer>
			
			
			<!-- start:manage user password -->
			
			<UpdatePassword/>
			
			<!-- end:manage user password -->
		
		
		</div>
		<!-- end:Manage user -->
		
		
		<LoadingPlaceholder v-if="fetchUserApi.isFetching">
			Fetching user
		</LoadingPlaceholder>
	</BaseAppLayout>

</template>

<script setup lang="ts">
import {ref, reactive, onMounted, computed} from 'vue';
import BaseAppLayout from '@/layout/BaseAppLayout.vue';
import {useAuth} from '@/services/Auth';
import TextField from '@/components/form/fields/TextField.vue';
import FormRow from '@/components/form/containers/FormRow.vue';
import ButtonPrimary from '@/components/form/button/ButtonPrimary.vue';
import FormFooter from '@/components/form/containers/FormFooter.vue';
import ButtonGhost from '@/components/form/button/ButtonGhost.vue';
import FormContainer from '@/components/form/containers/FormContainer.vue';
import ListBox from '@/components/form/lists/ListBox.vue';
import type {ListBoxItem} from '@/components/form/lists/ListBoxItem';
import LoadingPlaceholder from '@/components/LoadingPlaceholder.vue';
import {required} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import TextLabel from '@/components/form/labels/TextLabel.vue';
import {useFetchUserApi, useUpdateUserApi} from '@/_backend/api/users/UsersApi';
import FormHeader from '@/components/form/containers/FormHeader.vue';
import UpdatePassword from '@/views/_users/ManageUser/UpdatePassword.vue';
import {usePageStoreUser} from '@/views/_users/ManageUser/user.page.store';
import {UserPatch} from '@/_backend/models/users/UserPatch';


/* ------------------------------------------------------------------------------------------------------------------ */
/* region Store */

const pageStore = usePageStoreUser();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */



/* ------------------------------------------------------------------------------------------------------------------ */
/* region Fetch user */

const auth = useAuth();
const fetchUserApi = reactive(useFetchUserApi(auth.getUser.id));

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
	{key: 'ADMIN', value: 'Administrator'},
	{key: 'USER', value: 'User'},
	{key: 'MANAGER', value: 'Manager'},
] as ListBoxItem[];


const formRules = computed(() => ({
	full_name: {required},
}));

const vuelidate = useVuelidate(formRules, user);


const updateUserApi = reactive(useUpdateUserApi());
const doUpdate = async () => {
	
	const validated = await vuelidate.value.$validate();
	if (!validated) return false;
	
	await updateUserApi.updateUser(user.value);
	
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */


</script>

<style scoped>

</style>