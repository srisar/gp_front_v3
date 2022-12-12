<template>


	<div class="flex h-screen w-full items-center justify-center bg-neutral">

		<div class="w-96 p-5 bg-base-100">

			<header class="">
				<h1 class="text-2xl font-bold text-center">Signing out...</h1>
			</header>


		</div>

	</div>


</template>

<script setup lang="ts">
import {onBeforeRouteUpdate, useRouter} from 'vue-router';
import {onBeforeMount, onMounted} from 'vue';
import {promiseTimeout} from '@vueuse/core';
import {useAuth} from '@/services/Auth';


const router = useRouter();

/* -------------------------------------------------------------------------------------------------------------------------------------- */
/* region Auth service */

const auth = useAuth();


onMounted(async () => {

	await promiseTimeout(1000);

	auth.logout();

	await router.push({
		name: 'auth/login',
	});

});

/* endregion */
/* -------------------------------------------------------------------------------------------------------------------------------------- */


</script>

<style scoped>

</style>