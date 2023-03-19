<template>
	<AppLayout>
		<template #title>Home</template>

		<PageContainer>
			<SectionMedium> App home page </SectionMedium>
		</PageContainer>
	</AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "@/layout/AppLayout.vue";
import PageContainer from "@/components/containers/PageContainer.vue";
import SectionMedium from "@/components/containers/SectionMedium.vue";
import { useAppTitle } from "@/utilities/AppInfo";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region App */

useAppTitle("Home");

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
