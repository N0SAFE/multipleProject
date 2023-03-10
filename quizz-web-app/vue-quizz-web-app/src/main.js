import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./Router.js";
import Notifications from "@kyvg/vue3-notification";
import VueDirectus from "vue-directus";

const app = createApp(App);

app.use(VueDirectus, {
    apiUrl: "http://localhost:5109",
    auth: "cookie"
});
app.use(Notifications);
app.use(router);
app.mount("#app");
