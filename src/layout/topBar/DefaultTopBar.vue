<template>
	
	<div class="flex justify-end shrink-0">
		
		
		<div class="dropdown dropdown-end">
			<button class="btn btn-circle btn-secondary" tabindex="0">User</button>
			<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
				<li>
					<button @click="toManageUser()">
						<UserIcon class="w-6 h-6"/>
						Manage user
					</button>
				</li>
				<li>
					<button @click="doLogout()">
						<LockClosedIcon class="w-6 h-6"/>
						Logout
					</button>
				</li>
			</ul>
		</div>
	
	</div>

</template>

<script setup lang="ts">
import {ref, reactive} from 'vue';
import {useRouter} from 'vue-router';
import {UserIcon, LockClosedIcon} from '@heroicons/vue/24/outline';


const router = useRouter();

/**
 * Handle:
 */
const doLogout = () => {
	router.push({
		name: 'auth/logout',
	});
};


/**
 * Handle:
 */
const toManageUser = () => {
	router.push({
		name: 'users/current',
	});
};


</script>

<style scoped>

</style>