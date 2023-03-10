<template>
    <div>
        <h1>
            {{question.question}}
        </h1>
        <div class="propotition-list">
            <button v-bind:key="index" v-for="(proposition, index) in question.propositions" @click="toglePropositions" :value="index" :class="selectedPropositions.includes(index) ? 'selected' : ''">{{ proposition }}</button>
        </div>
        <button @click="validateAnswer">Valider</button>
    </div>
</template>

<script setup>
import { watch } from "vue"

const {question, selectedPropositions, toglePropositions, validateAnswer} = defineProps({
    question: Object,
    selectedPropositions: Array,
    toglePropositions: Function, 
    validateAnswer: Function
})

watch(selectedPropositions, function(){
    console.log("selectedPropositions", selectedPropositions)
})


</script>

<style scoped>
.propotition-list {
    display: grid;
    grid-template: "1fr 1fr";
    gap: 10px;
    margin-bottom: 40px;
}

.propotition-list > .selected {
    background: green;
}
</style>