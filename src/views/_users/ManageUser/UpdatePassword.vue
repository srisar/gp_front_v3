<template>
   <FormContainer class="">
      <FormHeader>Update password</FormHeader>

      <FormBody>
         <FormRow columns="2">
            <TextField v-model="userPasswordUpdate.new_password" type="password" :invalid="vuelidateUserPasswordUpdate.new_password.$error">
               <template #label>New password</template>
               <template #footer>
                  <VuelidateErrors :field="vuelidateUserPasswordUpdate.new_password" />
               </template>
            </TextField>

            <TextField v-model="userPasswordUpdate.confirm_new_password" type="password" :invalid="vuelidateUserPasswordUpdate.confirm_new_password.$error">
               <template #label>Confirm new password</template>
               <template #footer>
                  <VuelidateErrors :field="vuelidateUserPasswordUpdate.confirm_new_password" />
               </template>
            </TextField>
         </FormRow>

         <FormFooter>
            <ButtonPrimary @click="doUpdatePassword()">Update Password</ButtonPrimary>
         </FormFooter>
      </FormBody>
   </FormContainer>
</template>

<script setup lang="ts">
import FormContainer from "@/components/form/containers/FormContainer.vue";
import FormHeader from "@/components/form/containers/FormHeader.vue";
import FormBody from "@/components/form/containers/FormBody.vue";
import FormRow from "@/components/form/containers/FormRow.vue";
import TextField from "@/components/form/fields/TextField.vue";
import FormFooter from "@/components/form/containers/FormFooter.vue";
import ButtonPrimary from "@/components/form/button/ButtonPrimary.vue";
import { computed, reactive, watchEffect } from "vue";
import { helpers, required, sameAs } from "@vuelidate/validators";
import { useApiUpdateUserPassword } from "@/_backend/api/users/UsersApi";
import useVuelidate from "@vuelidate/core";
import { useMessageBox } from "@/components/gp_message_box/GPMessageBox.store";
import VuelidateErrors from "@/components/form/vuelidate/VuelidateErrors.vue";
import type { UserGet } from "@/_backend/models/users/UserGet";
import type { UserPasswordUpdate } from "@/_backend/models/users/UserPasswordUpdate";

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

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Update password */

const userPasswordUpdate = reactive({
   user_id: 0,
   old_password: "",
   new_password: "",
   confirm_new_password: "",
} as UserPasswordUpdate);

watchEffect(() => {
   if (props.user) {
      userPasswordUpdate.user_id = props.user.id;
   }
});

const apiUpdateUserPassword = reactive(useApiUpdateUserPassword(userPasswordUpdate));

const updateUserPasswordRules = computed(() => ({
   // old_password: {
   // 	required: helpers.withMessage("Old password cannot be left blank", required),
   // },
   new_password: { required: helpers.withMessage("At least 6 characters required", required) },
   confirm_new_password: {
      required: helpers.withMessage("At least 6 characters required", required),
      sameAsPassword: helpers.withMessage("Confirm password does not match", sameAs(userPasswordUpdate.new_password)),
   },
}));

const vuelidateUserPasswordUpdate = useVuelidate(updateUserPasswordRules, userPasswordUpdate, { $scope: false });

/**
 * Handle: Update password
 */
const doUpdatePassword = async () => {
   const validated = await vuelidateUserPasswordUpdate.value.$validate();
   if (!validated) return false;

   await apiUpdateUserPassword.execute();
   if (apiUpdateUserPassword.hasError) {
      messageBox.showAlert(apiUpdateUserPassword.errorMessage);
      return false;
   }

   userPasswordUpdate.new_password = "";
   userPasswordUpdate.confirm_new_password = "";

   messageBox.showSuccess("Password updated");
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
