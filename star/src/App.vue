<template>
	<div id="app">
		<!--<transition name="slide-left">-->
		<keep-alive exclude='nokeep'>
			<router-view class="child-view"></router-view>
		</keep-alive>
		<!--</transition>-->
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	body {
		background-color: #fbf9fe;
	}
</style>