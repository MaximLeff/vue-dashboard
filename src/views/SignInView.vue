<template>
	<div>
		<h1>Sign in to an Account</h1>
		<p><input type="text" placeholder="Email" v-model="email" /></p>
		<p><input type="password" placeholder="Password" v-model="password" /></p>
		<p v-if="errMsg">{{ errMsg }}</p>
		<p><button @click="register">Submit</button></p>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router'; // import router

const email = ref('');
const password = ref('');
const router = useRouter();
const errMsg = ref(); // Error message

const register = () => {
	const auth = getAuth();
	signInWithEmailAndPassword(auth, email.value, password.value) // need .value because ref()
		.then((data) => {
			console.log('Successfully signed in!');
			router.push('/admin/dashboard') // redirect to the feed
		})
		.catch(error => {
			console.log(error.code);
			switch (error.code) {
				case "auth/invalid-email":
					errMsg.value = 'Invalid email';
					break;
				case "auth/user-not-found":
					errMsg.value = 'No account with that email was found';
					break;
				case "auth/wrong-password":
					errMsg.value = 'Incorrect password';
					break;
				default:
					errMsg.value = 'Email or password was incorrect';
					break;
			}
		});
}
</script>
