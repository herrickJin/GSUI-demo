import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {GSMessage} from "./components/message";
import GSProgress from "./components/progress";

const app = createApp(App)
app.use(GSMessage);
app.use(GSProgress);

app.mount('#app')
