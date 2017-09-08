<template>
	<div class="feedback-box">

		<goback title='投诉或建议' isShare='isShare'></goback>
		<div class="text" v-html="newsInfo">
		</div>
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
				newsInfo: ''
			}
		},
		created() {
			var _self = this
			this.$http.get(this.lchttp + '/app/news/column?newsId=18').then(
				(res) => {
					_self.newsInfo = res.data.obj.content
					console.log(_self.newsInfo)
				}
			)
		}
	}
</script>
<style lang="less">
	.feedback-box {
		box-sizing: border-box;
		padding: 46px 4% 0;
		background-color: white;
		min-height: 100vh;
		h2{	
			padding-top: 14px;
			text-align: center;
			font-size: 24px;
		}
		.img{
			margin: 20px auto;
			img{
				width: 40%;
				margin: auto;
			}
		}
	}
</style>