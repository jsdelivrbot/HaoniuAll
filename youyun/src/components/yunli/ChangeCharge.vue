<template>
	<div class="change-charge-box">
		<v-header title="调整运费"></v-header>
		<div class="content">
			<group label-width="93.5px">
				<div class="top">
					<p>成交时间：2017-9-9 12:34</p>
					<p>运单号：123450-1</p>
					<p>皖A12345,袁自林,13900000000</p>
					<p>安徽-合肥-高新区 至 四川-成都-金牛区</p>
				</div>
				<x-input title="运输总额:" type="number">
					<span slot="right">元</span>
				</x-input>
				<x-input title="预付款:" type="number">
					<span slot="right">元</span>
				</x-input>
				<x-input title="回单押金:" type="number">
					<span slot="right">元</span>
				</x-input>
				<x-input title="运费增项:" type="number">
					<span slot="right">元</span>
				</x-input>
				<x-input title=" " placeholder="填写运费增项原因" label-width="93.5"></x-input>
				<x-input title="运费减项:" type="number">
					<span slot="right">元</span>
				</x-input>
				<x-input title=" " placeholder="填写运费减项原因" label-width="93.5"></x-input>
			</group>
		</div>
		<div class="btn">
			完成
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput } from 'vux'
	export default {
		components: {
			'v-header': Header,
			Group,
			XInput
		}
	}
</script>

<style lang="less">
	.change-charge-box {
		padding-top: 45px;
		.content {
			margin: 10px;
			background-color: white;
			.top {
				padding: 12px;
				p {
					font-size: 14px;
				}
			}
		}
		.btn {
			width: 68%;
			height: 36px;
			background-color: #ffce4e;
			margin: 50px auto 18px;
			text-align: center;
			color: white;
			line-height: 36px;
			border-radius: 18px;
			font-size: 16px;
		}
	}
</style>