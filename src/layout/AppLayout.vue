<template>
	<BaseAppLayout>
		<template #topbar>
			<slot name="topbar"> </slot>
		</template>

		<template #sidebar>
			<slot name="sidebar"> </slot>
		</template>

		<template #title>
			<slot name="title"></slot>
		</template>

		<slot></slot>
	</BaseAppLayout>
</template>

<script setup lang="ts">
//
import BaseAppLayout from "@/layout/BaseAppLayout.vue";
</script>

<style scoped></style>
