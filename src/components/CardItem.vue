<template>
	<div class="item-grid">
		<div class="item-status">
			<button :class="'btn btn-sm ' + statusClass[cardItem.status]" type="button" @click="openMenuItems($event)">
				{{ status[cardItem.status] }}
			</button>
			<div class="dropdown-menu-items" v-if="showMenuItems">
				<a class="dropdown-item" href="#" @click="markAs(i)" v-for="(item, i) in status" :key="i">{{ item }}</a>
			</div>
		</div>
		<div class="item-text">
			<TextChange :text="cardItem.name" :small="true" @changed="changeText" />
		</div>
		<div class="item-close">
			<i class="bi bi-x" role="button" @click="showDelete = true"></i>
		</div>
		<DeleteModal v-if="showDelete" :text="cardItem.name" @cancel="showDelete = false" @delete="deleteItem" />
	</div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import TextChange from './TextChange.vue';
import DeleteModal from './DeleteModal.vue';

const props = defineProps({
	id: Number,
	item: Object,
});

const emits = defineEmits(['save']);

const cardItem = ref({});
const showDelete = ref(false);
const showMenuItems = ref(false);

const status = {
	todo: 'A Fazer',
	doing: 'Fazendo',
	done: 'Feito',
	cancelled: 'Cancelado',
	postponed: 'Adiado',
};
const statusClass = {
	todo: 'btn-secondary',
	doing: 'btn-primary',
	done: 'btn-success',
	cancelled: 'btn-danger',
	postponed: 'btn-warning',
};

onMounted(() => {
	cardItem.value = props.item;
});

function changeText(name) {
	cardItem.value.name = name;
	emits('save');
}

function openMenuItems(event) {
	event.stopPropagation()
	showMenuItems.value = !showMenuItems.value
}

function markAs(status) {
	cardItem.value.status = status;
	showMenuItems.value = false;
	emits('save');
}

function deleteItem() {
	emits('delete', props.id);
}
</script>

<style lang="css" scoped>
.item-grid {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
}

.item-grid .item-text {
	width: calc(100% - 100px);
}

.item-grid .item-status {
	width: 100px;
	display: flex;
	justify-content: end;
	position: relative;
}

.item-grid .item-status button {
	width: 100%;
	padding: 0 8px;
}

.item-grid .item-status .dropdown-menu-items {
	position: absolute;
	background: #ffffff;
	z-index: 100;
	padding: 0px;
	border: none;
	box-shadow: 2px 2px 10px -5px #000000;
	border-radius: 8px;
	width: 150px;
	top: 20px;
	left: 0px;
	display: flex;
	flex-direction: column;
	gap: 0px;
	overflow: hidden;
	z-index: 100;
}

.item-grid .item-status .dropdown-menu-items a {
	border-bottom: 1px solid #eeeeee;
	padding: 6px 16px;
}

.item-grid .item-status .dropdown-menu-items a:hover {
	background-color: #eeeeee !important;
}

.item-grid .item-close {
	background-color: #333333;
	border-radius: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 25px;
	height: 23px;
}

.item-grid .item-close i {
	font-size: 16px;
	color: white;
	margin: 0;
	padding: 0;
}
</style>
