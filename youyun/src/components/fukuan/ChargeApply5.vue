<template>
	<div class="charge-apply5-box" v-show="isComplete">
		<v-header title="付款"></v-header>
		<div class="item">
			<p>
				运单号：{{orderInfo.waybill_no}}
				<!--<span class="label">未支付</span>-->
			</p>
			<p>建单时间：{{orderInfo.created_time}}</p>
			<p>
				<span v-show="orderInfo.cart_badge_no">{{orderInfo.cart_badge_no}},</span>
				<span v-show="orderInfo.driver_name">{{orderInfo.driver_name}},</span>
				<span v-show="orderInfo.mobile_no">{{orderInfo.mobile_no}}</span>
			</p>
			<p>{{orderInfo.begin_address}}&nbsp;&nbsp;至&nbsp;&nbsp;{{orderInfo.end_address}}</p>
		</div>
		<group style="margin: -10px 10px;">
			<x-input title="收款人姓名：" :value="orderInfo.pay_name" disabled style="font-size: 13px;"></x-input>
			<x-input title="收款人卡号：" :value="orderInfo.bank_card_no" disabled style="font-size: 13px;"></x-input>
			<x-input title="开户行：" :value="orderInfo.bank_name" disabled style="font-size: 13px;"></x-input>
		</group>
		<div class="charge">
			<p class="title">付款金额</p>
			<p class="content">{{orderInfo.pay_actual_money}}元</p>
		</div>
		<div class="checked">
			<p class="title">付款方式</p>
			<div class="content">
				<p v-for="(item, index) in orderInfo.list" :key="index">
					<img src="../../../static/image/weigouxuan@2x.png" v-show="!checked1" @click="checked1=!checked1;checked2=false" v-if="index === 0" />
					<img src="../../../static/image/gouxuan@2x.png" v-show="checked1" @click="checked1=!checked1;checked2=false" v-if="index === 0" />
					<span @click="checked1=!checked1;checked2=false" v-if="index === 0">{{item.sub_account_bank + '（尾号' + getBankNumber(item.sub_account_no) + '）'}}</span>
					<img src="../../../static/image/weigouxuan@2x.png" v-show="!checked2" @click="checked2=!checked2;checked1=false" v-if="index === 1" />
					<img src="../../../static/image/gouxuan@2x.png" v-show="checked2" @click="checked2=!checked2;checked1=false" v-if="index === 1" />
					<span @click="checked2=!checked2;checked1=false" v-if="index === 1">{{item.sub_account_bank + '（尾号' + getBankNumber(item.sub_account_no) + '）'}}</span>
				</p>
				<!--<checker default-item-class="checked-item" selected-item-class="item-selected" style="margin-left: 10px;">
					<div class="option-item" v-for="(item, index) in orderInfo.list">
						<checker-item value="1"></checker-item>
						<span class="text">平安银行（尾号098）</span>
					</div>
					<div class="option-item">
						<checker-item value="2"></checker-item>
						<span class="text">兴业银行（尾号344）</span>
					</div>
				</checker>-->
			</div>
		</div>
		<div class="btn" @click="payment" v-show="!loading">
			确认付款
		</div>
		<div class="btn disabled" v-show="loading">
			稍等
			<spinner type="ios-small"></spinner>
		</div>
		<div class="master" v-show="masterShow">
			<div class="content">
				<div class="in-content">
					<div class="item vux-1px-b" v-for="(item, index) in hisPayerList" :key="index">
						<div class="text">
							<p class="row">收款人姓名: {{item.pay_name}}</p>
							<p class="row">收款人卡号: {{item.bank_card_no}}</p>
							<p class="row">开户行: {{item.bank_card_no}}</p>
						</div>
						<!--<div class="checked">
							<img src="../../../static/image/weigouxuan@2x.png" />
						</div>-->
					</div>
					<p v-if="recordCount === '0'" style="line-height: 108px;">暂无历史收款人信息</p>
					<load-more :show-loading="true" tip="加载中" background-color="#f1eff2" v-show="recordLoading"></load-more>
				</div>
				<x-icon type="ios-close-empty" size="40" @click="closeMaster"></x-icon>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput, Checker, CheckerItem, LoadMore, Spinner } from 'vux'
	export default {
		data() {
			return {
				checked1: false,
				checked2: false,
				waybill_id: this.$route.params.id,
				token: sessionStorage.getItem('token'),
				orderInfo: [],
				isComplete: false,
				hisPayerList: [],
				recordCount: '',
				recordLoading: true,
				masterShow: false,
				loading: false
			}
		},
		components: {
			'v-header': Header,
			Group,
			XInput,
			Checker,
			CheckerItem,
			LoadMore,
			Spinner
		},
		created() {
			this.$vux.loading.show({
				text: '加载中'
			})
			this.$http.get('pay/html/post/v1/into_pay/' + this.waybill_id + '?token=' + this.token)
				.then((res) => {
					this.orderInfo = res.data.data
					console.log(res.data.data)
					this.$nextTick(() => {
						this.$vux.loading.hide()
						this.isComplete = true
					})
				}
			)
		},
		methods: {
			getBankNumber(str) {
				return str.slice(-3)
			},
			payment() {
				if(this.checked1 === false && this.checked2 === false) {
					this.$vux.toast.text('请选择支付方式')
					return
				}
				let $this = this
				this.$vux.confirm.prompt('输入密码', {
					title: '输入密码',
					inputAttrs: {type: 'password'},
					onCancel () { return },
					onConfirm (value) {
						$this.goPay(value)
					}
				})
			},
			goPay(value) {
				this.$vux.loading.show({
					text: '正在支付'
				})
				let payWay = ''
				if(this.checked1) {
					if(this.orderInfo.list[0].sub_account_bank.indexOf('平安银行') !== -1) {
						payWay = '0'
					}
					if(this.orderInfo.list[0].sub_account_bank.indexOf('兴业银行') !== -1) {
						payWay = '1'
					}
				}
				if(this.checked2) {
					if(this.orderInfo.list[1].sub_account_bank.indexOf('平安银行') !== -1) {
						payWay = '0'
					}
					if(this.orderInfo.list[1].sub_account_bank.indexOf('兴业银行') !== -1) {
						payWay = '1'
					}
				}
				console.log(payWay)
				this.$http.post('pay/html/post/v1/pay?token=' + this.token, {
					data: {
						pos_id: this.orderInfo.pos_id,
//						pos_id: '87',
						waybill_id: this.waybill_id,
//						waybill_id: '7406035',
						pay_actual_money: this.orderInfo.pay_actual_money.toString(),
//						payment_code: 'nxgms288',
						payment_code: value,
						pay_way: payWay,
						pay_money: this.orderInfo.pay_money.toString()
					}
				}).then((res) => {
					this.$vux.loading.hide()
					if(res.data.result.reCode === '0') {
						this.$vux.toast.text('支付成功')
						setTimeout(() => {
							this.$router.back()
						}, 500)
					}else {
						this.$vux.toast.text(res.data.result.reInfo)
					}
					console.log(res)
				})
			},
			closeMaster() {
				this.masterShow = false
			},
//			history() {
//				this.recordLoading = true
//				this.hisPayerList = []
//				this.recordCount = ''
//				this.getHistory()
//				this.masterShow = true
//			},
			getHistory() {
				this.$http.get('payapply/html/get/v1/his_payer/' + this.waybill_id + '?token=' + this.token)
					.then((res) => {
						console.log(res)
						this.recordLoading = false
						if(res.data.result.reCode === '0') {
							this.hisPayerList = res.data.data.payer_list
							if(this.hisPayerList.length === 0) {
								this.recordCount = '0'
							}
						} else {
							this.recordCount = '0'
						}
					})
			}
		}
	}
