<template>
	<div>
		<keep-alive>
			<router-view class="child-view"></router-view>
		</keep-alive>
		<v-footer></v-footer>
	</div>
</template>
<script>
	import footer from '@/components/footer'
	import { querystring } from 'vux'
	export default {
		name: 'keep',
		components: {
			'v-footer': footer
		},
		data() {
			return {
				token: sessionStorage.getItem('token')
			}
		},
		activated() {
			sessionStorage.setItem('goback', 'home')
			this.getChildrenInfo()
		},
		mounted() {
			this.$ConLine(function(res) {
				if(!res) {
					mui.toast('请打开网络连接')
				}
			})
			let $this = this
			this.$CGPS(function(res) {
				if(res) {
					$this.$http.get('/coordinate', {
						params: {
							lng: res.lng,
							lat: res.lat
						}
					}).then(
						(res) => {
							localStorage.setItem('lat', res.data.lat)
							localStorage.setItem('lng', res.data.lng)
						}
					)
				} else {
					mui.toast('获取位置信息失败,请打开GPS!')
				}
			})
			this.getChildrenInfo()
			this.$CgetCID(function(res) {
				//				alert(res + 'cid') //res 返回CID
			})
			document.addEventListener('plusready', function() {
				plus.push.addEventListener('click', function(msg) {
					alert('进入Click事件')
					var vData = JSON.stringify(msg)
					alert(vData)
					switch(msg.payload) {
						case 'LocalMSG':
							//							alert('点击本地创建消息启动：')
							break
						default:
							//							alert('点击离线推送消息启动：')
							break
					}
					plus.ui.alert(msg.content)
					console.log(msg.content)
				}, false)
				plus.push.addEventListener('receive', function(msg) {
					alert('receive')
					if(msg.aps) { // Apple APNS message
						alert('接收到在线APNS消息：')
					} else {
						alert('接收到在线透传消息：' + msg.content)
					}
				}, false)
			}, false)
		},
		watch: {
			token() {
				this.getChildrenInfo()
			}
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