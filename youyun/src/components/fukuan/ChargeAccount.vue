<template>
	<div class="charge-account-box">
		<v-header title="运费帐户"></v-header>
		<!--<group style="margin: -12px 10px;">
			<x-input title="手机号码" value="18654443222" disabled>
				<span slot="right" style="color: #63bffe;">修改</span>
			</x-input>
		</group>-->
		<!--<div class="charge">
			<p class="title">付款金额</p>
			<p class="content">
				<span>1000.00元</span>
				<span class="btn">提现</span>
			</p>
		</div>-->
		<div class="wrapper">
			<pull-to :bottom-load-method="getData" :bottom-config="{failText: '没有更多信息'}">
				<div class="tab_box">
					<div class="title_box">
						<div class="title" :class="{current: currentTab === index}" @click="currentTab = index" v-for="(item, index) in account" :key="index">
							<img src="../../../static/image/xingyeyinhang-tubiao@2x.png" v-if="judgeBank(item.sub_account_bank) === 0" v-show="currentTab === index" />
							<img src="../../../static/image/xingyeyinghangweixuanzhong@2x.png" v-if="judgeBank(item.sub_account_bank) === 0" v-show="currentTab !== index" />
							<img src="../../../static/image/pinganyinhang@2x.png" v-if="judgeBank(item.sub_account_bank) === 1" v-show="currentTab === index" />
							<img src="../../../static/image/pinganyinhangweixuanzhong@2x.png" v-if="judgeBank(item.sub_account_bank) === 1" v-show="currentTab !== index" />
							<p :class="{current: currentTab === index}">{{item.last_money}}元</p>
						</div>
						<!--<div class="title" :class="{current: currentTab === 0}" @click="currentTab = 0">
							<img src="../../../static/image/xingyeyinhang-tubiao@2x.png" />
							<p :class="{current: currentTab === 0}">{{account[0].last_money}}元</p>
						</div>
						<div class="title" :class="{current: currentTab === 1}" @click="currentTab = 1" v-if="account[1]">
							<img src="../../../static/image/xingyeyinhang-tubiao@2x.png" />
							<p :class="{current: currentTab === 1}">{{account[1].last_money}}元</p>
						</div>-->
					</div>
					<div class="content" v-show="currentTab === index" v-for="(item, index) in account" :key="index" :class="{xingye: judgeBank(item.sub_account_bank)===0, pingan: judgeBank(item.sub_account_bank)===1}">
						<div class="text">
							<p>运费账户: {{item.sub_account_no}}</p>
							<p>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名: {{item.sub_account_name}}</p>
							<p>开户行: {{item.sub_account_bank}}</p>
						</div>
						<div class="img" v-if="judgeBank(item.sub_account_bank) === 0">
							<img src="../../../static/image/xingyeyinhang-tubiao@2x.png" />
							<p>兴业银行</p>
						</div>
						<div class="img" v-if="judgeBank(item.sub_account_bank) === 1">
							<img src="../../../static/image/pinganyinhang@2x.png" />
							<p>中国平安</p>
						</div>
					</div>
					<!--<div class="content" v-show="currentTab === 0">
						<div class="text">
							<p>运费账户: {{account[0].sub_account_no}}</p>
							<p>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名: {{account[0].sub_account_name}}</p>
							<p>开户行: {{account[0].sub_account_bank}}</p>
						</div>
						<div class="img">
							<img src="../../../static/image/xingyeyinhang-tubiao@2x.png" />
							<p>兴业银行</p>
						</div>
					</div>
					<div class="content" v-show="currentTab === 1" v-if="account[1]">
						<div class="text">
							<p>运费账户: {{account[1].sub_account_no}}</p>
							<p>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名: {{account[2].sub_account_name}}</p>
							<p>开户行: {{account[1].sub_account_bank}}</p>
						</div>
						<div class="img">
							<img src="../../../static/image/xingyeyinhang-tubiao@2x.png" />
							<p>中国平安</p>
						</div>
					</div>-->
				</div>
				<div class="menu">
					<router-link to="/PasswordManage" tag="div" class="item">
						<img src="../../../static/image/zhifumimashezhi@2x.png" />
						<p>支付密码设置</p>
					</router-link>
					<!--<div class="item">
						<img src="../../../static/image/yinhangkaguanli@2x.png" />
						<p>银行卡管理</p>
					</div>-->
					<router-link to="/TransactionRecord" tag="div" class="item">
						<img src="../../../static/image/jiaoyijilu@2x.png">
						<p>交易记录</p>
					</router-link>
					<router-link to="/RechargeRecord" tag="div" class="item">
						<img src="../../../static/image/chongzhitixianjilu@2x.png">
						<p>充值记录</p>
					</router-link>
				</div>
				<div class="detail" v-for="(item, index) in listData" :key="index">
					<div class="detail-item">
						<span>支付时间：{{item.created_time}}</span>
						<!--<span class="label">已到账</span>-->
					</div>
					<div class="detail-item">
						<div>
							<p>收款帐号：{{item.send_account}}</p>
							<p>收款人：{{item.send_bank}}</p>
						</div>
						<span class="label">
							<span v-if="item.dc_flag === '1'">+</span>
						<span v-if="item.dc_flag === '2'">-</span> {{item.trans_amount}}元
						</span>
					</div>
					<!--<div class="detail-item">
						<p>开户行：{{item.send_bank}}</p>
					</div>-->
				</div>
				<load-more :show-loading="showLoading" :tip="tip" background-color="#f1eff2" v-show="listData.length === 0"></load-more>
			</pull-to>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import PullTo from '@/components/base/PullTo/vue-pull-to'
	import { Group, XInput, LoadMore } from 'vux'
	export default {
		data() {
			return {
				currentTab: 0,
				token: sessionStorage.getItem('token'),
				account: [],
				tip: '正在加载',
				showLoading: true,
				listData: [],
				total_pages: 0,
				current_page: 1
			}
		},
		components: {
			'v-header': Header,
			Group,
			XInput,
			PullTo,
			LoadMore
		},
		created() {
			this.$http.post('account/html/get/v1/freight_account?token=' + this.token).then((res) => {
				console.log(res)
				if(res.data.result.reCode === '0') {
					this.account = res.data.data.account_list
//					this.account = [{
//						last_money: '99300',
//						sub_account_bank: '兴业银行南京分行',
//						sub_account_name: '合肥维天运通信息科技股份有限公司',
//						sub_account_no: '302001340051197'
//					}, {
//						last_money: '99300',
//						sub_account_bank: '平安银行南京分行',
//						sub_account_name: '合肥维天运通信息科技股份有限公司',
//						sub_account_no: '302001340051197'
//					}]
				}
			})
			this.init()
		},
		methods: {
			judgeBank(value) {
				if(value.indexOf('兴业银行') !== -1) {
					return 0
				}else {
					return 1
				}
			},
			init() {
				let firstDate = this.getLasttMonth()
				let secondDate = this.setToday()
				this.listData = []
				this.tip = '正在加载'
				this.showLoading = true
				this.current_page = 1
				this.total_pages = 0
				this.$http.post('account/html/post/v1/transaction_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						start_time: firstDate,
						end_time: secondDate
					}
				}).then((res) => {
					console.log(res)
					if(res.data.result.reCode === '0') {
						this.listData = res.data.data.transaction_list
						this.total_pages = res.data.data.total_pages
						this.current_page = this.current_page + 1
					}
					this.tip = '暂无数据'
					this.showLoading = false
				})
			},
			getData(loaded) {
				if(this.current_page > this.total_pages) {
					loaded('fail')
					return false
				}
				this.$http.post('account/html/post/v1/transaction_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						start_time: this.firstDate,
						end_time: this.secondDate
					}
				}).then((res) => {
					//					console.log(res)
					if(res.data.result.reCode === '0') {
						this.listData = this.listData.concat(res.data.data.transaction_list)
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
			getLasttMonth() {
				// 先获取当前时间
				var curDate = (new Date()).getTime()
				// 将半年的时间单位换算成毫秒
				var halfMonth = 30 * 24 * 3600 * 1000
				var pastResult = curDate - halfMonth;

				// 日期函数，定义起点为半个月前
				var pastDate = new Date(pastResult)
				var pastYear = pastDate.getFullYear()
				var pastMonth = pastDate.getMonth() + 1
				var pastDay = pastDate.getDate()
				return pastYear + '-' + pastMonth + '-' + pastDay
			},
			setToday() {
				let now = new Date()
				let cmonth = now.getMonth() + 1
				let day = now.getDate()
				if(cmonth < 10) cmonth = '0' + cmonth
				if(day < 10) day = '0' + day
				return now.getFullYear() + '-' + cmonth + '-' + day
			}
		}
	}
</script>

<style lang="less">
	.charge-account-box {
		padding-top: 45px;
		.wrapper {
			position: fixed;
			width: 100%;
			left: 0;
			top: 45px;
			bottom: 0;
		}
		.tab_box {
			margin: 10px;
			background-color: white;
			.title_box {
				height: 50px;
				display: flex;
				background-color: #f7f7f7;
				.title {
					padding: 0 10px;
					flex: 1;
					display: flex;
					align-items: center;
					&.current {
						background-color: white;
					}
					img {
						width: 38px;
						height: 24px;
					}
					p {
						font-size: 13px;
						margin-left: 8px;
						&.current {
							color: #4cb6fd;
						}
					}
				}
			}
			.content {
				padding: 0 16px;
				height: 109px;
				display: flex;
				&.xingye {
					background: url(../../../static/image/xingyeyinhang-diwen@2x.png) right -14px top no-repeat;
					background-size: auto 100px;
				}
				&.pingan {
					background: url(../../../static/image/pinganyinhangshuiying@2x.png) right 2px top no-repeat;
					background-size: auto 100px;
				}
				.text {
					display: flex;
					flex-direction: column;
					justify-content: center;
					flex: 0 0 auto;
					max-width: 60vw;
					p {
						font-size: 14px;
					}
				}
				.img {
					flex: 1 1 auto;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					img {
						width: 50%;
						max-width: 80px;
					}
					p {
						font-size: 14px;
						margin-top: 4px;
					}
				}
			}
		}
		.charge {
			margin: 10px;
			background-color: white;
			padding: 15px;
			font-size: 16px;
			color: #63bffe;
			.content {
				font-size: 20px;
				text-align: center;
				margin-bottom: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				.btn {
					width: 72px;
					height: 24px;
					display: block;
					background-color: #63bffe;
					color: white;
					font-size: 14px;
					border-radius: 8px;
					margin-left: 20px;
					line-height: 24px;
				}
			}
		}
		.menu {
			margin: 10px;
			background-color: white;
			display: flex;
			.item {
				width: 0;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 15px 0;
				img {
					width: 48px;
				}
				p {
					font-size: 12px;
					margin-top: 5px;
				}
			}
		}
		.detail {
			margin: 10px;
			padding: 15px;
			background-color: white;
			font-size: 14px;
			.detail-item {
				display: flex;
				justify-content: space-between;
				/*align-items: center;*/
				.label {
					color: #63bffe;
				}
			}
		}
	}
</style>