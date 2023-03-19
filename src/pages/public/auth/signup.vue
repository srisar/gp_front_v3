<template>
	<div class="wrapper">
		<div class="signup_container">
			<LeftSide class="m-24 w-[24rem]">
				<FormRow>
					<TextField v-model="userCreate.full_name" :invalid="vuelidateCreateUser.full_name.$error">
						<template #label>Full name</template>
						<template #footer>
							<VuelidateErrors :field="vuelidateCreateUser.full_name" />
						</template>
					</TextField>
				</FormRow>

				<FormRow>
					<TextField v-model="userCreate.email" :invalid="vuelidateCreateUser.email.$error">
						<template #label>Email</template>
						<template #footer>
							<VuelidateErrors :field="vuelidateCreateUser.email" />
						</template>
					</TextField>
				</FormRow>

				<FormRow>
					<TextField v-model="userCreate.password" type="password" :invalid="vuelidateCreateUser.password.$error">
						<template #label>Password</template>
						<template #footer>
							<VuelidateErrors :field="vuelidateCreateUser.password" />
						</template>
					</TextField>
				</FormRow>

				<FormRow>
					<TextField v-model="userCreate.confirm_password" type="password" :invalid="vuelidateCreateUser.confirm_password.$error">
						<template #label>Confirm password</template>
						<template #footer>
							<VuelidateErrors :field="vuelidateCreateUser.confirm_password" />
						</template>
					</TextField>
				</FormRow>

				<div class="mt-5 flex flex-col items-end gap-5">
					<ButtonPrimary block @click="doCreate()">Register</ButtonPrimary>
					<RouterLink to="/signin" class="link-primary link uppercase">Sign in</RouterLink>
				</div>
			</LeftSide>

			<RightSide class="flex w-[36rem] flex-col items-center justify-center">
				<header class="mb-10">
					<h1 class="text-3xl font-bold text-primary">Signup for Mithril</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, dolorem eligendi et facere maxime nobis nostrum qui quisquam repudiandae
						veritatis? Commodi laborum nisi officia optio possimus quos tenetur ut voluptatem?
					</p>
				</header>

				<div></div>
			</RightSide>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useApiCreateUser } from "@/_backend/api/users/UsersApi";
import { useMessageBox } from "@/components/gp_message_box/GPMessageBox.store";
import { useRouter } from "vue-router";
import { useTitle } from "@vueuse/core";
import { EnumUserRole } from "@/_backend/models/users/EnumUserRole";
import { helpers, required, sameAs } from "@vuelidate/validators";
import LeftSide from "@/components/layout/LeftSide.vue";
import RightSide from "@/components/layout/RightSide.vue";
import FormRow from "@/components/form/containers/FormRow.vue";
import TextField from "@/components/form/fields/TextField.vue";
import ButtonPrimary from "@/components/form/button/ButtonPrimary.vue";
import useVuelidate from "@vuelidate/core";
import VuelidateErrors from "@/components/form/vuelidate/VuelidateErrors.vue";
import type { UserCreate } from "@/_backend/models/users/UserCreate";
import { AppInfo } from "@/utilities/AppInfo";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Page */

const appTitle = AppInfo.getTitle();
useTitle("Signup");

const messageBox = useMessageBox();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Router, Routes */

const router = useRouter();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Create user */

const userCreate = reactive({
	confirm_password: "",
	email: "",
	full_name: "",
	password: "",
	role: EnumUserRole.USER,
} as UserCreate);

const apiCreateUser = reactive(useApiCreateUser(userCreate));

const createUserRules = computed(() => ({
	full_name: {
		required: helpers.withMessage("Full name is required", required),
	},
	email: {
		required: helpers.withMessage("Email is required", required),
	},

	password: {
		required: helpers.withMessage("Password is required", required),
	},

	confirm_password: {
		sameAd: helpers.withMessage("Should match password", sameAs(userCreate.password)),
	},
}));

const vuelidateCreateUser = useVuelidate(createUserRules, userCreate);

const doCreate = async () => {
	const validated = await vuelidateCreateUser.value.$validate();
	if (!validated) return false;

	await apiCreateUser.execute();

	if (apiCreateUser.hasError) {
		messageBox.showAlert("Failed to create user");
		return false;
	}

	await router.push({ name: "login" });
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped>
.wrapper {
	@apply flex h-screen w-full items-center justify-center;
	@apply bg-neutral;
}

.signup_container {
	@apply flex gap-5 rounded-lg bg-white;
}
</style>
