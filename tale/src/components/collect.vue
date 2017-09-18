<template>
	<div class="collect-box">
		<goback title='我的收藏'></goback>
		<v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
			<ul>
				<li v-for="news in newslist">
					<router-link :to='"/newsdetail/"+news.newsInfoId'>
						<img :src="news.newsInfoVo.imgUrl" />
						<div>
							<h2>{{news.newsInfoVo.title}}</h2>
							<p>收藏于 {{news.createTime}}</p>
						</div>
					</router-link>
				</li>
			</ul>
		</v-scroll>
	</div>
</template>
<script>
	import goback from '../components/goback'
	import Scroll from '../components/scroll'
	export default {
		components: {
			goback,
			'v-scroll': Scroll
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				newslist: [],
				nextPage: 1,
				rows: 10,
				totalPage: 0
			}
		},
		created() {
			this.loadData(true)
		},
		methods: {
			loadData: function(empty, done) {
				let that = this
				that.$http.get(this.lchttp + '/app/collection/list?page=' + that.nextPage + '&rows=' + that.rows, {
					headers: {
						token: localStorage.getItem('token')
					}
				}).then(
					(res) => {
						let pages = res.data.obj
						that.totalPage = pages.totalPage
						that.nextPage = pages.page + 1
						if(empty) {
							that.newslist = []
						}
						that.newslist.push.apply(that.newslist, pages.result)
						if(done) {
							done()
						}
					}
				)
			},
			onRefresh(done) {
				this.nextPage = 1
				this.loadData(true, done)
			},
			onInfinite(done) {
				if(this.nextPage <= this.totalPage) {
					this.loadData(false, done)
				} else {
					done()
				}
			}
		}
	}
</script>
<style lang="less">
	.collect-box {
		height: auto;
		overflow: hidden;
		background: #F3F3F3;
		min-height: 100vh;
		padding-top: 46px;
		box-sizing: border-box;
		ul {
			height: auto;
			overflow: hidden;
			li {
				height: 70px;
				width: 100%;
				background: #fff;
				margin-top: 8px;
				border-top: 0.5px solid #e0e0e0;
				border-bottom: 0.5px solid #e0e0e0;
				a {
					padding: 10px 10px;
					box-sizing: border-box;
					display: flex;
					img {
						width: 50px;
						height: 50px;
						margin-right: 12px;
					}
					div {
						flex: 1;
						overflow: hidden;
						h2 {
							color: #333333;
							line-height: 25px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						p {
							color: #888888;
							line-height: 25px;
							font-size: 14px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}
</style>