<template>
	<div class="charge-apply3-box" v-show="isComplete">
		<v-header title="运费申请"></v-header>

		<div class="tab">
			<router-link :to="'/OrderDetail/' + waybill_id + '?fromFuKuan=1' + '&from_type=' + fromType" replace class="tab-item">
				运单信息
			</router-link>
			<span class="line vux-1px-r"></span>
			<div class="tab-item current">
				支付信息
			</div>
		</div>

		<div class="item">
			<p class="red">运费总额：{{info.all_pay_money}}元</p>
			<p>
				<span class="name">预付：{{info.prepayments}}</span>
				<span class="value1">已付：{{info.paid_money}}</span>
			</p>
			<p>
				<span class="name">回单押金：{{info.back_fee}}</span>
				<span class="value1">未付：{{info.not_paid_money}}</span>
			</p>
			<p>
				<span class="name">运费增项：{{info.freight_incr}}</span>
				<span class="value2">{{info.freight_incr_reason}}</span>
			</p>
			<p>
				<span class="name">运费减项：{{info.loss_fee}}</span>
				<span class="value2">{{info.loss_fee_reason}}</span>
			</p>
		</div>

		<div class="item" v-if="info.pay_money">
			<p class="item_title">
				<span class="yellow">本次申请:{{info.pay_money}}元</span>
				<!--<span class="blue" v-if="info.pos_state === '0'">未支付</span>
				<span class="blue" v-if="info.pos_state === '1'">已申请</span>
				<span class="blue" v-if="info.pos_state === '2'">已支付</span>
				<span class="blue" v-if="info.pos_state === '3'">申请中（预申请）</span>
				<span class="blue" v-if="info.pos_state === '5'">审核中</span>
				<span class="blue" v-if="info.pos_state === '7'">业务审核</span>
				<span class="blue" v-if="info.pos_state === '8'">风控数据模型未审核</span>
				<span class="blue" v-if="info.pos_state === '-1'">系统处理中（中间状态）</span>-->
				<span class="blue">{{info.pos_state_str}}</span>
			</p>
			<p>收款人：{{info.pay_name}}</p>
			<p>收款帐号：{{info.bank_card_no}}</p>
			<p>开户行：{{info.bank_name}}</p>
			<p class="detail detail_title" v-for="(item, index) in info.oper_list" :key="index">
				<span>{{item.check_time}}</span>
				<span>{{item.user_name}}</span>
				<span v-if="item.type === '0'" class="active">申请</span>
				<span v-if="item.type === '1'" class="active">客服审核</span>
				<span v-if="item.type === '2'" class="active">业务审核</span>
				<span v-if="item.type === '3'" class="active">支付</span>
				<span v-if="item.type === '4'" class="active">到账</span>
				<span v-if="item.type === '5'" class="active">修改</span>
				<span class="attr" v-if="item.state === '0'">成功</span>
				<span class="attr" v-if="item.state === '1'">失败</span>
			</p>
		</div>

		<div class="item" v-for="(item, index) in info.his_pos_list" :key="index">
			<p class="item_title">
				<span class="blue" v-if="item.is_del === 0">支付金额：{{item.pay_money}}元</span>
				<span class="blue" v-if="item.is_del === 1">申请金额：{{item.pay_money}}元</span>
				<span class="blue current" @click="hisPayer(index)">点击查看收款信息</span>
			</p>
			<div v-for="(list, index2) in item.his_oper_list">
				<p class="detail">
					<span>{{list.check_time}}</span>
					<span>{{list.user_name}}</span>
					<span v-if="list.type === '0'" class="active">申请</span>
					<span v-if="list.type === '1'" class="active">客服审核</span>
					<span v-if="list.type === '2'" class="active">业务审核</span>
					<span v-if="list.type === '3'" class="active">支付</span>
					<span v-if="list.type === '4'" class="active">到账</span>
					<span v-if="list.type === '5'" class="active">修改</span>
					<span class="attr" v-if="list.state === '0'">成功</span>
					<span class="attr" v-if="list.state === '1'">失败</span>
				</p>
				<p class="detail">
					<span>{{list.check_note}}</span>
				</p>
			</div>
		</div>

		<!--<div class="master" v-show="masterShow">
			<div class="content">
				<div class="in-content">
					<div class="item">
						<p class="row">收款人姓名: {{info.pay_name}}</p>
						<p class="row">收款人卡号: {{info.bank_card_no}}</p>
						<p class="row">开户行: {{info.bank_name}}</p>
						<p class="row">支行名称: {{info.bank_name}}</p>
					</div>
				</div>
				<x-icon type="ios-close-empty" size="40" @click="closeMaster"></x-icon>
			</div>
		</div>-->

		<div class="master" v-show="masterShow">
			<div class="content">
				<div class="in-content">
					<div class="item" v-if="info.his_pos_list !== ''">
						<p class="row">收款人姓名: {{info.his_pos_list[hisIndex].pay_name}}</p>
						<p class="row">收款人卡号: {{info.his_pos_list[hisIndex].bank_card_no}}</p>
						<p class="row">开户行: {{info.his_pos_list[hisIndex].bank_name}}</p>
						<p class="row" v-if="info.his_pos_list[hisIndex].bank_branch">支行名称: {{info.his_pos_list[hisIndex].bank_branch}}</p>
					</div>
					<p v-if="info.his_pos_list === ''" style="line-height: 108px;">暂无收款信息</p>
					<!--<load-more :show-loading="true" tip="加载中" background-color="#f1eff2" v-show="recordLoading"></load-more>-->
				</div>
				<x-icon type="ios-close-empty" size="40" @click="closeMaster"></x-icon>
			</div>
		</div>
		<!--<div class="item footer-item">
			<p>
				<span class="current">本次申请：4000元</span>
				<span class="label">支付审核</span>
			</p>
			<p>
				<span>2017/10/20 20:06</span><span>王大锤</span><span>支付</span><span class="attr">成功</span>
			</p>
		</div>-->
		<div v-transfer-dom>
			<x-dialog :show.sync="rejectMaster" class="dialog-demo2">
				<x-textarea v-model='backovermsg' placeholder="请填写驳回理由" style="margin: 44px 26px 16px; border: 1px #DFDFDF solid; font-size: 12px;" :height="120"></x-textarea>
				<div class="reject_btn" @click="backover">完成</div>
				<div @click="rejectMaster=false" class="close">
					<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>

		<div class="nothing" v-if="!info.pay_money">
			<img src="../../../static/image/zanwu@2x.png" />
			<p>当前暂无支付申请记录</p>
		</div>

		<div class="btn" v-if="info.show_check_btn === 1">
			<div class="btn1" @click="pass" v-if="$power('FRE_AUD_PASS_BTN')">通过</div>
			<div class="btn2" @click="reject" v-if="$power('FRE_AUD_REJ_BTN')">驳回</div>
		</div>

		<div class="btn" v-if="info.show_apply_btn === 1 || info.show_modify_btn === 1 || info.show_modify_btn === 1">
			<router-link :to="'/ChangeCharge/' + waybill_id" class="btn2" v-show="info.show_modify_btn === 1" v-if="$power('FRE_APPLY_MODFRE_BTN')">修改运费</router-link>
			<router-link :to="'/ChargeApply4/' + waybill_id" class="btn1" v-show="info.show_apply_btn === 1" v-if="$power('FRE_APPLY_APPLYFRE_BTN')">运费申请</router-link>
			<router-link :to="'/ChangeApply/' + info.pos_id" class="btn1" v-show="info.show_ma_btn === 1">修改申请</router-link>
		</div>

		<div class="btn" v-if="info.show_pay_btn === 1 && $power('FRE_PAY_OPEREC_BTN')">
			<router-link :to="/ChargeApply5/ + waybill_id" class="btn3" tag="div">付款</router-link>
		</div>
	</div>
