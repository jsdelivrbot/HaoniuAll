<template>
	<div class="offer-detail-box">
		<v-header title="报价详情"></v-header>
		<div class="wapper">
			<pull-to :bottom-load-method="getData" :bottom-config="{failText: '没有更多信息'}">
				<div class="top">
					<div class="title vux-1px-b">
						<p class="row">
							<span class="text">发布时间：{{dispatch_detail.created_time}}</span>
							<span class="time">已用时：{{dispatch_detail.cost_time}}</span>
						</p>
						<p class="row">
							<span class="text">货源编号：{{dispatch_detail.goods_no}}</span>
							<span class="category">{{dispatch_detail.goods_name}}</span>
						</p>
						<p class="row">
							<span class="text">{{dispatch_detail.begin_address}} 至 {{dispatch_detail.end_address}}</span>
							<img src="../../../static/image/fang@2x.png" v-if="dispatch_detail.unit === '方'" />
							<img src="../../../static/image/che@2x.png" v-if="dispatch_detail.unit === '车'" />
							<img src="../../../static/image/dun@2x.png" v-if="dispatch_detail.unit === '吨'" />
						</p>
						<p class="row">
							<span class="text">项目名称：{{dispatch_detail.project_name}}</span>
						</p>
					</div>
					<div class="controller vux-1px-b" @click="detailShow = false" v-show="detailShow === true">
						<span>收起货源详情</span>
						<x-icon type="ios-arrow-up" size="20"></x-icon>
					</div>
					<div class="controller vux-1px-b" @click="detailShow = true" v-show="detailShow === false">
						<span>货源详情</span>
						<x-icon type="ios-arrow-down" size="20"></x-icon>
					</div>
					<div class="detail" v-show="detailShow">
						<div class="section vux-1px-b">
							<p>
								<span class="name">装车时间</span>
								<span class="value">{{dispatch_detail.load_time}}</span>
							</p>
							<p>
								<span class="name">货物名称</span>
								<span class="value">{{dispatch_detail.goods_name}}</span>
							</p>
							<p>
								<span class="name">货物数量</span>
								<span class="value">{{dispatch_detail.goods_num}}</span>
							</p>
						</div>
						<div class="section vux-1px-b">
							<p>
								<span class="name">车型要求</span>
								<span class="value cart-type">
									{{dispatch_detail.cart_type}}
								</span>
							</p>
							<p>
								<span class="name">车长要求</span>
								<span class="value">{{dispatch_detail.cart_length}}米</span>
							</p>
						</div>
						<div class="section vux-1px-b">
							<p>
								<span class="name">货源评价</span>
								<span class="value">{{dispatch_detail.goods_description}}</span>
							</p>
						</div>
					</div>
					<div class="section footer">
						<p>
							<span class="name">
								共推送
								<span class="red">{{dispatch_detail.driver_num}}</span> 位司机，已有
							<span class="red">{{dispatch_detail.offer_num}}</span> 位报价
							</span>
							<span class="value vux-1px-l" @click="cancel">取消发货</span>
						</p>
					</div>
				</div>
				<div class="list">
					<div class="tab vux-1px-b">
						<div class="item" @click="offerSort">
							交易次数
							<img src="../../../static/image/paixu-gao@2x.png" v-show="offer_sort === '1'" />
							<img src="../../../static/image/paixu-di@2x.png" v-show="offer_sort === '0'" />
						</div>|
						<div class="item" @click="priceSort">
							价格
							<img src="../../../static/image/paixu-gao@2x.png" v-show="price_sort === '1'" />
							<img src="../../../static/image/paixu-di@2x.png" v-show="price_sort === '0'" />
						</div>
					</div>
					<div class="content">
						<div class="item vux-1px-b" v-for="(item, index) in listData" :key="index">
							<div class="first">
								<p>
									<span>{{item.car_badge_no}}，{{item.driver_name}}，{{item.mobile_no}}</span>
									<img src="../../../static/image/1@2x.png" v-if="index === 0" />
									<img src="../../../static/image/2@2x.png" v-if="index === 1" />
									<img src="../../../static/image/3@2x.png" v-if="index === 2" />
								</p>
							</div>
							<div class="second">
								<div class="text">
									<p>交易次数：{{item.offer_number}}次</p>
									<p>车辆信息：{{item.cart_type}}，{{item.cart_length}}米</p>
								</div>
								<div class="score">
									{{item.total_price}}元
								</div>
							</div>
							<div class="third">
								当前位置：{{item.cur_position}}
								<span class="btn" @click="transaction(item.offer_id)">
									确认成交
								</span>
							</div>
						</div>
						<load-more :show-loading="false" tip="暂无报价" background-color="#f1eff2" v-show="listData.length === 0"></load-more>
					</div>
				</div>
			</pull-to>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import PullTo from '@/components/base/PullTo/vue-pull-to'
	import { LoadMore } from 'vux'
	export default {
		data() {
			return {
				detailShow: false,
				dispatch_id: this.$route.params.id,
				dispatch_detail: {},
				current_page: 1,
				search_param: '',
				token: sessionStorage.getItem('token'),
				listData: [],
				total_pages: 0,
				offer_sort: '-1',
				price_sort: '-1'
			}
		},
		components: {
			'v-header': Header,
			PullTo,
			LoadMore
		},
		created() {
			this.$http.get('dispatch/html/get/v1/dispatch_detail/' + this.dispatch_id + '?token=' + this.token)
				.then((res) => {
					//					console.log(res)
					this.dispatch_detail = res.data.data.dispatch_detail
				})
			this.initList()
		},
		methods: {
			initList() {
				this.listData = []
				this.total_pages = 0
				this.current_page = 1
				this.$http.post('dispatch/html/post/v1/dispatch_offer/' + this.dispatch_id + '?token=' + this.token, {
						data: {
							current_page: this.current_page.toString(),
							offer_sort: this.offer_sort,
							price_sort: this.price_sort
						}
					})
					.then((res) => {
						console.log(res)
						this.listData = res.data.data.offer_list
						this.total_pages = res.data.data.total_pages
						this.current_page = this.current_page + 1
					})
			},
			offerSort() {
				if(this.offer_sort === '0') {
					this.offer_sort = '1'
				} else if(this.offer_sort === '1') {
					this.offer_sort = '0'
				} else {
					this.offer_sort = '1'
				}
				this.price_sort = '-1'
				this.initList()
			},
			priceSort() {
				if(this.price_sort === '0') {
					this.price_sort = '1'
				} else if(this.price_sort === '1') {
					this.price_sort = '0'
				} else {
					this.price_sort = '1'
				}
				this.offer_sort = '-1'
				this.initList()
			},
			getData(loaded) {
				if(this.current_page > this.total_pages) {
					loaded('fail')
					return false
				}
				this.$http.post('dispatch/html/post/v1/dispatch_offer/' + this.dispatch_id + '?token=' + this.token, {
						data: {
							current_page: this.current_page.toString(),
							offer_sort: this.offer_sort,
							price_sort: this.price_sort
						}
					})
					.then((res) => {
						console.log(res)
						this.listData = this.listData.concat(res.data.data.offer_list)
						this.current_page = this.current_page + 1
					})
			},
			//取消发货
			cancel() {
				let $this = this
				this.$vux.confirm.show({
					title: '提示',
					content: '是否确认取消发货',
					onConfirm() {
						$this.$vux.loading.show({
							text: '正在取消'
						})
						$this.$http.post('dispatch/html/put/v1/offer_cancel/' + $this.dispatch_id + '?token=' + this.token)
							.then((res) => {
								$this.$vux.loading.hide()
								console.log(res)
								if(res.data.result.reCode === 0) {
									$this.$vux.toast.show({
										text: '取消成功'
									})
									setTimeout(() => {
										$this.$router.push('/DiaoDu')
									}, 500)
								} else {
									$this.$vux.toast.text(res.data.result.reInfo)
								}
							})
					}
				})
			},
			//确认成交
			transaction(id) {
				this.$http.post('dispatch/html/put/v1/offer_deal/' + id + '?token=' + this.token)
					.then((res) => {
						console.log(res)
						if(res.data.result.reCode === 0) {
							this.vux.toast.text('确认成交成功')
						} else {
							this.$vux.toast.text(res.data.result.reInfo)
						}
					})
			}
		}
	}
