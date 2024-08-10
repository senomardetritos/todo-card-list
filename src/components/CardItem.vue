<template>
	<div class="item-grid">
		<div class="item-col-1">
			<div class="form-check">
				<input class="form-check-input" role="button" type="checkbox" v-model="cardItem.check" @change="changeCheck" />
			</div>
		</div>
		<div class="item-col-2">
			<TextChange :text="cardItem.name" :small="true" @changed="changeText" />
		</div>
		<div class="item-col-3">
			<i class="bi bi-x-square-fill" role="button" @click="showDelete = true"></i>
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

	onMounted(() => {
		cardItem.value = props.item;
	});

	function changeText(name) {
		cardItem.value.name = name;
		emits('save');
	}

	function changeCheck() {
		emits('save');
	}

	function deleteItem() {
		emits('delete', props.id);
	}
</script>
