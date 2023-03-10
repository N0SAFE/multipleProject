<template>
    <div>
        <Question v-if="questionIndex < questions.length" :question="questions[questionIndex]" :validateAnswer="validateAnswer" :toglePropositions="toglePropositions" :selectedPropositions="selectedPropositions"></Question>
        <div v-else>
            <h1>Fin du quizz</h1>
            <p>
                Votre score est de {{ score }} / {{ questions.length }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification"
import { ref } from "vue"
import { useDirectus } from "vue-directus"
import Question from "./Question.vue"

const {notify} = useNotification()
const directus = useDirectus()
const {questions} = defineProps({
    questions: Object
})
const questionIndex = ref(0)
const selectedPropositions = ref([])
const score = ref(0)

const nextQuestion = ()=>{
    questionIndex.value++
    selectedPropositions.value = []
}

const validateAnswer = ()=>{
    if(selectedPropositions.value.length === 0){
        notify({
            type: "error",
            text: "Vous devez choisir au minimum une reponse"
        })
        return
    }
    directus.items("question").readOne(questions[questionIndex.value].id, {fields: ['answers']}).then(response => {
        if(response.answers.every(value => selectedPropositions.value.includes(value))){
            score.value++
        }
        nextQuestion()
    })
}

const toglePropositions = e => {
    const value = parseInt(e.target.value)
    console.log(selectedPropositions.value)
    const index = selectedPropositions.value.indexOf(value)
    console.log(index)
    const newAnswer = [...selectedPropositions.value]
    console.log(newAnswer)
    if(index > -1){
        newAnswer.splice(index, 1)
    }else {
        newAnswer.push(value)
    }
    selectedPropositions.value = newAnswer
}
</script>