<template>

	<BaseAppLayout>
		<template #topbar>
			<slot name="topbar">
				<AdminTopBar/>
			</slot>
		</template>

		<template #sidebar>
			<slot name="sidebar">
				<AdminSidebar/>
			</slot>
		</template>

		<template #title>
			<slot name="title"></slot>
		</template>
		
		<slot></slot>
		
	</BaseAppLayout>
	
</template>

<script setup lang="ts">
import BaseAppLayout from '@/layout/BaseAppLayout.vue';
import AdminSidebar from '@/layout/sideBar/AdminSidebar.vue';
import AdminTopBar from '@/layout/topBar/AdminTopBar.vue';
</script>

<style scoped>

</style>