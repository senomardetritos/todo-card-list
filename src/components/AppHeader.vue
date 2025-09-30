<template>
	<nav class="menu navbar navbar-expand-md navbar-dark">
		<div class="container-fluid">
			<img alt="Vue logo" src="../assets/logo.png" />
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a href="#" @click="addCard()">Cartão em Branco</a>
					</li>
					<li class="nav-item">
						<a href="#" @click="addByTemplate()">De um Template</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script setup>
	import { defineEmits } from 'vue';
	const emits = defineEmits(['add-card', 'add-by-template']);
	function addCard() {
		emits('add-card');
	}
	function addByTemplate() {
		emits('add-by-template');
	}
</script>
