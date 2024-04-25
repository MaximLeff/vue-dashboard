<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../components/admin/Navbar.vue'
</script>

<template>
	<Navbar />
	<RouterView />
</template>

<script>
export default {
	components: 'Navbar'
}
</script>