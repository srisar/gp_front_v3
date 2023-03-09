<template>
   <BaseAppLayout> </BaseAppLayout>
</template>

<script setup lang="ts">
import BaseAppLayout from "@/layout/BaseAppLayout.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useApiFetchUser, useApiFetchUsers } from "@/_backend/api/users/UsersApi";
</script>

<style scoped></style>
