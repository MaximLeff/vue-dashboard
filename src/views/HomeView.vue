<template>
	<main>
		<h1>Home</h1>
		<nav>
			<ul v-for="link in this.showMenu" :key="link.title">
				<li>
					<a :href="link.url">{{ link.title }}</a>
					<ul v-for="subLinks in link.children" :key="subLinks.title">
						<li>
							<a :href=link.url>{{ subLinks.title }}</a>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	</main>
</template>

<script>
import store from "@/store";

export default {
	computed: {
		showMenu () {
			return this.$store.getters.showLinks
		},
	}
}
</script>
