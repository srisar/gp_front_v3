<template>
    <section class="flex w-full items-center justify-between gap-5">
        <div class="py-4 font-semibold text-base-300">Total {{ paginationData.total }} item(s)</div>

        <div class="flex gap-3">
            <ButtonPrimaryAlt v-for="item in paginationData.links" :disabled="item.active || item.url == null" @click="clickEvent(item.url)">
                {{ item.label }}
            </ButtonPrimaryAlt>
        </div>

        <slot></slot>
    </section>
</template>

<script setup lang="ts">
import type { PaginatedItems } from '@/_backend/models/PaginatedItems';
import ButtonPrimaryAlt from '@/components/form/button/ButtonPrimaryAlt.vue';

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Props */

interface Props {
    paginationData: PaginatedItems<any>;
}

const props = defineProps<Props>();

const emit = defineEmits(['click']);

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * Handle: Extract page number from the link
 */
const extractPageId = (url: string) => {
    const found = url.match(/\d/g);
    if (found) return parseInt(found[0]);
};

/**
 * Emits an event with clicked page number
 * @param pageUrl
 */
const clickEvent = (pageUrl: string | null) => {
    if (pageUrl == null) return false;

    const pageNumber = extractPageId(pageUrl);

    emit('click', pageNumber);
};
</script>

<style scoped></style>
