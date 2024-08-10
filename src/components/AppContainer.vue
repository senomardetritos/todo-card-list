<template>
	<div>
		<nav class="menu navbar navbar-expand-md navbar-dark">
			<div class="container-fluid">
				<img alt="Vue logo" src="../assets/logo.png" />
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a href="#" @click="addCard">Adicionar Cartão</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<div class="row p-4" v-if="cards && Object.keys(cards).length > 0">
			<div class="col-md-6 col-xl-4 mb-3" v-for="(item, i) in cards" :key="i">
				<CardToDo :id="i" :item="item" @save="saveCards" @delete="deleteCards" />
			</div>
		</div>
		<div class="row pt-5" v-else>
			<div class="col-sm-3"></div>
			<div class="col-sm-6 text-center">
				<div class="h4">Adicione cartões para criar listas ToDo</div>
				<div>
					<a href="#" class="btn btn-primary" @click="addCard">Adicionar Cartão</a>
				</div>
			</div>
			<div class="col-sm-3"></div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { get, save, getLastId } from '../utils/db';
	import CardToDo from './CardToDo.vue';

	const cards = ref({});

	onMounted(() => {
		cards.value = get();
		if (!cards.value) cards.value = {};
	});
	function addCard() {
		const item = {
			name: '',
			items: {},
		};
		const last_id = getLastId(cards.value);
		cards.value[last_id] = item;
		saveCards();
	}

	function saveCards() {
		save(cards.value);
	}

	function deleteCards(id) {
		delete cards.value[id];
		saveCards();
	}
</script>
