<template>
	<div class="about">
		<goback title='关于我们'></goback>
		<div class="content-bigBang" v-html="info">
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
				info: ''
			}
		},
		mounted() {
			this.$http.get(this.lchttp + '/app/news/column?newsId=31').then(
				(res) => {
					this.info = res.data.obj.content
					console.log(res.data)
				}
			)
		}
	}
</script>
<style lang="less">
	.about {
		padding-top: 44px;
		box-sizing: border-box;
		background: #fff;
		min-height: 100vh;
		.content-bigBang {
			height: auto;
			padding: 10px;
			box-sizing: border-box;
			overflow: hidden;
			img {
				max-width: 100%;
				display: block;
			}
		}
	}
</style>