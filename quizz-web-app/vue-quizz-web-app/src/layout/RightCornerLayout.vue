<template>
    <div>
        <div class="rightCorner">
            <div class="line">
                <router-link v-bind:key="name" v-for="[path, name] in list" :to="path"
                    ><label>{{ name }}</label></router-link
                >
            </div>
            <div class="line">
                <router-link v-bind:key="name" v-for="[path, name] in authList" :to="path"
                    ><label>{{ name }}</label></router-link
                >
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
    import { useRoute } from "vue-router";
    import { inject, watch, ref } from "vue";
    const route = useRoute();
    const defaultList = [
        ["/profile/me", "Profile"],
        ["/", "Home"]
    ];
    const defaultAuthList = [
        ["/login", "Login"],
        ["/register", "Register"],
        ["/logout", "Logout"]
    ];
    const list = ref([]);
    const authList = ref([]);
    const isLogin = inject("isLogin");

    function updateList() {
        const active = route.fullPath;
        const newList = [...defaultList];
        const newAuthList = [...defaultAuthList];
        if (active === "/") {
            newList.splice(1, 1);
        }
        if (active === "/profile/me") {
            newList.splice(0, 1);
        }
        if (!isLogin.value) {
            newList.length = 0;
        }
        if (active === "/login") {
            newAuthList.splice(0, 1);
        }
        if (active === "/register") {
            newAuthList.splice(1, 1);
        }
        list.value = newList;
        authList.value = newAuthList;
    }

    watch(route, function () {
        updateList();
    });

    updateList();
</script>

<style scoped>
    .rightCorner {
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        flex-direction: column;
    }

    .line {
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>
