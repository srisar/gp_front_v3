<template>
	
	<BaseAppLayout>
		<template #title>All users</template>
		
		
		<section class="mx-auto max-w-3xl" v-if="apiFetchUsers.users">
			
			
			<!-- start:Users list -->
			<UsersList :users="apiFetchUsers.users"/>
			<!-- end:Users list -->
			
			
			<LoadingPlaceholder v-if="apiFetchUsers.isFetching">
				Fetching all users
			</LoadingPlaceholder>
		
		</section>
	
	
	</BaseAppLayout>

</template>

<script setup lang="ts">
import BaseAppLayout from '@/layout/BaseAppLayout.vue';
import {usePageStoreAllUsers} from '@/views/_users/ListUsers/users.all.page.store';
import {useFetchUsersApi} from '@/_backend/api/users/UsersApi';
import {onMounted, reactive} from 'vue';
import LoadingPlaceholder from '@/components/LoadingPlaceholder.vue';
import UsersList from '@/views/_users/ListUsers/UsersList.vue';


/* ------------------------------------------------------------------------------------------------------------------ */
/* region Stores, API */

const pageStore = usePageStoreAllUsers();
const apiFetchUsers = reactive(useFetchUsersApi());

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */



/* ------------------------------------------------------------------------------------------------------------------ */
/* region Init */

onMounted(async () => {
	await apiFetchUsers.execute();
});

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */


</script>

<style scoped>

</style>