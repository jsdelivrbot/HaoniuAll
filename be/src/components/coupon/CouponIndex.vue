<template>
	<div class="coupon-index-box">
		<v-header title="折扣券" map="我的券包" @edit="goMyCoupon"></v-header>
		<tab :data="tabList" type_id="1" @getData="getData"></tab>
		<div ref="wrapper" class="wrapper">
			<coupon-list :list="listData" :tip="tip" :loadingShow="loadingShow"></coupon-list>
		</div>
		<index-footer></index-footer>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import Tab from '@/common/vue/Tab'
	import BScroll from 'better-scroll'
	import CouponList from '@/common/vue/CouponList'
	import IndexFooter from '@/common/vue/IndexFooter'
	export default {
		components: {
			'v-header': Header,
			Tab,
			CouponList,
			IndexFooter
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
					params: {
						seachdata: {
							'type_id': 1,
							'city': sessionStorage.getItem('city'),
							'option_data': this.searchData,
							'limit': this.count + ',12'
						}
					}
				})
				.then((res) => {
					if(res.data.datastatus === 1) {
						console.log('优惠券列表')
						console.log(res)
						this.listData.push.apply(this.listData, res.data.data)
						this.count = this.count + 12
						this.$nextTick(() => {
							this._initScroll()
							this.loadingShow = false
							this.tip = '上拉加载更多'
							//									this.scroll.scrollTo(0, this.posY)
							//									this.falg = true
						})
//						console.log(this.posY)
					} else {
						this.tip = '没有数据了'
						this.loadingShow = false
						//								this.falg = true
					}
				})
			//			this.getListData()
			//选项结果
			this.$http.get('getData/index.php?m=home&c=Form&a=optionList', {
					params: {
						seachdata: {
							'type_id': 1,
							'city': sessionStorage.getItem('city')
						}
					}
				})
				.then((res) => {
					console.log('选项结果')
					console.log(res)
					this.tabList = res.data.data
				})
		},
		data() {
			return {
				listData: [],
				tabList: [],
				searchData: [],
				count: 0,
				tip: '加载中',
				loadingShow: true
//				posY: 0,
//				falg: true
			}
		},
		methods: {
			goMyCoupon() {
				this.$router.push('/coupon/myCoupon')
			},
			getData(res, searchData) {
				console.log('选项结果')
				console.log(res, searchData)
				this.searchData = searchData
//				this.posY = 0
				this.tip = '上拉加载更多'
				let $this = this
				this.count = 12
				if(res.data.datastatus === 0) {
					this.listData = []
					setTimeout(() => {
						$this.scroll.refresh()
						this.tip = '暂无此类信息'
					}, 20)
					return
				}
				this.listData = res.data.data
				setTimeout(() => {
					$this.scroll.refresh()
				}, 20)
			},
			getListData() {
//				alert(1)
				//				if(this.falg) {
				//					this.falg = false
				this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
						params: {
							seachdata: {
								'type_id': 1,
								'city': sessionStorage.getItem('city'),
								'option_data': this.searchData,
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('优惠券列表')
							console.log(res)
							this.listData.push.apply(this.listData, res.data.data)
							this.loadingShow = false
							this.count = this.count + 12
							this.$nextTick(() => {
								this.scroll.refresh()
//								this.scroll.scrollTo(0, this.posY)
//								this.falg = true
							})
//							console.log(this.posY)
						} else {
							this.tip = '没有数据了'
							this.loadingShow = false
							//								this.falg = true
						}
					})
				//				}
			},
			_initScroll() {
				if(!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: 1,
					click: true
				})
				this.scroll.on('touchend', (pos) => {
					console.log(pos)
					if(pos.y <= this.scroll.maxScrollY + 20) {
//						this.posY = pos.y
						this.tip = '上拉加载更多'
						this.loadingShow = true
						this.getListData()
						console.log(pos)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.coupon-index-box {
		padding-top: 88px;
		padding-bottom: 62px;
		.header-box {
			.map {
				padding-right: 16px;
			}
		}
		.wrapper {
			position: fixed;
			top: 88px;
			bottom: 49px;
			width: 100%;
			overflow: hidden;
		}
	}
</style>