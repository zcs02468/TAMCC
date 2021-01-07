import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import echarts from "echarts";
import axios from "axios";
import "./assets/js/flexible";
import { Select, Icon, Dropdown, Menu } from 'ant-design-vue';
import { Pagination } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/assets/styles/base.scss";
import "@/assets/styles/common.scss";
import _ from 'lodash'
const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: './assets/js/iconfont.js', // 在 iconfont.cn 上生成
});

Vue.use(Pagination);
Vue.use(Dropdown);
Vue.use(Menu);
Vue.use(Select);
Vue.use(Icon);
Vue.use(MyIcon);

Vue.prototype._ = _
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
