<template>
	<section class="face-box">
		<v-header title="手机号认证"></v-header>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		name: 'nokeep',
		components: {
			'v-header': Header
		},
		mounted() {
			this.$http.post('api/moxie/carrier/url').then(
				(res) => {
					plus.webview.getLaunchWebview().setStyle({
						height: '44px',
						zindex: 1111
					})
					if(res.data.result === 0) {
						mui.openWindow({
							url: res.data.obj,
							id: 'phone',
							styles: {
								top: '10px',
								bottom: '0px',
								zindex: 1
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
					}
				}
			)
		},
		beforeRouteLeave(to, from, next) {
			try {
				plus.webview.getWebviewById('phone').close()
				plus.webview.getLaunchWebview().setStyle({
					height: '100%'
				})
				next()
			} catch(err) {
				next()
			}
		}
	}
</script>
<style lang="less">

</style>