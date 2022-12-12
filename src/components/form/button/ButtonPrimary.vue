<template>
	
	<button class="btn btn-primary" :class="classList">
		<slot></slot>
	</button>

</template>

<script setup lang="ts">
import {ref, reactive, computed} from 'vue';


/* ------------------------------------------------------------------------------------------------------------------ */
/* region Props */

interface Props {
	loading?: boolean;
	block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	loading: false,
	block: false
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

</style>