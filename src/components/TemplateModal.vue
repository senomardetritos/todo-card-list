<template>
	<div class="modal modal-lg" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" data-bs-theme="dark">
					<div class="w-100 modal-title h5">Escolha os templates</div>
					<div class="text-end">
						<i class="bi bi-x-square text-light" role="button" @click="cancelButton"></i>
					</div>
				</div>
				<div class="modal-body">
					<div class="template-items">
						<div :class="'template-item ' + (selected.includes(item.title) ? 'selected' : '')"
							v-for="(item, i) in database" :key="i" @click="changeSelected(item.title)">
							{{ item.title }}
						</div>
					</div>
					<hr />
					<div class="template-items">
						<div class="template-item" @click="selectAll()">✅ Selecionar Todas</div>
						<div class="template-item" @click="unselectAll()">
							<span v-if="selected.length > 0">❌ Desmarcar Todas</span>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" @click="cancelButton">Cancelar</button>
					<button type="button" class="btn btn-primary" @click="confirmButton">Criar Cartões</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue';
import database from '../db/default-list';

const emits = defineEmits(['cancel', 'confirm']);
const selected = ref([]);

defineProps({
	text: String,
});

function changeSelected(value) {
	if (selected.value.includes(value)) {
		const data = [];
		selected.value.map((item) => {
			if (item != value) data.push(item);
		});
		selected.value = data;
	} else {
		selected.value.push(value);
	}
}

function selectAll() {
	const data = [];
	database.map((item) => {
		data.push(item.title);
	});
	selected.value = data;
}

function unselectAll() {
	selected.value = [];
}

function cancelButton() {
	emits('cancel');
}

function confirmButton() {
	emits('confirm', selected.value);
}
</script>

<style lang="css" scoped>
.template-items {
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
}

.template-item {
	width: 47%;
	padding: 4px 8px;
	cursor: pointer;
}

.template-item.selected {
	background: #eeeeee;
	box-shadow: 0px 0px 1px 1px #dddddd;
}
</style>
