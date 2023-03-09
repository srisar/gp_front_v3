<template>
   <nav class="menu h-full p-4">
      <!-- start:Top -->
      <ul class="flex-1">
         <li>
            <RouterLink to="/">Home</RouterLink>
         </li>
         <li>
            <RouterLink to="/about">About</RouterLink>
         </li>
      </ul>
      <!-- end:Top -->

      <!-- start:Bottom -->
      <div class="h-1"></div>
      <ul class="menu">
         <li class="menu-title">
            <span>User management</span>
         </li>
         <li>
            <RouterLink :to="{ name: 'users' }">
               <IconUsers />
               All Users
            </RouterLink>
         </li>
         <li>
            <RouterLink :to="{ name: 'user/create' }">
               <IconCreateUser />
               Create User
            </RouterLink>
         </li>
      </ul>
      <!-- end:Bottom -->
   </nav>
</template>

<script setup lang="ts">
import IconUsers from "@/assets/icons/elements/IconUsers.vue";
import IconCreateUser from "@/assets/icons/actions/IconCreateUser.vue";
</script>

<style scoped></style>
