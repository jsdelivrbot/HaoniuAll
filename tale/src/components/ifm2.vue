<template>
	<div>
		<goback title='推荐' ifm='9'></goback>
		<iframe :src="ifm" style="width: 100%;height: calc(100vh - 50px);margin-top: 50px;">
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
			this.ifm = sessionStorage.getItem('tolink')
		}
	}
</script>
<style lang="less">

</style>