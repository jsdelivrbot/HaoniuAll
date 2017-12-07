<template>
	<section class="wechatPay-box">
		<v-header title="微信支付"></v-header>
		<img :src="payImg" />
		<div class="global_btn_wrapper">
			<p class="btn active" @click="saveImg">保存到相册</p>
		</div>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		components: {
			'v-header': Header
		},
		data() {
			return {
				payImg: ''
			}
		},
		mounted() {
			this.$http.get('api/payment/weChat/img').then(
				(res) => {
					if(res.data.result === 0) {
						this.payImg = res.data.obj
					}
				}
			)
		},
		methods: {
			saveImg() {
				this.$CdownImg(this.payImg, this.payImg, function(status) {
					if(status) {
						mui.toast('保存成功!')
					} else {
						mui.toast('保存失败!')
					}
				})
			}
		}
	}
</script>
<style lang="less">
	.wechatPay-box {
		height: auto;
		overflow: hidden;
		padding-top: 88px;
		box-sizing: border-box;
		text-align: center;
		img {
			display: block;
			margin: auto;
			width: 200px;
		}
	}
</style>