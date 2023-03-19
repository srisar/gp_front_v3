<template>
	<div class="wrapper">
		<div class="signin_container">
			<header class="mb-10">
				<h1 class="text-center text-2xl font-bold uppercase">Sign in to {{ appTitle }}</h1>
			</header>

			<div>
				<FormRow columns="1">
					<TextField v-model="auth.email">
						<template #label>Username</template>
					</TextField>
				</FormRow>

				<FormRow columns="1">
					<TextField v-model="auth.password" type="password">
						<template #label>Password</template>
					</TextField>
				</FormRow>

				<FormFooter class="flex-col items-end">
					<ButtonPrimary block :loading="auth.loginFetch.isFetching" @click="doLogin()"> Sign in </ButtonPrimary>
					<RouterLink to="/signup" class="link-primary link uppercase">Create an account</RouterLink>
				</FormFooter>

				<FormFooter v-if="auth.loginFetch.error" class="flex w-full justify-center">
					<TextLabel type="error">
						{{ auth.loginFetch.data.error }}
					</TextLabel>
				</FormFooter>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/services/Auth";
import { AppInfo, useAppTitle } from "@/utilities/AppInfo";
import TextLabel from "@/components/form/labels/TextLabel.vue";
import FormRow from "@/components/form/containers/FormRow.vue";
import TextField from "@/components/form/fields/TextField.vue";
import FormFooter from "@/components/form/containers/FormFooter.vue";
import ButtonPrimary from "@/components/form/button/ButtonPrimary.vue";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region App */

const appTitle = AppInfo.getTitle();
useAppTitle("Signin");

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* -------------------------------------------------------------------------------------------------------------------------------------- */
/* region Router */

const router = useRouter();

/* endregion */
/* -------------------------------------------------------------------------------------------------------------------------------------- */

const auth = useAuth();

/**
 * Handle:
 */
const doLogin = async () => {
	const result = await auth.tryLogin();

	if (result) {
		/*
		 * Check user type
		 */

		if (auth.isAdminUser) {
			await router.push({
				name: "admin/index",
			});
			return false;
		}

		if (auth.isAppUser) {
			await router.push({
				name: "app/index",
			});
		}
	}
};
</script>

<style scoped>
.wrapper {
	@apply flex h-screen w-full items-center justify-center;
	@apply bg-neutral;
}

.signin_container {
	@apply w-96 rounded-lg bg-base-100 p-5;
}
</style>
