<template>
    <div>
        <h1>Quizz</h1>
        <List :quizzList="quizzList" :isFetching="isFetching"></List>
    </div>
</template>

<script setup>
import List from "../../components/Quizz/List.vue"
import { useDirectus } from "vue-directus";
import { ref } from "vue";

const directus = useDirectus()
const isFetching = ref(true)
const quizzList = ref([])
directus.items("quizz").readByQuery({fields: ['id', "title", "ownser.first_name"]}).then(response => {
    quizzList.value = response.data
    isFetching.value =false
})
</script>