<template>
    <router-view></router-view>
</template>

<script setup>
    import { useRouter } from "vue-router";
    import { inject } from "vue";

    const isLogin = inject("isLogin");
    
    if (!isLogin.value) {
        const router = useRouter();
        router.push({ name: "Login" });
    }
</script>
