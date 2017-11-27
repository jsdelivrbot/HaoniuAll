<template>
	<section class="newsDetail-box">
		<v-header title='详情'></v-header>
		<div class="detail">
			<h3>{{detail.title}}</h3>
			<div class="html_content" v-html="detail.content">
			</div>
		</div>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		name: 'newsdetail',
		components: {
			'v-header': Header
		},
		data() {
			return {
				detail: ''
			}
		},
		mounted() {
			this.$http.get('api/question/content', {
				params: {
					id: this.$route.params.id
				}
			}).then(
				(res) => {
					this.detail = res.data.obj
				}
			)
		}
	}
</script>
<style lang="less">
	.newsDetail-box {
		width: 100%;
		height: auto;
		overflow: hidden;
		padding-top: 60px;
		box-sizing: border-box;
		.detail {
			background: #fff;
			text-align: center;
			padding: 20px;
			box-sizing: border-box;
			color: #393939;
			h3 {
				font-weight: normal;
				line-height: 40px;
			}
		}
		.html_content {
			width: 100%;
			height: auto;
			overflow: hidden;
			font-size: 14px;
			text-align: left;
			img {
				max-width: 100%;
			}
		}
	}
</style>