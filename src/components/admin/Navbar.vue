<template>
	<nav class="navbar">
		<router-link to="/admin" class="navbar-logo">
			<img src="https://picsum.photos/id/111/600/400" alt="">
			<p>text logo</p>
		</router-link>
		<hr>
		<div class="navbar-item">
			<router-link to="/">To site</router-link>
		</div>
		<hr>

		<div class="navbar-item">
			<router-link to="/admin/dashboard">Dashboard</router-link>
		</div>
		<div class="navbar-item">
			<router-link to="/admin/header">Header</router-link>
		</div>
		<!-- <div class="navbar-item">
			<a href="#">Footer</a>
		</div>
		<div class="navbar-item">
			<a href="#">Pages</a>
		</div>
		<div class="navbar-item">
			<a href="#">Option</a>
		</div> -->
	</nav>
</template>

<script>
export default {
	name: 'Navbar',

}
</script>

<style scoped>
.navbar {
	height: 100%;
	background: var(--fourth);
	color: #fff;
	display: flex;
	flex-direction: column;
	padding: 20px;
	gap: 20px;
	max-width: 200px;
	width: 100%;
}

.navbar-logo {
	display: flex;
	align-items: center;
	gap: 10px;
}

.navbar-logo img {
	width: 100px;
	height: 60px;
}

.navbar-item {
	width: max-content;
}

@media (hover:hover) {
	.navbar-item:hover {
		color: var(--hover);
	}
}
</style>