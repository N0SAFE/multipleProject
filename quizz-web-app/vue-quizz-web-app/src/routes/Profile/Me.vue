<template>
    <div>
        <ProfileComponent :user="me"></ProfileComponent>
    </div>
</template>

<script setup>
import ProfileComponent from '../../components/Profile/Profile.vue';
import { inject } from 'vue';
const me = inject("me")
</script>