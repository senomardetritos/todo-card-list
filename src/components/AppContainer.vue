<template>
	<div>
		<AppHeader @add-card="addCard" @add-by-template="addByTemplate" />
		<div class="row p-4" v-if="cards && Object.keys(cards).length > 0">
			<div class="col-md-6 col-xl-4 mb-3" v-for="(item, i) in cards" :key="i">
				<CardToDo :id="i" :item="item" @save="saveCards" @delete="deleteCards" />
			</div>
		</div>
		<div class="row pt-5" v-else>
			<div class="col-sm-3"></div>
			<div class="col-sm-6 text-center">
				<div class="h4">Adicione cartões para criar listas ToDo</div>
				<div class="home-buttons">
					<a href="#" class="btn btn-primary" @click="addCard">Cartão em Branco</a>
					<a href="#" class="btn btn-primary" @click="addByTemplate">De um Template</a>
				</div>
			</div>
			<div class="col-sm-3"></div>
		</div>
		<TemplateModal v-if="showModalTemplate" @cancel="showModalTemplate = false" @confirm="addTemplates" />
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { get, save, getLastId } from '../utils/db';
	import database from '../db/default-list';
	import AppHeader from './AppHeader.vue';
	import CardToDo from './CardToDo.vue';
	import TemplateModal from './TemplateModal.vue';

	const cards = ref({});
	const showModalTemplate = ref(false);

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

	function addByTemplate() {
		showModalTemplate.value = true;
	}

	function addTemplates(selected) {
		showModalTemplate.value = false;
		selected.map((value) => {
			const data = database.find((item) => item.title == value);
			if (data) {
				const item = {
					name: data.title,
					items: {},
				};
				const last_id = getLastId(cards.value);
				cards.value[last_id] = item;
				data.items.map((description) => {
					const last_id = getLastId(item.items);
					item.items[last_id] = {
						name: description,
						status: 'todo',
					};
				});
				saveCards();
			}
		});
	}

	function saveCards() {
		save(cards.value);
	}

	function deleteCards(id) {
		delete cards.value[id];
		saveCards();
	}
</script>

<style scoped>
	.home-buttons {
		display: flex;
		gap: 16px;
		justify-content: center;
		margin-top: 16px;
	}
</style>
