<template>
	<div class="usercenter-my-activity">
		<v-header title="我的活动"></v-header>
		<div ref="wrapper" class="wrapper">
			<div class="list">
				<router-link :to="'/usercenter/myActivityDetail/' + item.info_id" tag="div" class="item" v-for="(item, index) in listData" :key="index">
					<div class="content vux-1px-b">
						<div class="img">
							<img :src="httpUrl + item.info_detail.img" />
						</div>
						<div class="text">
							<p class="text-title">
								{{item.info_detail.title}}
							</p>
							<div class="text-detail">
								<p class="time">活动时间：{{item.begin_time | formDate}}</p>
								<p class="address">地点：{{item.info_detail.address}}</p>
							</div>
						</div>
					</div>
					<div class="total">
						<p>
							<!--{{item.remark}}-->
							<span v-text="josn2Obj(item.remark).adult.title"></span> 
							<span class="count" v-text="josn2Obj(item.remark).adult.num"></span>
							<span class="price" v-text="josn2Obj(item.remark).adult.price"></span>
						</p>
						<p>
							<!--{{item.remark}}-->
							<span v-text="josn2Obj(item.remark).children.title"></span> 
							<span class="count" v-text="josn2Obj(item.remark).children.num"></span>
							<span class="price" v-text="josn2Obj(item.remark).children.price"></span>
						</p>
						<p>
							<!--{{item.remark}}-->
							<span v-text="josn2Obj(item.remark).free.title"></span> 
							<span class="count" v-text="josn2Obj(item.remark).free.num"></span>
							<span class="price" v-text="josn2Obj(item.remark).free.price"></span>
						</p>
					</div>
				</router-link>
				<!--<router-link to="/usercenter/myActivityDetail/15" tag="div" class="item">
					<div class="content vux-1px-b">
						<div class="img">
							<img src="../../../static/usercenter/usercenter1.png" />
						</div>
						<div class="text">
							<p class="text-title">
								香港迪士尼温馨亲子游
							</p>
							<div class="text-detail">
								<p class="time">活动时间：2017-6-1 08:00</p>
								<p class="address">地点：香港大屿山竹篙湾</p>
							</div>
						</div>
					</div>
					<div class="total">
						<p>
							<span>免费票</span>
							<span class="count">×2</span>
							<span class="price">￥0.00</span>
						</p>
					</div>
				</router-link>-->
				<load-more :show-loading="loadingShow" :tip="tip" background-color="#f0f0f0"></load-more>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import BScroll from 'better-scroll'
	import { LoadMore } from 'vux'
	export default {
		components: {
			'v-header': Header,
			LoadMore
		},
		data() {
			return {
				listData: [],
				httpUrl: localStorage.getItem('httpUrl'),
				count: 0,
				tip: '上拉加载更多',
				loadingShow: false
			}
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=infoJoinList', {
					params: {
						seachdata: {
							'limit': this.count + ',12',
							'action_type': 6
						}
					}
				})
				.then((res) => {
					console.log(res)
					if(res.data.datastatus === 1) {
						console.log('我的活动列表')
						this.listData = res.data.data
						this.loadingShow = false
						this.count = this.count + 12
						this.$nextTick(() => {
							this._initScroll()
						})
					} else {
						this.tip = '暂无优惠券'
						this.loadingShow = false
					}
				})
		},
		methods: {
			josn2Obj(value) {
				return JSON.parse(value)
			},
			_initScroll() {
				if(!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: 2,
					click: true
				})
				this.scroll.on('touchend', (pos) => {
					//					console.log(pos)
					if(pos.y <= this.scroll.maxScrollY + 20) {
						this.tip = '上拉加载更多'
						this.loadingShow = true
						this.getListData()
						console.log(pos)
					}
				})
			},
			getListData() {
				this.$http.get('getData/index.php?m=home&c=Form&a=infoJoinList', {
						params: {
							seachdata: {
								'limit': this.count + ',12',
								'action_type': 6
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('我的免单列表')
							console.log(res)
							this.listData.push.apply(this.listData, res.data.data)
							this.loadingShow = false
							this.count = this.count + 12
							this.$nextTick(() => {
								this.scroll.refresh()
							})
						} else {
							this.tip = '没有数据了'
							this.loadingShow = false
						}
					})
			}
		}
	}
</script>

<style lang="less">
	.usercenter-my-activity {
		padding-top: 44px;
		.wrapper {
			position: fixed;
			top: 44px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		.list {
			.item {
				margin-top: 10px;
				background-color: white;
				.content {
					padding: 10px 12px;
					display: flex;
					.img {
						flex: 0 0 120px;
						width: 120px;
						img {
							width: 100%;
						}
					}
					.text {
						width: 0;
						flex: 1;
						margin-left: 16px;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.text-title {
							font-size: 14px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.text-detail {
							font-size: 12px;
							color: #707070;
						}
					}
				}
				.total {
					padding: 10px 12px;
					p {
						display: flex;
						font-size: 12px;
						line-height: 22px;
						justify-content: space-between;
						.count {
							margin-left: 40%;
						}
						.price {
							flex: 0 0 80px;
							text-align: right;
						}
					}
				}
			}
		}
	}
</style>