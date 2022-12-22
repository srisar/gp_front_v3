<template>
	
	<section class="border border-base-300 rounded-lg shadow-md overflow-x-auto">
		
		<table class="table w-full">
			<thead>
			<tr>
				<th>User</th>
				<th>Role</th>
				<th class="flex justify-center">Actions</th>
			</tr>
			</thead>
			
			
			<tbody>
			
			<tr v-for="user in users">
				<td>
					
					<div class="flex gap-2">
						<aside>
							<div class="avatar">
								<div class="w-12 mask mask-squircle">
									<img src="https://api.lorem.space/image/face?w=150&h=150" alt="">
								</div>
							</div>
						</aside>
						<div>
							<h2>{{ user.full_name }}</h2>
							<p class="text-sm">{{ user.email }}</p>
						</div>
					</div>
				
				</td>
				<td>{{ user.role }}</td>
				<td class="">
					<div class="flex justify-center">
						<ButtonEdit @click="toManageUser(user)"/>
					</div>
				</td>
			</tr>
			
			</tbody>
		
		</table>
	
	</section>

</template>

<script setup lang="ts">


/* ------------------------------------------------------------------------------------------------------------------ */
/* region Props */

import type {UserGet} from '@/_backend/models/users/UserGet';
import ButtonEdit from '@/components/form/button/ButtonEdit.vue';
import {useRouter} from 'vue-router';


interface Props {
	users: UserGet[];
};

const props = defineProps<Props>();


/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */


/* ------------------------------------------------------------------------------------------------------------------ */
/* region Edit */

const router = useRouter();

const toManageUser = (user: UserGet) => {
	return router.push({
		name: 'user/manage',
		params: {
			id: user.id
		}
	});
};

/* endregion */
/* ------------------------------------------------------------------------------------------------------------------ */


</script>

<style scoped>

</style>