</template>

<script>import Header from '@/components/base/Header'
import { LoadMore, XDialog, TransferDomDirective as TransferDom, XTextarea } from 'vux'
export default {
	data() {
		return {
			isComplete: false,
			masterShow: false,
			rejectMaster: false,
			waybill_id: this.$route.params.id,
			token: sessionStorage.getItem('token'),
			info: {
				his_pos_list: ''
			},
			hisPayerList: [],
			recordCount: '',
			recordLoading: true,
			backovermsg: '',
			fromType: this.$route.query.from_type,
			hisIndex: 0
		}
	},
	computed: {
		from_type() {
			if(this.$route.query.from_type === '1') {
				return '0'
			}
			if(this.$route.query.from_type === '2') {
				return '1'
			}
			if(this.$route.query.from_type === '3') {
				return '2'
			}
		}
	},
	directives: {
		TransferDom
	},
	components: {
		'v-header': Header,
		LoadMore,
		XDialog,
		XTextarea
	},
	created() {
		this.$vux.loading.show({
			text: '加载中'
		})
		this.$http.post('payapply/html/post/v1/waybill_detail?token=' + this.token, {
			data: {
				from_type: this.from_type,
				waybill_id: this.waybill_id
			}
		}).then((res) => {
			console.log(res)
			if(res.data.result.reCode === '0') {
				this.info = res.data.data
//				console.log(this.info.his_pos_list)
				this.$nextTick(() => {
					this.isComplete = true
					this.$vux.loading.hide()
				})
			}
		})
	},
	methods: {
		pass() {
			let $this = this
			this.$vux.confirm.show({
				title: '提示!',
				content: '确定通过吗?',
				onCancel() {
					return false
				},
				onConfirm() {
					$this.$http.get('payaudit/html/get/v1/pay_pass/' + $this.info.pos_id + '?token=' + $this.token).then(
						(res) => {
							if(res.data.result.reCode === '0') {
								$this.$vux.toast.text('通过成功!')
								setTimeout(() => {
									$this.$router.back()
								}, 500)
							} else {
								$this.$vux.toast.text(res.data.result.reInfo)
							}
						}
					)
				}
			})
		},
		closeMaster() {
			this.masterShow = false
		},
		backover() {
			if(this.backovermsg === '') {
				this.$vux.toast.text('请填写驳回理由!')
				return false
			} else {
				this.$http.post('payaudit/html/post/v1/pay_reject' + '?token=' + this.token, {
					data: {
						pos_id: this.info.pos_id,
						audit_info: this.backovermsg
					}
				}).then(
					(res) => {
						if(res.data.result.reCode === '0') {
							this.$vux.toast.text('驳回成功!')
							setTimeout(() => {
								this.$router.back()
							}, 500)
						} else {
							this.$vux.toast.text(res.data.result.reInfo)
						}
					}
				)
			}
		},
		reject() {
			this.rejectMaster = true
		},
		hisPayer(index) {
			//				this.recordLoading = true
			//				this.hisPayerList = []
			//				this.recordCount = ''
			//				this.$http.get('payapply/html/get/v1/his_payer/' + this.waybill_id + '?token=' + this.token)
			//					.then((res) => {
			//						console.log(res)
			//						this.recordLoading = false
			//						if(res.data.result.reCode === '0') {
			//							this.hisPayerList = res.data.data.payer_list
			//							if(this.hisPayerList.length === 0) {
			//								this.recordCount = '0'
			//							}
			//						} else {
			//							this.recordCount = '0'
			//						}
			//					})
			this.hisIndex = index
			this.masterShow = true
		}
	}
}</script>

