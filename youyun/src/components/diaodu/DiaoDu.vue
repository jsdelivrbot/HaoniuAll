<template>
	<div class="diao-du-box">
		<search-header @goSearch="goSearch"></search-header>
		<div class="tab">
			<div class="item" :class="{current:currentList === 1}" @click="tab1">
				货源管理
			</div>|
			<div class="item" :class="{current:currentList === 2}" @click="tab2">
				发车管理
			</div>
		</div>
		<div class="wapper" v-show="currentList === 1">
			<pull-to :top-load-method="refresh1" :bottom-load-method="getData1" :bottom-config="{failText: '没有更多信息'}">
				<div class="list">
					<router-link :to="'/OfferDetail/' + item.dispatch_id" tag="div" class="item type1" v-for="(item, index) in listData1" :key="index">
						<p class="row">
							<span class="text">发布时间：{{item.created_time}}</span>
							<span class="type" v-if="item.offer_state === '0'">采价中</span>
							<span class="type" v-if="item.offer_state === '1'">已报价</span>
						</p>
						<p class="row">
							<span class="text">货源编号：{{item.goods_no}}</span>
							<span class="time">已用时：{{item.cost_time}}</span>
						</p>
						<p class="row">
							<span class="text">货物名称：{{item.goods_name}}</span>
							<img src="../../../static/image/fang@2x.png" v-if="item.offer_type === '1'" />
							<img src="../../../static/image/che@2x.png" v-if="item.offer_type === '2'" />
							<img src="../../../static/image/dun@2x.png" v-if="item.offer_type === '0'" />
						</p>
						<p class="row">
							<span class="text">{{item.begin_address}} 至 {{item.end_address}}</span>
						</p>
						<p class="footer vux-1px-t">
							已有
							<span class="red">{{item.offer_num}}</span>位司机报价，最低报价
							<span class="red">{{item.min_price}}</span>元/
							<span v-if="item.offer_type === '0'">吨</span>
							<span v-if="item.offer_type === '1'">方</span>
							<span v-if="item.offer_type === '2'">车</span>
							<x-icon type="ios-arrow-right" size="20" style="margin-left: 10px;"></x-icon>
						</p>
					</router-link>
					<load-more :show-loading="showLoading1" :tip="tip1" background-color="#f1eff2" v-show="listData1.length === 0"></load-more>
					<!--<div class="item type2">
						<p class="row">
							<span class="text">成交时间：2017-9-9 12:24</span>
							<span class="type">待起运</span>
						</p>
						<p class="row">
							<span class="text">运单号：123450</span>
							<span class="time">用时：9小时38分</span>
						</p>
						<p class="row">
							<span class="text">皖A12345,袁自林,13900000000</span>
							<span class="time">快速建单</span>
						</p>
						<p class="row">
							<span class="text">安徽-合肥-高新区 至四川-成都-金牛区</span>
						</p>
						<p class="footer vux-1px-t">
							<span class="vux-1px-r current">起运</span>
							<span class="vux-1px-r">修改</span>
							<span>取消发车</span>
						</p>
					</div>
					<div class="item type3">
						<p class="row">
							<span class="text">发布时间：2017-9-9 12:24</span>
							<span class="type">采价中</span>
						</p>
						<p class="row">
							<span class="text">货源编号：123450</span>
							<span class="time">已用时：9小时38分</span>
						</p>
						<p class="row">
							<span class="text">货物名称：机械设备</span>
							<img src="../../../static/image/offerDetail.png" />
						</p>
						<p class="row">
							<span class="text">安徽-合肥-高新区 至四川-成都-金牛区</span>
						</p>
						<p class="footer vux-1px-t"></p>
					</div>-->
				</div>
			</pull-to>
		</div>
		<div class="wapper" v-show="currentList === 2">
			<pull-to :top-load-method="refresh2" :bottom-load-method="getData2" :bottom-config="{failText: '没有更多信息'}">
				<div class="list">
					<div class="item type2" v-for="(item, index) in listData2" :key="index">
						<p class="row">
							<span class="text">成交时间：{{item.created_time}}</span>
							<span class="type" v-if="item.state === '0'">待起运</span>
							<span class="type" v-if="item.state === '1'">在途中</span>
							<span class="type" v-if="item.state === '2'">已到货</span>
							<span class="type" v-if="item.state === '3'">已签收</span>
						</p>
						<p class="row">
							<span class="text">运单号：{{item.waybill_no}}</span>
							<span class="time">用时：{{item.cost_time}}</span>
						</p>
						<p class="row">
							<span class="text">{{item.car_badge_no}}，{{item.driver_name}}，{{item.mobile_no}}</span>
							<span class="time" v-if="item.data_type === '0'">调度建单</span>
							<span class="time" v-if="item.data_type === '1'">快速建单</span>
						</p>
						<p class="row">
							<span class="text">{{item.begin_address}} 至 {{item.end_address}}</span>
						</p>
						<p class="footer vux-1px-t">
							<span class="vux-1px-r current" @click="qiyun(item.waybill_id)">起运</span>
							<router-link :to="'/ChangeOrder/' + item.waybill_id" class="vux-1px-r" tag="span">修改</router-link>
							<span @click="cancel(item.waybill_id)">取消发车</span>
						</p>
					</div>
					<load-more :show-loading="showLoading2" :tip="tip2" background-color="#f1eff2" v-show="listData2.length === 0"></load-more>
				</div>
			</pull-to>
		</div>
		<router-link to="/FastDispatch" tag="div" class="btn">
			快速<br /> 调车
		</router-link>
	</div>
