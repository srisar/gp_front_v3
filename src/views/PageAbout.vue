<template>

	<BaseAppLayout>
		<div>
			<h1 class="text-2xl">About us</h1>

			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam assumenda, debitis dolor earum eos est, illo obcaecati quaerat quia sapiente
				similique
				voluptatem voluptatibus. Cum ducimus magnam maiores quod sapiente!</p>

			<RouterLink to="/">Home</RouterLink>

		</div>

	</BaseAppLayout>


</template>

<script setup lang="ts">
import {ref, reactive} from 'vue';
import BaseAppLayout from '@/layout/BaseAppLayout.vue';


</script>

<style scoped>

</style>