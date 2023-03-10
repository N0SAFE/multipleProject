<template>
    <div>
        <h1>Login</h1>
        <form @submit="onSubmit">
            <div class="line">
                <label for="email">email:</label>
                <input type="email" name="email" id="email" />
            </div>
            <div class="line">
                <label for="password">password:</label>
                <input type="password" name="password" id="password" />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup>
    import { useRouter } from "vue-router";
    import { inject } from "vue";
    import { useNotification } from "@kyvg/vue3-notification";
    const {notify} = useNotification();
    const login = inject("login");
    const router = useRouter()
    const onSubmit = function (e) {
        e.preventDefault();
        const data = new FormData(e.target);
        login({
            email: data.get("email"),
            password: data.get("password")
        }).then(() => {
            notify({
                type: "success",
                text: "You are now logged in"
            });
            router.push({ name: "Home" });
        }).catch((errors)=>{
            errors.forEach(error => {
                notify({
                    type: "error",
                    text: error.message
                })
            })
        })
    };
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 10px;
    }
</style>
