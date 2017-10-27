<template>
	<div>
		<keep-alive include="keep">
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
					$this.$http.get('/user/watch/getBaiduCoordinate', {
						params: {
							longitude: res.coords.longitude,
							latitude: res.coords.latitude,
							type: '3'
						}
					}).then(
						(res) => {
							localStorage.setItem('lat', res.data.obj.latitude)
							localStorage.setItem('lng', res.data.obj.longitude)
						}
					)
				} else {
					mui.toast('获取位置信息失败,请打开GPS!')
				}
			})
			this.getChildrenInfo()
			document.addEventListener('plusready', function() {
				plus.push.addEventListener('click', function(msg) {
					var vData = JSON.stringify(msg)
					alert(vData)
					switch(msg.payload) {
						case 'LocalMSG':
							break
						default:
							break
					}
					plus.ui.alert(msg.content)
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

</style>