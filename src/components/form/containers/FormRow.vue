<template>
	
	<div class="grid grid-cols-1 md:gap-5" :class="classList">
		<slot></slot>
	</div>

</template>

<script setup lang="ts">
import {ref, reactive, computed} from 'vue';


/* ------------------------------------------------------------------------------------------------------------------ */
/* region Props */

interface Props {
	columns?: string;
}

const props = withDefaults(defineProps<Props>(), {
	columns: '1'
});
/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */


const classList = computed(() => {
	let classes: string[] = [];
	
	
	if (props.columns === '2') {
		classes.push('md:grid-cols-2');
	} else if (props.columns === '3') {
		classes.push('md:grid-cols-3');
	} else if (props.columns === '4') {
		classes.push('md:grid-cols-4');
	} else if (props.columns === '5') {
		classes.push('md:grid-cols-5');
	}
	
	return classes;
	
});

</script>

<style scoped>

</style>