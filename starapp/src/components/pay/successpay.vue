<template>
	<div class="success-pay">
		<topbar title='支付结果'></topbar>

		<div class="text">
			<p>订单编号:{{detailInfo.number}}</p>
			<p>支付金额: <em>¥{{detailInfo.realPayment}}</em></p>
		</div>

		<div class="suc">
			<img src="../../../static/img/suc.png" />
		</div>

		<p>您已成功购买课程</p>

		<router-link :to='"/orderdetail/"+detailInfo.number' class='link-btn'>
			查看订单
		</router-link>

		<router-link to='/pub/home' style='text-align: center;display: block;color: #333333;margin-top: 20px;'>
			回到首页
		</router-link>
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
				token: sessionStorage.getItem('token'),
				detailInfo: '',
				ordernum: ''
			}
		},
		mounted() {
			this.ordernum = this.$route.params.id
			this.$http.get('/business/order/downOrderDetail', {
				params: {
					number: this.ordernum
				}
			}).then(
				(res) => {
					this.detailInfo = res.data.obj
					console.log(res.data)
				}
			)
		}
	}
</script>
<style lang="less">
	.success-pay {
		padding-top: 45px;
		background: #fff;
		height: 100vh;
		overflow: hidden;
		box-sizing: border-box;
		.text {
			padding: 20px 15px;
			box-sizing: border-box;
			font-size: 14px;
			color: #333333;
			p {
				margin-bottom: 10px;
				em {
					font-style: normal;
					color: #84BEF3;
				}
			}
		}
		.suc {
			text-align: center;
			margin-top: 33px;
			margin-bottom: 55px;
			img {
				margin: auto;
				display: block;
				width: 45px;
			}
		}
		>p {
			color: #666;
			text-align: center;
			font-size: 14px;
			margin-bottom: 25px;
		}
		>.link-btn {
			display: block;
			margin: auto;
			width: 180px;
			height: 36px;
			line-height: 36px;
			color: #1aad19;
			border: 1px solid #1aad19;
			text-align: center;
			font-size: 14px;
			border-radius: 5px;
		}
	}
</style>