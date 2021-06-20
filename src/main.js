import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2';
import VueMask from 'v-mask'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueYoutube from 'vue-youtube'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vco from "v-click-outside"
import "./vee-validate";
import router from './router'
import store from '@/state/store'
import i18n from './i18n'
import VueMeta from 'vue-meta'
import Notifications from 'vue-notification'
import moment from 'moment'

import "@/assets/scss/app.scss";
Vue.prototype.moment = moment;
Vue.use(Notifications)
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})


Vue.use(VueAxios, axios)
const token = localStorage.getItem('token');
if(token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
} else {
    delete axios.defaults.headers.common['authorization'];
}

//axios.defaults.baseURL = 'https://naun.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:4000/';


Vue.config.productionTip = false
Vue.use(VueYoutube)
Vue.use(BootstrapVue)
Vue.use(vco)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2);
Vue.use(VueMask)
Vue.use(require('vue-chartist'))
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE',
    libraries: 'places',
  },
  installComponents: true
})
Vue.component('apexchart', VueApexCharts)

new Vue({ 
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
