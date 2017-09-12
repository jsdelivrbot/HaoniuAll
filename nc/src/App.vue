<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		created() {
			console.log(localStorage.getItem('id'))
			if(localStorage.getItem('id') === null) {
				this.$router.push('/login')
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	body {
		background-color: #fbf9fe;
	}
	
	#app {
		height: 100%;
	}
</style>