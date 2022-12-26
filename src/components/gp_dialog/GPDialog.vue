<template>
	<GPDialogRootTransition :open="open">
		<Dialog class="fixed z-50 overflow-auto" as="div">
			<!-- START: Backdrop -->
			<GPDialogBackDropChildTransition>
				<div class="backdrop" aria-hidden="true" />
			</GPDialogBackDropChildTransition>
			<!-- END: Backdrop -->

			<!------------ :Dialog Container: ------------>

			<!------------ :Dialog Container: ------------->

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center overflow-auto p-4 text-center">
					<GPDialogPanelChildTransition>
						<DialogPanel class="dialog_panel" :class="[dialogSize]">
							<header class="gp_dialog_panel_header">
								<DialogTitle as="h1" class="text-xl font-bold uppercase">
									<slot name="title"></slot>
								</DialogTitle>

								<button class="btn_close" @click="handleClose()">
									<GPIconDialogClose />
								</button>
							</header>

							<div class="p-5">
								<slot></slot>
							</div>
						</DialogPanel>
					</GPDialogPanelChildTransition>
				</div>
			</div>
		</Dialog>
	</GPDialogRootTransition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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
	@apply w-full align-middle;
	@apply rounded-2xl;
	@apply text-left;
	@apply bg-white;
	@apply shadow-xl transition-all;
}

.gp_dialog_panel_header {
	@apply flex items-center justify-between overflow-hidden px-5 py-2;
	@apply border-b;
}

.btn_close {
	@apply btn-ghost btn-square btn;
}

.backdrop {
	@apply fixed inset-0 bg-base-300/80;
}
</style>
