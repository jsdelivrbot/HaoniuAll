<template>
	<div class="fukuan-box">
		<search-header @goSearch="goSearch"></search-header>
		<div class="tab">
			<div class="item" :class="{current: listShow === 1}" @click="init1">
				运费申请
			</div>
			<span class="line vux-1px-r"></span>
			<div class="item" :class="{current: listShow === 2}" @click="init2">
				运费审核
			</div>
			<span class="line vux-1px-r"></span>
			<div class="item" :class="{current: listShow === 3}" @click="init3">
				运费支付
			</div>
		</div>
		<div class="wrapper" :class="{wrapper1: listShow === 3 && $power('FRE_PAY_ACCENTRY_BTN')}">
			<pull-to :top-load-method="refresh" :bottom-load-method="getData" :bottom-config="{failText: '没有更多信息'}">
				<div class="list">
					<div class="item" v-for="(item, index) in listData" :key="index">
						<router-link :to="'/ChargeApply3/' + item.waybill_id + '?from_type=' + listShow" tag="div">
							<div class="header">
								<span class="red">运费总额：{{item.all_pay_money}}</span>
								<span>未付：{{item.not_paid_money}}</span>
								<span>已付：{{item.paid_money}}</span>
							</div>
							<div class="content">
								<p>
									<span>运单号:{{item.waybill_no}}</span>
									<span class="red" v-if="item.pay_state === '0' && listShow === 1">未支付</span>
									<span class="red" v-if="item.pay_state === '1' && listShow === 1">已支付</span>
									<span class="red" v-if="item.pay_state === '2' && listShow === 1">部分支付</span>
									<span class="red" v-if="item.pay_state === '3' && listShow === 1">支付中</span>
									<span class="red currentApply" v-if="listShow === 2">本次申请:{{item.pay_money}}元</span>
									<span class="red currentApply" v-if="item.pay_state === '0' && listShow === 3">本次申请:{{item.pay_money}}元</span>
									<span class="red" v-if="item.pay_state === '1' && listShow === 3 && item.show_pay_btn !== 1">已支付</span>
									<span class="red" v-if="item.pay_state === '2' && listShow === 3 && item.show_pay_btn !== 1">部分支付</span>
									<span class="red" v-if="item.pay_state === '3' && listShow === 3 && item.show_pay_btn !== 1">支付中</span>
									<span class="red currentApply" v-if="listShow === 3 && item.show_pay_btn === 1">本次申请:{{item.pay_money}}元</span>
								</p>
								<p>
									<span>建单时间: {{item.created_time}}</span>
								</p>
								<p style="display: block;">
									<span v-show="item.cart_badge_no">{{item.cart_badge_no}},</span>
									<span v-show="item.realname">{{item.realname}},</span>
									<span v-show="item.mobile_no">{{item.mobile_no}}</span>
								</p>
								<p>
									<span>{{item.begin_address}} 至 {{item.end_address}}</span>
								</p>
							</div>
						</router-link>
						<div class="footer" v-show="listShow === 1">
							<span @click="record(item.waybill_id)" class="vux-1px-r current" v-if="$power('FRE_APPLY_OPEREC_BTN')">
								操作记录
							</span>
							<router-link :to="'/ChangeCharge/' + item.waybill_id" tag="span" class="vux-1px-r" v-show="item.show_modify_btn === 1" v-if="$power('FRE_APPLY_MODFRE_BTN')">
								修改运费
							</router-link>
							<router-link :to="'/ChargeApply4/' + item.waybill_id" tag="span" v-show="item.show_apply_btn === 1 &&  item.all_pay_money !== 0" v-if="$power('FRE_APPLY_APPLYFRE_BTN')">
								运费申请
							</router-link>
							<span v-show="item.show_apply_btn === 1 && item.all_pay_money === 0" v-if="$power('FRE_APPLY_APPLYFRE_BTN')" @click="applyAlert">
								运费申请
							</span>
							<!--<span class="vux-1px-r disabled" v-show="item.pay_state === '1'" v-if="$power('FRE_APPLY_MODFRE_BTN')">
								修改运费
							</span>
							<span class="disabled" v-show="item.pay_state === '1'" v-if="$power('FRE_APPLY_APPLYFRE_BTN')">
								运费申请
							</span>-->
							<router-link :to="'/ChangeApply/' + item.pos_id" tag="span" v-show="item.show_ma_btn === 1">
								修改申请
							</router-link>
						</div>
						<div class="footer" v-show="listShow === 2">
							<span @click="record(item.waybill_id)" class="vux-1px-r current" v-if="$power('FRE_AUD_OPEREC_BTN')">
								操作记录
							</span>
							<span class="vux-1px-r" v-show="item.show_check_btn === 1" @click="pass(item.pos_id)" v-if="$power('FRE_AUD_PASS_BTN')">
								通过
							</span>
							<span v-show="item.show_check_btn === 1" @click="reject(item.pos_id)" v-if="$power('FRE_AUD_REJ_BTN')">
								驳回
							</span>
						</div>
						<div @click="record(item.waybill_id)" class="footer" v-show="listShow === 3">
							<span class="vux-1px-r" v-if="$power('FRE_PAY_OPEREC_BTN')">
								操作记录
							</span>
							<router-link :to="'ChargeApply5/' + item.waybill_id" tag="span" class="current" v-show="item.show_pay_btn === 1" v-if="$power('FRE_PAY_PAYME_BTN')">
								付款
							</router-link>
						</div>
					</div>
					<load-more :show-loading="showLoading" :tip="tip" background-color="#f1eff2" v-show="listData.length === 0"></load-more>
				</div>
			</pull-to>
			<div class="fixed" v-show="listShow === 3" v-if="$power('FRE_PAY_ACCENTRY_BTN')">
				<div>
					<p>共计 <span class="red">{{pos_count}}</span> 单未付款</p>
					<p>合计 <span class="red">{{pay_total_money}}</span> 元</p>
				</div>
				<router-link to="/ChargeAccount" tag="div" class="btn">运费账户管理</router-link>
			</div>
		</div>
		<!--<div class="list" v-show="listShow === 2">
			<div class="item">
				<div class="header">
					<span class="red">运费总额：35000.00</span>
					<span>未付：13000.00</span>
					<span>已付：35000.00</span>
				</div>
				<div class="content">
					<p>
						<span>运单号：123450-1</span>
						<span class="red">本次申请：10000.00元</span>
					</p>
					<p>
						<span>建单时间：2017-09-09 12:23</span>
					</p>
					<p>
						<span>皖A12345,袁自林,13900000000</span>
					</p>
					<p>
						<span>安徽-合肥-高新区 至 四川-成都-金牛区</span>
					</p>
				</div>
				<div class="footer">
					<span class="vux-1px-r current">
						操作记录
					</span>
					<span class="vux-1px-r">
						通过
					</span>
					<span>
						反驳
					</span>
				</div>
			</div>
		</div>
		<div class="list" v-show="listShow === 3">
			<div class="item">
				<div class="header">
					<span class="red">运费总额：35000.00</span>
					<span>未付：13000.00</span>
					<span>已付：35000.00</span>
				</div>
				<div class="content">
					<p>
						<span>运单号：123450-1</span>
						<span class="red">本次申请：10000.00元</span>
					</p>
					<p>
						<span>建单时间：2017-09-09 12:23</span>
					</p>
					<p>
						<span>皖A12345,袁自林,13900000000</span>
					</p>
					<p>
						<span>安徽-合肥-高新区 至 四川-成都-金牛区</span>
					</p>
				</div>
				<div class="footer">
					<span class="vux-1px-r">
						操作记录
					</span>
					<router-link to="/ChargeApply5" tag="span" class="current">
						付款
					</router-link>
				</div>
			</div>
			<div class="fixed">
				<div>
					<p>共计 <span class="red">35</span> 单未付款</p>
					<p>合计 <span class="red">56000.00</span> 元</p>
				</div>
				<router-link to="/ChargeAccount" tag="div" class="btn">运费账户管理</router-link>
			</div>
			<div class="fixed2">
				运单信息不完整,无法申请运费
			</div>
		</div>-->
		<div class="master" v-show="masterShow">
			<div class="content">
				<div class="in-content">
					<div class="item vux-1px-b" v-for="(item, index) in recordList" :key="index">
						<div class="row">
							<p>
								<span>{{item.created_time}}</span>
							</p>
							<p>
								{{item.record_user}}
							</p>
						</div>
						<p class="row">操作项：{{item.update_content}}</p>
						<p class="row">改前：{{item.update_begin}}</p>
						<p class="row">改后：{{item.update_end}}</p>
					</div>
					<p v-if="recordCount === '0'">未查询到操作记录</p>
					<load-more :show-loading="true" tip="加载中" background-color="#f1eff2" v-show="recordLoading"></load-more>
				</div>
				<x-icon type="ios-close-empty" size="40" @click="closeMaster"></x-icon>
			</div>
		</div>
		
		<div v-transfer-dom>
			<x-dialog :show.sync="rejectMaster" class="dialog-demo2">
				<x-textarea v-model='backovermsg' placeholder="请填写驳回理由" style="margin: 44px 26px 16px; border: 1px #DFDFDF solid; font-size: 12px;" :height="120"></x-textarea>
				<div class="btn" @click="backover">完成</div>
				<div @click="rejectMaster=false; pos_id=''" class="close">
					<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>
	</div>
