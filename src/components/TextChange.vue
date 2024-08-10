<template>
	<div class="">
		<div v-if="editName">
			<input ref="textRef" type="text" class="form-control editable" placeholder="Digite um nome" v-model="textChange" @keypress="closeEdit" @blur="closeEdit($event, true)" />
		</div>
		<div v-else class="px-2">
			<div v-if="small">
				<div class="" role="button" @click="openEdit">{{ textChange }}</div>
			</div>
			<div v-else>
				<div class="h5" role="button" @click="openEdit">{{ textChange }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, watch, defineProps, defineEmits } from 'vue';

	const props = defineProps({
		small: Boolean,
		text: String,
	});

	const emits = defineEmits('changed');

	const textChange = ref({});
	const textRef = ref(null);
	const editName = ref(false);

	watch(
		() => props.text,
		() => {
			textChange.value = props.text;
			if (textChange.value == '') openEdit();
		}
	);

	function closeEdit(e, force) {
		if (e.key == 'Enter' || force) {
			editName.value = false;
			if (textChange.value.trim() == '') {
				textChange.value = 'Clique para alterar';
			}
			emits('changed', textChange.value);
		}
	}

	function openEdit() {
		editName.value = true;
		setTimeout(() => {
			if (textRef.value) {
				textRef.value.focus();
				textRef.value.select();
			}
		}, 100);
	}
</script>
