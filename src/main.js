import { createApp } from 'vue'
import stores from './store'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './config/router.config'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes,
})

createApp(App)
    .use(stores)
    .use(router)
    .use(Antd)
    .mount('#app')