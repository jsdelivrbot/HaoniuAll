<template>
	<div id="app">
		<keep-alive include='home'>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	export default {
		name: 'app',
		mounted() {
//			this.$http.get('xxxx', {
//				params: {
//					version: localStorage.getItem('version')
//				}
//			}).then(
//				(res) => {
//					if(res.data.result === 0) {
//						this.$CautoUpdate(res.data.obj)
//					}
//				}
//			)
		}
	}
</script>

<style lang="less">
	* {
		list-style: none;
	}
	
	@import '~vux/src/styles/reset.less';
	@import '~vux/src/styles/1px.less';
	@import '~swiper/dist/css/swiper.css';
	body {
		min-height: 100vh;
		background-color: #fafafa;
		height: auto;
	}
</style>