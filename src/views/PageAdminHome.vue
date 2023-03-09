<template>
	<BaseAppLayout>
		<PageContainer>
			<SectionSmall>
				<FormRow>
					<TextField v-model="symbol">
						<template #label>Symbol Name</template>
					</TextField>
					<ButtonPrimary @click="doFetch">Fetch</ButtonPrimary>
				</FormRow>

				<pre>{{ data }}</pre>
			</SectionSmall>
		</PageContainer>
	</BaseAppLayout>
</template>

<script setup lang="ts">
import BaseAppLayout from "@/layout/BaseAppLayout.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useApiFetchUser, useApiFetchUsers } from "@/_backend/api/users/UsersApi";
import { useFetch } from "@vueuse/core";
import TextField from "@/components/form/fields/TextField.vue";
import FormRow from "@/components/form/containers/FormRow.vue";
import PageContainer from "@/components/containers/PageContainer.vue";
import SectionSmall from "@/components/containers/SectionSmall.vue";
import ButtonPrimary from "@/components/form/button/ButtonPrimary.vue";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Fetch Stock data */

const symbol = ref("SLTL.N0000");

const { data, post, isFetching, execute } = useFetch("https://www.cse.lk/api/homeCompanyData", { immediate: false }).json();

const fetchData = async (symbol: string = "SLTL.N0000") => {
	let formData = new FormData();
	formData.append("symbol", symbol);

	post(formData);
	await execute();
};

onMounted(async () => {
	await fetchData();
});

const doFetch = async () => {
	await fetchData(symbol.value);
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
