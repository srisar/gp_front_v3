<template>
	<GPDialog :open='store.messageBox.open' @close='closeMessageBox()'>
		<template #title>
			<div class='flex items-center gap-3'>
				<Component :is='icon' />
				{{ store.messageBox.title }}
			</div>
		</template>
		
		<section class='flex justify-center'>
			{{ store.messageBox.message }}
		</section>
		
		<GPDialogFooter>
			<ButtonPrimary @click='closeMessageBox()'>
				<span>Ok</span>
				<span class='ml-3' v-if='store.autoClose.doAutoClose'>
					(Closing in..
					<span class='countdown'>
					<span :style='autoCloseCountdown'></span>)
				</span>
				</span>
			</ButtonPrimary>
		</GPDialogFooter>
	</GPDialog>
</template>

<script setup lang='ts'>
import GPDialog from '@/components/gp_dialog/GPDialog.vue';
import { MessageBoxType, useGPNotifications } from '@/components/gp_message_box/GPMessageBox.store';
import GPDialogFooter from '@/components/gp_dialog/GPDialogFooter.vue';
import ButtonPrimary from '@/components/form/button/ButtonPrimary.vue';
import GPMessageBoxIconInfo from '@/components/gp_message_box/icons/GPMessageBoxIconInfo.vue';
import { computed, shallowRef, watch } from 'vue';
import GPMessageBoxIconAlert from '@/components/gp_message_box/icons/GPMessageBoxIconAlert.vue';
import GPMessageBoxIconWarning from '@/components/gp_message_box/icons/GPMessageBoxIconWarning.vue';
import GPMessageBoxIconSuccess from '@/components/gp_message_box/icons/GPMessageBoxIconSuccess.vue';
import { promiseTimeout, useIntervalFn } from '@vueuse/core';

/* ------------------------------------------------------------------------------------------------------------------ */
/* region Store */

const store = useGPNotifications();

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------ */
/* region MessageBox */

const icon = shallowRef(GPMessageBoxIconInfo);
watch(
	() => store.messageBoxType,
	(value) => {
		if (value === MessageBoxType.INFO) icon.value = GPMessageBoxIconInfo;
		if (value === MessageBoxType.ALERT) icon.value = GPMessageBoxIconAlert;
		if (value === MessageBoxType.WARNING) icon.value = GPMessageBoxIconWarning;
		if (value === MessageBoxType.SUCCESS) icon.value = GPMessageBoxIconSuccess;
	},
);

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
	{ deep: true },
);


/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */
</script>

<style scoped></style>
