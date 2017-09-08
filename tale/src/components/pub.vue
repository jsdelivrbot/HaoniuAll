<template>
	<div>
		<div style="margin-bottom: 60px;">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		<v-footer></v-footer>
	</div>
</template>
<script>
	import footer from '../components/footer'
	export default {
		components: {
			'v-footer': footer
		},
		created() {
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
							alert('点击离线推送消息启动：')
							break
					}
					plus.ui.alert(msg.content)
					alert(1)
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
		}
	}
</script>
<style lang="less">

</style>