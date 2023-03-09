<template>
	<header class="mb-32 bg-indigo-700 text-white">
		<section class="container mx-auto p-5 md:p-0">
			<!-- region :topnav: -->
			<nav class="top_nav">
				<LeftSide class="flex gap-10">
					<h1 class="text-2xl font-bold">Giggle Pig</h1>

					<button class="topnav_link">Pricing</button>
					<button class="topnav_link">Blog</button>
					<button class="topnav_link">Docs</button>
				</LeftSide>

				<RightSide class="flex gap-5">
					<button class="topnav_link">Sign in</button>
					<button class="get_started">Get started</button>
				</RightSide>
			</nav>
			<!-- endregion :topnav: -->

			<!-- region :Hero section: -->
			<section class="py-10">
				<div class="flex w-full justify-center">
					<GigglePigLogo class="w-[18rem] lg:hidden" />
				</div>

				<div class="flex flex-col lg:flex-row">
					<LeftSide class="basis-full lg:basis-5/12">
						<h1 class="mb-5 text-7xl font-bold">Full stack <span class="text-amber-300">highly-opinionated </span>framework built with PHP and Vue</h1>
						<p class="mb-5 text-lg opacity-60">Laravel's ORM, JWT based authentication super charged with Vue.js SPA awesomeness!</p>

						<button class="hero_button">Get started today!</button>
					</LeftSide>

					<RightSide class="hidden basis-full lg:flex lg:basis-7/12">
						<div class="flex w-full justify-center">
							<GigglePigLogo class="w-[32rem]" />
						</div>
					</RightSide>
				</div>
			</section>
			<!-- endregion :Hero section: -->
		</section>
	</header>

	<!-- region :Why: -->
	<section id="why" class="container mx-auto px-5 md:px-0">
		<h2 class="text-lg font-semibold uppercase text-indigo-500">Why Giggle Pig?</h2>

		<p class="mb-10 text-3xl lg:text-5xl lg:leading-tight">
			There are no fancy answers here. It was a pet project grown out of expectation and blown into full featured framework. In fact, it is two projects
			disguised as one.
		</p>

		<h2 class="text-lg font-semibold uppercase text-indigo-500">PHP based backend</h2>
		<p class="max-w-6xl text-3xl lg:text-5xl lg:leading-tight"></p>
	</section>
	<!-- endregion :Why: -->

	<!-- region :Footer: -->
	<footer class="mt-20"></footer>
	<!-- endregion :Footer: -->
</template>

<script setup lang="ts">
import LeftSide from "@/components/layout/LeftSide.vue";
import RightSide from "@/components/layout/RightSide.vue";
import GigglePigLogo from "@/assets/images/GigglePigLogo.vue";
</script>

<style scoped>
.top_nav {
	@apply flex items-center justify-between;
	@apply py-5;
}

.topnav_link {
	@apply uppercase opacity-60;
	@apply hover:opacity-100;
	@apply transition-all;
}

.get_started {
	@apply flex items-center justify-center;
	@apply rounded-full bg-white px-5 py-2;
	@apply font-bold uppercase text-indigo-500;
	@apply hover:bg-amber-400 hover:text-white;
	@apply transition-all;
}

.hero_button {
	@apply flex gap-5 px-6 py-4;
	@apply bg-amber-400;
	@apply text-2xl font-bold text-slate-900;
	@apply rounded-full;
	@apply hover:translate-x-5;
	@apply transition-all;
}
</style>
