<template>
	<div class="ranking-box">
		<!--<div class="top-out-bar">
			<img src="../../static/img/left.svg" />
			<span>排行榜</span>
		</div>-->

		<goback title='排行榜' isShare='isLogin'></goback>
		<tab custom-bar-width="40px">
			<tab-item selected @on-item-click='cut("1")'>周榜</tab-item>
			<tab-item @on-item-click='cut("2")'>月榜</tab-item>
			<tab-item @on-item-click='cut("3")'>年榜</tab-item>
		</tab>

		<div class="router-box">
			<rankinglist :val='navlist'></rankinglist>
		</div>

		<div class="more">
			<p @click="addNavList">显示更多</p>
		</div>

	</div>
</template>
<script>
	import goback from '../components/goback'
	import rankinglist from '../components/rankinglist'
	import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
	export default {
		components: {
			Tab,
			TabItem,
			Sticky,
			Divider,
			XButton,
			Swiper,
			SwiperItem,
			rankinglist,
			goback
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				navlist: [],
				toptype: 1,
				page: 1
			}
		},
		mounted() {
			this.cut(1)
		},
		methods: {
			cut(type) {
				this.$store.commit('updateLoadingStatus', {
					isLoading: true
				})
				this.$http.get(this.lchttp + '/app/rankList/list', {
					params: {
						type: this.toptype,
						page: '1',
						rows: '20'
					}
				}).then(
					(res) => {
						this.page = 1
						this.navlist = res.data.obj.result
						this.toptype = type
						console.log(this.navlist)
						this.$store.commit('updateLoadingStatus', {
							isLoading: false
						})
					}
				)
			},
			addNavList() {
				this.$http.get(this.lchttp + '/app/rankList/list', {
					params: {
						type: this.toptype,
						page: this.page++,
						rows: '20'
					}
				}).then(
					(res) => {
						this.navlist.push.apply(this.navlist, res.data.obj.result)
						console.log(this.navlist)
					}
				)
			}
		}
		//				afterRouteEnter(to, from, next) {
		//					this.$store.commit('updateLoadingStatus', {
		//						isLoading: false
		//					})
		//					next()
		//				}
	}
</script>
<style lang="less">
	.ranking-box {
		padding-top: 46px;
		padding-bottom: 100px;
		box-sizing: border-box;
		.more {
			text-align: center;
			p {
				padding: 6px 0;
				background-color: #BCBCBC;
				color: white;
				width: 124px;
				height: 20px;
				line-height: 20px;
				margin: 6px auto;
			}
		}
	}
</style>