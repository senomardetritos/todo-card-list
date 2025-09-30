<template>
    <div class="row p-4" v-if="cards && Object.keys(cards).length > 0">
        <div class="col-md-6 col-xl-4 mb-3" v-for="(item, i) in cards" :key="i">
            <CardToDo :id="i" :item="item" @save="saveCards" @delete="deleteCards" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { get, save } from '../utils/db';
import CardToDo from './CardToDo.vue'

const cards = ref({});

onMounted(() => {
    cards.value = get();
    if (!cards.value) cards.value = {};
});

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
