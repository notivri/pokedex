import { createApp } from "vue"
import App from "./app/App.vue"
import router from "./app/router/router.js"

import "./app/styles/normalise.css"
import "./app/styles/fonts.css"
import "./app/styles/main.css"

createApp(App).use(router).mount("#app")
