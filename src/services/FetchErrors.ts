import type { Ref } from 'vue';
import { computed } from 'vue';

/**
 * Use fetch errors
 * @param error
 * @param data
 */
export const useFetchErrors = (error: Ref, data: Ref) => {
	const hasError = computed(() => {
		return error.value != null;
	});

	const errorMessage = computed(() => {
		return data.value.error;
	});

	return { hasError, errorMessage };
};
