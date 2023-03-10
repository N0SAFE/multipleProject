import * as VueRouter from "vue-router";
import Home from "./routes/Home.vue";
import Login from "./routes/auth/Login.vue";
import Register from "./routes/auth/Register.vue";
import Logout from "./routes/auth/Logout.vue";
import AuthLayout from "./layout/AuthLayout.vue";
import RightCornerLayout from "./layout/RightCornerLayout.vue";
import Me from "./routes/Profile/Me.vue";
import List from "./routes/Quizz/List.vue";
import Creation from "./routes/Quizz/Creation.vue";
import Quizz from "./routes/Quizz/Quizz.vue"

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: "/",
            component: RightCornerLayout,
            children: [
                {
                    path: "",
                    name: "AuthLayout",
                    component: AuthLayout,
                    children: [
                        {
                            path: "",
                            name: "Home",
                            component: Home
                        },
                        {
                            path: "/profile",
                            children: [
                                {
                                    name: "Me",
                                    path: "me",
                                    component: Me
                                }
                            ]
                        },
                        {
                            path: "/quizz",
                            children: [
                                {
                                    name: "Creation",
                                    path: "creation",
                                    component: Creation
                                },
                                {
                                    name: "List",
                                    path: "list",
                                    component: List
                                },
                                {
                                    name: "Quizz",
                                    path: ":id",
                                    component: Quizz
                                }
                            ]
                        }
                    ]
                },
                {
                    path: "",
                    name: "Auth",
                    children: [
                        {
                            path: "login",
                            name: "Login",
                            component: Login
                        },
                        {
                            path: "register",
                            name: "Register",
                            component: Register
                        },
                        {
                            path: "logout",
                            name: "Logout",
                            component: Logout
                        }
                    ]
                }
            ]
        }
    ]
});

export default router;
