<template>
	<div class="saveImg">
		<topbar title='视频详情' issave=t rue @topSaves='topSaves'></topbar>
		<img :src="detailInfo.url" class="saveimg" />
	</div>
</template>
<script>
	import topbar from '@/components/callback'

	export default {
		name: 'nokeep',
		components: {
			topbar
		},
		data() {
			return {
				detailId: this.$route.params.id,
				chidlrenId: this.$route.params.childrenId,
				timetableId: this.$route.params.timetableId,
				detailInfo: ''
			}
		},
		mounted() {
			this.$http.get('/classHour/notice/listByNoticesId', {
				params: {
					id: this.detailId
				}
			}).then(
				(res) => {
					this.detailInfo = res.data.obj
					console.log(res.data)
				}
			)
		},
		methods: {
			topSaves() {
				this.$http.get('/classHour/datum/saveDatum', {
					params: {
						childId: this.chidlrenId,
						timetableId: this.timetableId,
						cover: this.detailInfo.url,
						type: 0
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '保存成功!'
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: '保存失败,请重试!'
							})
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.saveImg {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		padding-top: 54px;
		box-sizing: border-box;
		position: relative;
		.saveimg {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			margin: auto;
			max-width: 80%;
			max-height: 80%;
		}
	}
</style>