import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

// import ECharts modules manually to reduce bundle size
import {
  SVGRenderer
} from 'echarts/renderers'
import {
  BarChart,
  PieChart,
  LineChart,
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  TitleComponent,
  LegendComponent,
  DataZoomComponent,
  TimelineComponent,
  MarkLineComponent,
  PolarComponent,
  GraphicComponent,
} from 'echarts/components'

use([
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  LineChart,
  TimelineComponent,
  SVGRenderer,
  MarkLineComponent,
  PolarComponent,
  GraphicComponent
]);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');

Vue.use(VueAxios, axios);
// register globally (or you can do it locally)
Vue.component('v-chart', ECharts);
