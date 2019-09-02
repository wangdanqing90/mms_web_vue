/* eslint-disable no-unused-vars */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import api from './api/api';
import store from './store/index';
import router from './router/index';
import Root from './Root.vue';
import echarts from 'echarts';

// import aaa from './utils/utils'

// 引入公共样式表
import 'normalize.css';
import 'animate.css';

import CryptoJS from 'crypto-js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// 引入echarts主模块（基础模块）
import ECharts from 'vue-echarts/components/ECharts.vue'
import common from './utils/utils'
// 引入需要的echarts如表
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

// 引入需要的 echarts的交互组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/toolbox';

import 'src/assets/styles/variable.scss';
import 'src/assets/styles/base.scss';
import 'src/assets/styles/common.scss';
import 'src/assets/styles/iconfont.css';
// Vue.use(Validator )
Vue.use(ElementUI);

Vue.prototype.common = common
Vue.prototype.$echarts = echarts; 
Vue.prototype.CryptoJS = CryptoJS;
// Vue.use(aaa)
Vue.component('chart', ECharts);

Vue.config.productionTip = false;

/* eslint-disable no-new */

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
// Vue.prototype.http = api6;


new Vue({
  el: '#app',
  store,
  router,
  template: '<Root/>',
  components: { Root }
});
