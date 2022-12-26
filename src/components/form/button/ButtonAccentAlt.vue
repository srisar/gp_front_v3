<template>
	<button class="btn_accent_alt" :class="classList">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Props */

interface Props {
	loading?: boolean;
	block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	loading: false,
	block: false,
});

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

const classList = computed(() => {
	let classes: string[] = [];

	if (props.block) {
		classes.push('btn-block');
	}

	if (props.loading) {
		classes.push('loading');
	}

	return classes;
});
</script>

<style scoped>
.btn_accent_alt {
	@apply btn;
	@apply border-accent-alt bg-accent-alt text-accent;
	@apply hover:border-accent-alt-active hover:bg-accent-alt-active;
}
</style>
