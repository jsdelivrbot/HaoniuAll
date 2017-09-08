// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueResource)
Vue.use(ElementUI)

Vue.http.options.headers = {
	'token': sessionStorage.getItem('token')
}

//localStorage.setItem('http', 'http://192.168.1.189:8085')
localStorage.setItem('http', 'https://haowen.im')

router.beforeEach((to, from, next) => {
	Vue.http.options.headers = {
		'token': sessionStorage.getItem('token')
	}
	if(to.path === '/reg') {
		return next()
	}
	if(to.path !== '/login') {
		if(sessionStorage.getItem('token') === null) {
			return next('/login')
		} else {
			next()
		}
	}
	next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})