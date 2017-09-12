<template>
	<div class="newsdetail-box">
		<topbar title='文章详情'></topbar>
		<div class="newsdetail-box-content" v-html='newsdetail' v-show='isshow'>
		</div>
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
				newsdetail: '',
				id: '',
				isshow: false
			}
		},
		mounted() {
			this.id = this.$route.params.id
			this.$vux.loading.show({
				text: '数据加载中.....'
			})
			this.$http.get('/getActicles', {
				params: {
					id: this.id
				}
			}).then(
				(res) => {
					this.$vux.loading.hide()
					this.isshow = true
					this.newsdetail = res.data.obj
				}
			)
		}
	}
</script>
<style lang="less">
	.newsdetail-box {
		padding-top: 44px;
		box-sizing: border-box;
		min-height: 100vh;
		background: #fff;
		.newsdetail-title {
			text-align: center;
			font-size: 17px;
			font-weight: normal;
			color: #333;
		}
		.newsdetail-box-content {
			padding: 5px 15px;
			box-sizing: border-box;
			overflow: hidden;
			height: auto;
			img {
				display: block;
				max-width: 100%;
			}
		}
	}
</style>