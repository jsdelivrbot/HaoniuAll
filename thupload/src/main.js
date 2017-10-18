// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'

FastClick.attach(document.body)

Vue.config.productionTip = false

//router.beforeEach((to, from, next) => {
//	if(to.path !== '/login' && to.path !== '/reg' && to.path !== '/forget') {
//		if(!sessionStorage.getItem('token')) {
//			next('/login')
//		} else {
//			next()
//		}
//	} else {
//		next() // 确保一定要调用 next()
//	}
//})
/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')