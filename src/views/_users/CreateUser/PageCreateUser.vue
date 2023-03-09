<template>
   <BaseAppLayout>
      <template #title>Create a new app user</template>

      <PageContainer>
         <SectionSmall>
            <!-- region :Form: -->
            <FormContainer>
               <FormSection>User details</FormSection>
               <FormRow columns="2">
                  <TextField required :invalid="vuelidateUserCreate.full_name.$error" v-model="userCreate.full_name">
                     <template #label>Full name</template>
                     <template #footer>
                        <VuelidateErrors :field="vuelidateUserCreate.full_name" />
                     </template>
                  </TextField>

                  <TextField required :invalid="vuelidateUserCreate.email.$error" v-model="userCreate.email">
                     <template #label>Email</template>
                     <template #footer>
                        <VuelidateErrors :field="vuelidateUserCreate.email" />
                     </template>
                  </TextField>
               </FormRow>

               <FormRow columns="2">
                  <ListBox :list-items="userRoleList" v-model="userCreate.role">
                     <template #label>Role</template>
                  </ListBox>
               </FormRow>

               <!-- region :Password: -->
               <FormSection>Password</FormSection>
               <FormRow columns="2">
                  <TextField type="password" required :invalid="vuelidateUserCreate.password.$error" v-model="userCreate.password">
                     <template #label>Password</template>
                     <template #footer>
                        <VuelidateErrors :field="vuelidateUserCreate.password" />
                     </template>
                  </TextField>

                  <TextField type="password" required :invalid="vuelidateUserCreate.confirm_password.$error" v-model="userCreate.confirm_password">
                     <template #label>Confirm password</template>
                     <template #footer>
                        <VuelidateErrors :field="vuelidateUserCreate.confirm_password" />
                     </template>
                  </TextField>
               </FormRow>
               <!-- endregion :Password: -->

               <!-- region :Form footer: -->
               <FormFooter>
                  <ButtonPrimary @click="doCreate()">Create</ButtonPrimary>
               </FormFooter>
               <!-- endregion :Form footer: -->
            </FormContainer>
            <!-- endregion :Form: -->
         </SectionSmall>
      </PageContainer>
   </BaseAppLayout>
</template>

<script setup lang="ts">
import BaseAppLayout from "@/layout/BaseAppLayout.vue";
import PageContainer from "@/components/containers/PageContainer.vue";
import SectionSmall from "@/components/containers/SectionSmall.vue";
import FormContainer from "@/components/form/containers/FormContainer.vue";
import TextField from "@/components/form/fields/TextField.vue";
import { computed, reactive, ref } from "vue";
import { EnumUserRole } from "@/_backend/models/users/EnumUserRole";
import FormRow from "@/components/form/containers/FormRow.vue";
import { required, helpers, email, sameAs } from "@vuelidate/validators";
import ListBox from "@/components/form/lists/ListBox.vue";
import useVuelidate from "@vuelidate/core";
import FormFooter from "@/components/form/containers/FormFooter.vue";
import ButtonPrimary from "@/components/form/button/ButtonPrimary.vue";
import VuelidateErrors from "@/components/form/vuelidate/VuelidateErrors.vue";
import FormSection from "@/components/form/containers/FormSection.vue";
import { useMessageBox } from "@/components/gp_message_box/GPMessageBox.store";
import { useRouter } from "vue-router";
import type { ListBoxItem } from "@/components/form/lists/ListBoxItem";
import type { UserCreate } from "@/_backend/models/users/UserCreate";
import { useApiCreateUser } from "@/_backend/api/users/UsersApi";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Stores */

const messageBox = useMessageBox();
const router = useRouter();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Create User */

const userCreate = reactive({
   email: "",
   full_name: "",
   password: "",
   role: EnumUserRole.USER,
} as UserCreate);

const userRoleList = [
   { key: EnumUserRole.USER, value: "User" },
   { key: EnumUserRole.ADMIN, value: "Administrator" },
   { key: EnumUserRole.MANAGER, value: "Manager" },
] as ListBoxItem[];

const userCreateRules = computed(() => ({
   email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Not a valid email", email),
   },
   full_name: {
      required: helpers.withMessage("Name is required", required),
   },
   password: {
      required: helpers.withMessage("Password is required", required),
   },
   confirm_password: {
      required: helpers.withMessage("Confirm password is required", required),
      sameAsPassword: helpers.withMessage("Does not match password", sameAs(userCreate.password)),
   },
}));

const vuelidateUserCreate = useVuelidate(userCreateRules, userCreate);

const apiCreteUser = reactive(useApiCreateUser(userCreate));

/**
 * Handle:
 */
const doCreate = async () => {
   const validated = await vuelidateUserCreate.value.$validate();
   if (!validated) return;

   await apiCreteUser.execute();

   if (apiCreteUser.hasError) {
      messageBox.showAlert(apiCreteUser.errorMessage);
      return;
   }

   await router.push({
      name: "user/manage",
      params: {
         id: apiCreteUser.createdUser.id,
      },
   });
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
