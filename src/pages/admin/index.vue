<template>
	<AdminLayout>
		<template #title>Admin Dashboard</template>

		<PageContainer>
			<SectionMedium>
				<h1>Admin homepage content here</h1>
			</SectionMedium>
		</PageContainer>
	</AdminLayout>
</template>

<script setup lang="ts">
import PageContainer from "@/components/containers/PageContainer.vue";
import SectionSmall from "@/components/containers/SectionSmall.vue";
import AdminSidebar from "@/layout/sideBar/AdminSidebar.vue";
import AdminLayout from "@/layout/AdminLayout.vue";
import { useAppTitle } from "@/utilities/AppInfo";
import SectionMedium from "@/components/containers/SectionMedium.vue";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region App Info */

useAppTitle("Admin");

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
