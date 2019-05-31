// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueScrollTo  from 'vue-scrollto'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n'
import store from './store'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'
import currencyFilter from './filter/filter'

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueScrollTo)
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: 'zhTW'
})
Vue.use(VeeValidate, {
	i18n,
	dictionary: {
	  zhTW
	},
	events: 'input|blur',
});

axios.defaults.withCredentials = true 

//Font awesome
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)
Vue.filter('currency', currencyFilter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	i18n,
	el: '#app',
	store,
	router,
	components: { App },
	template: '<App/>'
})

//直接重整頁面不會觸發beforeEach
if(!localStorage.getItem('adminToken')) {
	router.push('/')
}

router.beforeEach((to, from, next) => {
	const isLogin = localStorage.getItem('adminToken') === 'adminLogin'
	if(isLogin) {
		next()
	} else {
		if(to.meta.requiresAuth) {
			alert('請先登入會員')
		} else {
			next()
		}
	}
})