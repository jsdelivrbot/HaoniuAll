<template>
	<div class="tuijianlist">
		<topbar title='课程推荐'></topbar>
		<courselist :data='course' v-if='course'></courselist>
	</div>
</template>
<script>
	import topbar from '@/components/callback'
	import courselist from '@/components/course/courselist'
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
			this.$http.get('/search', {
				params: {
					target: 'k',
					dist: '3',
					lng: localStorage.getItem('lng'),
					lat: localStorage.getItem('lat'),
					page: '1',
					rows: '100',
					style: '0',
					type: 'list'
				}
			}).then(
				(res) => {
					this.course = res.data.obj.result
					console.log(res.data)
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