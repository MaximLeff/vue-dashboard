<script setup>
import { onMounted, ref } from 'vue';
import router from '@/router';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const isLoggedIn = ref(false)

const handleSignOut = () => {
	signOut(auth).then(() => {
		router.push("/");
	})
}

let auth;
onMounted(() => {
	auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			isLoggedIn.value = true;
		} else {
			isLoggedIn.value = false;
		}
	});
});

</script>

<template>
	<div class="toolbar" v-if="isLoggedIn">
		<router-link to="/admin">To admin</router-link>
		<button class="toolbar-sign-out" @click="handleSignOut">Sign out</button>
	</div>

</template>


<style scoped>
.toolbar {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	background: var(--fifth);
	color: #fff;
	padding: 5px 10px;
	font-size: 14px;
	display: flex;
	align-items: center;
}
.toolbar-sign-out {
	margin-left: auto;
}

@media (hover:hover) {
	.toolbar a:hover {
		color: var(--first);
	}
}
</style>