<template>
    <div>
        <h1>Register</h1>
        <form @submit="onSubmit">
            <div class="line">
                <label for="firstName">first name:</label>
                <input type="text" name="firstName" id="firstName" />
            </div>
            <div class="line">
                <label for="lastName">last name:</label>
                <input type="text" name="lastName" id="lastName" />
            </div>
            <div class="line">
                <label for="email">email:</label>
                <input type="email" name="email" id="email" />
            </div>
            <div class="line">
                <label for="password">password:</label>
                <input type="password" name="password" id="password" />
            </div>
            <div class="line">
                <label for="passwordConfirm">password confirm:</label>
                <input type="password" name="passwordConfirm" id="passwordConfirm" />
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script setup>
    import { useRouter } from "vue-router";
    import { inject } from "vue";
    import { useNotification } from "@kyvg/vue3-notification";
    const { notify } = useNotification();
    const register = inject("register");
    const router = useRouter();
    const onSubmit = function (e) {
        e.preventDefault();
        const data = new FormData(e.target);
        register({
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),
            passwordConfirm: data.get("passwordConfirm"),
        }).then(() => {
            notify({
                type: "success",
                text: "You are now registered"
            });
            router.push({ name: "Home" });
        }).catch(errors => {
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