</script>

<style lang="less">
	.charge-apply5-box {
		padding-top: 45px;
		.item {
			margin: 10px 10px 0;
			padding: 15px;
			background-color: white;
			font-size: 14px;
			p {
				display: flex;
				justify-content: space-between;
				.label {
					color: #ff423a;
				}
			}
		}
		.charge {
			margin: 10px;
			background-color: white;
			padding: 15px;
			font-size: 16px;
			.content {
				font-size: 20px;
				color: #63bffe;
				text-align: center;
				margin-bottom: 10px;
			}
		}
		.checked {
			margin: 10px;
			background-color: white;
			padding: 15px;
			font-size: 16px;
			.content {
				p {
					font-size: 14px;
					height: 40px;
					display: flex;
					align-items: center;
					img {
						width: 16px;
						height: 16px;
						margin-right: 10px;
					}
				}
				.checked-item {
					width: 16px;
					height: 16px;
					background-color: #f4f2f5;
					border: 1px solid #a3a3a3;
					border-radius: 50%;
					margin-right: 2px;
				}
				.item-selected {
					width: 18px;
					height: 18px;
					background: url(../../../static/image/xuanzhong.png) left top no-repeat;
					background-size: 18px 18px;
					border: none;
				}
				.option-item {
					display: flex;
					align-items: center;
					font-size: 14px;
					height: 34px;
					.text {
						margin-left: 10px;
					}
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
		.disabled {
			background-color: #999999;
		}
		.master {
			position: fixed;
			z-index: 3;
			width: 100%;
			height: 100vh;
			top: 0;
			left: 0;
			background-color: rgba(40, 40, 40, 0.4);
			display: flex;
			justify-content: center;
			align-items: center;
			.content {
				width: 320px;
				background-color: white;
				border-radius: 10px;
				padding: 30px 0;
				position: relative;
				max-height: 54vh;
				overflow-y: hidden;
				.in-content {
					min-height: 108px;
					max-height: 54vh;
					overflow-y: auto;
					margin: 0 15px;
					.weui-loadmore {
						margin-top: 42px;
					}
				}
				p {
					font-size: 14px;
					text-align: center;
					color: #666666;
				}
				.item {
					padding: 10px 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.text {
						.row {
							display: flex;
							justify-content: space-between;
							/*padding: 0 15px;*/
							.time {
								margin-left: 10px;
							}
						}
					}
					.checked {
						width: 20px;
						height: 20px;
						img {
							width: 100%;
						}
					}
				}
				svg {
					position: absolute;
					top: 4px;
					right: 4px;
				}
				.vux-x-icon {
					fill: #9b9b9b;
				}
			}
		}
	}
</style>