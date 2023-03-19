<template>
	<AppLayout>
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
	</AppLayout>
</template>

<script setup lang="ts">
import type { QueryFetchUser } from "@/_backend/models/users/query/QueryFetchUser";
import type { UserUpdate } from "@/_backend/models/users/UserUpdate";
import type { ListBoxItem } from "@/components/form/lists/ListBoxItem";
import { EnumUserRole } from "@/_backend/models/users/EnumUserRole";
import { useRoute, useRouter } from "vue-router";
import { useApiFetchUser, useApiUpdateUser } from "@/_backend/api/users/UsersApi";
import { useMessageBox } from "@/components/gp_message_box/GPMessageBox.store";
import { useAuth } from "@/services/Auth";
import { getUserProfilePictureURL } from "@/utilities/UploadedResourceUtils";
import { required } from "@vuelidate/validators";
import { computed, onMounted, reactive, ref } from "vue";
import PageContainer from "@/components/containers/PageContainer.vue";
import SectionSmall from "@/components/containers/SectionSmall.vue";
import ButtonGhost from "@/components/form/button/ButtonGhost.vue";
import ButtonPrimary from "@/components/form/button/ButtonPrimary.vue";
import FormContainer from "@/components/form/containers/FormContainer.vue";
import FormFooter from "@/components/form/containers/FormFooter.vue";
import FormHeader from "@/components/form/containers/FormHeader.vue";
import FormRow from "@/components/form/containers/FormRow.vue";
import TextField from "@/components/form/fields/TextField.vue";
import TextLabel from "@/components/form/labels/TextLabel.vue";
import VuelidateErrors from "@/components/form/vuelidate/VuelidateErrors.vue";
import LoadingPlaceholder from "@/components/LoadingPlaceholder.vue";
import AppLayout from "@/layout/AppLayout.vue";
import useVuelidate from "@vuelidate/core";
import UpdateProfilePicture from "@/page_components/users/UpdateProfilePicture.vue";
import UpdatePassword from "@/page_components/users/UpdatePassword.vue";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Store, route */

const messageBox = useMessageBox();

const route = useRoute();
const router = useRouter();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Route guard */

const auth = useAuth();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Fetch user */

const queryFetchUser = ref({
	id: auth.getUserId,
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
	id: auth.getUserId,
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
