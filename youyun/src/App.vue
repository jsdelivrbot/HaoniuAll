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
	@import '../static/font/icon.less';
	@import '~vux/src/styles/1px.less';
	@import '~vux/src/styles/close.less';
	body {
		background-color: #f1eff2;
	}
	*:not(input, textarea) {
		-webkit - touch - callout: none;
		-webkit - user - select: none;
	}
</style>