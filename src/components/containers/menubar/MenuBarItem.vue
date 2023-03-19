<template>
	<div class="flex items-center gap-2">
		<div class="shrink-0 text-sm font-semibold uppercase text-black" v-if="label">{{ label }}</div>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	label?: string;
}>();
</script>

<style scoped></style>
