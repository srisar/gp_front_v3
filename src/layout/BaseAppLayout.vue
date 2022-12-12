<template>
	
	<div class="drawer drawer-mobile">
		<input id="my-drawer" type="checkbox" class="drawer-toggle"/>
		
		<div class="drawer-content">
			<!-- Page content here -->
			
			<!-- START: Header -->
			<header class="header">
				
				<!-- start:mobile drawer toggle button -->
				<label for="my-drawer" class="flex items-center justify-center drawer-button sm:hidden">
					<Bars3Icon class="h-6 w-6"/>
				</label>
				<!-- end:mobile drawer toggle button -->
				
				<div class="flex h-full w-full items-center truncate">
					<div class="truncate uppercase lg:text-lg lg:font-bold">
						<slot name="title"></slot>
					</div>
				
				</div>
				
				<slot name="topbar">
					<DefaultTopBar/>
				</slot>
			
			</header>
			<!-- END: Header -->
			
			<!-- START: Main page content area -->
			<main class="p-5">
				<slot></slot>
			</main>
			<!-- END: Main page content area -->
		
		</div>
		
		
		<!-- START: Side Bar -->
		<aside class="border drawer-side border-r-base-300">
			<label for="my-drawer" class="drawer-overlay"></label>
			
			<section class="w-80 bg-base-200 text-base-content flex h-full flex-col">
				
				<!-- start:Side Bar Header -->
				<header class="bg-base-300 h-[72px] shrink-0">
					<div class="flex h-full w-full items-center justify-center">
						<h1 class="font-bold text-3xl">Giggle Pig V3</h1>
					</div>
				</header>
				<!-- end:Side Bar Header -->
				
				
				<DefaultSideBar/>
				
				<footer class="bg-base-300 p-4 text-xs font-bold">
					Giggle Pig v 1.0
				</footer>
			
			</section>
		</aside>
		<!-- END: Side Bar -->
	
	</div>

</template>

<script setup lang="ts">
import {ref, reactive} from 'vue';
import {Bars3Icon} from '@heroicons/vue/24/solid';
import DefaultTopBar from '@/layout/topBar/DefaultTopBar.vue';
import DefaultSideBar from '@/layout/sideBar/DefaultSideBar.vue';


</script>

<style scoped>


.header {
	@apply sticky top-0;
	@apply flex gap-3 p-3 h-[72px] w-full;
	@apply bg-base-100;
	@apply border-b border-b-base-300;
}

</style>