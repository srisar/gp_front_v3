<template>
	
	<FormContainer class="max-w-2xl">
		
		<FormHeader>Update password</FormHeader>
		
		<FormBody>
			
			<FormRow columns="2">
				
				<TextField>
					<template #label>Current password</template>
					<template #footer>
					
					</template>
				</TextField>
			
			</FormRow>
			
			<FormRow columns="2">
				
				<TextField>
					<template #label>New password</template>
					<template #footer>
					
					</template>
				</TextField>
				
				<TextField>
					<template #label>Confirm new password</template>
					<template #footer>
					
					</template>
				</TextField>
			
			</FormRow>
			
			<FormFooter>
				
				<ButtonPrimary>Update Password</ButtonPrimary>
			
			</FormFooter>
		
		</FormBody>
	
	</FormContainer>
	

</template>

<script setup lang="ts">
import FormContainer from '@/components/form/containers/FormContainer.vue';
import FormHeader from '@/components/form/containers/FormHeader.vue';
import FormBody from '@/components/form/containers/FormBody.vue';
import FormRow from '@/components/form/containers/FormRow.vue';
import TextField from '@/components/form/fields/TextField.vue';
import FormFooter from '@/components/form/containers/FormFooter.vue';
import ButtonPrimary from '@/components/form/button/ButtonPrimary.vue';
import {usePageStoreUser} from '@/views/_users/ManageUser/user.page.store';


/* ------------------------------------------------------------------------------------------------------------------ */
/* region Store */

const pageStore = usePageStoreUser();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Update password */





/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */


</script>

<style scoped>

</style>