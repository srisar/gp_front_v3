<template>
   <div class="z-50 flex shrink-0 justify-end">
      <div class="dropdown-end dropdown">
         <button tabindex="0" class="flex h-full items-center gap-5 px-2">
            <p class="hidden font-bold lg:block">{{ auth.getUser.full_name }}</p>

            <div v-if="profilePicURL" class="h-12 w-12 overflow-hidden rounded-full border-2 border-base-300">
               <img :src="profilePicURL" alt="" />
            </div>
            <div v-else>
               <IconUser />
            </div>
         </button>
         <ul tabindex="0" class="dropdown-content menu z-50 w-52 rounded bg-base-100 p-2 shadow">
            <li>
               <button @click="toManageUser()">
                  <IconUser class="" />
                  Manage user
               </button>
            </li>
            <li>
               <button @click="doLogout()">
                  <IconSignOut />
                  Logout
               </button>
            </li>
         </ul>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import IconUser from "@/assets/icons/elements/IconUser.vue";
import IconSignOut from "@/assets/icons/actions/IconSignOut.vue";
import { useAuth } from "@/services/Auth";
import { computed } from "vue";
import { getUserProfilePictureURL } from "@/utilities/UploadedResourceUtils";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Store, Router */

const auth = useAuth();
const router = useRouter();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * Handle:
 */
const doLogout = () => {
   router.push({
      name: "auth/logout",
   });
};

/**
 * Handle:
 */
const toManageUser = () => {
   router.push({
      name: "user/manage",
      params: {
         id: auth.getUser.id,
      },
   });
};

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Logged in user */

const profilePicURL = computed(() => {
   return getUserProfilePictureURL(auth.getUser.profile_pic);
});

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
