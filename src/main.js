// Import the createApp function from the Vue package and the createPinia function from the Pinia package
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import the App.vue file and the router module
import App from './App.vue'
import router from './router'

// Create a new Vue app instance
const app = createApp(App)

// Create a new Pinia instance
const pinia = createPinia()

// Tell the app to use the router module and the Pinia instance
app.use(router)
app.use(pinia)

// Mount the app to the '#app' element in the HTML file
app.mount('#app')
