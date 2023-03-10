<template>
    <div>
        <h1>Quizz</h1>
        <QuestionManager v-if="!isFetching" :questions="questions"></QuestionManager>
    </div>
</template>

<script setup>
    import QuestionManager from "../../components/Quizz/QuizzManager.vue";
    import { useRoute } from "vue-router";
    import { useDirectus } from "vue-directus";
    import { ref } from "vue";
    const directus = useDirectus();
    const route = useRoute();
    const { id } = route.params;
    const questions = ref({});
    const isFetching = ref(true)
    directus
        .items("quizz")
        .readOne(id, {
            fields: ["questions.question", "questions.propositions", "questions.id"]
        })
        .then((response) => {
            questions.value = response.questions;
            isFetching.value = false
        });
</script>
