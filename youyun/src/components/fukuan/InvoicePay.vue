<template>
	<div class="invoice_pay_box">
		<v-header title="发票付款"></v-header>

		<div class="group">
			<p class="first">本次发票申请需支付金额</p>
			<p class="second">{{invoice_fee}}元</p>
		</div>

		<div class="category" v-if="pay_way !== '3'">
			<span class="title">付款方式</span>
			<checker default-item-class="item" selected-item-class="item-selected" style="margin-left: 10px;" v-model="checked">
				<div v-for="(item, index) in account_list" :key="index">
					<checker-item :value="judgeBank(item.sub_account_bank)" style="margin: 10px 0 0 10px;">
						<span class="text">{{item.sub_account_bank + '（尾号' + getBankNumber(item.sub_account_no) + '）'}}</span>
					</checker-item>
				</div>
				<!--<div>
					<checker-item value="1" style="margin: 10px 0 0 10px;">
						<span class="text">兴业银行</span>
					</checker-item>
				</div>-->
			</checker>
		</div>

		<div class="btn" @click="sure">
			确认付款
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Checker, CheckerItem } from 'vux'
	export default {
		data() {
			return {
				token: sessionStorage.getItem('token'),
				info: JSON.parse(sessionStorage.getItem('info')),
				invoice_fee: '',
				pay_way: '',
				checked: '',
				account_list: []
			}
		},
		components: {
			'v-header': Header,
			Checker,
			CheckerItem
		},
		created() {
			//			console.log(this.info)
			this.$http.post('personal/html/get/v1/tax_service?token=' + this.token, {
				data: {
					invoice_amount: this.info.total_fee,
					waybill_list: this.info.waybill_list
				}
			}).then((res) => {
				console.log(res)
				if(res.data.result.reCode === '0') {
					this.invoice_fee = res.data.data.invoice_fee
					if(res.data.data.invoice_fee === '0.00') {
						this.pay_way = '3'
					} else {
						this.$http.post('account/html/get/v1/freight_account' + '?token=' + this.token)
							.then((res) => {
								console.log(res)
								this.account_list = res.data.data.account_list
							})
					}
				} else {
					this.$vux.toast.text(res.data.result.reInfo)
				}
			})
		},
		methods: {
			getBankNumber(str) {
				return str.slice(-3)
			},
			judgeBank(str) {
				if(str.indexOf('平安银行') !== -1) {
					return '0'
				}else {
					return '1'
				}
			},
			sure() {
//				console.log(this.checked)
				if(this.pay_way !== '3') {
					if(this.checked === '') {
						this.$vux.toast.text('请选择支付方式')
						return
					}
					if(this.checked === '0') {
						this.pay_way = '0'
					}
					if(this.checked === '1') {
						this.pay_way = '1'
					}
				}
//				console.log(this.pay_way)
				let info = JSON.parse(sessionStorage.getItem('info'))
				this.$http.post('personal/html/post/v1/tax_billing?token=' + this.token, {
					data: {
						project_id: info.project_id,
						tax_name: info.tax_name,
						total_fee: info.total_fee,
						//						service_fee: info.service_fee,
						service_fee: this.invoice_fee,
						sale_name: info.sale_name,
						sale_taxpayer_no: info.sale_taxpayer_no,
						sale_address: info.sale_address,
						sale_tel: info.sale_tel,
						sale_account_bank: info.sale_account_bank,
						sale_account_no: info.sale_account_no,
						rec_drawee_party_id: info.rec_drawee_party_id,
						rec_name: info.rec_name,
						rec_taxpayer_no: info.rec_taxpayer_no,
						address: info.address,
						tel: info.tel,
						account_bank: info.account_bank,
						account_no: info.account_no,
						goods_service_name: info.goods_service_name,
						goods_type: info.goods_type,
						goods_unit: info.goods_unit,
						goods_amount: info.goods_amount,
						goods_price: info.goods_price,
						note: info.note,
						pay_way: this.pay_way,
						waybill_list: info.waybill_list
					}
				}).then((res) => {
					console.log(res)
					if(res.data.result.reCode === '0') {
						this.$vux.toast.text('开票成功')
						setTimeout(() => {
							this.$router.go(-3)
						}, 500)
					} else {
						this.$vux.toast.text(res.data.result.reInfo)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.invoice_pay_box {
		padding-top: 45px;
		.group {
			margin: 10px;
			background-color: white;
			padding: 0 15px;
			overflow: hidden;
			.first {
				margin-top: 16px;
				font-size: 14px;
			}
			.second {
				line-height: 50px;
				font-size: 20px;
				text-align: center;
				color: #63C0FE;
			}
		}
		.category {
			margin: 10px 10px 0;
			padding: 20px 15px;
			background-color: white;
			line-height: 20px;
			.title {
				font-size: 18px;
			}
			.item {
				height: 16px;
				padding-left: 24px;
				background: url(../../../static/image/weigouxuan@2x.png) left center no-repeat;
				background-size: 16px 16px;
				margin-right: 2px;
			}
			.item-selected {
				height: 16px;
				padding-left: 24px;
				background: url(../../../static/image/gouxuan@2x.png) left center no-repeat;
				background-size: 16px 16px;
			}
			.text {
				font-size: 14px;
				line-height: 16px;
				vertical-align: text-top;
			}
		}
		.btn {
			width: 68%;
			height: 36px;
			background-color: #ffce4e;
			margin: 22px auto 18px;
			text-align: center;
			color: white;
			line-height: 36px;
			border-radius: 18px;
			font-size: 16px;
		}
	}
</style>