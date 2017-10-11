<template>
	<div class="about-us-box">
		<v-header title="关于"></v-header>
		<h1>优运+</h1>
		<img :src="info.about_img" />
		<p v-text="info.about_content"></p>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	export default {
		data() {
			return {
				token: sessionStorage.getItem('token'),
				info: {}
			}
		},
		components: {
			'v-header': Header
		},
		created() {
			this.$http.get('personal/html/get/v1/look_about?token=' + this.token)
				.then((res) => {
					console.log(res)
					this.info = res.data.data
				})
		}
	}
</script>

<style lang="less">
	.about-us-box {
		padding: 45px 0;
		h1 {
			text-align: center;
			font-weight: 500;
			font-size: 26px;
			margin-top: 26px;
		}
		img {
			width: 80%;
			display: block;
			margin: 20px auto;
		}
		p {
			padding: 0 20px;
			font-size: 16px;
		}
	}
</style>