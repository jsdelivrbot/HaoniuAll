<template>
	<div class="change-charge-box">
		<v-header title="修改运费"></v-header>

		<div class="content">
			<group label-width="85px" style="margin-top: -10px;">
				<div class="top">
					<p>成交时间：{{orderInfo.created_time}}</p>
					<p>运单号：{{orderInfo.waybill_no}}</p>
					<p>
						{{orderInfo.cart_badge_no}} {{orderInfo.driver_name}} {{orderInfo.mobile_no}}
						<!--皖A12345,袁自林,13900000000-->
					</p>
					<p>
						{{orderInfo.begin_province_name}}- {{orderInfo.begin_city_name}}- {{orderInfo.begin_county_name}} 至 {{orderInfo.end_province_name}}- {{orderInfo.end_city_name}}- {{orderInfo.end_county_name}}
					</p>
					<!--<p>安徽-合肥-高新区 至 四川-成都-金牛区</p>-->
				</div>
				<x-input title="运输总额:" v-model='orderInfo.total_price' type="number">
					<span slot="right">元</span>
				</x-input>
				<x-input title="预付款:" v-model='orderInfo.prepayments' type="number">
					<span slot="right">元</span>
				</x-input>

				<x-input title="回单押金:" v-model='orderInfo.back_fee' type="number">
					<span slot="right">元</span>
				</x-input>
				<x-input title="运费增项:" v-model='orderInfo.freight_incr' type="number">
					<span slot="right">元</span>
				</x-input>
				<x-input title=" " v-model='orderInfo.freight_incr_reason' placeholder="填写运费增项原因" label-width="85px" :max="20"></x-input>
				<x-input title="运费减项:" v-model='orderInfo.loss_fee' type="number">
					<span slot="right">元</span>
				</x-input>
				<x-input title=" " v-model='orderInfo.loss_fee_reason' placeholder="填写运费减项原因" label-width="85px" :max="20"></x-input>
			</group>
		</div>

		<div v-transfer-dom>
			<x-dialog :show.sync="masterShow" class="dialog-demo">
				<div class="img-box">
					<img src="../../../static/image/chenggong@2x.png" />
				</div>
				<p class="content">运费修改成功</p>
				<router-link :to="/ChargeApply4/ + waybill_id" tag="p" class="href">前往进行运费申请 >></router-link>
				<div @click="closeMaster" class="close">
					<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>

		<div class="btn" @click="complete">
			完成
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput, XDialog, TransferDomDirective as TransferDom } from 'vux'
	export default {
		data() {
			return {
				masterShow: false,
				waybill_id: '',
				orderInfo: [],
				token: sessionStorage.getItem('token')
			}
		},
		directives: {
			TransferDom
		},
		components: {
			'v-header': Header,
			Group,
			XInput,
			XDialog
		},
		mounted() {
			this.waybill_id = this.$route.params.id
			this.$http.get('payapply/html/get/v1/into_fee_modify/' + this.waybill_id, {
				params: {
					token: sessionStorage.getItem('token')
				}
			}).then(
				(res) => {
					if(res.data.result.reCode === '0') {
						this.orderInfo = res.data.data
						//						this.orderInfo.paid_money = 100
					}
				}
			)
		},
		methods: {
			haveFloat(value) {
				return parseFloat(value).toString().indexOf('.')
			},
			complete() {
				let pattern = /^([0-9][0-9]*)+(.[0-9]{1,2})?$/
				if(!pattern.test(this.orderInfo.total_price) || !pattern.test(this.orderInfo.prepayments) || !pattern.test(this.orderInfo.back_fee) || !pattern.test(this.orderInfo.freight_incr) || !pattern.test(this.orderInfo.loss_fee)) {
					this.$vux.toast.text('运费金额仅支持输入数字和小数点后两位')
					return
				}
//				if(this.haveFloat(this.orderInfo.total_price) !== -1) {
//					if(parseFloat(this.orderInfo.total_price).toString().split('.')[1].length > 2) {
//						this.$vux.toast.text('运费金额仅支持小数点后两位')
//						return
//					}
//				}
//				if(this.haveFloat(this.orderInfo.prepayments) !== -1) {
//					if(parseFloat(this.orderInfo.prepayments).toString().split('.')[1].length > 2) {
//						this.$vux.toast.text('运费金额仅支持小数点后两位')
//						return
//					}
//				}
//				if(this.haveFloat(this.orderInfo.back_fee) !== -1) {
//					if(parseFloat(this.orderInfo.back_fee).toString().split('.')[1].length > 2) {
//						this.$vux.toast.text('运费金额仅支持小数点后两位')
//						return
//					}
//				}
//				if(this.haveFloat(this.orderInfo.freight_incr) !== -1) {
//					if(parseFloat(this.orderInfo.freight_incr).toString().split('.')[1].length > 2) {
//						this.$vux.toast.text('运费金额仅支持小数点后两位')
//						return
//					}
//				}
//				if(this.haveFloat(this.orderInfo.loss_fee) !== -1) {
//					if(parseFloat(this.orderInfo.loss_fee).toString().split('.')[1].length > 2) {
//						this.$vux.toast.text('运费金额仅支持小数点后两位')
//						return
//					}
//				}
				this.$http.post('payapply/html/post/v1/fee_modify?token=' + this.token, {
					data: {
						waybill_id: this.orderInfo.waybill_id.toString(),
						total_price: this.orderInfo.total_price.toString(),
						prepayments: this.orderInfo.prepayments.toString(),
						back_fee: this.orderInfo.back_fee.toString(),
						paid_money: this.orderInfo.paid_money.toString(),
						freight_incr: this.orderInfo.freight_incr.toString(),
						freight_incr_reason: this.orderInfo.freight_incr_reason.toString(),
						loss_fee: this.orderInfo.loss_fee.toString(),
						loss_fee_reason: this.orderInfo.loss_fee_reason.toString()
					}
				}).then(
					(res) => {
						if(res.data.result.reCode === '0') {
							this.masterShow = true
						} else {
							this.$vux.toast.text(res.data.result.reInfo)
						}
						console.log(res.data)
					}
				)
			},
			closeMaster() {
				this.masterShow = false
				this.$router.replace('/FuKuan')
			}
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
				padding: 10px 12px;
				p {
					font-size: 14px;
					line-height: 24px;
				}
			}
			.weui-cell {
				font-size: 13px;
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
	
	.dialog-demo {
		.weui-dialog {
			border-radius: 8px;
			padding-bottom: 8px;
		}
		.img-box {
			width: 45px;
			margin: 39px auto 5px;
			img {
				width: 100%;
			}
		}
		.content {
			font-size: 15px;
			line-height: 24px;
		}
		.href {
			font-size: 11px;
			color: #FFAC62;
			line-height: 24px;
			margin-bottom: 24px;
		}
		.close {
			position: absolute;
			right: 9px;
			top: 9px;
		}
	}
</style>