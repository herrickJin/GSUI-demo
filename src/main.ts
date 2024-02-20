import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {GSMessage} from "./components/message";

const app = createApp(App)
app.use(GSMessage);
app.mount('#app')
