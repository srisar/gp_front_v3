<template>
   <FormContainer>
      <FormHeader>Update Profile picture</FormHeader>

      <input type="file" class="file-input w-full" @change="handleSelectPicture" />

      <div class="mt-5 flex w-full flex-col items-center justify-center gap-5" v-if="selectedPicture">
         <div class="flex h-72 w-72 items-center justify-center rounded bg-base-200 p-2">
            <Cropper
               :src="selectedPicture"
               :stencil-props="{
                  aspectRatio: 1,
               }"
               :canvas="{
                  height: 128,
                  width: 128,
               }"
               @change="handleCropping" />
         </div>

         <div class="flex gap-5">
            <ButtonPrimary @click="doUpdate()" :loading="apiUpdateUserProfilePicture.isFetching">Upload</ButtonPrimary>
            <ButtonSecondaryAlt>Cancel</ButtonSecondaryAlt>
         </div>
      </div>
   </FormContainer>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import { useMessageBox } from "@/components/gp_message_box/GPMessageBox.store";
import FormContainer from "@/components/form/containers/FormContainer.vue";
import FormHeader from "@/components/form/containers/FormHeader.vue";
import ButtonPrimary from "@/components/form/button/ButtonPrimary.vue";
import ButtonSecondaryAlt from "@/components/form/button/ButtonSecondaryAlt.vue";
import { Cropper } from "vue-advanced-cropper";
import { useApiUpdateUserProfilePicture } from "@/_backend/api/users/UsersApi";
import "vue-advanced-cropper/dist/style.css";
import type { UserGet } from "@/_backend/models/users/UserGet";
import type { UserProfilePictureUpdate } from "@/_backend/models/users/UserProfilePictureUpdate";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Store */

const messageBox = useMessageBox();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Props */

const props = defineProps<{
   user: UserGet;
}>();

const emit = defineEmits(["update"]);

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Load image from disk */

const selectedPicture = ref("");

/**
 * Handle:
 */
const handleSelectPicture = (event: Event) => {
   const target = event.target as HTMLInputElement;

   if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);

      reader.onload = (e) => {
         if (reader.result) {
            selectedPicture.value = reader.result.toString();
         } else {
            selectedPicture.value = "";
         }
      };
   }
};

/**
 * Handle:
 */
const handleCropping = (pictureData: any) => {
   userProfilePictureToUpdate.picture_data = pictureData.canvas.toDataURL();
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Upload user profile picture */

const userProfilePictureToUpdate = reactive({
   id: 0,
   picture_data: "",
} as UserProfilePictureUpdate);

watchEffect(() => {
   if (props.user) userProfilePictureToUpdate.id = props.user.id;
});

const apiUpdateUserProfilePicture = reactive(useApiUpdateUserProfilePicture(userProfilePictureToUpdate));

/**
 * Handle:
 */
const doUpdate = async () => {
   await apiUpdateUserProfilePicture.execute();
   if (apiUpdateUserProfilePicture.hasError) {
      messageBox.showAlert(apiUpdateUserProfilePicture.errorMessage);
      return false;
   }

   selectedPicture.value = "";
   emit("update");
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