</template>

<script>
	import SearchHeader from '@/components/base/SearchHeader'
	import { LoadMore } from 'vux'
	//	import PullTo from 'vue-pull-to'
	import PullTo from '@/components/base/PullTo/vue-pull-to'
	export default {
		data() {
			return {
				currentList: 1,
				token: sessionStorage.getItem('token'),
				current_page1: 1,
				search_param1: '',
				listData1: [],
				tip1: '正在加载',
				showLoading1: true,
				total_pages1: 0,
				current_page2: 1,
				search_param2: '',
				listData2: [],
				tip2: '正在加载',
				showLoading2: true,
				total_pages2: 0,
				state: '',
				mobile_number: '',
				data_type: ''
			}
		},
		components: {
			SearchHeader,
			LoadMore,
			PullTo
		},
		created() {
			if(this.$route.query.mobile) {
				this.currentList = 2
				this.data_type = this.$route.query.data
				this.mobile_number = this.$route.query.mobile
			}
			this.init1()
			this.init2()
		},
		methods: {
			goSearch(text) {
				if(this.currentList === 1) {
					this.search_param1 = text
					this.init1()
				}
				if(this.currentList === 2) {
					this.search_param2 = text
					this.init2()
				}
			},
			tab1() {
				this.currentList = 1
			},
			tab2() {
				this.currentList = 2
			},
			init1() {
				this.total_pages1 = 0
				this.current_page1 = 1
				this.tip1 = '正在加载'
				this.showLoading1 = true
				this.listData1 = []
				//货源列表
				this.$http.post('dispatch/html/post/v1/dispatch_list?token=' + this.token, {
					data: {
						current_page: this.current_page1.toString(),
						search_param: this.search_param1,
						mobile_number: this.mobile_number,
						data_type: this.data_type
					}
				}).then((res) => {
					//				console.log(res)
					if(res.data.result.reCode === '0') {
						this.listData1 = res.data.data.dispatch_list
						this.total_pages1 = res.data.data.total_pages
						this.current_page1 = this.current_page1 + 1
					}
					this.tip1 = '暂无数据'
					this.showLoading1 = false
				})
			},
			init2() {
				this.total_pages2 = 0
				this.current_page2 = 1
				this.tip2 = '正在加载'
				this.showLoading2 = true
				this.listData2 = []
				//发车列表
				this.$http.post('dispatch/html/post/v1/start_waybill_list?token=' + this.token, {
					data: {
						current_page: this.current_page2.toString(),
						search_param: this.search_param2,
						mobile_number: this.mobile_number,
						data_type: this.data_type
					}
				}).then((res) => {
					console.log(res)
					if(res.data.result.reCode === '0') {
						this.listData2 = res.data.data.dispatch_list
						this.total_pages2 = res.data.data.total_pages
						this.current_page2 = this.current_page2 + 1
					}
					this.tip2 = '暂无数据'
					this.showLoading2 = false
				})
			},
			refresh1(loaded) {
				this.total_pages1 = 0
				this.current_page1 = 0
				this.$http.post('dispatch/html/post/v1/dispatch_list?token=' + this.token, {
					data: {
						current_page: this.current_page1.toString(),
						search_param: this.search_param1,
						mobile_number: this.mobile_number,
						data_type: this.data_type
					}
				}).then((res) => {
					console.log(res)
					this.listData1 = []
					if(res.data.result.reCode === '0') {
						this.listData1 = res.data.data.dispatch_list
						this.total_pages1 = res.data.data.total_pages
						this.current_page1 = this.current_page1 + 1
					}
					loaded('done')
				})
			},
			refresh2(loaded) {
				this.total_pages2 = 0
				this.current_page2 = 0
				this.$http.post('dispatch/html/post/v1/start_waybill_list?token=' + this.token, {
					data: {
						current_page: this.current_page2.toString(),
						search_param: this.search_param2,
						mobile_number: this.mobile_number,
						data_type: this.data_type
					}
				}).then((res) => {
					console.log(res)
					this.listData2 = []
					if(res.data.result.reCode === '0') {
						this.listData2 = res.data.data.dispatch_list
						this.total_pages2 = res.data.data.total_pages
						this.current_page2 = this.current_page2 + 1
					}
					loaded('done')
				})
			},
			getData1(loaded) {
				if(this.current_page1 > this.total_pages1) {
					loaded('fail')
					return false
				}
				this.$http.post('dispatch/html/post/v1/dispatch_list?token=' + this.token, {
						data: {
							current_page: this.current_page1.toString(),
							search_param: this.search_param1,
							mobile_number: this.mobile_number,
							data_type: this.data_type
						}
					})
					.then((res) => {
						console.log(res.data)
						if(res.data.result.reCode === '0') {
							this.listData1 = this.listData1.concat(res.data.data.dispatch_list)
							this.current_page1 = this.current_page1 + 1
							loaded('done')
						} else {
							loaded('fail')
						}
					})
			},
			getData2(loaded) {
				if(this.current_page2 > this.total_pages2) {
					loaded('fail')
					return false
				}
				this.$http.post('dispatch/html/post/v1/start_waybill_list?token=' + this.token, {
						data: {
							current_page: this.current_page2.toString(),
							search_param: this.search_param2,
							mobile_number: this.mobile_number,
							data_type: this.data_type
						}
					})
					.then((res) => {
						console.log(res.data)
						if(res.data.result.reCode === '0') {
							this.listData2 = this.listData2.concat(res.data.data.dispatch_list)
							this.current_page2 = this.current_page1 + 2
							loaded('done')
						} else {
							loaded('fail')
						}
					})
			},
			qiyun(id) {
				let $this = this
				this.$vux.confirm.show({
					title: '提示',
					content: '确认起运？',
					onConfirm() {
						$this.$http.post('dispatch/html/put/v1/start_shipment/' + id + '?token=' + $this.token)
							.then((res) => {
								if(res.data.result.reCode === 0) {
									$this.$vux.toast.text('起运成功')
									$this.init2()
								} else {
									$this.$vux.toast.text(res.data.result.reInfo)
								}
							})
					}
				})
				//				console.log(id)
			},
			cancel(id) {
				let $this = this
				this.$vux.confirm.show({
					title: '提示',
					content: '确认取消？',
					onConfirm() {
						$this.$http.post('dispatch/html/put/v1/cancel_depart/' + id + '?token=' + $this.token)
							.then((res) => {
								if(res.data.result.reCode === 0) {
									$this.$vux.toast.text('取消成功')
									$this.init2()
								} else {
									$this.$vux.toast.text(res.data.result.reInfo)
								}
							})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.diao-du-box {
		padding-top: 85px;
		.tab {
			width: 100%;
			height: 40px;
			position: fixed;
			top: 45px;
			left: 0;
			background-color: white;
			display: flex;
			color: #999999;
			line-height: 40px;
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
				color: #60c1ff;
			}
		}
		.wapper {
			position: fixed;
			width: 100%;
			left: 0;
			top: 85px;
			bottom: 0;
		}
		.list {
			.item {
				padding: 15px 15px 0;
				background-color: white;
				margin: 10px;
				.row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.text {
						font-size: 14px;
					}
					.type {
						font-size: 16px;
					}
					.time {
						font-size: 12px;
						color: #646464;
					}
					.category {
						font-size: 14px;
						color: #646464;
					}
					img {
						width: 24px;
						height: 24px;
					}
				}
			}
			.type1 {
				.type {
					color: #ff8b26;
				}
				.footer {
					font-size: 14px;
					height: 30px;
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 15px -15px 0;
					color: #646464;
					.red {
						color: red;
					}
				}
			}
			.type2 {
				.type {
					color: #63bffe;
				}
				.footer {
					font-size: 14px;
					height: 30px;
					display: flex;
					align-items: center;
					margin: 15px -15px 0;
					color: #646464;
					span {
						width: 0;
						flex: 1;
						display: flex;
						justify-content: center;
						&.current {
							color: #63bffe;
						}
					}
				}
			}
			.type3 {
				color: #646464;
				.footer {
					font-size: 14px;
					height: 30px;
					display: flex;
					align-items: center;
					margin-top: 15px;
					color: #646464;
				}
			}
		}
		.btn {
			width: 60px;
			height: 60px;
			background-color: #ffc71a;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 16px;
			border-radius: 50%;
			line-height: 20px;
			position: fixed;
			right: 24px;
			bottom: 68px;
			box-shadow: 0 2px 5px #888888;
		}
	}
</style>