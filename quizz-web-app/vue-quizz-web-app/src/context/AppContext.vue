<template>
    <div v-if="isLogin === true && JSON.stringify(me) === '{}'"></div>
    <slot v-else></slot>
</template>

<script setup>
    import { provide, ref, onMounted } from "vue";
    import { useDirectus } from "vue-directus";

    const directus = useDirectus();
    const me = ref({});
    const isLogin = ref(localStorage.getItem("token") !== null);

    const login = function ({ email, password }) {
        return new Promise((resolve, reject) => {
            directus.auth
                .login({
                    email,
                    password
                })
                .then((response) => {
                    if (response.errors) {
                        reject(response.errors);
                        return;
                    }
                    return updateMe().then(() => {
                        resolve(response);
                    });
                })
                .catch((error) => {
                    reject([error]);
                });
        });
    };

    const logout = () => {
        return new Promise((resolve, reject) => {
            directus.auth.logout().finally(function () {
                updateMe().then(() => {
                    resolve();
                });
            });
        });
    };

    const register = ({ email, password, passwordConfirm, firstName, lastName }) => {
        return new Promise((resolve, reject) => {
            if (password !== passwordConfirm) {
                reject([
                    {
                        message: "Password and password confirm are not the same"
                    }
                ]);
                return;
            }
            directus
                .items("directus_users")
                .createOne({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                    status: "active",
                    role: "69fd330c-9153-46b5-ba58-780e43e61858"
                })
                .then((response) => {
                    if (response.errors) {
                        reject(response.errors);
                        return;
                    }
                    login({ email, password }).then((response) => {
                        resolve(response);
                    });
                });
        });
    };
    
    provide("login", login)
    provide("register", register)
    provide("logout", logout)
    provide("isLogin", isLogin)
    provide("me", me)

    const updateMe = function () {
        return new Promise((resolve, reject) => {
            directus.users.me
                .read()
                .then((response) => {
                    localStorage.setItem("token", response.access_token);
                    me.value = response;
                    isLogin.value = true;
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    me.value = {};
                    isLogin.value = false;
                })
                .finally(() => {
                    resolve();
                });
        });
    };

    onMounted(() => {
        updateMe();
    });

    provide("me", me);
</script>
