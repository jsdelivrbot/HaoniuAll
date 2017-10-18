<template>
	<div class="iframeBox">
		<callback title="分享购" :isshare="are" @shares='close'></callback>
		<div class="bg-color" v-if="showshare">
			<div class="categorycby">
				<div class="row row1">
					<div class="icon" @click="share('tm')">
						<img src="../../../static/hot-article-category5.png" width="38px" />
						<p>微信朋友圈</p>
					</div>
					<div class="icon" @click="share('wx')">
						<img src="../../../static/hot-article-category4.png" width="40px" />
						<p>微信好友</p>
					</div>
					<div class="icon">
						<img src="../../../static/hot-article-category6.png" width="40px" />
						<p>QQ好友</p>
					</div>
				</div>
				<div class="row row2">
					<div class="icon">
						<img src="../../../static/hot-article-category3.png" width="38px" />
						<p>微博</p>
					</div>
					<div class="icon"></div>
					<div class="icon"></div>
				</div>
				<div class="btn" @click="show">
					取消
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import callback from '@/common/vue/Header'
	export default {
		components: {
			callback
		},
		data() {
			return {
				token: sessionStorage.getItem('token'),
				httpUrl: localStorage.getItem('httpUrl'),
				are: true,
				id: '',
				showshare: false,
				uid: localStorage.getItem('id')
			}
		},
		mounted() {
			let $this = this
			let link
			if($this.$route.query.url) {
				let url = $this.$route.query.url
				link = 'app/' + decodeURIComponent(url) + '&token=' + $this.token
			} else {
				link = 'app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=goods&groupid=1&token=' + $this.token
			}
			if(plus.webview.getWebviewById('fxg') === null) {
				mui.openWindow({
					url: $this.httpUrl + link,
					id: 'fxg',
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
				plus.webview.getWebviewById('fxg').zIndex = -1
				let old = 'app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=goods&groupid=1&token=' + $this.token
				if(link !== old) {
					plus.webview.getWebviewById('fxg').loadURL($this.httpUrl + link)
				} else {
					plus.webview.getWebviewById('fxg').show()
				}
			}
		},
		methods: {
			share(selects) {
				let urls = ''
				let opts = ''
				if(this.id !== '') {
					urls = 'http://aifengxiang.hfrjkf.cn/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=goods.detail&id=' + this.id.id + '&uid=' + this.uid
					opts = {
						url: urls,
						title: this.id.title,
						content: this.id.content,
						img: this.id.img
					}
				} else {
					urls = this.httpUrl + 'app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=goods&groupid=1'
					opts = {
						url: urls,
						title: '爱生活,爱蜂享!',
						content: '爱蜂享,爱生活,开启你的购物新体验!',
						img: 'http://aifengxiang.hfrjkf.cn/logo.png'
					}
				}

				this.$CwxShare(selects, opts, function(res) {
					if(res) {
						mui.toast('分享成功!')
					} else {
						mui.toast('分享失败,请重试!')
					}
				})
			},
			show() {
				plus.webview.getWebviewById('fxg').show()
				this.showshare = false
			},
			close() {
				let id = plus.webview.getWebviewById('fxg').getTitle()
				if(id === '爱蜂享') {
					this.id = ''
				} else {
					this.id = JSON.parse(id)
				}
				plus.webview.getWebviewById('fxg').hide()
				this.showshare = true
			},
			geturls(cb) {
				mui.plusReady(function() {
					plus.webview.getWebviewById('fxg').canBack(function(res) {
						if(res.canBack) {
							plus.webview.getWebviewById('fxg').back()
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
					plus.webview.getWebviewById('fxg').hide()
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
		.iframeContent {
			width: 100%;
			height: 100%;
			padding-top: 44px;
			box-sizing: border-box;
			border: none !important;
		}
	}
</style>