<template>
	<div id="app">
		<div v-transfer-dom>
			<loading v-model="isLoading"></loading>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import { Loading, TransferDom } from 'vux'
	import { mapState } from 'vuex'

	export default {
		directives: {
			TransferDom
		},
		components: {
			Loading
		},
		computed: {
			isLoading() {
				return this.$store.state.isLoading
			}
			/*...mapState({
				isLoading: state => state.vux.isLoading
			})*/
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import '../static/css/theme.less';
	body {
		background-color: #fbf9fe;
	}
	
	#app {
		width: 100%;
		height: 100%;
	}
</style>