// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

//import wysiwyg from 'vue-wysiwyg'
//import 'vue-wysiwyg/dist/vueWysiwyg.css'
//Vue.use(wysiwyg, {
//	image: {
//		uploadURL: 'http://192.168.1.252:8360/admin_pub/upload',
//		dropzoneOptions: {}
//	}
//})

import editor from 'vue-html5-editor'
Vue.use(editor, {
	name: 'vue-html5-editor',
	showModuleName: false,
	icons: {
		text: 'fa fa-pencil',
		color: 'fa fa-paint-brush',
		font: 'fa fa-font',
		align: 'fa fa-align-justify',
		list: 'fa fa-list',
		link: 'fa fa-chain',
		unlink: 'fa fa-chain-broken',
		tabulation: 'fa fa-table',
		image: 'fa fa-file-image-o',
		hr: 'fa fa-minus',
		eraser: 'fa fa-eraser',
		undo: 'fa-undo fa',
		'full-screen': 'fa fa-arrows-alt',
		info: 'fa fa-info'
	},
	image: {
		sizeLimit: 5120 * 1024,
		upload: {
			url: 'http://192.168.1.252:8360/admin_pub/upload',
			fieldName: 'file'
		},
		compress: {
			width: 1600,
			height: 1600,
			quality: 80
		},
		uploadHandler(responseText) {
			var json = JSON.parse(responseText)
			console.log(json)
			if(json.errno !== 0) {
				alert(json.msg)
			} else {
				return 'http://192.168.1.252:8360/' + json.data
			}
		}
	},
	language: 'zh-cn',
	i18n: {
		'zh-cn': {
			'align': '对齐方式',
			'image': '图片',
			'list': '列表',
			'link': '链接',
			'unlink': '去除链接',
			'table': '表格',
			'font': '文字',
			'full screen': '全屏',
			'text': '排版',
			'eraser': '格式清除',
			'info': '关于',
			'color': '颜色',
			'please enter a url': '请输入地址',
			'create link': '创建链接',
			'bold': '加粗',
			'italic': '倾斜',
			'underline': '下划线',
			'strike through': '删除线',
			'subscript': '上标',
			'superscript': '下标',
			'heading': '标题',
			'font name': '字体',
			'font size': '文字大小',
			'left justify': '左对齐',
			'center justify': '居中',
			'right justify': '右对齐',
			'ordered list': '有序列表',
			'unordered list': '无序列表',
			'fore color': '前景色',
			'background color': '背景色',
			'row count': '行数',
			'column count': '列数',
			'save': '确定',
			'upload': '上传',
			'progress': '进度',
			'unknown': '未知',
			'please wait': '请稍等',
			'error': '错误',
			'abort': '中断',
			'reset': '重置'
		}
	},
	hiddenModules: [],
	visibleModules: [
		'text',
		'color',
		'font',
		'align',
		'list',
		'link',
		'unlink',
		'tabulation',
		'image',
		'hr',
		'eraser',
		'undo',
		'full-screen',
		'info'
	],
	modules: {}
});

Vue.use(ElementUI)
Vue.use(Axios)

Axios.defaults.baseURL = 'http://192.168.1.252:8360'
Vue.prototype.$http = Axios

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
	if(to.path !== '/login') {
		if(!sessionStorage.getItem('token')) {
			next('/login')
		} else {
			next()
		}
	} else {
		next() // 确保一定要调用 next()
	}
})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})