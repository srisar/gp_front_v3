<template>
	<div class="drawer-mobile drawer">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" />

		<div class="drawer-content">
			<!-- region :Header: -->
			<header class="header">
				<label for="my-drawer" class="drawer-button flex items-center justify-center sm:hidden">
					<Bars3Icon class="h-6 w-6" />
				</label>

				<div class="flex h-full w-full items-center truncate">
					<div class="truncate uppercase lg:text-lg lg:font-bold">
						<slot name="title"></slot>
					</div>
				</div>

				<slot name="topbar">
					<DefaultTopBar />
				</slot>
			</header>
			<!-- endregion :Header: -->

			<!-- region :Main Content Area: -->
			<main class="">
				<slot></slot>
			</main>
			<!-- endregion :Main Content Area: -->
		</div>

		<!-- region :Drawer/Sidebar: -->
		<aside class="drawer-side">
			<label for="my-drawer" class="drawer-overlay"></label>

			<section class="flex h-full w-80 flex-col bg-sidebar-primary text-white">
				<!-- region :Drawer Header: -->
				<header class="h-[72px] shrink-0 bg-sidebar-secondary">
					<div class="flex h-full w-full items-center justify-center">
						<h1 class="text-3xl font-bold">{{ appTitle }}</h1>
					</div>
				</header>
				<!-- endregion :Drawer Header: -->

				<slot name="sidebar">
					<DefaultSideBar />
				</slot>

				<footer class="bg-sidebar-secondary p-4 text-end text-xs font-bold">{{ appTitle }} {{ appVersion }}</footer>
			</section>
		</aside>
		<!-- endregion :Drawer/Sidebar: -->
	</div>
</template>

<script setup lang="ts">
import { Bars3Icon } from "@heroicons/vue/24/solid";
import DefaultTopBar from "@/layout/topBar/DefaultTopBar.vue";
import DefaultSideBar from "@/layout/sideBar/DefaultSideBar.vue";
import { AppInfo } from "@/utilities/AppInfo";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region App Info */

const appTitle = AppInfo.getTitle();
const appVersion = AppInfo.getVersion();
/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped>
.header {
	@apply sticky top-0 z-10;
	@apply flex h-[72px] w-full gap-3 p-3;
	@apply bg-shade;
	@apply border-b border-b-secondary-alt;
}
</style>
