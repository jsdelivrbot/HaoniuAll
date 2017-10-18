<template>
	<div id="app">
		<router-view></router-view>
		<loading v-model="isLoading"></loading>
	</div>
</template>

<script>
	import { Loading } from 'vux'
	import { mapState } from 'vuex'
	export default {
		name: 'app',
		components: {
			Loading
		},
		computed: {
			...mapState({
				isLoading: state => state.vux.isLoading
			})
		}
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
</style>