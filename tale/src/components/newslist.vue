<template>
	<div class="newslist">
		<goback :title='$route.params.title' isShare='isSearch' :id='newsId'></goback>
		<v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
			<ul>
				<li v-for="newsinfo in newslist">
					<router-link :to='"/newsdetail/"+newsinfo.id'>
						<span class="img" >
							<img :src="newsinfo.imgUrl" />
						</span>
						<div>
							<h2>{{newsinfo.title}}</h2>
							<p>{{newsinfo.content}}</p>
							<span class="info-footer read-count">阅读数：{{newsinfo.readCount}}</span>
							<span class="info-footer up-vote-count">
								<img src="../../static/img/38.png" />
								{{newsinfo.upVoteCount}}
							</span>
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
				totalPage: 0,
				newsId: this.$route.params.id
			}
		},
		created() {
			this.loadData(true)
		},
		methods: {
			loadData: function(empty, done) {
				let that = this
				that.$http.post(this.lchttp + '/app/news/infoList?page=' + that.nextPage + '&rows=' + that.rows + '&newsId=' + that.$route.params.id).then(
					(res) => {
						let pages = res.data.obj
						that.totalPage = pages.totalPage
						that.nextPage = pages.page + 1
						if(empty) {
							that.newslist = []
						}
						that.newslist.push.apply(that.newslist, pages.result)
						console.log(that.newslist)
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
	body{
		background-color: rgb(243,243,243);
	}
	.newslist {
		height: auto;
		overflow: hidden;
		background: rgb(220,220,220);
		ul {
			height: auto;
			overflow: hidden;
			li {
				display: flex;
				width: 100%;
				height: 146px;
				background: #fff;
				padding: 10px 15px;
				/*border-top: 0.5px solid #e0e0e0;
				border-bottom: 0.5px solid #e0e0e0;*/
				box-sizing: border-box;
				margin-bottom: 10px;
				overflow: hidden;
				a {
					display: flex;
					overflow: hidden;
				}
				img {
					width: 105px;
					height: 105px;
					margin-right: 10px;
				}
				div {
					flex: 1;
					overflow: hidden;
					h2 {
						height: 30px;
						line-height: 30px;
						color: #333;
						font-size: 18px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					p {
						font-size: 16px;
						height: 75px;
						line-height: 25px;
						color: #696969;
						overflow: hidden;
					}
				}
			}
		}
		.info-footer{
			font-size: 14px;
		}
		.up-vote-count{
			float: right;
			img{
				height: 16px;
				width: 16px;
				float: left;
				margin-top: 3px;
			}
		}
	}
</style>