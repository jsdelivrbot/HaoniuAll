<template>
	<div class="invoice-manage-box">
		<v-header title="发票管理"></v-header>

		<div class="search vux-1px-b">
			<input type="text" placeholder="搜索车牌号或车辆信息" v-model="text" />
			<span @click="search">搜索</span>
		</div>

		<div class="info" v-show="infoShow">
			<p>已申请开发票{{info.in_count}}笔{{info.in_money}}元,已开发票{{info.already_count}}笔{{info.already_money}}元</p>
			<x-icon type="ios-close" size="30" @click="hideInfo"></x-icon>
		</div>

		<div class="tab">
			<div class="item" :class="{current: listShow === 0}" @click="init(0)">
				未申请
			</div>
			<span class="line vux-1px-r"></span>
			<div class="item" :class="{current: listShow === 1}" @click="init(1)">
				已申请
			</div>
			<span class="line vux-1px-r"></span>
			<div class="item" :class="{current: listShow === 2}" @click="init(2)">
				未通过
			</div>
		</div>

		<div class="wrapper" :class="{wrapper0: listShow === 0, wrapper_1: !infoShow, wrapper1: listShow !== 0}">
			<pull-to :top-load-method="refresh" :bottom-load-method="getData" :bottom-config="{failText: '没有更多信息'}">
				<div class="list">
					<div v-for="(item, index) in listData" :key="index">
						<div class="item">
							<p class="failed" v-show="listShow === 2">票据信息有误！</p>
							<div class="first">
								<div class="title">
									<div style="font-size: 0;" v-if="listShow === 0">
										<img src="../../../static/image/weigouxuan@2x.png" v-show="!item.checked" @click="item.checked=true" />
										<img src="../../../static/image/gouxuan@2x.png" v-show="item.checked" @click="item.checked=false" />
									</div>
									<p>受票方：{{item.drawee}}</p>
								</div>
								<p class="label">
									<span v-if="item.invoice_state === '0'">未开发票</span>
									<span v-if="item.invoice_state === '1'">申请中</span>
									<span v-if="item.invoice_state === '2'" class="failed">未通过</span>
									<span v-if="item.invoice_state === '3'">已开票</span>
								</p>
							</div>
							<p>项目名称：{{item.project_name}}</p>
							<p class="detail">{{item.cart_badge_no}},{{item.driver_name}},{{item.mobile_no}}</p>
							<p class="detail">{{item.begin_address}} 至 {{item.end_address}}</p>
						</div>
						<router-link :to="'/Reapply/' + item.tax_id" tag="div" class="item-footer" v-show="item.invoice_state === '2'">
							重新申请
						</router-link>
					</div>
					<!--<div>
						<div class="item">
							<div class="first">
								<div class="title">
									<img src="../../../static/image/weigouxuan@2x.png" v-show="!checked1" @click="checked1=!checked1;" />
									<img src="../../../static/image/gouxuan@2x.png" v-show="checked1" @click="checked1=!checked1;" />
									<p>受票方：当前项目暂无售票方</p>
								</div>
								<p class="label">未开发票</p>
							</div>
							<p>项目名称：郎酒项目</p>
							<p class="detail">皖A12345,袁自林,13900000000</p>
							<p class="detail">安徽-合肥-高新区 至 四川-成都-金牛区</p>
						</div>
					</div>
					<div>
						<div class="item failed">
							<div class="first">
								<div class="title">
									<p>受票方：当前项目暂无售票方</p>
								</div>
								<p class="label">未通过</p>
							</div>
							<p>项目名称：郎酒项目</p>
							<p class="detail">皖A12345,袁自林,13900000000</p>
							<p class="detail">安徽-合肥-高新区 至 四川-成都-金牛区</p>
						</div>
						<div class="item-footer" @click="reApply">
							重新申请
						</div>
					</div>-->
					<load-more :show-loading="showLoading" :tip="tip" background-color="#f1eff2" v-show="listData.length === 0"></load-more>
				</div>
			</pull-to>
		</div>

		<div class="fixed" v-show="listShow === 0">
			<p>已选择{{checkedCount}}笔,合计{{checkedMoney}}元</p>
			<span class="btn" @click="apply">
				申请发票
			</span>
		</div>

		<div class="fixed" v-show="!haveChecked && listShow === 0">
			<div class="check_group">
				<img src="../../../static/image/weigouxuan@2x.png" @click="checkAll" />
				<!--<img src="../../../static/image/gouxuan@2x.png" v-show="checked1" @click="cancelAll" />-->
				<span>全选</span>
			</div>
			<span class="btn disabled">
				申请发票
			</span>
		</div>

		<div class="opcity-fixed" v-show="false">
			<p>含有无受方订单,请填写受票方订单</p>
		</div>

		<div v-transfer-dom>
			<x-dialog :show.sync="masterShow" class="dialog-demo3">
				<p class="first">本次可申请发票金额范围:</p>
				<p class="second" v-show="min_incoice_amount !== max_incoice_amount">{{min_incoice_amount}}元-{{max_incoice_amount}}元</p>
				<p class="second" v-show="min_incoice_amount === max_incoice_amount">{{min_incoice_amount}}元</p>
				<!--<div class="input vux-1px">-->
				<input type="number" v-model="invoice_amount" v-show="min_incoice_amount !== max_incoice_amount" />
				<!--<input type="number" v-model="min_incoice_amount" disabled v-show="min_incoice_amount === max_incoice_amount" />-->
				<!--</div>-->
				<div class="btn" @click="goApply">确认</div>
				<div @click="masterShow=false" class="close">
					<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import PullTo from '@/components/base/PullTo/vue-pull-to'
	import { LoadMore, XDialog, TransferDomDirective as TransferDom } from 'vux'
	export default {
		data() {
			return {
				listShow: 0,
				infoShow: true,
				masterShow: false,
				tip: '正在加载',
				showLoading: true,
				listData: [],
				total_pages: 0,
				current_page: 1,
				token: sessionStorage.getItem('token'),
				state: 0,
				search_param: '',
				text: '',
				info: {},
				checkedId: [],
				min_incoice_amount: '',
				max_incoice_amount: '',
				invoice_amount: '',
				project_id: ''
			}
		},
		directives: {
			TransferDom
		},
		computed: {
			haveChecked() {
				for(let i = 0; i < this.listData.length; i++) {
					if(this.listData[i].checked) {
						return true
					}
				}
				return false
			},
			checkedCount() {
				let count = 0
				for(let i = 0; i < this.listData.length; i++) {
					if(this.listData[i].checked) {
						count = count + 1
					}
				}
				return count
			},
			checkedMoney() {
				let money = 0
				for(let i = 0; i < this.listData.length; i++) {
					if(this.listData[i].checked) {
						money = money + parseFloat(this.listData[i].paid_money)
					}
				}
				return money
			}
		},
		components: {
			'v-header': Header,
			LoadMore,
			XDialog,
			PullTo
		},
		created() {
			//			alert(window.location.href)
			this.init(0)
			this.$http.post('personal/html/get/v1/tax_statistics?token=' + this.token)
				.then((res) => {
					console.log(res)
					if(res.data.result.reCode === '0') {
						this.info = res.data.data
					}
				})
		},
		beforeRouteEnter(to, from, next) {
			sessionStorage.removeItem('info')
			sessionStorage.removeItem('info0')
			next()
		},
		methods: {
			//勾选
			addChecked(arr) {
				for(let i = 0; i < arr.length; i++) {
					arr[i].checked = false
				}
				return arr
			},
			checkAll() {
				for(let i = 0; i < this.listData.length; i++) {
					this.listData[i].checked = true
				}
			},
			hideInfo() {
				this.infoShow = false
			},
			//申请
			apply() {
				this.checkedId = []
				let checkedItem = []
				for(let i = 0; i < this.listData.length; i++) {
					if(this.listData[i].checked) {
						this.checkedId.push(this.listData[i].waybill_id)
						checkedItem.push(this.listData[i])
					}
				}
				//判断是否是同一项目
				for(let i = 0; i < checkedItem.length; i++) {
					if(checkedItem[i].project_id !== checkedItem[0].project_id) {
						this.$vux.toast.text('只能同时选择同一项目的运单')
						return
					}
				}
				this.project_id = checkedItem[0].project_id
				this.$http.post('personal/html/get/v1/price_range?token=' + this.token, {
					data: {
						waybill_list: this.checkedId
					}
				}).then((res) => {
					console.log(res)
					this.invoice_amount = ''
					if(res.data.result.reCode === '0') {
						this.min_incoice_amount = res.data.data.min_incoice_amount
						this.max_incoice_amount = res.data.data.max_incoice_amount
						if(this.min_incoice_amount === this.max_incoice_amount) {
							this.invoice_amount = this.min_incoice_amount
						}
						this.masterShow = true
					} else {
						this.$vux.toast.text(res.data.result.reInfo)
					}
				})
			},
			goApply() {
				if(this.min_incoice_amount !== this.max_incoice_amount) {
					if(parseFloat(this.invoice_amount) < parseFloat(this.min_incoice_amount) || parseFloat(this.invoice_amount) > parseFloat(this.max_incoice_amount) || this.invoice_amount === '') {
						this.$vux.toast.text('请输入可申请范围内金额')
						return
					}
					let pattern = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/
					if(!pattern.test(this.invoice_amount)) {
						this.$vux.toast.text('金额信息仅支持到两位小数')
						return
					}
				}
				let info0 = {
					waybill_list: this.checkedId
				}
				sessionStorage.setItem('info0', JSON.stringify(info0))
				//				console.log(JSON.stringify(info0))
				this.$router.push('/SureInvoice/' + this.project_id + '/' + this.invoice_amount)
			},
			reApply() {
				this.$router.push('/Reapply')
			},
			//列表
			init(state) {
				this.listShow = state
				this.listData = []
				this.tip = '正在加载'
				this.showLoading = true
				this.current_page = 1
				this.total_pages = 0
				this.state = state
				this.$http.post('personal/html/post/v1/tax_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						search_param: this.search_param,
						state: this.state.toString()
					}
				}).then((res) => {
					//					console.log(res)
					if(res.data.result.reCode === '0') {
						this.listData = this.addChecked(res.data.data.tax_list)
						this.total_pages = res.data.data.total_pages
						this.current_page = this.current_page + 1
					}
					this.tip = '暂无数据'
					this.showLoading = false
				})
			},
			refresh(loaded) {
				this.tip = '正在加载'
				this.showLoading = true
				this.current_page = 1
				this.total_pages = 0
				this.$http.post('personal/html/post/v1/tax_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						search_param: this.search_param,
						state: this.state.toString()
					}
				}).then((res) => {
					//					console.log(res)
					if(res.data.result.reCode === '0') {
						this.listData = this.addChecked(res.data.data.tax_list)
						this.total_pages = res.data.data.total_pages
						this.current_page = this.current_page + 1
					}
					loaded('done')
					this.tip = '暂无数据'
					this.showLoading = false
				}).catch((err) => {
					loaded('fail')
					console.log(err)
				})
			},
			getData(loaded) {
				if(this.current_page > this.total_pages) {
					loaded('fail')
					return false
				}
				this.$http.post('personal/html/post/v1/tax_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						search_param: this.search_param,
						state: this.state.toString()
					}
				}).then((res) => {
					//					console.log(res)
					if(res.data.result.reCode === '0') {
						this.listData = this.listData.concat(this.addChecked(res.data.data.tax_list))
						this.current_page = this.current_page + 1
						loaded('done')
					} else {
						loaded('fail')
					}
				}).catch((err) => {
					loaded('fail')
					console.log(err)
				})
			},
			search() {
				this.search_param = this.text
				this.init(this.state)
			}
		}
	}
