<template>
	<div class="tuiguangma">
		<topbar title='我的推广码'></topbar>
		<!--<img src="../../static/img/timg.jpg" />-->
		<img :src="'http://wx.dianke8.com/xxdk/static/qrCode/'+img" v-if='img'>
		<div class="intro">
			<h2 class="title">
				使用说明
			</h2>
			<p>1.奖励提现后,将提取到您的 微信零钱包中,请注意零钱包余额变化;</p>
			<p>2.为保障提现顺畅,请确保您 已关注星星点课微信公众号; </p>
			<p>3.若遇到其他问题,请与客服进行联系。</p>
		</div>
	</div>
</template>
<script>
	import topbar from '../components/callback'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				token: sessionStorage.getItem('token'),
				img: '',
				username: ''
			}
		},
		methods: {
			getall() {
				let $this = this
				setTimeout(function() {
					if(sessionStorage.getItem('token')) {
						$this.$http.get('/user/reward/createErwei').then(
							(res) => {
								$this.img = res.data.obj.url
								$this.username = res.data.obj.username
								$this.share()
							}
						)
					} else {
						$this.getall()
					}
				}, 100)
			},
			share() {
				let $this = this
				let url = window.location.href
				this.$http.get('/weChat/pay/payStart', {
					params: {
						'url': url
					}
				}).then(
					(res) => {
						this.$wechat.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: res.data.obj.appid, // 必填，公众号的唯一标识
							timestamp: res.data.obj.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.data.obj.nonceStr, // 必填，生成签名的随机串
							signature: res.data.obj.signature, // 必填，签名，见附录1
							jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						})

						$this.$wechat.ready(function() {
							$this.$wechat.onMenuShareAppMessage({
								title: '星星点课', // 分享标题
								desc: '快来成为星星点课会员吧，立即获得更多优惠少儿课程!', // 分享描述
								link: 'http://wx.dianke8.com/?username=' + $this.username + '#/tuiguangma', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: 'http://wx.dianke8.com/xxdk/logo/123.png', // 分享图标
								type: '', // 分享类型,music、video或link，不填默认为link
								dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
								success: function() {
									// 用户确认分享后执行的回调函数
								},
								cancel: function() {
									// 用户取消分享后执行的回调函数
								}
							})

							$this.$wechat.onMenuShareTimeline({
								title: '星星点课', // 分享标题
								link: 'http://wx.dianke8.com/?username=' + $this.username + '#/tuiguangma', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: 'http://wx.dianke8.com/xxdk/logo/123.png', // 分享图标
								success: function() {
									// 用户确认分享后执行的回调函数
								},
								cancel: function() {
									// 用户取消分享后执行的回调函数
								}
							})
						})
					}
				)

				$this.$wechat.error(function(res) {
					$this.$http.get('/weChat/pay/payStart', {
						params: {
							'url': 'http://wx.dianke8.com/#/pub/home'
						}
					}).then(
						(res) => {
							$this.$wechat.config({
								debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								appId: res.data.obj.appid, // 必填，公众号的唯一标识
								timestamp: res.data.obj.timestamp, // 必填，生成签名的时间戳
								nonceStr: res.data.obj.nonceStr, // 必填，生成签名的随机串
								signature: res.data.obj.signature, // 必填，签名，见附录1
								jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							})

							$this.$wechat.ready(function() {
								$this.$wechat.onMenuShareAppMessage({
									title: '星星点课', // 分享标题
									desc: '快来成为星星点课会员吧，立即获得更多优惠少儿课程!', // 分享描述
									link: 'http://wx.dianke8.com/?username=' + $this.username + '#/tuiguangma', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl: 'http://wx.dianke8.com/xxdk/logo/123.png', // 分享图标
									type: '', // 分享类型,music、video或link，不填默认为link
									dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
									success: function() {
										// 用户确认分享后执行的回调函数
									},
									cancel: function() {
										// 用户取消分享后执行的回调函数
									}
								})
								$this.$wechat.onMenuShareTimeline({
									title: '星星点课', // 分享标题
									link: 'http://wx.dianke8.com/?username=' + $this.username + '#/tuiguangma', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl: 'http://wx.dianke8.com/xxdk/logo/123.png', // 分享图标
									success: function() {
										// 用户确认分享后执行的回调函数
									},
									cancel: function() {
										// 用户取消分享后执行的回调函数
									}
								})
							})
						}
					)
				})
			}
		},
		mounted() {
			function GetQueryString(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				var r = window.location.search.substr(1).match(reg)
				if(r != null) return unescape(r[2])
				return ''
			}

			if(GetQueryString('username') !== '') {
				localStorage.setItem('username', GetQueryString('username'))
				window.location.href = 'http://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd0b68ce5e6fa1e14&redirect_uri=http://wx.dianke8.com/xxdk/app/weChat/pay/wxRegistOpenid&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
			}
			this.getall()
		}
	}
</script>
<style lang="less">
	.tuiguangma {
		height: auto;
		overflow: hidden;
		padding-top: 46px;
		box-sizing: border-box;
		>img {
			width: 186px;
			display: block;
			margin: auto;
			margin-top: 35px;
			margin-bottom: 43px;
		}
		.intro {
			padding: 0 15px;
			box-sizing: border-box;
			.title {
				font-size: 15px;
				color: #333;
				margin-bottom: 10px;
			}
			p {
				color: #999;
				line-height: 24px;
				font-size: 13px;
			}
		}
	}
</style>