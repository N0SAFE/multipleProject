<script setup>
import AppContext from "./context/AppContext.vue";
</script>

<template>
  <notifications>
    <template #body="props">
      <div class="my-notification" :class="props.item.type">
        <label> {{ props.item.text }} </label>
      </div>
    </template>
  </notifications>
  <AppContext>
    <router-view></router-view>
  </AppContext>
</template>

<style scoped>
.my-notification {
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
}
.my-notification.success {
  background: green;
  color: white;
}
.my-notification.error {
  background: red;
  color: white;
}
.my-notification.info {
  background: yellow;
  color: black;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
