<template>
    <div>
        <h1>Profile</h1>
        <h2>Info</h2>
        <div>
            <p>First name: {{ user?.first_name }}</p>
            <p>First name: {{ user?.last_name }}</p>
            <p>First name: {{ user?.email }}</p>
            <p>First name: {{ user?.role }}</p>
        </div>
        <router-link :to="`/profile/edit/${user?.id}`">Edit</router-link>
        <MyQuizz :user="user"></MyQuizz>
    </div>
</template>

<script setup>
import MyQuizz from "./MyQuizz.vue"
import { defineProps } from 'vue';
const {user} = defineProps({
    user: Object
})
</script>