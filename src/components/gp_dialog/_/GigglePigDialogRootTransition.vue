<template>
	<TransitionRoot
		appear
		:show="open"
		as="template"
		enter="duration-300 ease-out"
		enter-from="opacity-0"
		enter-to="opacity-100"
		leave="duration-200 ease-in"
		leave-from="opacity-100"
		leave-to="opacity-0"
	>

		<slot></slot>

	</TransitionRoot>


</template>

<script setup lang="ts">
import {TransitionRoot} from "@headlessui/vue";


const props = defineProps({
	open: {
		type: Boolean,
		default: false
	}
});

</script>

<style scoped>

</style>