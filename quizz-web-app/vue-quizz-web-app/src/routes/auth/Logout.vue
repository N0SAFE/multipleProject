<template>
    
</template>

<script setup>
import { inject } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";

const {notify} = useNotification()
const logout = inject("logout")
const router = useRouter()

console.log("ui")
logout().then(()=>{
    notify({
        type:"success",
        text: "You are now logged out"
    })
    console.log("ui")
    router.push({name: "Login"})
})
</script>