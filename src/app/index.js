import App from "./App.vue"
import router from "./router/router.js"
import { createApp } from "vue"
import { createPinia } from "pinia"

import "./styles/normalise.css"
import "./styles/main.css"

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

export { app }
