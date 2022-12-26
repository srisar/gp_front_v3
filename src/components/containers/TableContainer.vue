<template>
    <div class="overflow-x-auto rounded-[8px] border border-base-200">
        <table class="table w-full">
            <thead class="">
                <slot name="header"></slot>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
            <tfoot>
                <slot name="footer"></slot>
            </tfoot>
        </table>
    </div>
</template>

<script setup lang="ts"></script>

<style>
:where(.table *:first-child) :where(*:first-child) :where(th, td):first-child {
    @apply rounded-tl-[8px];
}

:where(.table *:first-child) :where(*:first-child) :where(th, td):last-child {
    @apply rounded-tr-[8px];
}

:where(.table *:last-child) :where(*:last-child) :where(th, td):last-child {
    @apply rounded-br-[8px];
}

:where(.table *:last-child) :where(*:last-child) :where(th, td):first-child {
    @apply rounded-bl-[8px];
}
</style>
