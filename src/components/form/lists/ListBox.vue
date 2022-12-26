<template>
    <div class="form-control w-full">
        <label class="label" v-if="hasLabel">
            <span class="label-text">
                <slot name="label"></slot>
                <span v-if="required" class="text-error">*</span>
            </span>
        </label>

        <Listbox v-model="modelData" :disabled="disabled">
            <div class="relative w-full">
                <ListboxButton class="list_box_button">
                    <span>{{ displayValue }}</span>

                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <!-- START: Options -->
                <Transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <ListboxOptions class="list_box_options">
                        <ListboxOption v-slot="{ active, selected }" v-for="item in listItems" :value="item.key" :key="item.key" as="template">
                            <li class="list_box_option">
                                <span>{{ item.value }}</span>

                                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </Transition>
                <!-- END: Options -->
            </div>
        </Listbox>

        <label class="label" v-if="hasFooter">
            <span class="label-text-alt">
                <slot name="footer"></slot>
            </span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { useVModel } from '@vueuse/core';
import { find } from 'lodash';
import type { ListBoxItem } from '@/components/form/lists/ListBoxItem';

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Props */

interface Props {
    modelValue?: any;
    invalid?: boolean;
    required?: boolean;
    readonly?: boolean;
    placeholder?: string;
    listItems: ListBoxItem[];
    disabled?: boolean;
    hasFooter?: boolean;
    hasLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    invalid: false,
    required: false,
    readonly: false,
    disabled: false,
    hasFooter: true,
    hasLabel: true,
});

const emits = defineEmits(['update:modelValue']);

const modelData = useVModel(props, 'modelValue', emits);

const displayValue = computed(() => {
    return find(props.listItems, { key: modelData.value })?.value;
});

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style lang="scss">
.list_box_button {
    @apply input-bordered input;
    @apply relative flex w-full cursor-default items-center;
    @apply text-left;
    @apply focus:border-primary focus:outline-none;
}

.list_box_option {
    @apply relative flex py-2 pl-10;
    @apply cursor-pointer hover:bg-base-200;
}

.list_box_options {
    @apply absolute z-20 overflow-scroll;
    @apply mt-1 max-h-60 w-full py-1;
    @apply rounded-b-lg;
    @apply sm:text-sm;
    @apply bg-white shadow-lg ring-1 ring-black ring-opacity-5;
    @apply focus:outline-none;
}
</style>
