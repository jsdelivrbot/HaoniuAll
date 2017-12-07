<template>
	<section class="face-box">
		<v-header title="人脸识别"></v-header>
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
			this.$http.post('api/certify/faceCertify').then(
				(res) => {
					if(res.data.result === 0) {
						mui.openWindow({
							url: res.data.obj,
							id: 'face',
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
					}
				}
			)
		},
		beforeRouteLeave(to, from, next) {
			try {
				plus.webview.getWebviewById('face').close()
				next()
			} catch(err) {
				next()
			}
		}
	}
</script>
<style lang="less">

</style>