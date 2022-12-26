<template>
    <FormContainer class="">
        <FormHeader>Update password</FormHeader>

        <FormBody>
            <FormRow columns="2">
                <TextField v-model="passwordData.old_password" type="password" :invalid="v$updatePassword.old_password.$error">
                    <template #label>Current password</template>
                    <template #footer>
                        <TextLabel type="error" v-for="error in v$updatePassword.old_password.$errors">{{ error.$message }}</TextLabel>
                    </template>
                </TextField>
            </FormRow>

            <FormRow columns="2">
                <TextField v-model="passwordData.new_password" type="password" :invalid="v$updatePassword.new_password.$error">
                    <template #label>New password</template>
                    <template #footer>
                        <TextLabel type="error" v-for="error in v$updatePassword.new_password.$errors">{{ error.$message }}</TextLabel>
                    </template>
                </TextField>

                <TextField v-model="passwordData.confirm_new_password" type="password" :invalid="v$updatePassword.confirm_new_password.$error">
                    <template #label>Confirm new password</template>
                    <template #footer>
                        <TextLabel type="error" v-for="error in v$updatePassword.confirm_new_password.$errors">
                            {{ error.$message }}
                        </TextLabel>
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
import FormContainer from '@/components/form/containers/FormContainer.vue';
import FormHeader from '@/components/form/containers/FormHeader.vue';
import FormBody from '@/components/form/containers/FormBody.vue';
import FormRow from '@/components/form/containers/FormRow.vue';
import TextField from '@/components/form/fields/TextField.vue';
import FormFooter from '@/components/form/containers/FormFooter.vue';
import ButtonPrimary from '@/components/form/button/ButtonPrimary.vue';
import { usePageStoreUser } from '@/views/_users/ManageUser/user.page.store';
import { computed, reactive } from 'vue';
import { useApiUpdateUserPassword } from '@/_backend/api/users/UsersApi';
import useVuelidate from '@vuelidate/core';
import { helpers, required, sameAs } from '@vuelidate/validators';
import TextLabel from '@/components/form/labels/TextLabel.vue';
import type { UserPasswordPatch } from '@/_backend/models/users/UserPasswordPatch';
import { useMessageBox } from '@/components/gp_message_box/GPMessageBox.store';

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Store */

const pageStore = usePageStoreUser();
const messageBox = useMessageBox();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Update password */

const apiUpdateUserPassword = reactive(useApiUpdateUserPassword());

const passwordData = reactive({
    old_password: 'da',
    new_password: 'a',
    confirm_new_password: 'a',
} as UserPasswordPatch);

const formRules = computed(() => ({
    old_password: {
        required: helpers.withMessage('Old password cannot be left blank', required),
    },
    new_password: { required },
    confirm_new_password: {
        required,
        sameAsPassword: helpers.withMessage('Confirm password does not match', sameAs(passwordData.new_password)),
    },
}));

const v$updatePassword = useVuelidate(formRules, passwordData);

/**
 * Handle: Update password
 */
const doUpdatePassword = async () => {
    const validated = await v$updatePassword.value.$validate();
    if (!validated) return false;

    passwordData.user_id = pageStore.user.id;
    await apiUpdateUserPassword.updatePassword(passwordData);

    if (apiUpdateUserPassword.error) {
        messageBox.showAlert(apiUpdateUserPassword.errorMessage);
    }
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
