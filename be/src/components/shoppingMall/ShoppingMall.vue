<template>
	<div class="iframeBox">
		<callback title="佣金商城"></callback>
	</div>
</template>
<script>
	import callback from '@/common/vue/Header'
	import IndexFooter from '@/common/vue/IndexFooter'
	export default {
		components: {
			callback,
			IndexFooter
		},
		data() {
			return {
				token: sessionStorage.getItem('token'),
				httpUrl: localStorage.getItem('httpUrl'),
				are: true,
				id: '',
				showshare: false
			}
		},
		mounted() {
			let $this = this
			mui.plusReady(function() {
				if(plus.webview.getWebviewById('news') === null) {
					let link
					if($this.$route.query.url) {
						let url = $this.$route.query.url
						link = 'app/' + decodeURIComponent(url) + '&token=' + $this.token
					}else {
						link = 'app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=goods&token=' + $this.token
					}
					mui.openWindow({
						url: $this.httpUrl + link,
						id: 'news',
						styles: {
							top: '44px',
							bottom: '0px'
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
					plus.webview.getWebviewById('news').zIndex = -1
					plus.webview.getWebviewById('news').show()
				}
			})
		},
		methods: {
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
		}
	}
</script>

<style lang="less">
	.bg-color {
		height: 100vh;
		position: fixed;
		z-index: 1;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
	}
	
	.categorycby {
		background-color: #f0f0f0;
		width: 100%;
		height: 224px;
		position: absolute;
		left: 0;
		bottom: 0;
		.row {
			display: flex;
			height: 60px;
			align-items: center;
			margin-top: 20px;
			.icon {
				flex: 1;
				width: 0;
				text-align: center;
				p {
					font-size: 12px;
					margin-top: 6px;
				}
			}
		}
		.row2 {
			margin-bottom: 20px;
		}
		.btn {
			height: 44px;
			line-height: 44px;
			background-color: #ffffff;
			text-align: center;
			font-size: 12px;
			color: #707070;
		}
	}
	
	.iframeBox {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		.title-shopping-mall {
			width: 100%;
			height: 44px;
			background-color: #e70012;
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 6;
			color: white;
			font-size: 18px;
		}
		.iframeContent {
			width: 100%;
			height: 100%;
			padding-top: 44px;
			box-sizing: border-box;
			border: none !important;
		}
	}
</style>