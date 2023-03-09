import { useTitle } from "@vueuse/core";

const appTitle = import.meta.env.VITE_APP_TITLE;
const appVersion = import.meta.env.VITE_APP_VERSION;
const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
const uploadsURL = import.meta.env.VITE_UPLOAD_URL;

export class AppInfo {
    static getTitle() {
        return `${appTitle}`;
    }

    static getVersion() {
        return appVersion;
    }

    static getApiBaseURL() {
        return apiBaseURL;
    }

    static getUploadURL() {
        return uploadsURL;
    }
}

/**
 * Generate app title
 */
export function useAppTitle(title: string = "App Title") {
    useTitle(title, { titleTemplate: "%s - " + appTitle });
}
