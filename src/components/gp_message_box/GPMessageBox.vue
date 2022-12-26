<template>
	<GPDialog :open="store.messageBox.open" @close="closeMessageBox()">
		<template #title>
			<div class="flex items-center gap-3">
				<GPMessageBoxIconInfo :class="messageBoxTitleClasses" />
				<div>{{ store.messageBox.title }}</div>
			</div>
		</template>

		<section class="flex justify-center">
			{{ store.messageBox.message }}
		</section>

		<GPDialogFooter>
			<ButtonPrimaryAlt @click="closeMessageBox()">
				<span>Ok</span>
				<span class="ml-3" v-if="store.autoClose.doAutoClose">
					(Closing in..
					<span class="countdown"> <span :style="autoCloseCountdown"></span>) </span>
				</span>
			</ButtonPrimaryAlt>
		</GPDialogFooter>
	</GPDialog>
</template>

<script setup lang="ts">
import GPDialog from '@/components/gp_dialog/GPDialog.vue';
import { MessageBoxType, useMessageBox } from '@/components/gp_message_box/GPMessageBox.store';
import GPDialogFooter from '@/components/gp_dialog/GPDialogFooter.vue';
import GPMessageBoxIconInfo from '@/components/gp_message_box/icons/GPMessageBoxIconInfo.vue';
import { computed, shallowRef, watch } from 'vue';
import { promiseTimeout, useIntervalFn } from '@vueuse/core';
import ButtonPrimaryAlt from '@/components/form/button/ButtonPrimaryAlt.vue';

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Store */

const store = useMessageBox();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region MessageBox */

const icon = shallowRef(GPMessageBoxIconInfo);

/**
 * Handle: Close alert  message box
 */
const closeMessageBox = async () => {
	store.messageBox.open = false;

	await promiseTimeout(500);

	store.messageBox.title = '';
	store.messageBox.message = '';
	pause();
};

/**
 * Compute auto close time count down
 */
const autoCloseCountdown = computed(() => {
	return `--value:${store.autoClose.countDown}`;
});

/**
 * Run interval function to calculate the seconds elapsed
 */
const { pause, resume, isActive } = useIntervalFn(() => {
	store.autoClose.countDown--;
	if (store.autoClose.countDown == 0) {
		closeMessageBox();
		pause();
	}
}, 1000);

/**
 * Pause the interval function at the start
 * Only run it when auto closeable message box is opened
 */
pause();

/**
 * Watch for auto close status,
 * if auto close message box is opened, then resume the countdown
 */
watch(
	() => store.autoClose.doAutoClose,
	(value) => {
		if (value) resume();
	},
	{ deep: true }
);

const messageBoxTitleClasses = computed(() => {
	let classes: string[] = [];

	if (store.messageBoxType == MessageBoxType.SUCCESS) classes.push('text-success');
	if (store.messageBoxType == MessageBoxType.INFO) classes.push('text-info');
	if (store.messageBoxType == MessageBoxType.WARNING) classes.push('text-warning');
	if (store.messageBoxType == MessageBoxType.ALERT) classes.push('text-error');

	return classes;
});

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
