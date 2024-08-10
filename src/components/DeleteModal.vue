<template>
	<div class="modal" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" data-bs-theme="dark">
					<div class="modal-title h5">Delete</div>
					<div class="w-100 text-end">
						<i class="bi bi-x-square text-light" role="button" @click="cancelButton"></i>
					</div>
				</div>
				<div class="modal-body py-5">
					<p>
						Deseja realmente deletar <b>{{ text }}</b
						>?
					</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" @click="cancelButton">Cancelar</button>
					<button type="button" class="btn btn-danger" @click="deleteButton">Deletar</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { defineEmits, defineProps } from 'vue';

	const emits = defineEmits(['cancel', 'delete']);

	defineProps({
		text: String,
	});

	function cancelButton() {
		emits('cancel');
	}

	function deleteButton() {
		emits('delete');
	}
</script>
