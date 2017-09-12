<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
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