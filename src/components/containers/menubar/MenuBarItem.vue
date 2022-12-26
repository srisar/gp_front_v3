<template>
    <div class="flex items-center gap-2">
        <div class="text-sm font-semibold uppercase text-base-300">{{ label }}</div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string;
}>();
</script>

<style scoped></style>
