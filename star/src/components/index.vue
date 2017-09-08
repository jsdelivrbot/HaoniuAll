<template>
	<div class="home-box">
		<div class="search-top-bar">
			<img src="../../static/img/smlogo.png" />
			<span @click="search">
				<!--<img src="../../static/img/iconsearch.png"/>-->
				搜索科目、机构、课程
			</span>
			<!--<input type="search" name="" id="" value="" @click="search" placeholder="搜索" />-->
		</div>

		<div>
			<swiper :list="list" :show-desc-mask='!isloop' :auto='isloop'  :loop='isloop' :aspect-ratio="37/100" dots-position="center"></swiper>
		</div>
		<div class="sort  vux-1px-b">
			<div class="title  vux-1px-b">
				<div class="left">
					<img src="../../static/img/sort.png" />
					<span>科目分类</span>
				</div>
				<router-link to='/searchlist/cat=&target=k' class="right">
					<!--<div>-->
					<span>地图</span>
					<img src="../../static/img/righticon.png" />
					<!--</div>-->
				</router-link>
			</div>

			<ul class="sort-list">
				<li>
					<router-link to='/searchlist/cat=教辅&target=k'>
						<img src="../../static/img/sortlist1.png" />
						<span>教辅</span>
					</router-link>
				</li>
				<li>
					<router-link to='/searchlist/cat=综合素质&target=k'>
						<img src="../../static/img/sortlist2.png" />
						<span>综合素质</span>
					</router-link>
				</li>
				<li>
					<router-link to='/searchlist/cat=运动&target=k'>
						<img src="../../static/img/sortlist3.png" />
						<span>运动</span>
					</router-link>
				</li>
				<li>
					<router-link to='/searchlist/cat=益智&target=k'>
						<img src="../../static/img/sortlist4.png" />
						<span>益智</span>
					</router-link>
				</li>
				<li>
					<router-link to='/searchlist/cat=艺术&target=k'>
						<img src="../../static/img/sortlist5.png" />
						<span>艺术</span>
					</router-link>
				</li>
			</ul>
		</div>

		<div class="recommend">
			<div class="title  vux-1px-b">
				<div class="left">
					<img src="../../static/img/tuijian.png" />
					<span>课程推荐</span>
				</div>

				<router-link to='/tuijianlist' class="right">
					<!--<div>-->
					<span>全部</span>
					<img src="../../static/img/righticon.png" />
					<!--<img src="../../static/img/iconright.png" />-->
					<!--</div>-->
				</router-link>

			</div>

			<scroller lock-y :scrollbar-x=false>
				<ul class="recommend-list">
					<li v-for='item in tj'>
						<router-link :to='"/coursedetail/"+item.target'>
							<img :src="item.postUrl" />
							<span>{{item.name.substring(0,6)}}</span>
						</router-link>
					</li>
				</ul>
			</scroller>
		</div>

		<div class="subject-text">
			<div class="title  vux-1px-b">
				<div class="left">
					<img src="../../static/img/news.png" />
					<span>专题文章</span>
				</div>
				<router-link to='/newslist' class="right">
					<!--<div>-->
					<span>全部</span>
					<img src="../../static/img/righticon.png" />
					<!--<img src="../../static/img/iconright.png" />-->
					<!--</div>-->
				</router-link>
			</div>

			<ul class="subject-text-list">
				<li v-for='item in newslist' class="vux-1px-b">
					<router-link :to='"/newsdetail/"+item.id'>
						<img :src="item.thumb" />
						<div class="info">
							<h2>{{item.title}}</h2>
							<p>{{item.intro}}</p>
							<span class="time">
								{{item.updateTime}}
							</span>
						</div>
					</router-link>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import { Search, Swiper, SwiperItem, Scroller } from 'vux'
	export default {
		components: {
			Search,
			Swiper,
			SwiperItem,
			Scroller
		},
		data() {
			return {
				isloop: true,
				localhttp: localStorage.getItem('localhttp'),
				list: [],
				tj: [],
				newslist: []
			}
		},
		created() {
			this.$http.get('/adv').then(
				(res) => {
					if(res.data.result === 0) {
						for(var i = 0; i < res.data.obj.length; i++) {
							let arr = {}
							if(res.data.obj[i].type === 'k') {
								arr.url = '/coursedetail/' + res.data.obj[i].target
							} else {
								arr.url = '/jigoudetail/' + res.data.obj[i].target
							}
							arr.img = res.data.obj[i].postUrl
							this.list.push(arr)
						}
					}
				}
			)
			this.$http.post(
				'/business/course/recommend'
			).then(
				(res) => {
					if(res.data.result === 0) {
						this.tj = res.data.obj
						console.log(res.data)
					}
				}
			)

			this.$http.get('/recommendArticles?page=1&rows=1000').then(
				(res) => {
					this.newslist = res.data.obj.items
					console.log(res.data)
				}
			)
		},
		methods: {
			search() {
				this.$router.push('/vaguesearch')
			}
		}
	}
