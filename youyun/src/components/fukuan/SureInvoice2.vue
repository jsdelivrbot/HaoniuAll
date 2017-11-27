<template>
	<div class="sure_invoice2_box">
		<v-header title="确认发票信息"></v-header>

		<div class="group">
			<p class="title">货物或应税劳务，服务名称</p>
			<group>
				<x-textarea :height="89" v-model="goods_service_name"></x-textarea>
			</group>
		</div>

		<group style="margin: -10px 10px 0;" labelWidth="71.5px">
			<x-input title="规格型号:" v-model="goods_type"></x-input>
			<x-input title="单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位:" v-model="goods_unit"></x-input>
			<x-input title="数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量:" v-model="goods_amount" type="number"></x-input>
			<x-input title="单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价:" v-model="goods_price" type="number"></x-input>
		</group>

		<div class="group">
			<p class="title">备注</p>
			<group>
				<x-textarea :height="89" v-model="note"></x-textarea>
			</group>
		</div>

		<div class="btn">
			<div class="btn1" @click="goBack">上一步</div>
			<div class="btn2" @click="complete">完成确认</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XTextarea, XInput } from 'vux'
	export default {
		data() {
			return {
				goods_service_name: '',
				goods_type: '',
				goods_unit: '',
				goods_amount: '',
				goods_price: '',
				note: ''
			}
		},
		components: {
			'v-header': Header,
			Group,
			XTextarea,
			XInput
		},
		created() {
			let info = JSON.parse(sessionStorage.getItem('info'))
			if(info) {
				this.goods_service_name = info.goods_service_name
				this.goods_type = info.goods_type
				this.goods_unit = info.goods_unit
				this.goods_amount = info.goods_amount
				this.goods_price = info.goods_price
				this.note = info.note
			}
		},
		methods: {
			goBack() {
				this.$router.back()
			},
			complete() {
				let pattern = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/
				if(!pattern.test(this.goods_amount) && this.goods_amount) {
					console.log(this.goods_amount)
					this.$vux.toast.text('数量格式有误')
					return
				}
				if(!pattern.test(this.goods_price) && this.goods_price) {
					this.$vux.toast.text('单价格式有误')
					return
				}
				let pattern2 = /[\u4e00-\u9fa5]/
				if(!pattern2.test(this.goods_unit) && this.goods_unit) {
					this.$vux.toast.text('单位格式有误')
					return
				}
				let info = JSON.parse(sessionStorage.getItem('info'))
				let info1 = {
					goods_service_name: this.goods_service_name,
					goods_type: this.goods_type,
					goods_unit: this.goods_unit,
					goods_amount: this.goods_amount,
					goods_price: this.goods_price,
					note: this.note
				}
				info = Object.assign(info, info1)
				sessionStorage.setItem('info', JSON.stringify(info))
				this.$router.push('/InvoicePay')
			}
		}
	}
</script>

<style lang="less">
	.sure_invoice2_box {
		padding-top: 45px;
		.group {
			margin: 10px;
			background-color: white;
			padding: 0 15px 25px;
			.title {
				font-size: 14px;
				color: #222222;
				line-height: 42px;
			}
			.weui-cells {
				margin-top: 0;
				&:before {
					border: none;
				}
				.weui-cell {
					padding: 0;
					box-sizing: border-box;
					border: 1px #DFDFDF solid;
					textarea {
						font-size: 13px;
						background-color: #FCFCFC;
					}
				}
			}
		}
		.weui-cell {
			font-size: 13px;
			input {
				height: 31px;
				border: 1px #DFDFDF solid;
			}
		}
		.btn {
			display: flex;
			justify-content: space-around;
			padding: 22px 0;
			.btn1,
			.btn2 {
				width: 130px;
				height: 35px;
				border-radius: 16px;
				font-size: 16px;
				text-align: center;
				line-height: 35px;
			}
			.btn1 {
				background-color: #63C0FE;
				color: white;
			}
			.btn2 {
				background-color: #FECE4E;
				color: white;
			}
		}
	}
</style>