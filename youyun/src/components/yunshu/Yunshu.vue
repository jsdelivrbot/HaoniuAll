<template>
	<div class="yunshu-box">
		<search-header @goSearch="goSearch"></search-header>
		<div class="tab">
			<div class="item" :class="{current: currentList === 1}" @click="initData(1)">
				在途中
			</div>|
			<div class="item" :class="{current: currentList === 2}" @click="initData(2)">
				已到货
			</div>|
			<div class="item" :class="{current: currentList === 3}" @click="initData(3)">
				已签收
			</div>
		</div>
		<div class="wapper">
			<pull-to :top-load-method="refresh" :bottom-load-method="getData" :bottom-config="{failText: '没有更多信息'}">
				<div class="list">
					<div class="item" v-for="(item, index) in listData" :key="index">
						<router-link class="content" :to="'/OrderDetail/' + item.waybill_id" tag="div">
							<p>运单号：{{item.waybill_no}}<span class="label">{{item.goods_name}}</span></p>
							<p>
								建单时间：{{item.created_time}}
								<span class="label label2">
									{{item.goods_num}}
									{{item.unit}}
								</span>
							</p>
							<div class="position">
								<div>
									<p>{{item.cart_badge_no}}，{{item.driver_name}}，{{item.mobile_no}}</p>
									<p>{{item.begin_address}} 至 {{item.end_address}}</p>
								</div>
								<img src="../../../static/image/dingweizhongjie@2x.png" v-if="item.end_type === '1'" />
							</div>
						</router-link>
						<div class="footer" v-if="item.state === '1'">
							<router-link :to="'/ChangeOrder2/' + item.waybill_id" class="vux-1px-r current" tag="span" v-if="$power('TRA_ONPASS_MODBILL_BTN')">修改</router-link>
							<span class="vux-1px-r" @click="receive(item.waybill_id)" v-if="$power('TRA_ONPASS_CONARR_BTN')">确认到货</span>
							<span @click="record(item.waybill_id)" v-if="$power('TRA_ONPASS_OPEREC_BTN')">操作记录</span>
						</div>
						<div class="footer" v-if="item.state === '2'">
							<router-link :to="'/SureSignIn2/' + item.waybill_id" tag="span" class="vux-1px-r current" v-if="$power('TRA_ARR_CONREC_BTN')">确认签收</router-link>
							<router-link :to="'/OrderDetail/' + item.waybill_id" tag="span" class="vux-1px-r" v-if="item.star === ''" v-show="$power('TRA_ARR_EVA_BTN')">评价</router-link>
							<span @click="record(item.waybill_id)" v-if="$power('TRA_ARR_OPEREC_BTN')">操作记录</span>
						</div>
						<div class="footer" v-if="item.state === '3'">
							<router-link :to="'/OrderDetail/' + item.waybill_id" tag="span" class="vux-1px-r current" v-if="item.star === ''">评价</router-link>
							<span @click="record(item.waybill_id)" v-if="$power('TRA_SIGN_OPEREC_BTN')">操作记录</span>
						</div>
					</div>
					<load-more :show-loading="showLoading" :tip="tip" background-color="#f1eff2" v-show="listData.length === 0"></load-more>
				</div>
			</pull-to>
		</div>
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
				</div>
				<x-icon type="ios-close-empty" size="40" @click="closeMaster"></x-icon>
			</div>
		</div>
		<!--<div class="list" v-show="currentList === 2">
			<div class="item">
				<div class="content">
					<p>运单号：123450-1<span class="label">机械设备</span></p>
					<p>建单时间：2017-9-9 12：23<span class="label label2">35.0吨</span></p>
					<p>皖A123456，袁自林，13900000000</p>
					<p>安徽-合肥-高新区 至 四川-成都-金牛区</p>
				</div>
				<div class="footer">
					<span class="vux-1px-r current">确认到货</span>
					<span>操作记录</span>
				</div>
			</div>
			<div class="item">
				<div class="content">
					<p>运单号：123450-1<span class="label">机械设备</span></p>
					<p>建单时间：2017-9-9 12：23<span class="label label2">35.0吨</span></p>
					<div class="position">
						<div>
							<p>皖A123456，袁自林，13900000000</p>
							<p>安徽-合肥-高新区 至 四川-成都-金牛区</p>
						</div>
						<img src="../../../static/image/dingweizhongjie@2x.png" />
					</div>
				</div>
				<div class="footer">
					<span class="vux-1px-r current">确认签收</span>
					<span class="vux-1px-r">评价</span>
					<span>操作记录</span>
				</div>
			</div>
		</div>
		<div class="list" v-show="currentList === 3">
			<div class="item">
				<div class="content">
					<p>运单号：123450-1<span class="label">机械设备</span></p>
					<p>建单时间：2017-9-9 12：23<span class="label label2">35.0吨</span></p>
					<p>皖A123456，袁自林，13900000000</p>
					<p>安徽-合肥-高新区 至 四川-成都-金牛区</p>
				</div>
				<div class="footer">
					<span class="vux-1px-r current">评价</span>
					<span>操作记录</span>
				</div>
			</div>
		</div>-->
	</div>
</template>

