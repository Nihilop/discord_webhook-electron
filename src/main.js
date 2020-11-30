import Vue from 'vue'
import './plugins/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueDynamicForms from '@asigloo/vue-dynamic-forms'
import './plugins/element.js'
import VueDiscordMessage from 'vue-discord-message'
 



Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueDynamicForms)
Vue.use(VueDiscordMessage)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
