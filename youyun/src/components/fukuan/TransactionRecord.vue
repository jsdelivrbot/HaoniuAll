<template>
	<div class="transaction_record_box">
		<v-header title="交易记录"></v-header>
		<div class="search_wrapper">
			<div class="search">
				<div class="date_box">
					<div class="date_item vux-1px" @click="chooseFirst">
						<span>{{firstDate}}</span>
						<img src="../../../static/image/xiala@2x.png" />
					</div>
					<div class="line vux-1px-b"></div>
					<div class="date_item vux-1px" @click="chooseSecond">
						<span>{{secondDate}}</span>
						<img src="../../../static/image/xiala@2x.png" />
					</div>
				</div>
				<div class="btn" @click="init">
					<img src="../../../static/image/riqisousuo@2x.png" />
				</div>
			</div>
		</div>
		<div class="wrapper">
			<pull-to :top-load-method="refresh" :bottom-load-method="getData" :bottom-config="{failText: '没有更多信息'}">
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
	import { Group, Datetime, LoadMore } from 'vux'
	export default {
		data() {
			return {
				firstDate: '日期',
				secondDate: '日期',
				tip: '正在加载',
				showLoading: true,
				listData: [],
				total_pages: 0,
				current_page: 1,
				token: sessionStorage.getItem('token')
			}
		},
		components: {
			'v-header': Header,
			Group,
			Datetime,
			PullTo,
			LoadMore
		},
		created() {
			this.firstDate = this.getLasttMonth()
			this.secondDate = this.setToday()
			this.init()
		},
		methods: {
			chooseFirst() {
				let $this = this
				this.$vux.datetime.show({
					cancelText: '取消',
					confirmText: '确定',
					format: 'YYYY-MM-DD',
					//					value: this.getPastHalfYear(),
					yearRow: '{value}年',
					monthRow: '{value}月',
					dayRow: '{value}日',
					startDate: this.getPastHalfYear(),
					endDate: this.setToday(),
					onConfirm(val) {
						$this.firstDate = val
						$this.secondDate = '日期'
						//						console.log($this.firstDate)
					}
				})
			},
			chooseSecond() {
				if(this.firstDate === '日期') {
					this.$vux.toast.text('请选择起始日期')
					return
				}
				let $this = this
				this.$vux.datetime.show({
					cancelText: '取消',
					confirmText: '确定',
					format: 'YYYY-MM-DD',
					//					value: this.getPastHalfYear(),
					yearRow: '{value}年',
					monthRow: '{value}月',
					dayRow: '{value}日',
					startDate: this.firstDate,
					endDate: this.getNextMonth(),
					onConfirm(val) {
						$this.secondDate = val
					}
				})
			},
			setToday() {
				let now = new Date()
				let cmonth = now.getMonth() + 1
				let day = now.getDate()
				if(cmonth < 10) cmonth = '0' + cmonth
				if(day < 10) day = '0' + day
				return now.getFullYear() + '-' + cmonth + '-' + day
			},
			getPastHalfYear() {
				// 先获取当前时间
				var curDate = (new Date()).getTime()
				// 将半年的时间单位换算成毫秒
				var halfYear = 365 / 2 * 24 * 3600 * 1000
				var pastResult = curDate - halfYear; // 半年前的时间（毫秒单位）

				// 日期函数，定义起点为半年前
				var pastDate = new Date(pastResult)
				var pastYear = pastDate.getFullYear()
				var pastMonth = pastDate.getMonth() + 1
				var pastDay = pastDate.getDate()
				return pastYear + '-' + pastMonth + '-' + pastDay
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
			getNextMonth() {
				// 先获取当前时间
				var curDate = (new Date(this.firstDate)).getTime()
				// 将半年的时间单位换算成毫秒
				var halfMonth = 30 * 24 * 3600 * 1000
				var pastResult = curDate + halfMonth;

				// 日期函数，定义起点为半个月前
				var pastDate = new Date(pastResult)
				var pastYear = pastDate.getFullYear()
				var pastMonth = pastDate.getMonth() + 1
				var pastDay = pastDate.getDate()
				return pastYear + '-' + pastMonth + '-' + pastDay
			},
			init() {
				if(this.firstDate === '日期') {
					this.$vux.toast.text('请选择起始日期')
					return
				}
				if(this.secondDate === '日期') {
					this.$vux.toast.text('请选择结束日期')
					return
				}
				this.listData = []
				this.tip = '正在加载'
				this.showLoading = true
				this.current_page = 1
				this.total_pages = 0
				this.$http.post('account/html/post/v1/transaction_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						start_time: this.firstDate,
						end_time: this.secondDate
					}
				}).then((res) => {
					//					console.log(res)
					if(res.data.result.reCode === '0') {
						this.listData = res.data.data.transaction_list
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
				this.$http.post('account/html/post/v1/transaction_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						start_time: this.firstDate,
						end_time: this.secondDate
					}
				}).then((res) => {
					//					console.log(res)
					if(res.data.result.reCode === '0') {
						this.listData = res.data.data.transaction_list
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
					}else {
						loaded('fail')
					}
				}).catch((err) => {
					loaded('fail')
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="less">
	.transaction_record_box {
		padding-top: 44px;
		.search_wrapper {
			background-color: #f1eff2;
			padding: 10px 0;
			position: relative;
			z-index: 2;
			.search {
				margin: 0 10px;
				background-color: white;
				height: 34px;
				padding: 4px;
				box-sizing: border-box;
				display: flex;
				.date_box {
					width: 0;
					flex: 1;
					height: 26px;
					display: flex;
					align-items: center;
					.date_item {
						width: 0;
						flex: 1;
						background-color: #f7f7f7;
						display: flex;
						justify-content: space-between;
						align-items: center;
						span {
							font-size: 14px;
							color: #4d4d4d;
							padding-left: 10px;
							line-height: 26px;
						}
						img {
							width: 12px;
							padding-right: 4px;
						}
					}
					.line {
						width: 40px;
						margin: 0 8px;
						flex: 0 1 auto;
					}
				}
				.btn {
					width: 40px;
					flex: 0 0 auto;
					display: flex;
					justify-content: center;
					align-items: center;
					img {
						width: 20px;
					}
				}
			}
		}
		.wrapper {
			position: fixed;
			width: 100%;
			left: 0;
			top: 85px;
			bottom: 0;
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