</script>

<style lang="less">
	.home-box {
		padding-bottom: 60px;
		box-sizing: border-box;
		.subject-text {
			margin-top: 10px;
			background: #fff;
			height: auto;
			overflow: hidden;
			li {
				/*float: left;*/
				list-style: none;
				height: auto;
				overflow: hidden;
				a {
					padding: 15px;
					box-sizing: border-box;
					display: flex;
					overflow: hidden;
				}
				img {
					width: 130px;
					height: 80px;
					display: block;
					margin-right: 10px;
					border-radius: 4px;
				}
				.info {
					flex: 1;
					overflow: hidden;
					h2 {
						font-size: 15px;
						line-height: 20px;
						height: 20px;
						color: #333;
						font-weight: normal;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						/*font-weight: 600;*/
					}
					p {
						display: block;
						color: #666;
						line-height: 18px;
						font-size: 13px;
						height: 36px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						/*overflow: hidden;
						white-space: nowrap;
						text-overflow:  ellipsis;*/
					}
					.time {
						display: block;
						text-align: right;
						color: #999;
						font-size: 13px;
					}
				}
			}
		}
		.recommend {
			margin-top: 10px;
			height: auto;
			background: #fff;
			.recommend-list {
				height: 140px;
				padding: 15px;
				width: 530px;
				box-sizing: border-box;
				overflow: hidden;
				li {
					display: inline-block;
					margin-right: 10px;
					a {
						display: block;
						img {
							width: 90px;
							height: 90px;
							display: block;
							margin-bottom: 8px;
							border-radius: 4px;
						}
						span {
							display: block;
							font-size: 12px;
							height: 20px;
							color: #666;
							text-align: center;
						}
					}
				}
			}
		}
		.search-top-bar {
			padding: 8px 15px;
			box-sizing: border-box;
			background: #efeff4;
			display: flex;
			img {
				width: 29px;
				height: 29px;
				margin-right: 11px;
				display: block;
			}
			span {
				vertical-align: text-top;
				flex: 1;
				height: 28px;
				line-height: 29px;
				border-radius: 3px;
				border: none;
				text-align: left;
				background: #ffffff;
				outline: none;
				font-size: 13px;
				color: #B2B2B2;
				background: url(../../static/img/iconsearch.png) no-repeat #fff;
				background-size: 15px;
				background-position: 4%;
				text-indent: 32px;
			}
		}
		.title {
			height: 45px;
			display: flex;
			padding: 14px 15px;
			box-sizing: border-box;
			div {
				flex: 1;
			}
			.left {
				display: flex;
				img {
					display: block;
					width: 17px;
					margin-right: 5px;
				}
				span {
					line-height: 17px;
					font-size: 15px;
					height: 17px;
					color: #333;
				}
			}
			.right {
				text-align: right;
				display: flex;
				span {
					display: inline-block;
					height: 17px;
					font-size: 14px;
					color: #999999;
					line-height: 20px;
					/*background: #FF1818;*/
					flex: 1;
					margin-right: 5px;
				}
				img {
					width: 10px;
				}
			}
		}
		.sort {
			height: auto;
			background: #fff;
			.sort-list {
				display: flex;
				padding: 15px 8px;
				height: 109px;
				box-sizing: border-box;
				li {
					list-style: none;
					flex: 1;
					box-sizing: border-box;
					a {
						display: block;
					}
					img {
						margin: auto;
						display: block;
						width: 100%;
						max-width: 55px;
						margin-bottom: 7px;
					}
					span {
						display: block;
						text-align: center;
						font-size: 14px;
						line-height: 25px;
						color: #333;
					}
				}
			}
		}
	}
</style>