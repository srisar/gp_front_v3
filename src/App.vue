<template>
	<RouterView v-slot="{ Component }">
		<template v-if="Component">
			<Transition mode="out-in" name="route_transition">
				<Suspense>
					<!-- main content -->
					<component :is="Component" :key="$route.path"></component>

					<!-- loading state -->
					<template #fallback> Loading...</template>
				</Suspense>
			</Transition>
		</template>
	</RouterView>

	<GPMessageBox />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAuth } from '@/services/Auth';
import { AppInfo, useAppTitle } from '@/utilities/AppInfo';
import GPMessageBox from '@/components/gp_message_box/GPMessageBox.vue';

useAppTitle('App');

/*
 * Router view handling with suspense
 * https://vuejs.org/guide/built-ins/suspense.html#combining-with-other-components
 * https://router.vuejs.org/guide/advanced/transitions.html
 */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Router */

const router = useRouter();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

const auth = useAuth();

if (!auth.hasValidToken) {
	router.push({
		name: 'auth/login',
	});
}
</script>

<style>
.route_transition-enter-active,
.route_transition-leave-active {
	transition: opacity 0.2s ease, transform 0.2s;
}

.route_transition-enter-from,
.route_transition-leave-to {
	opacity: 0;
	transform: translateY(10px);
}
</style>
