<template>
	<BaseAppLayout>
		<template #title>Manage Current User</template>

		<PageContainer>
			<!-- region :Page: -->
			<SectionSmall v-if="apiFetchUser.user">
				<FormContainer class="">
					<FormHeader>Manage user information</FormHeader>

					<div class="mb-5 flex justify-center" v-if="profilePictureURL">
						<div class="avatar">
							<div class="w-24 rounded-full border-2 border-base-300">
								<img :src="profilePictureURL" alt="Profile picture" />
							</div>
						</div>
					</div>

					<FormRow columns="2">
						<TextField v-model="userUpdate.full_name" :invalid="vuelidateUserUpdate.full_name.$error" required>
							<template #label>Full name</template>
							<template #footer>
								<VuelidateErrors :field="vuelidateUserUpdate.full_name" />
							</template>
						</TextField>

						<TextField v-model="apiFetchUser.user.email" required readonly placeholder="Your email">
							<template #label>Email</template>
							<template #footer>
								<TextLabel type="warning">Email cannot be changed</TextLabel>
							</template>
						</TextField>
					</FormRow>

					<FormRow columns="2">
						<ListBox :list-items="userRoles" v-model="userUpdate.role" :disabled="userUpdate.id === 1">
							<template #label>Role</template>
						</ListBox>
					</FormRow>

					<FormFooter>
						<ButtonPrimary @click="doUpdate()" :loading="apiUpdateUser.isFetching">Update</ButtonPrimary>
						<ButtonGhost @click="doCancel()">Cancel</ButtonGhost>
					</FormFooter>
				</FormContainer>
			</SectionSmall>

			<SectionSmall>
				<UpdateProfilePicture :user="apiFetchUser.user" @update="apiFetchUser.execute()" />
			</SectionSmall>

			<SectionSmall>
				<!-- region :Update password: -->
				<UpdatePassword :user="apiFetchUser.user" />
				<!-- endregion :Update password: -->
			</SectionSmall>

			<!-- endregion :Page: -->
		</PageContainer>

		<LoadingPlaceholder v-if="apiFetchUser.isFetching">Fetching user</LoadingPlaceholder>
	</BaseAppLayout>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useMessageBox } from "@/components/gp_message_box/GPMessageBox.store";
import { useApiFetchUser, useApiUpdateUser } from "@/_backend/api/users/UsersApi";
import { required } from "@vuelidate/validators";
import BaseAppLayout from "@/layout/BaseAppLayout.vue";
import TextField from "@/components/form/fields/TextField.vue";
import FormRow from "@/components/form/containers/FormRow.vue";
import ButtonPrimary from "@/components/form/button/ButtonPrimary.vue";
import FormFooter from "@/components/form/containers/FormFooter.vue";
import ButtonGhost from "@/components/form/button/ButtonGhost.vue";
import FormContainer from "@/components/form/containers/FormContainer.vue";
import ListBox from "@/components/form/lists/ListBox.vue";
import LoadingPlaceholder from "@/components/LoadingPlaceholder.vue";
import useVuelidate from "@vuelidate/core";
import TextLabel from "@/components/form/labels/TextLabel.vue";
import UpdatePassword from "@/views/_users/ManageUser/UpdatePassword.vue";
import FormHeader from "@/components/form/containers/FormHeader.vue";
import PageContainer from "@/components/containers/PageContainer.vue";
import SectionSmall from "@/components/containers/SectionSmall.vue";
import type { ListBoxItem } from "@/components/form/lists/ListBoxItem";
import type { UserUpdate } from "@/_backend/models/users/UserUpdate";
import type { QueryFetchUser } from "@/_backend/models/users/query/QueryFetchUser";
import { EnumUserRole } from "@/_backend/models/users/EnumUserRole";
import { getUserProfilePictureURL } from "@/utilities/UploadedResourceUtils";
import UpdateProfilePicture from "@/views/_users/ManageUser/UpdateProfilePicture.vue";
import VuelidateErrors from "@/components/form/vuelidate/VuelidateErrors.vue";
import { useAuth } from "@/services/Auth";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Store, route */

const messageBox = useMessageBox();

const route = useRoute();
const router = useRouter();

const urlParams = {
	id: parseInt(route.params.id.toString()),
};
/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Route guard */

const auth = useAuth();

onBeforeRouteUpdate(() => {
	if (!auth.isAdminUser && urlParams.id !== auth.getUser.id) {
		router.push({
			name: "home",
		});
	}
});

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Fetch user */

const queryFetchUser = ref({
	id: urlParams.id,
} as QueryFetchUser);

const apiFetchUser = reactive(useApiFetchUser(queryFetchUser));

/*
 * Fetch user
 */
onMounted(async () => {
	await apiFetchUser.execute();

	userUpdate.id = apiFetchUser.user?.id;
	userUpdate.full_name = apiFetchUser.user?.full_name;
	userUpdate.role = apiFetchUser.user?.role;
});

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Update user */

const userUpdate = reactive({
	id: urlParams.id,
	full_name: "",
	role: EnumUserRole.USER,
} as UserUpdate);

const userRoles = [
	{ key: "ADMIN", value: "Administrator" },
	{ key: "USER", value: "User" },
	{ key: "MANAGER", value: "Manager" },
] as ListBoxItem[];

const userUpdateRules = computed(() => ({
	full_name: { required },
}));

const vuelidateUserUpdate = useVuelidate(userUpdateRules, userUpdate);

const apiUpdateUser = reactive(useApiUpdateUser(userUpdate));

/**
 * Update user
 */
const doUpdate = async () => {
	const validated = await vuelidateUserUpdate.value.$validate();
	if (!validated) return false;

	await apiUpdateUser.execute();
	if (apiUpdateUser.hasError) {
		messageBox.showAlert(apiUpdateUser.errorMessage);
		return false;
	}

	messageBox.showSuccess("User updated successfully", true);
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Cancel */

/**
 * Handle:
 */
const doCancel = () => {
	router.push({
		name: "users",
	});
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Profile picture */

const profilePictureURL = computed(() => {
	return getUserProfilePictureURL(apiFetchUser.user.profile_pic);
});

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
