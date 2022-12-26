<template>
    <label class="flex rounded px-2 py-1 text-xs tracking-wide" :class="labelClasses">
        <slot></slot>
    </label>
</template>

<script setup lang="ts">
/* ------------------------------------------------------------------------------------------------------------------ */
/* region Props */

import { computed } from 'vue';

interface Props {
    type?: 'default' | 'error' | 'success' | 'info' | 'warning';
}

const props = withDefaults(defineProps<Props>(), {
    type: 'default',
});

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

const labelClasses = computed(() => {
    let classes: string[] = [];

    if (props.type === 'error') {
        classes.push('text-error', 'bg-error/10');
    } else if (props.type === 'success') {
        classes.push('text-success', 'bg-success/10');
    } else if (props.type === 'info') {
        classes.push('text-info', 'bg-info/10');
    } else if (props.type === 'warning') {
        classes.push('text-warning', 'bg-warning/10');
    }

    return classes;
});
</script>

<style scoped></style>
