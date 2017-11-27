<template>
	<div class="pay_box">
		<v-header title="支付续期费用"></v-header>

		<div class="content">
			<p>￥123.00</p>
		</div>

		<div class="pay_select_list">
			<div class="item vux-1px-b" @click="current = 0">
				<img src="./img/weicinzhifu@3x.png" class="icon icon0" />
				<p class="text">微信支付</p>
				<div class="label" :class="{current: current === 0}"></div>
			</div>
			<div class="item vux-1px-b" @click="current = 1">
				<img src="./img/yinghangkazhufu@3x.png" class="icon icon1" />
				<p class="text">Apple Pay</p>
				<div class="label" :class="{current: current === 1}"></div>
			</div>
			<div class="item vux-1px-b" @click="current = 2">
				<img src="./img/zhifubao@3x.png" class="icon icon2" />
				<p class="text">支付宝支付</p>
				<div class="label" :class="{current: current === 2}"></div>
			</div>
		</div>

		<div class="global_btn_wrapper">
			<p class="btn">确认支付</p>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		data() {
			return {
				current: 0
			}
		},
		components: {
			'v-header': Header
		}
	}
</script>

<style lang="less">
	.pay_select_list {
		padding-left: 15px;
		background-color: white;
		.item {
			height: 49px;
			display: flex;
			align-items: center;
			.icon {
				margin-right: 20px;
				flex: 0 0 auto;
			}
			.icon0 {
				height: 19px;
			}
			.icon1 {
				height: 17px;
				margin-right: 15px;
			}
			.icon2 {
				height: 17px;
			}
			.text {
				width: 0;
				flex: 1;
				font-size: 14px;
			}
			.label {
				width: 24px;
				height: 24px;
				border-radius: 50%;
				border: 1px solid #D6D6DD;
				box-sizing: border-box;
				margin-right: 17px;
				position: relative;
				&.current {
					border-color: #DBB76C;
				}
				&.current:before {
					position: absolute;
					content: '';
					width: 16px;
					height: 16px;
					background: #DBB76C;
					border-radius: 50%;
					top: 3px;
					left: 3px;
				}
			}
		}
	}
	
	.global_btn_wrapper {
			width: 100%;
			height: 50px;
			margin: 30px auto 0;
			padding: 0 30px;
			box-sizing: border-box;
			.btn {
				width: 100%;
				height: 100%;
				border-radius: 25px;
				background-color: #dbb76c;
				font-size: 18px;
				text-align: center;
				line-height: 50px;
				color: white;
			}
		}
	
	.pay_box {
		padding-top: 48px;
		.content {
			width: 100%;
			height: 200px;
			background-color: #dbb76c;
			color: white;
			font-size: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>