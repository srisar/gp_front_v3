<template>
	<nav class="menu h-full p-4">
		<!-- start:Top -->
		<div class="flex-1">
			<ul class="menu">
				<li class="menu-title">
					<span>App</span>
				</li>
				<li>
					<RouterLink to="/app">Home</RouterLink>
				</li>
			</ul>
		</div>
		<!-- end:Top -->

		<!-- start:Bottom -->
		<div class="h-1"></div>
		<ul class="menu" v-if="auth.isAdminUser">
			<li class="menu-title">
				<span>Admin management</span>
			</li>
			<li>
				<RouterLink :to="{ name: 'admin/index' }">
					<IconHome />
					Dashboard
				</RouterLink>
			</li>
		</ul>
		<!-- end:Bottom -->
	</nav>
</template>

<script setup lang="ts">
import IconUsers from "@/assets/icons/elements/IconUsers.vue";
import { useAuth } from "@/services/Auth";
import IconHome from "@/assets/icons/elements/IconHome.vue";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Auth */

const auth = useAuth();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped lang="scss">
.menu {
	a {
		@apply hover:text-primary;
	}
}
</style>
