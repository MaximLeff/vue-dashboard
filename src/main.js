import './assets/vars.css'
import './assets/main.css'

import { createApp } from 'vue'
import store from './store'

import App from './App.vue'
import router from './router'

import { initializeApp } from "firebase/app";

/* code from our Firebase console */
const firebaseConfig = {

	apiKey: "AIzaSyBiJJJtOlOCeB7jynsn0p-wb96H80x5LrY",

	authDomain: "vue-autentication-caafc.firebaseapp.com",

	projectId: "vue-autentication-caafc",

	storageBucket: "vue-autentication-caafc.appspot.com",

	messagingSenderId: "1027127254960",

	appId: "1:1027127254960:web:4290eb12cb67d8ec0c8075"

};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)
.use(store)
.mount('#app')
