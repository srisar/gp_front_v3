<template>
    <button class="btn_primary_alt btn" :class="classList">
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

    if (props.block) classes.push('btn-block');
    if (props.loading) classes.push('loading');

    return classes;
});
</script>

<style scoped>
.btn_primary_alt {
    @apply border-primary-alt bg-primary-alt text-primary;
    @apply hover:border-primary-alt-active hover:bg-primary-alt-active;
}
</style>
