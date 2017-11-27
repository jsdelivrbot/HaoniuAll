<template>
	<div class="about">
		<v-title title='关于我们'></v-title>
		<!--<div class="logo">
			<img src="../../static/img/logo.png" />
			<h2>V1.0</h2>
		</div>-->

		<div class="about-contnet" v-html="info">
		</div>
	</div>
</template>
<script>
	import title from '../components/callback'
	export default {
		components: {
			'v-title': title
		},
		data() {
			return {
				info: ''
			}
		},
		mounted() {
			this.$http.get('about/info').then(
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
		height: auto;
		overflow: hidden;
		padding: 0 15px;
		padding-top: 54px;
		box-sizing: border-box;
		.logo {
			margin-top: 108px;
			height: auto;
			text-align: center;
			overflow: hidden;
			img {
				display: block;
				margin: auto;
				width: 86px;
			}
			h2 {
				margin-top: 20px;
				color: #999;
				font-size: 14px;
				font-weight: normal;
			}
		}
	}
</style>