</template>

<script>
	import SearchHeader from '@/components/base/SearchHeader'
	import PullTo from '@/components/base/PullTo/vue-pull-to'
	import { LoadMore, XDialog, TransferDomDirective as TransferDom, XTextarea } from 'vux'
	export default {
		data() {
			return {
				listShow: 1,
				token: sessionStorage.getItem('token'),
				current_page: 1,
				condition: '',
				listData: [],
				tip: '正在加载',
				showLoading: true,
				total_pages: 0,
				pay_total_money: '',
				pos_count: '',
				masterShow: false,
				recordList: [],
				recordCount: '',
				recordLoading: true,
				rejectMaster: false,
				backovermsg: '',
				pos_id: ''
			}
		},
		directives: {
			TransferDom
		},
		components: {
			SearchHeader,
			PullTo,
			LoadMore,
			XDialog,
			XTextarea
		},
		created() {
			if(this.$route.query.current === '1') {
				this.init1()
			}else if(this.$route.query.current === '2') {
				this.init2()
			}else if(this.$route.query.current === '3') {
				this.init3()
			}else {
				this.init1()
			}
			window.$initFukuan = this
		},
		methods: {
			emptCondition() {
				this.condition = ''
			},
			init1() {
				this.listShow = 1
				this.listData = []
				this.tip = '正在加载'
				this.showLoading = true
				this.current_page = 1
				this.total_pages = 0
				this.$http.post('payapply/html/post/v1/apply_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						condition: this.condition
					}
				}).then((res) => {
					console.log(res)
					if(res.data.result.reCode === '0') {
						this.listData = res.data.data.apply_list
						this.total_pages = res.data.data.total_pages
						this.current_page = this.current_page + 1
					}
					this.tip = '暂无数据'
					this.showLoading = false
				})
			},
			init2() {
				this.listShow = 2
				this.listData = []
				this.tip = '正在加载'
				this.showLoading = true
				this.current_page = 1
				this.total_pages = 0
				this.$http.post('payaudit/html/post/v1/audit_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						condition: this.condition
					}
				}).then((res) => {
					console.log(res)
					if(res.data.result.reCode === '0') {
						this.listData = res.data.data.audit_list
						this.total_pages = res.data.data.total_pages
						this.current_page = this.current_page + 1
					}
					this.tip = '暂无数据'
					this.showLoading = false
				})
			},
			init3() {
				this.listShow = 3
				this.listData = []
				this.tip = '正在加载'
				this.showLoading = true
				this.current_page = 1
				this.total_pages = 0
				this.$http.post('pay/html/post/v1/pay_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						condition: this.condition
					}
				}).then((res) => {
					console.log(res)
					if(res.data.result.reCode === '0') {
						this.listData = res.data.data.pay_list
						this.total_pages = res.data.data.total_pages
						this.current_page = this.current_page + 1
						this.pay_total_money = res.data.data.pay_total_money
						this.pos_count = res.data.data.pos_count
					}
					this.tip = '暂无数据'
					this.showLoading = false
				})
			},
			refresh(loaded) {
				this.current_page = 1
				this.total_pages = 0
				if(this.listShow === 1) {
					this.$http.post('payapply/html/post/v1/apply_list?token=' + this.token, {
							data: {
								current_page: this.current_page.toString(),
								condition: this.condition
							}
						}).then((res) => {
							console.log(res)
							if(res.data.result.reCode === '0') {
								this.listData = res.data.data.apply_list
								this.total_pages = res.data.data.total_pages
								this.current_page = this.current_page + 1
								this.pay_total_money = res.data.data.pay_total_money
								this.pos_count = res.data.data.pos_count
							}
							loaded('done')
							this.tip = '暂无数据'
							this.showLoading = false
						})
						.catch((err) => {
							loaded('fail')
							console.log(err)
						})
				}
				if(this.listShow === 2) {
					this.$http.post('payaudit/html/post/v1/audit_list?token=' + this.token, {
							data: {
								current_page: this.current_page.toString(),
								condition: this.condition
							}
						}).then((res) => {
							console.log(res)
							if(res.data.result.reCode === '0') {
								this.listData = res.data.data.audit_list
								this.total_pages = res.data.data.total_pages
								this.current_page = this.current_page + 1
							}
							loaded('done')
							this.tip = '暂无数据'
							this.showLoading = false
						})
						.catch((err) => {
							loaded('fail')
							console.log(err)
						})
				}
				if(this.listShow === 3) {
					this.$http.post('pay/html/post/v1/pay_list?token=' + this.token, {
							data: {
								current_page: this.current_page.toString(),
								condition: this.condition
							}
						}).then((res) => {
							console.log(res)
							if(res.data.result.reCode === '0') {
								this.listData = res.data.data.pay_list
								this.total_pages = res.data.data.total_pages
								this.current_page = this.current_page + 1
							}
							loaded('done')
							this.tip = '暂无数据'
							this.showLoading = false
						})
						.catch((err) => {
							loaded('fail')
							console.log(err)
						})
				}
			},
			getData(loaded) {
				if(this.current_page > this.total_pages) {
					loaded('fail')
					return false
				}
				if(this.listShow === 1) {
					this.$http.post('payapply/html/post/v1/apply_list?token=' + this.token, {
							data: {
								current_page: this.current_page.toString(),
								condition: this.condition
							}
						})
						.then((res) => {
							console.log(res.data)
							if(res.data.result.reCode === '0') {
								this.listData = this.listData.concat(res.data.data.apply_list)
								this.current_page = this.current_page + 1
								loaded('done')
							} else {
								loaded('fail')
							}
						})
						.catch((err) => {
							loaded('fail')
							console.log(err)
						})
				}
				if(this.listShow === 2) {
					this.$http.post('payaudit/html/post/v1/audit_list?token=' + this.token, {
							data: {
								current_page: this.current_page.toString(),
								condition: this.condition
							}
						})
						.then((res) => {
							console.log(res.data)
							if(res.data.result.reCode === '0') {
								this.listData = this.listData.concat(res.data.data.audit_list)
								this.current_page = this.current_page + 1
								loaded('done')
							} else {
								loaded('fail')
							}
						})
						.catch((err) => {
							loaded('fail')
							console.log(err)
						})
				}
				if(this.listShow === 3) {
					this.$http.post('pay/html/post/v1/pay_list?token=' + this.token, {
							data: {
								current_page: this.current_page.toString(),
								condition: this.condition
							}
						})
						.then((res) => {
							console.log(res.data)
							if(res.data.result.reCode === '0') {
								this.listData = this.listData.concat(res.data.data.pay_list)
								this.current_page = this.current_page + 1
								loaded('done')
							} else {
								loaded('fail')
							}
						})
						.catch((err) => {
							loaded('fail')
							console.log(err)
						})
				}
			},
			goSearch(text) {
				this.condition = text
				if(this.listShow === 1) {
					this.init1()
				}
				if(this.listShow === 2) {
					this.init2()
				}
				if(this.listShow === 3) {
					this.init3()
				}
			},
			record(id) {
				this.recordLoading = true
				this.masterShow = true
				this.recordList = []
				this.$http.get('waybill/html/get/v1/record_list/' + id + '?token=' + this.token)
					.then((res) => {
						console.log(res)
						this.recordLoading = false
						if(res.data.data.record_count === 0) {
							this.recordCount = '0'
							//							console.log(this.recordCount)
						} else {
							this.recordCount = ''
						}
						this.recordList = res.data.data.record_list
					})
			},
			closeMaster() {
				this.masterShow = false
			},
			reject(posId) {
				this.pos_id = posId
				this.backovermsg = ''
				this.rejectMaster = true
			},
			backover() {
				if(this.backovermsg === '') {
					this.$vux.toast.text('请填写驳回理由!')
					return false
				} else {
					this.$http.post('payaudit/html/post/v1/pay_reject' + '?token=' + this.token, {
						data: {
							pos_id: this.pos_id,
							audit_info: this.backovermsg
						}
					}).then(
						(res) => {
							if(res.data.result.reCode === '0') {
								this.$vux.toast.text('驳回成功!')
								setTimeout(() => {
									this.init2()
									this.pos_id = ''
									this.rejectMaster = false
								}, 500)
							} else {
								this.$vux.toast.text(res.data.result.reInfo)
							}
						}
					)
				}
			},
			pass(posId) {
				let $this = this
				this.$vux.confirm.show({
					title: '提示!',
					content: '确定通过吗?',
					onCancel() {
						return false
					},
					onConfirm() {
						$this.$http.get('payaudit/html/get/v1/pay_pass/' + posId + '?token=' + $this.token).then(
							(res) => {
								if(res.data.result.reCode === '0') {
									$this.$vux.toast.text('通过成功!')
									setTimeout(() => {
										$this.init2()
									}, 500)
								} else {
									$this.$vux.toast.text(res.data.result.reInfo)
								}
							}
						)
					}
				})
			},
			applyAlert() {
				this.$vux.toast.text('运费信息不合法,请先修改运费')
			}
		}
	}
