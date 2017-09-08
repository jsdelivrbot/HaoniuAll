<template>
	<div>
		<goback title='砸金蛋' :id='newsId'></goback>
		<iframe :src="lchttp+'/app/prize/index?token='+ifm" style="width: 100%;height: calc(100vh - 50px);margin-top: 50px;">
		</iframe>
	</div>
</template>
<script>
	import goback from '../components/goback'

	export default {
		components: {
			goback
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				ifm: ''
			}
		},
		created() {
			this.ifm = this.$route.params.url
		}
	}
</script>
<style lang="less">

</style>