</script>

<style lang="less">
	.invoice-manage-box {
		padding: 45px 0;
		.search {
			height: 46px;
			background-color: white;
			padding: 0 10px;
			display: flex;
			align-items: center;
			position: relative;
			z-index: 2;
			input {
				width: 0;
				height: 26px;
				flex: 1;
				border: none;
				outline: none;
				background: url(../../../static/image/search.png) 14px center no-repeat;
				background-size: 16px;
				background-color: #f4f4f4;
				border-radius: 6px;
				font-size: 14px;
				text-indent: 3em;
			}
			span {
				width: 45px;
				height: 46px;
				line-height: 46px;
				flex: 0 0 45px;
				font-size: 14px;
				display: block;
				text-align: center;
				color: #666666;
			}
		}
		.info {
			height: 35px;
			background-color: #e7e7e7;
			font-size: 14px;
			color: #666666;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 15px;
			box-sizing: border-box;
			position: relative;
			z-index: 2;
			.vux-x-icon {
				fill: #9a9a9a;
				width: 17px;
				height: 17px;
			}
		}
		.tab {
			width: 100%;
			height: 31px;
			background-color: white;
			display: flex;
			align-items: center;
			color: #999999;
			line-height: 40px;
			position: relative;
			z-index: 2;
			.item {
				width: 0;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 14px;
				color: #646464;
			}
			.current {
				color: #63bffe;
			}
			.line {
				height: 21px;
				&.vux-1px-r:after {
					color: #999999;
					border-right: 1px solid #999999;
				}
			}
		}
		.wrapper {
			position: fixed;
			width: 100%;
			left: 0;
			top: 155px;
			bottom: 0;
		}
		.wrapper0 {
			bottom: 45px;
		}
		.wrapper1 {
			.list {
				.item {
					p {
						margin-left: 10px;
					}
				}
			}
			.first {
				.title {
					p {
						margin-left: 0;
					}
				}
				.label {
					color: #FE2D2D;
				}
			}
		}
		.wrapper_1 {
			top: 125px;
		}
		.list {
			margin: 0 10px;
			.item {
				margin-top: 10px;
				padding: 15px;
				background-color: white;
				.failed {
					color: #FE2D2D;
				}
				.first {
					display: flex;
					justify-content: space-between;
					.title {
						display: flex;
						align-items: center;
						img {
							width: 16px;
							height: 16px;
						}
						p {
							font-size: 14px;
							margin-left: 10px;
						}
					}
					.label {
						font-size: 14px;
						color: #63bffe;
						min-width: 56px;
						.failed {
							color: #FE2D2D;
						}
					}
				}
				p {
					font-size: 14px;
					margin-left: 30px;
				}
				.detail {
					color: #696969;
				}
			}
			/*.failed {
				p {
					margin-left: 0;
				}
				.first {
					.title {
						p {
							margin-left: 0;
						}
					}
					.label {
						color: #FE2D2D;
					}
				}
			}*/
			.item-footer {
				height: 32px;
				margin-top: 2px;
				background-color: white;
				font-size: 14px;
				color: #999999;
				text-align: center;
				line-height: 32px;
			}
		}
		.fixed {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			height: 35px;
			background-color: white;
			padding: 0 24px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			p {
				font-size: 14px;
				color: #666666;
				line-height: 40px;
				/*margin-left: 10px;*/
			}
			.btn {
				width: 80px;
				height: 26px;
				background-color: #63bffe;
				display: block;
				color: white;
				border-radius: 10px;
				text-align: center;
				line-height: 26px;
				font-size: 12px;
			}
			.disabled {
				color: white;
				background-color: #999999;
				p {
					margin-left: 10px;
				}
			}
			.check_group {
				display: flex;
				align-items: center;
				img {
					width: 16px;
					height: 16px;
				}
				span {
					font-size: 12px;
					color: #666666;
					margin-left: 10px;
				}
			}
		}
		.opcity-fixed {
			width: 100%;
			height: 50px;
			background-color: rgba(40, 40, 40, 0.6);
			position: fixed;
			left: 0;
			bottom: 0;
			color: white;
			text-align: center;
			line-height: 50px;
		}
	}
	
	.dialog-demo3 {
		.weui-dialog {
			border-radius: 8px;
			padding-bottom: 8px;
		}
		.first {
			font-size: 12px;
			color: #666666;
			margin-top: 28px;
		}
		.second {
			font-size: 16px;
			color: #63C0FE;
			line-height: 28px;
		}
		input {
			width: 210px;
			height: 30px;
			background-color: #FAFAFA;
			border: none;
			border: 1px #DFDFDF solid;
			margin: 10px auto 15px;
			outline: none;
			text-indent: 1em;
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