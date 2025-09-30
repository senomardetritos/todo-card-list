<template>
    <div class="app-report">
        <h3>Relatório</h3>
        <hr />
        <div class="app-report-content">
            <div class="app-report-item" v-for="(report_item, i) in report" :key="i">
                <b :class="'btn ' + statusClass[i]">{{ status[i] }}</b>
                <hr />
                <div class="app-report-item-name" v-for="(name, j) in report_item" :key="j">
                    <span>{{ j }}</span>
                    <div class="app-report-item-item" v-for="(item, k) in name" :key="k">
                        - {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { get } from '../utils/db';

const cards = ref({});
const report = ref({})

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
    cards.value = get();
    if (!cards.value) cards.value = {};
    const reports = {}
    for (const key_card of Object.keys(cards.value)) {
        const card = cards.value[key_card]
        const { name } = card
        console.log(card.name)
        for (const key_item of Object.keys(card.items)) {
            const item = card.items[key_item]
            console.log(item)
            const { status } = item
            if (!reports[status]) reports[status] = {}
            if (!reports[status][name]) reports[status][name] = []
            reports[status][name].push(item)
        }
    }
    console.log(reports)
    report.value = reports
});

</script>

<style lang="css" scoped>
.app-report {
    background-color: white;
    color: #333333;
    margin: 24px;
    border-radius: 16px;
    padding: 24px;
}

.app-report-content {
    display: flex;
    width: 100%;
    gap: 36px;
}

.app-report-item {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.app-report-item b {
    font-size: 12pt;
    text-align: left;
    padding: 4px 16px;
}

.app-report-item-name {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    margin-bottom: 24px;
}

.app-report-item-name span {
    border-bottom: 1px solid #eee;
    display: block;
    padding-bottom: 4px;
    font-weight: 600;
    font-size: 11pt;
}
</style>