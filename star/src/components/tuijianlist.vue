<template>
	<div class="tuijianlist">
		<topbar title='课程推荐'></topbar>
		<courselist :data='course'></courselist>
	</div>
</template>
<script>
	import topbar from '../components/callback'
	import courselist from '../components/courselist'
	export default {
		components: {
			topbar,
			courselist
		},
		data() {
			return {
				course: []
			}
		},
		mounted() {
			this.$http.get('/business/course/recommend', {
				params: {
					lng: localStorage.getItem('lng'),
					lat: localStorage.getItem('lat')
				}
			}).then(
				(res) => {
					this.course = res.data.obj
				}
			)
		}
	}
</script>
<style lang="less">
	.tuijianlist {
		padding-top: 50px;
		box-sizing: border-box;
	}
</style>