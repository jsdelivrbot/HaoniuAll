<template>
	<div>
		<keep-alive>
			<router-view class="child-view"></router-view>
		</keep-alive>
		<v-footer></v-footer>
	</div>
</template>
<script>
	import footer from '../components/footer'
	import { querystring } from 'vux'
	export default {
		components: {
			'v-footer': footer
		},
		data() {
			return {
				localhttp: localStorage.getItem('localhttp')
			}
		},
		mounted() {
			this.getChildrenInfo()
			sessionStorage.setItem('goback', 'home')
			let $this = this
			let url = window.location.href
			this.$http.get('/weChat/pay/payStart', {
				params: {
					'url': url
				}
			}).then(
				(res) => {
					console.log(this.$wechat)
					this.$wechat.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: res.data.obj.appid, // 必填，公众号的唯一标识
						timestamp: res.data.obj.timestamp, // 必填，生成签名的时间戳
						nonceStr: res.data.obj.nonceStr, // 必填，生成签名的随机串
						signature: res.data.obj.signature, // 必填，签名，见附录1
						jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					})
				}
			)
			this.$wechat.ready(
				function() {
					$this.$wechat.getLocation({
						type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						success: function(res) {
							$this.$http.get('/user/watch/getBaiduCoordinate', {
								longitude: res.longitude,
								latitude: res.latitude,
								type: '1'
							}).then(
								(vaks) => {
									localStorage.setItem('lat', vaks.data.obj.latitude)
									localStorage.setItem('lng', vaks.data.obj.longitude)
								}
							)
						}
					})
				}
			)

			this.$wechat.error(function(res) {
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
							jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						})

						$this.$wechat.ready(function() {
							$this.$wechat.getLocation({
								type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
								success: function(res) {
									localStorage.setItem('lat', res.latitude)
									localStorage.setItem('lng', res.longitude)
									console.log(localStorage.getItem('lat'))
								}
							})
						})
					}
				)
			})
		},
		methods: {
			getChildrenInfo() {
				this.$http.get('/user/children/findChilren').then(
					(res) => {
						if(res.data.result === 0) {
							console.log(res.data)
							let arr = {}
							arr.obj = res.data.obj
							localStorage.setItem('childrenInfo', JSON.stringify(res.data.obj))
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.child-view {
		position: absolute;
		width: 100%;
		transition: all .6s cubic-bezier(.55, 0, .1, 1);
	}
	
	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		-webkit-transform: translate(50px, 0);
		transform: translate(50px, 0);
	}
	
	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		-webkit-transform: translate(-50px, 0);
		transform: translate(-50px, 0);
	}
</style>