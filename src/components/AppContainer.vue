<template>
	<div>
		<AppHeader @add-card="addCard" @add-by-template="addByTemplate" @show-dashboard="route = 'home'"
			@show-report="route = 'report'" />
		<AppHome :key="key_card" v-if="route == 'home'" />
		<AppReport :key="key_card" v-if="route == 'report'" />
		<div class="row pt-5" v-if="!cards || Object.keys(cards).length == 0">
			<div class="col-sm-3"></div>
			<div class="col-sm-6 text-center">
				<div class="home-text h4">Adicione cartões para criar listas ToDo</div>
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
import AppHome from './AppHome.vue';
import AppReport from './AppReport.vue';
import TemplateModal from './TemplateModal.vue';

const cards = ref({});
const route = ref('home')
const showModalTemplate = ref(false);
const key_card = ref(Date.now())

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
	key_card.value = Date.now()
}

</script>

<style scoped>
.home-text {
	color: white;
}

.home-buttons {
	display: flex;
	gap: 16px;
	justify-content: center;
	margin-top: 16px;
}
</style>
