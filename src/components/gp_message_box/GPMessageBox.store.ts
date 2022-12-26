import { defineStore } from 'pinia';

/**
 * Represents types of message box that can be displayed
 */
export enum MessageBoxType {
	ALERT,
	INFO,
	WARNING,
	SUCCESS,
}

/**
 * Store responsible for the message boxes
 */
export const useMessageBox = defineStore('gp:messagebox', {
	state: () => ({
		messageBox: {
			open: false,
			title: 'Message',
			message: 'Hello, there!',
		},

		messageBoxType: MessageBoxType.INFO,

		autoClose: {
			doAutoClose: false,
			countDown: 5,
		},
	}),

	getters: {},

	actions: {
		/**
		 * Shows alert type message box
		 */
		showAlert(message: string = '', autoClose: boolean = false, title: string = 'Alert') {
			this.$reset();
			this.messageBoxType = MessageBoxType.ALERT;
			this.autoClose.doAutoClose = autoClose;

			this.__initMessageBox(message, title);
		},

		/**
		 * Shows info type message box
		 */
		showInfo(message: string = '', autoClose: boolean = false, title: string = 'Info') {
			this.$reset();
			this.messageBoxType = MessageBoxType.INFO;
			this.autoClose.doAutoClose = autoClose;

			this.__initMessageBox(message, title);
		},

		/**
		 * Shows success type message box
		 */
		showSuccess(message: string = '', autoClose: boolean = false, title: string = 'Success') {
			this.$reset();

			this.messageBoxType = MessageBoxType.SUCCESS;
			this.autoClose.doAutoClose = autoClose;

			this.__initMessageBox(message, title);
		},

		/**
		 * Shows warning type message box
		 */
		showWarning(message: string = '', autoClose: boolean = false, title: string = 'Warning') {
			this.messageBoxType = MessageBoxType.WARNING;
			this.autoClose.doAutoClose = autoClose;

			this.__initMessageBox(message, title);
		},

		/**
		 * Initialize message box
		 * @param message
		 * @param title
		 */
		__initMessageBox(message: string, title: string) {
			this.messageBox.message = message;
			this.messageBox.title = title;
			this.messageBox.open = true;
		},
	},
});
