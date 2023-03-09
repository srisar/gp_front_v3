<template>
    <div class="form-control w-full">
        <label class="label">
            <span class="label-text">
                <slot name="label"></slot>
                <span v-if="required" class="text-error">*</span>
            </span>
        </label>

        <input :type="type" :placeholder="placeholder" :readonly="readonly" class="input-bordered input w-full" :class="classList" v-model="data" />

        <label class="label">
            <div class="label-text-alt flex flex-col gap-1">
                <slot name="footer"></slot>
            </div>
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useVModel } from "@vueuse/core";

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Props */

interface Props {
    modelValue?: string | number;
    invalid?: boolean;
    required?: boolean;
    readonly?: boolean;
    placeholder?: string;
    type?: "text" | "password" | "email" | "number";
}

const props = withDefaults(defineProps<Props>(), {
    invalid: false,
    required: false,
    readonly: false,
    type: "text",
});

const emits = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emits);

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region States */

const classList = computed(() => {
    let classes = [];

    if (props.invalid) {
        classes.push("input-error");
    }

    return classes;
});

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
