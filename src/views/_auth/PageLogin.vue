<template>
	
	
	<div class="flex h-screen w-full items-center justify-center bg-neutral">
		
		<div class="w-96 p-5 bg-base-100">
			
			<header class="mb-10">
				<h1 class="text-2xl font-bold">Login</h1>
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
				
				
				<FormFooter>
					<ButtonPrimary block :loading="auth.loginFetch.isFetching" @click="doLogin()">
						Login
					</ButtonPrimary>
				</FormFooter>
				
				
				<FormFooter v-if="auth.loginFetch.error" class="w-full flex justify-center">
					<TextLabel type="error">
						{{ auth.loginFetch.data.error }}
					</TextLabel>
				</FormFooter>
			
			</div>
		
		</div>
	
	</div>


</template>

<script setup lang="ts">
import {ref, reactive, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useAuth} from '@/services/Auth';
import {useAppTitle} from '@/utilities/AppInfo';
import TextLabel from '@/components/form/labels/TextLabel.vue';
import FormContainer from '@/components/form/containers/FormContainer.vue';
import FormRow from '@/components/form/containers/FormRow.vue';
import TextField from '@/components/form/fields/TextField.vue';
import FormFooter from '@/components/form/containers/FormFooter.vue';
import ButtonPrimary from '@/components/form/button/ButtonPrimary.vue';
import NumberField from '@/components/form/fields/NumberField.vue';


useAppTitle('Login');

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
		await router.push({
			name: 'home',
		});
	}
	
};

</script>

<style scoped>

</style>