<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				gps: ''
			}
		},
		mounted() {
			let $this = this
			this.$CGPS(function(val) {
				$this.gps = val
				$this.getGps()
			})
		},
		methods: {
			getGps() {
				this.$http.get('/getData/index.php?m=home&c=Form&a=getCityName&seachdata={"x":"' + this.gps.lat + '","y":"' + this.gps.lng + '"}').then(
					(res) => {
						if(res) {
							sessionStorage.setItem('city', res.data.data.city)
							sessionStorage.setItem('cityPosition', res.data.data.city)
							sessionStorage.setItem('counties', res.data.data.county)
						} else {
							mui.toast('获取位置信息失败,请打开GPS!')
						}
					}
				)
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import '../static/less/index.less';
	@import '~vux/src/styles/1px.less';
	body {
		background-color: #f0f0f0;
		line-height: 20px;
	}
</style>