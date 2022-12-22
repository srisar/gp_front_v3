<template>
	<GPDialogRootTransition :open="open">
		<Dialog class="fixed z-50 overflow-auto" as="div">
			<!-- START: Backdrop -->
			<GPDialogBackDropChildTransition>
				<div class="backdrop" aria-hidden="true" />
			</GPDialogBackDropChildTransition>
			<!-- END: Backdrop -->

			<!------------ start:Dialog panel container ------------>
			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center overflow-auto p-4 text-center">
					<GPDialogPanelChildTransition>
						<DialogPanel class="dialog_panel" :class="[dialogSize]">
							<!-- ---------- start:Header ---------- -->
							<header class="mb-10 flex items-center justify-between">
								<DialogTitle as="h3" class="text-lg font-semibold uppercase leading-6">
									<slot name="title"></slot>
								</DialogTitle>

								<button class="btn_close" @click="handleClose()">
									<GPIconDialogClose />
								</button>
							</header>
							<!------------ end:Header ------------->

							<!------------ start:Main slot ------------>
							<slot></slot>
							<!------------ end:Main slot ------------->
						</DialogPanel>
					</GPDialogPanelChildTransition>
				</div>
			</div>
			<!------------ end:Dialog panel container ------------->
		</Dialog>
	</GPDialogRootTransition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import GPDialogRootTransition from '@/components/gp_dialog/_/GigglePigDialogRootTransition.vue';
import GPDialogBackDropChildTransition from '@/components/gp_dialog/_/GigglePigDialogBackDropChildTransition.vue';
import GPDialogPanelChildTransition from '@/components/gp_dialog/_/GigglePigDialogPanelChildTransition.vue';
import GPIconDialogClose from '@/components/gp_dialog/_/GigglePigIconDialogClose.vue';

/* -------------------------------------------------------------------------------------------------------------------------------------- */
/* region Props, Emits */

interface Props {
	open: boolean;
	size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
	open: false,
	size: 'md',
});

const emits = defineEmits(['close']);

/* endregion */
/* -------------------------------------------------------------------------------------------------------------------------------------- */

const handleClose = () => {
	emits('close');
};

const dialogSize = computed(() => {
	if (props.size === 'sm') return 'max-w-md';
	if (props.size === 'md') return 'max-w-2xl';
	if (props.size === 'lg') return 'max-w-6xl';
});
</script>

<style scoped>
.dialog_panel {
	@apply w-full rounded-md p-6 text-left align-middle shadow-xl;
	@apply bg-base-100;
	@apply transition-all;
}

.btn_close {
	@apply rounded-lg p-2 transition-all hover:bg-base-300;
}

.backdrop {
	@apply fixed inset-0 bg-black/95;
}
</style>
