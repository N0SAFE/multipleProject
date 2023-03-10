<template>
    <h1>My Quizz</h1>
    <div class="container-quizz_list">
        <List :quizzList="quizzList" :isFetching="isFetching"></List>
    </div>
</template>

<script setup>
    import List from "../Quizz/List.vue"
    import { defineProps, ref } from "vue";
    import { useDirectus } from "vue-directus";
    const directus = useDirectus();
    const {user} = defineProps({
        user: Object
    });

    const quizzList = ref([]);
    const isFetching = ref(true)
    directus
        .items("quizz").readByQuery({
            filter: {
                owner: {
                    _eq: user.id
                }
            }
        })
        .then((response) => {
            quizzList.value = response.data;
            isFetching.value = false
        });
</script>

<style scoped>
.container-quizz_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>