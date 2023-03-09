import type { Ref } from 'vue';
import {computed, ref} from 'vue';

/**
 * Build a URL with provided query strings
 * @param baseURL
 * @param queryStringParams
 */
export const useURLBuilder = (baseURL: string, queryStringParams: Ref) => {
    const url = ref(baseURL + '?');

    const fullURL = computed(() => {
        const params = new URLSearchParams(queryStringParams.value);
        return url.value + params.toString();
    });

    return {fullURL};
};
