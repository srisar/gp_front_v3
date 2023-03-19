<template>
	<nav class="menu h-full p-4">
		<!-- start:Top -->
		<div class="flex-1">
			<ul class="menu mb-5">
				<li class="menu-title">
					<span>Pages</span>
				</li>
				<li>
					<RouterLink :to="{ name: 'admin/index' }">
						<IconHome />
						Dashboard
					</RouterLink>
				</li>
				<li>
					<RouterLink :to="{ name: 'app/index' }">
						<IconHome />
						App
					</RouterLink>
				</li>
			</ul>

			<ul class="menu">
				<li class="menu-title">
					<span>User management</span>
				</li>

				<li>
					<RouterLink :to="{ name: 'admin/users' }">
						<IconUsers />
						All Users
					</RouterLink>
				</li>
				<li>
					<RouterLink :to="{ name: 'admin/user/create' }">
						<IconCreateUser />
						Create User
					</RouterLink>
				</li>
			</ul>
		</div>
		<!-- end:Top -->

		<!-- start:Bottom -->
		<div class="h-1"></div>

		<!-- end:Bottom -->
	</nav>
</template>

<script setup lang="ts">
import IconUsers from "@/assets/icons/elements/IconUsers.vue";
import IconCreateUser from "@/assets/icons/actions/IconCreateUser.vue";
import { useAuth } from "@/services/Auth";
import IconHome from "@/assets/icons/elements/IconHome.vue";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Auth */

const auth = useAuth();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped lang="scss"></style>
