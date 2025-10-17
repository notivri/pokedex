import App from "./App.vue"
import router from "./router/router.js"
import { createApp } from "vue"
import { createPinia } from "pinia"
import createPersistedState from "pinia-plugin-persistedstate"

import "./styles/normalise.css"
import "./styles/main.css"

const app = createApp(App)
const pinia = createPinia()

pinia.use(createPersistedState)

app.use(router)
app.use(pinia)

export { app }
