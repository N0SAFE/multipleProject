<template>
    <div>
        <h1>Creation</h1>
        <p>titre du quizz: <input v-model="titleRef" /></p>
        <QuestionList :title="titleRef"></QuestionList>
    </div>
</template>

<script setup>
import QuestionList from "../../components/Creation/QuestionList.vue"
import { ref } from "vue";

const titleRef = ref('')
</script>
