<template>
	<div class="card h-100">
		<div class="card-header">
			<div class="card-title h5 pt-2">
				<TextChange :text="card.name" @changed="changeText" />
			</div>
		</div>
		<div class="card-body">
			<div class="card-text">
				<div class="py-2" v-for="(card_item, i) in card.items" :key="i">
					<CardItem :id="i" :item="card_item" @save="saveCard" @delete="deleteItem" />
				</div>
			</div>
		</div>
		<div class="card-footer">
			<div class="row">
				<div class="col-6">
					<a href="#" class="btn btn-primary btn-sm" @click="addItem">Novo Item</a>
				</div>
				<div class="col-6 text-end">
					<a href="#" class="btn btn-danger btn-sm" @click="showDelete = true">Remover Cartão</a>
				</div>
			</div>
		</div>
		<DeleteModal v-if="showDelete" :text="card.name" @cancel="showDelete = false" @delete="deleteCard" />
	</div>
</template>

<script setup>
	import { ref, onMounted, defineProps, defineEmits } from 'vue';
	import { getLastId } from '../utils/db';
	import CardItem from './CardItem.vue';
	import TextChange from './TextChange.vue';
	import DeleteModal from './DeleteModal.vue';

	const props = defineProps({
		id: Number,
		item: Object,
	});

	const emits = defineEmits(['save', 'delete']);

	const card = ref({});
	const showDelete = ref(false);

	onMounted(() => {
		card.value = props.item;
	});

	function addItem() {
		const last_id = getLastId(card.value.items);
		card.value.items[last_id] = {
			name: '',
			check: false,
		};
		emits('save');
	}

	function changeText(name) {
		card.value.name = name;
		emits('save');
	}

	function saveCard() {
		emits('save');
	}

	function deleteCard() {
		emits('delete', props.id);
	}

	function deleteItem(id) {
		delete card.value.items[id];
		saveCard();
	}
</script>
