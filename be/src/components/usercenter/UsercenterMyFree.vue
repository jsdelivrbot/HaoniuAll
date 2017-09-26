<template>
	<div class="usercenter-my-free">
		<v-header title="我的免单"></v-header>
		<div ref="wrapper" class="wrapper">
			<div class="list">
				<!--<router-link :to="'/free/detail/' + item.id" tag="div" class="item vux-1px-b" v-for="(item, index) in list" :key="index">
					<div class="img">
						<img :src="httpUrl + item.img" />
					</div>
					<div class="content">
						<div class="title">
							<p class="text">{{item.title}}</p>
							<p class="btn">抢</p>
						</div>
						<div class="detail">
							<p class="address">{{item.address}}</p>
							<p class="count">{{item.virtual_part_num}}人关注</p>
						</div>
					</div>
				</router-link>-->
				<router-link :to="'/free/detail/' + item.info_id" tag="div" class="item vux-1px-b"
					v-for="(item, index) in listData" :key="index">
					<div class="img">
						<img :src="httpUrl + item.info_detail.img" />
					</div>
					<div class="content">
						<div class="title">
							<p class="text">{{item.info_detail.title}}</p>
							<p class="btn">抢</p>
						</div>
						<div class="detail">
							<p class="address">{{item.info_detail.address}}</p>
							<p class="count">{{item.info_detail.virtual_part_num}}人关注</p>
						</div>
					</div>
				</router-link>
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
		data() {
			return {
				listData: [],
				httpUrl: localStorage.getItem('httpUrl'),
				count: 0,
				tip: '上拉加载更多',
				loadingShow: false
			}
		},
		components: {
			'v-header': Header,
			LoadMore
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=infoJoinList', {
					params: {
						seachdata: {
							'limit': this.count + ',12',
							'action_type': 5
						}
					}
				})
				.then((res) => {
					if(res.data.datastatus === 1) {
						console.log('我的免单列表')
						console.log(res)
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
								'action_type': 5
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
	.usercenter-my-free {
		padding-top: 44px;
		.wrapper {
			position: fixed;
			top: 54px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		.list {
			.item {
				height: 104px;
				background-color: white;
				display: flex;
				align-items: center;
				padding: 0 12px;
				.img {
					flex: 0 0 120px;
					width: 120px;
					height: 94px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.content {
					flex: 1;
					width: 0;
					.title {
						display: flex;
						align-items: center;
						margin-left: 12px;
						justify-content: space-between;
						.text {
							flex: 0 0 125px;
							width: 125px;
							font-size: 14px;
							width: 200px;
							word-break: break-all;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							overflow: hidden;
						}
						.btn {
							font-size: 12px;
							color: white;
							width: 38px;
							height: 22px;
							line-height: 22px;
							text-align: center;
							background-color: #e60012;
						}
					}
					.detail {
						font-size: 12px;
						color: #707070;
						display: flex;
						justify-content: space-between;
						margin-left: 12px;
						margin-top: 12px;
						.address {
							flex: 1;
							width: 0;
							margin-right: 12px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
	}
</style>