</script>

<style lang="less">
	.fukuan-box {
		padding: 85px 0 64px;
		.wrapper {
			position: fixed;
			width: 100%;
			left: 0;
			top: 85px;
			bottom: 0;
		}
		.wrapper1 {
			bottom: 64px;
		}
		.tab {
			width: 100%;
			height: 40px;
			position: fixed;
			top: 45px;
			left: 0;
			background-color: white;
			display: flex;
			align-items: center;
			/*color: #999999;*/
			line-height: 40px;
			z-index: 2;
			.item {
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
		.list {
			.item {
				margin: 10px 10px 0;
				.header {
					color: #696969;
					background-color: white;
					padding: 10px 15px;
					font-size: 0;
					display: flex;
					justify-content: space-between;
					span {
						font-size: 12px;
						display: block;
						&.red {
							color: #ff423a;
						}
					}
				}
				.content {
					margin-top: 2px;
					padding: 15px;
					background-color: white;
					p {
						display: flex;
						justify-content: space-between;
						flex-wrap: wrap;
						span {
							font-size: 14px;
							&.red {
								color: #ff423a;
							}
							&.currentApply {
								font-size: 12px;
							}
						}
					}
				}
				.footer {
					margin-top: 2px;
					background-color: white;
					display: flex;
					span {
						width: 0;
						flex: 1;
						text-align: center;
						font-size: 14px;
						color: #646464;
						padding: 4px 0;
						&.disabled {
							color: #CCCCCC;
						}
					}
					.current {
						color: #63bffe;
					}
				}
			}
		}
		.fixed {
			width: 100%;
			height: 64px;
			background-color: white;
			position: fixed;
			z-index: 2;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 22px;
			box-sizing: border-box;
			div {
				p {
					color: #696969;
					font-size: 14px;
					span {
						&.red {
							color: #ff423a;
						}
					}
				}
				&.btn {
					height: 30px;
					line-height: 30px;
					background-color: #66bfff;
					border-radius: 6px;
					font-size: 14px;
					color: white;
					padding: 0 6px;
				}
			}
		}
		.fixed2 {
			height: 45px;
			line-height: 45px;
			text-align: center;
			color: white;
			background-color: rgba(40, 40, 40, 0.4);
			width: 100%;
			font-size: 14px;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 2;
			display: none;
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
		.btn {
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
	}
</style>