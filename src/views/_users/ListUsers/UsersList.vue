<template>
   <TableContainer>
      <template #header>
         <tr>
            <th>User</th>
            <th>Role</th>
            <th class="flex justify-center">Actions</th>
         </tr>
      </template>

      <tr v-for="user in users">
         <td>
            <div class="flex gap-2">
               <aside>
                  <div v-if="user.profile_pic" class="h-12 w-12 overflow-hidden rounded border">
                     <img :src="getUserProfilePictureURL(user.profile_pic)" alt="" />
                  </div>

                  <div v-else class="h-12 w-12 rounded border bg-shade p-2">
                     <IconUser />
                  </div>
               </aside>
               <div>
                  <h2 class="font-semibold">{{ user.full_name }}</h2>
                  <p class="text-sm text-base-300">{{ user.email }}</p>
               </div>
            </div>
         </td>
         <td>{{ user.role }}</td>
         <td class="">
            <div class="flex justify-center">
               <ButtonSecondaryAlt class="btn-sm" @click="toManageUser(user)">View</ButtonSecondaryAlt>
            </div>
         </td>
      </tr>
   </TableContainer>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { getUserProfilePictureURL } from "@/utilities/UploadedResourceUtils";
import ButtonSecondaryAlt from "@/components/form/button/ButtonSecondaryAlt.vue";
import TableContainer from "@/components/containers/TableContainer.vue";
import IconUser from "@/assets/icons/elements/IconUser.vue";
import type { UserGet } from "@/_backend/models/users/UserGet";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Props */

interface Props {
   users: UserGet[];
}

const props = defineProps<Props>();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Edit */

const router = useRouter();

const toManageUser = (user: UserGet) => {
   return router.push({
      name: "user/manage",
      params: {
         id: user.id,
      },
   });
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
