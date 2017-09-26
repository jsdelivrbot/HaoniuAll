<template>
	<div id="app">
		<keep-alive include="keep">
			<router-view class="child-view"></router-view>
		</keep-alive>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	* {
		outline: none;
	}
	
	body {
		background-color: #fbf9fe;
	}
</style>