<style lang="less">.charge-apply3-box {
	padding-top: 85px;
	.tab {
		width: 100%;
		height: 40px;
		position: fixed;
		top: 45px;
		left: 0;
		background-color: white;
		display: flex;
		align-items: center;
		color: #999999;
		line-height: 40px;
		.tab-item {
			width: 0;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 15px;
			color: #646464;
			&.current {
				color: #63bffe;
			}
		}
		.line {
			height: 26px;
			&.vux-1px-r:after {
				color: #999999;
				border-right: 1px solid #999999;
			}
		}
	}
	.item {
		margin: 10px 10px 0;
		padding: 15px;
		background-color: white;
		font-size: 14px;
		p {
			display: flex;
			&.red {
				color: #ff423a;
			}
			.name {
				width: 136px;
				flex: 0 0 136px;
			}
			.value1 {
				color: #6a6a6a;
				margin-left: 24px;
			}
			.value2 {
				color: #969696;
			}
			&.current {
				color: #63bffe;
				font-size: 16px;
			}
			&.detail {
				color: #959595;
				display: flex;
				justify-content: space-between;
				/*flex-wrap: wrap;
				span {
					flex: 1 0 auto;
				}*/
				.active {
					min-width: 56px;
				}
				.attr {
					/*width: 56px;*/
				}
			}
			&.detail_title {
				color: black;
			}
		}
		.item_title {
			display: flex;
			justify-content: space-between;
			.yellow {
				color: #ffa956;
			}
			.blue {
				color: #72c4ff;
			}
			.current {
				font-size: 12px;
				text-decoration: underline;
			}
		}
	}
	.footer-item {
		p {
			display: flex;
			justify-content: space-between;
			.current {
				color: #fcaa56;
			}
			.label {
				color: #63bffe;
			}
			.attr {
				width: 56px;
			}
		}
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
			padding: 20px 0;
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
				.row {
					display: flex;
					justify-content: space-between;
					/*padding: 0 15px;*/
					.time {
						margin-left: 10px;
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
	.nothing {
		/*width: 100%;*/
		height: 134px;
		margin: 10px 10px 0;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/*display: none;*/
		img {
			width: 40px;
			height: 40px;
		}
		p {
			font-size: 16px;
			color: #9a9a9a;
			padding-top: 4px;
		}
	}
	.btn {
		display: flex;
		justify-content: space-around;
		padding: 22px 0;
		.btn1,
		.btn2,
		.btn3 {
			width: 130px;
			height: 35px;
			border-radius: 16px;
			font-size: 16px;
			text-align: center;
			line-height: 35px;
		}
		.btn1 {
			background-color: #63bffe;
			color: white;
		}
		.btn2 {
			background-color: #999999;
			color: white;
		}
		.btn3 {
			background-color: #fece4e;
			color: white;
		}
	}
}

.dialog-demo2 {
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
	.reject_btn {
		width: 124px;
		height: 25px;
		line-height: 25px;
		border-radius: 25px;
		background-color: #FECE4E;
		margin: 0 auto;
		color: white;
		font-size: 12px;
		margin-bottom: 13px;
	}
}</style>