</script>

<style lang="less">
	.offer-detail-box {
		padding-top: 45px;
		.wapper {
			position: fixed;
			width: 100%;
			left: 0;
			top: 45px;
			bottom: 0;
		}
		.top {
			margin: 10px;
			background-color: white;
			.title {
				padding: 15px;
				.row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.text {
						font-size: 14px;
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
			.controller {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 30px;
				font-size: 14px;
				color: #646464;
			}
			.detail {
				.section {
					padding: 10px;
					p {
						display: flex;
						justify-content: space-between;
						align-items: center;
						min-height: 28px;
						.name {
							font-size: 16px;
							color: #646464;
						}
						.value {
							font-size: 14px;
							width: 0px;
							flex: 1;
							display: flex;
							flex-direction: column;
							align-items: flex-end;
							p {
								min-height: 14px;
							}
						}
						.cart-type {
							margin-left: 50px;
						}
					}
				}
			}
			.footer {
				padding: 4px 15px;
				p {
					display: flex;
					justify-content: space-between;
					.name {
						font-size: 14px;
						.red {
							color: red;
						}
					}
					.value {
						color: #646464;
						font-size: 14px;
						padding: 0 10px 0 20px;
					}
				}
			}
		}
		.list {
			margin: 10px;
			/*background-color: white;*/
			.tab {
				width: 100%;
				height: 40px;
				display: flex;
				color: #999999;
				line-height: 40px;
				background-color: white;
				.item {
					width: 0;
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 14px;
					color: #646464;
					img {
						width: 10px;
						height: 16px;
						margin-left: 8px;
					}
				}
			}
			.content {
				/*padding: 0 10px;*/
				font-size: 14px;
				.item {
					margin-bottom: 10px;
					background-color: white;
					padding: 10px;
					.first {
						display: flex;
						p {
							width: 0;
							flex: 1;
							display: flex;
							justify-content: space-between;
							img {
								width: 26px;
								height: 34px;
							}
						}
					}
					.second {
						display: flex;
						align-items: center;
						.text {
							width: 0;
							flex: 1;
							color: #646464;
						}
						.score {
							font-size: 18px;
							color: red;
						}
					}
					.third {
						color: #646464;
						display: flex;
						justify-content: space-between;
						.btn {
							display: block;
							width: 80px;
							height: 30px;
							background-color: #ffc422;
							color: white;
							text-align: center;
							line-height: 30px;
							border-radius: 6px;
							font-size: 14px;
						}
					}
				}
			}
		}
	}
</style>