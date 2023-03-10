<template>
    <p>Home</p>
    <div class="links">
        <router-link to="/quizz/list">Quizz</router-link>
        <router-link to="/quizz/creation">Creation</router-link>
    </div>
</template>

<script setup>
    // import { useRouter, useRoute } from "vue-router";

    // const router = useRouter();

    // router.push({ name: "login" });
    // import { useNotification } from "@kyvg/vue3-notification";
    // const { notify}  = useNotification()
    // const triggerNotif = function(){
    //     notify({
    //         text: "Hello user!",
    //         type: "success"
    //     })
    // }
</script>

<style scoped>
    .links {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }
</style>
