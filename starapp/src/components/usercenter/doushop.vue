<template>
	<div class="dou">
		<topbar title='转换豆商城'></topbar>
	</div>
</template>
<script>
	import { Cell, Group } from 'vux'
	import topbar from '@/components/callback'
	export default {
		name: 'nokeep',
		components: {
			topbar,
			Cell,
			Group
		},
		data() {
			return {
				token: sessionStorage.getItem('token'),
				total: '',
				shopUrl: ''
			}
		},
		mounted() {
			this.$http.get('/user/dou/getShopUrl').then(
				(res) => {
					this.shopUrl = res.data.obj
					console.log(res.data)
					this.toShop()
				}
			)
		},
		beforeRouteLeave(to, from, next) {
			this.geturls(function(res) {
				if(res) {
					next()
					plus.webview.getWebviewById('news').hide()
				} else {
					next(false)
				}
			})
		},
		methods: {
			toShop() {
				let $this = this
				mui.plusReady(function() {
					if(plus.webview.getWebviewById('news') === null) {
						mui.openWindow({
							url: $this.shopUrl,
							id: 'news',
							styles: {
								top: '44px',
								bottom: 0
							},
							show: {
								autoShow: true,
								aniShow: 'slide-in-right'
							},
							waiting: {
								autoShow: true,
								title: '正在加载...'
							}
						})
					} else {
						plus.webview.getWebviewById('news').show()
					}
				})
			},
			geturls(cb) {
				mui.plusReady(function() {
					plus.webview.getWebviewById('news').canBack(function(res) {
						if(res.canBack) {
							plus.webview.getWebviewById('news').back()
							cb(false)
						} else {
							cb(true)
						}
					})
				})
			}
		}
	}
</script>
<style lang="less" scoped="scoped">

</style>