<script>
	import SearchHeader from '@/components/base/SearchHeader'
	import PullTo from '@/components/base/PullTo/vue-pull-to'
	import { LoadMore } from 'vux'
	export default {
		data() {
			return {
				currentList: 1,
				token: sessionStorage.getItem('token'),
				current_page: 1,
				condition: '',
				state: 0,
				listData: [],
				tip: '正在加载',
				showLoading: true,
				total_pages: 0,
				masterShow: false,
				recordList: [],
				recordCount: ''
			}
		},
		components: {
			SearchHeader,
			PullTo,
			LoadMore
		},
		created() {
			this.initData(1)
			window.myvue.$initYunshu = this
		},
		methods: {
			goSearch(text) {
				this.condition = text
				this.init()
			},
			init() {
				this.showLoading = true
				this.listData = []
				this.current_page = 1
				this.total_pages = 0
				this.$http.post('waybill/html/post/v1/waybill_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						condition: this.condition,
						state: this.state.toString()
					}
				}).then((res) => {
					if(res.data.result.reCode === '0') {
						console.log(res)
						this.listData = res.data.data.waybill_list
						this.total_pages = res.data.data.total_pages
						this.current_page = this.current_page + 1
					}
					this.tip = '暂无数据'
					this.showLoading = false
				})
			},
			initData(state) {
				this.condition = ''
				this.showLoading = true
				this.currentList = state
				this.listData = []
				this.current_page = 1
				this.total_pages = 0
				this.state = state
				this.$http.post('waybill/html/post/v1/waybill_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						condition: this.condition,
						state: this.state.toString()
					}
				}).then((res) => {
					if(res.data.result.reCode === '0') {
						console.log(res)
						this.listData = res.data.data.waybill_list
						this.total_pages = res.data.data.total_pages
						this.current_page = this.current_page + 1
					}
					this.tip = '暂无数据'
					this.showLoading = false
				})
			},
			refresh(loaded) {
				this.listData = []
				this.current_page = 1
				this.total_pages = 0
				this.$http.post('waybill/html/post/v1/waybill_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						condition: this.condition,
						state: this.state.toString()
					}
				}).then((res) => {
					if(res.data.result.reCode === '0') {
						//						console.log(res)
						this.listData = res.data.data.waybill_list
						this.total_pages = res.data.data.total_pages
						this.current_page = this.current_page + 1
					}
					loaded('done')
				})
			},
			getData(loaded) {
				//判断是否到最后一页
				if(this.current_page > this.total_pages) {
					loaded('fail')
					return false
				}
				this.$http.post('waybill/html/post/v1/waybill_list?token=' + this.token, {
					data: {
						current_page: this.current_page.toString(),
						condition: this.condition,
						state: this.state.toString()
					}
				}).then((res) => {
					if(res.data.result.reCode === '0') {
						//						console.log(res)
						this.listData = this.listData.concat(res.data.data.waybill_list)
						this.current_page = this.current_page + 1
						loaded('done')
					} else {
						loaded('fail')
					}
				})
			},
			receive(id) {
				let $this = this
				this.$vux.confirm.show({
					title: '提示',
					content: '是否确认订单已到达目的地？',
					onConfirm() {
						$this.$http.get('waybill/html/get/v1/goods_arrival/' + id + '?token=' + $this.token)
							.then((res) => {
								console.log(res)
								if(res.data.result.reCode === '0') {
									$this.$vux.toast.text('确认到货成功')
									setTimeout(() => {
										$this.initData(1)
									}, 500)
								} else {
									$this.$vux.toast.text(res.data.result.reInfo)
								}
							})
					}
				})
			},
			closeMaster() {
				this.masterShow = false
			},
			record(id) {
				this.masterShow = true
				this.recordList = []
				this.$http.get('waybill/html/get/v1/record_list/' + id + '?token=' + this.token)
					.then((res) => {
						console.log(res)
						if(res.data.data.record_count === 0) {
							this.recordCount = '0'
//							console.log(this.recordCount)
						}else {
							this.recordCount = ''
						}
						this.recordList = res.data.data.record_list
					})
			}
		}
	}
</script>

<style lang="less">
	.yunshu-box {
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
				color: #60BEFB;
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
				.content {
					margin: 10px 10px 0;
					padding: 15px;
					background-color: white;
					font-size: 14px;
					p {
						.label {
							color: #666666;
							float: right;
							font-size: 14px;
						}
						.label2 {
							font-size: 12px;
						}
					}
					.position {
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						&>div {
							width: 0;
							flex: 1;
						}
						&>img {
							width: 40px;
							height: 40px;
							margin-left: 10px;
						}
					}
				}
				.footer {
					display: flex;
					align-items: center;
					background-color: white;
					height: 30px;
					margin: 2px 10px;
					span {
						width: 0;
						flex: 1;
						font-size: 14px;
						color: #656565;
						display: flex;
						justify-content: center;
					}
					.current {
						color: #60BEFB;
					}
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
				padding: 30px 0;
				position: relative;
				max-height: 54vh;
				overflow-y: hidden;
				.in-content {
					max-height: 54vh;
					overflow-y: auto;
					margin: 0 15px;
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
</style>