<template>
	
	<div class="form-control w-full">
		
		<label class="label">
			<span class="label-text">
				<slot name="label"></slot>
				<span v-if="required" class="text-error">*</span>
			</span>
		</label>
		
		<input type="number"
					 :placeholder="placeholder"
					 :readonly="readonly"
					 class="input input-bordered w-full"
					 :class="classList"
					 @focus="handleFocus($event)"
					 v-model="data"/>
		
		<label class="label">
			<span class="label-text-alt">
				<slot name="footer"></slot>
			</span>
		</label>
		
	</div>

</template>

<script setup lang="ts">
import {ref, reactive, computed} from 'vue';
import {useVModel} from '@vueuse/core';


/* ------------------------------------------------------------------------------------------------------------------ */
/* region Props */

interface Props {
	modelValue?: string | number;
	invalid?: boolean;
	required?: boolean;
	readonly?: boolean;
	placeholder?: string;
	autoSelect?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	invalid: false,
	required: false,
	readonly: false,
	autoSelect: true
});

const emits = defineEmits(['update:modelValue']);

const data = useVModel(props, 'modelValue', emits);

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */



/* ------------------------------------------------------------------------------------------------------------------ */
/* region States */

const classList = computed(() => {
	
	let classes = [];
	
	if (props.invalid) {
		classes.push('input-error');
	}
	
	return classes;
	
});

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */



/* ------------------------------------------------------------------------------------------------------------------ */
/* region Events */

const handleFocus = (event: InputEvent) => {
	if (props.autoSelect) {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		target.select();
	}
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */


</script>

<style scoped>

</style>