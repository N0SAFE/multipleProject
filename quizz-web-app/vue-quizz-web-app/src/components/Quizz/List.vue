<template>
    <div>
        <p v-if="quizzList.length === 0 && !isFetching">no quizz found</p>
        <ul v-else>
            <li v-bind:key="quizz.id" v-for="quizz in quizzList">
                <router-link :to="`/quizz/${quizz.id}`">
                    {{ quizz.title }}
                    <span>
                        {{ quizz?.owner?.first_name }}
                        {{ quizz?.owner?.last_name }}
                    </span></router-link
                >
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { defineProps } from "vue";
    const { quizzList, isFetching } = defineProps({
        quizzList: Array,
        isFetching: Boolean
    });
</script>
