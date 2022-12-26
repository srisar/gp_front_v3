<template>
    <TextLabel type="error" v-for="error in field.$errors">
        {{ error.$message }}
    </TextLabel>
</template>

<script setup lang="ts">
import TextLabel from '@/components/form/labels/TextLabel.vue';

const props = defineProps<{
    field: any;
}>();
</script>

<style scoped></style>
