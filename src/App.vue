<template>
	<div>
		<AppContainer />
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import AppContainer from './components/AppContainer.vue';
onMounted(() => {
	document.addEventListener('click', (e) => {
		console.log(e.target)
	})
})
</script>
