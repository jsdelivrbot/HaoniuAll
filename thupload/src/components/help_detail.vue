<template>
	<div class="help_detail_box">
		<goback title='资讯详情'></goback>
		<div class="about_text">
			<div class="logo">
				<p v-html="title">{{title}}</p>
			</div>
			<p v-html="content">{{content}}</p>
		</div>
	</div>
</template>

<script>
	import goback from '@/components/return'
	export default {
		name: 'helpDetail',
		data() {
			return {
				info: {},
				title: '',
				content: ''
			}
		},
		components: {
			goback
		},
		created() {
			this.$vux.loading.show({
				text: '加载中'
			})
			this.$http('/api/frontBase/department/findNewInfoById', {
				params: {
					id: this.$route.params.id
				}
			}).then((res) => {
				if(res.data.result === 0) {
					this.info = res.data.obj
					this.title = this.info.title
					this.content = this.info.content
				} else {
					this.$vux.alert.show({
						title: '提示',
						content: res.data.msg
					})
				}
				this.$http('/api/frontBase/workOrderStep/findStepById', {
					params: {
						workOrderId: this.$route.params.id
					}
				}).then((res) => {
					if(res.data.result === 0) {
						this.step = res.data.obj
					}
					this.$nextTick(() => {
						this.$vux.loading.hide()
						this.isComplete = true
					})
				})
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.help_detail_box {
		min-height: 100vh;
		box-sizing: border-box;
		padding-top: 44px;
		background-color: #f7f7f7;
		.about_text {
			margin-top: 20px;
			padding: 0 20px;
			.logo {
				p {
					font-size: 20px;
					font-weight: bold;
					vertical-align: bottom;
					text-align: center;
					color: black;
					margin-bottom: 20px;
				}
			}
			p {
				line-height: 30px;
				color: #5c5c5c;
			}
		}
	}
</style>