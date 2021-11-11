import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import HighchartsVue from "highcharts-vue";


library.add(faGithub);

createApp(App)
  .use(router)
  .use(HighchartsVue)
  .component('fa', FontAwesomeIcon)
  .mount('#app');
