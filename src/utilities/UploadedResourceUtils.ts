import { isEmpty } from "lodash";
import { AppInfo } from "@/utilities/AppInfo";

/**
 * Get profile picture URL
 * @param fileName
 */
export const getUserProfilePictureURL = (fileName: string) => {
	if (!isEmpty(fileName)) return AppInfo.getUploadURL() + "/images/profiles/" + fileName;
	return undefined;
};
