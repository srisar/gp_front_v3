import { computed, ref } from "vue";
import { useAPIFetch } from "@/services/FetchService";
import { useURLBuilder } from "@/utilities/useURLBuilder";
import { useFetchErrors } from "@/services/FetchErrors";
import type { Ref } from "vue";
import type { UserGet } from "@/_backend/models/users/UserGet";
import type { UserUpdate } from "@/_backend/models/users/UserUpdate";
import type { PaginatedItems } from "@/_backend/models/PaginatedItems";
import type { QueryFetchUsers } from "@/_backend/models/users/query/QueryFetchUsers";
import type { QueryFetchUser } from "@/_backend/models/users/query/QueryFetchUser";
import type { UserProfilePictureUpdate } from "@/_backend/models/users/UserProfilePictureUpdate";
import type { UserPasswordUpdate } from "@/_backend/models/users/UserPasswordUpdate";
import type { UserCreate } from "@/_backend/models/users/UserCreate";

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * API: Fetch all users
 */
export const useApiFetchUsers = (queryFetchUsers: Ref<QueryFetchUsers>) => {
   const { fullURL } = useURLBuilder("users", queryFetchUsers);

   const { data, error, execute, isFetching } = useAPIFetch(fullURL).json();
   const { hasError, errorMessage } = useFetchErrors(error, data);

   const users = computed<UserGet[]>(() => {
      if (!hasError.value && data.value) return data.value.data;
      return [];
   });

   const hasUsers = computed(() => users.value.length > 0);

   const paginatedUsers = computed<PaginatedItems<UserGet>>(() => {
      if (!hasError.value && data.value) return data.value;
      return {} as PaginatedItems<any>;
   });

   return { hasError, errorMessage, isFetching, users, hasUsers, paginatedUsers, execute };
};

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * API: Fetch single user
 */
export const useApiFetchUser = (queryFetchUser: Ref<QueryFetchUser>) => {
   const { fullURL } = useURLBuilder("user", queryFetchUser);

   const { data, error, execute, isFetching } = useAPIFetch(fullURL).json();
   const { hasError, errorMessage } = useFetchErrors(error, data);

   const user = computed<UserGet>(() => {
      if (!hasError.value && data.value) return data.value;
      return null;
   });

   return { isFetching, user, execute, hasError, errorMessage };
};

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * API: Update user
 */
export const useApiUpdateUser = (userUpdate: UserUpdate) => {
   const { data, error, isFetching, patch, execute: exec } = useAPIFetch("user/update").json();
   const { hasError, errorMessage } = useFetchErrors(error, data);

   const updatedUser = computed<UserGet>(() => {
      if (!hasError.value && data.value) return data.value;
      return null;
   });

   const execute = async () => {
      patch({ ...userUpdate });
      await exec();
   };

   return { isFetching, updatedUser, hasError, errorMessage, execute };
};

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * API: Update password
 */
export const useApiUpdateUserPassword = (userPasswordUpdate: UserPasswordUpdate) => {
   const { data, error, isFetching, patch, execute: exec } = useAPIFetch("user/update-password").json();
   const { hasError, errorMessage } = useFetchErrors(error, data);

   const updatedUser = computed<UserGet>(() => {
      if (!hasError.value && data.value) return data.value;
      return null;
   });

   const execute = async () => {
      patch({ ...userPasswordUpdate });
      await exec();
   };

   return { isFetching, updatedUser, hasError, errorMessage, execute };
};

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * API: Create user
 */
export const useApiCreateUser = (userCreate: UserCreate) => {
   const { data, error, isFetching, post, execute: exec } = useAPIFetch("user/create").json();
   const { hasError, errorMessage } = useFetchErrors(error, data);

   const createdUser = computed<UserGet>(() => {
      if (!hasError.value && data.value) return data.value;
      return null;
   });

   const execute = async () => {
      post({ ...userCreate });
      await exec();
   };

   return { isFetching, createdUser, hasError, errorMessage, execute };
};

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * API: Update user profile picture
 * @param userProfilePictureToUpdate
 */
export const useApiUpdateUserProfilePicture = (userProfilePictureToUpdate: UserProfilePictureUpdate) => {
   const { data, error, isFetching, patch, execute: exec } = useAPIFetch("user/update-picture").json();
   const { hasError, errorMessage } = useFetchErrors(error, data);

   const updatedUser = computed<UserGet>(() => {
      if (!hasError.value && data.value) return data.value;
      return null;
   });

   const execute = async () => {
      patch({ ...userProfilePictureToUpdate });
      await exec();
   };

   return { isFetching, updatedUser, hasError, errorMessage, execute };
};

/* ------------------------------------------------------------------------------------------------------------------ */
