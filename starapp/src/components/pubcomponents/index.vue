<template>
	<div class="home-box">
		<div class="search-top-bar">
			<span @click="search">
				搜索科目、机构、课程
			</span>
			<router-link tag='div' to='/searchlist/cat=&target=k'>
				<img src="~IMG/ditu@3x.png" />
				<em>地图</em>
			</router-link>
		</div>
		<swiper :options="swiperOption2" ref="mySwiper2" style='margin: 0;' class='indexSwiper'>
			<swiper-slide v-for='(item,index) in list' :key="index" class='swiper-contentBox'>
				<router-link tag='a' v-if='item.type == 0' to='/invitereg' style='list-style: none;'>
					<img :src="item.postUrl" alt="" style="display: block;" />
				</router-link>
				<router-link tag='a' v-if='item.type == 1' to='/invite' style='list-style: none;'>
					<img :src="item.postUrl" alt="" style="display: block;" />
				</router-link>
				<router-link tag='a' v-if='item.type == "k"' :to="'/coursedetail/'+item.target" style='list-style: none;'>
					<img :src="item.postUrl" alt="" style="display: block;" />
				</router-link>
				<router-link tag='a' v-if='item.type == "c"' :to="'/jigoudetail/'+item.target" style='list-style: none;'>
					<img :src="item.postUrl" alt="" style="display: block;" />
				</router-link>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>

		<div class="sort">
			<ul class="sort-list vux-1px-t  vux-1px-b">
				<router-link tag='li' to='/searchlist/dist=3'>
					<div>
						<img src="~IMG/fjsgl.png" />
					</div>
					<span>附近3公里</span>
				</router-link>
				<router-link tag='li' to='/searchlist/cat=281'>
					<div>
						<img src="~IMG/yq.png" />
					</div>
					<span>乐器</span>
				</router-link>
				<router-link tag='li' to='/searchlist/cat=196'>
					<div>
						<img src="~IMG/yd.png" />
					</div>
					<span>运动</span>
				</router-link>
				<router-link tag='li' to='/searchlist/cat=249'>
					<div>
						<img src="~IMG/yz.png" />
					</div>
					<span>益智</span>
				</router-link>
				<router-link tag='li' to='/searchlist/cat=80'>
					<div>
						<img src="~IMG/jf.png" />
					</div>
					<span>艺术</span>
				</router-link>
			</ul>

			<div class="hot-text" v-if='newslist[0]'>
				<router-link to='/newslist'>
					<img src="~IMG/remenwenzhang@3x.png" />
				</router-link>

				<swiper :options="swiperOption3" ref="mySwiper2" style='margin: 0;'>
					<swiper-slide v-for='(item,index) in newslist' :key="index" class='swiper-contentBox'>
						<router-link class='div' tag='a' to='/newslist'>
							{{item.title}} {{item.intro}}
						</router-link>
					</swiper-slide>
				</swiper>
			</div>
		</div>

		<div class="recommend">
			<div class="title" v-once>
				<div class="left">
					<img src="~IMG/hottj.png" />
				</div>
				<router-link to='/tuijianlist' class="right">
					<span>全部</span>
				</router-link>
			</div>

			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide v-for='(item,index) in tj' :key="index" class='swiper-contentBox'>
					<router-link :to='"/coursedetail/"+item.id'>
						<img :src="item.coverUrl" style="width: 100%;" />
						<span>{{item.name.substring(0,6)}}</span>
					</router-link>
				</swiper-slide>
			</swiper>
		</div>

		<div class="course-sort">
			<div class="title">
				<div class="left">
					<img src="~IMG/hotsort.png" />
				</div>
				<router-link to='/coursesort' class="right">
					<span>全部</span>
				</router-link>
			</div>

			<ul>
				<router-link tag='li' :key='index' v-for='(item,index) in courseSort' :to="'/searchlist/cat='+item.someIdString">
					<img :src="item.realUrl" />
					<span>{{item.name}}</span>
				</router-link>
			</ul>
			<div @click='mores = !mores' class="more" v-if='!mores'>
				查看更多
			</div>
			<ul v-if='mores'>
				<router-link tag='li' v-for='(item,index) in courseSortMore' :key='index' :to="'/searchlist/cat='+item.someIdString">
					<img :src="item.realUrl" />
					<span>{{item.name}}</span>
				</router-link>
			</ul>

			<router-link tag='div' v-if='mores' class="more" to='/coursesort'>
				查看更多
			</router-link>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				courseSort: '',
				courseSortMore: '',
				isloop: true,
				list: [],
				tj: [],
				newslist: [],
				mores: false,
				swiperOption2: {
					pagination: '.swiper-pagination',
					autoplayDisableOnInteraction: false,
					autoplay: 4000,
					loop: true,
					centeredSlides: true,
					paginationClickable: true
				},
				swiperOption3: {
					autoplayDisableOnInteraction: false,
					direction: 'vertical',
					slidesPerView: 1,
					autoplay: 3000,
					spaceBetween: 8,
					paginationClickable: true,
					loop: true
				},
				swiperOption: {
					autoplayDisableOnInteraction: false,
					autoplay: 3000,
					effect: 'coverflow',
					initialSlide: 3,
					height: 160,
					loop: true,
					slidesPerView: 2,
					centeredSlides: true,
					spaceBetween: 60,
					coverflow: {
						rotate: 0,
						stretch: 0,
						depth: 40,
						modifier: 10,
						slideShadows: false
					}
				}
			}
		},
		mounted() {
			this.$http.get('/category/classification').then(
				(res) => {
					this.courseSort = res.data.obj
					let id = this.courseSort[this.courseSort.length - 1].id
					this.getmores(id)
				}
			)
			this.$http.post('/business/course/recommend').then(
				(res) => {
					if(res.data.result === 0) {
						this.tj = res.data.obj
					}
				}
			)
			this.$http.get('/adv').then(
				(res) => {
					if(res.data.result === 0) {
						this.list = res.data.obj
					}
				}
			)
			this.$http.get('/business/course/article').then(
				(res) => {
					this.newslist = res.data.obj
				}
			)
		},
		methods: {
			getmores(id) {
				this.$http.get('/category/classification', {
					params: {
						id: id
					}
				}).then(
					(res) => {
						this.courseSortMore = res.data.obj
					}
				)
			},
			search() {
				this.$router.push('/vaguesearch')
			}
		}
	}
</script>

<style lang="less">
	.indexSwiper {
		a {
			display: block;
			img {
				display: block;
			}
		}
	}
	
	.swiper-contentBox {
		height: auto;
		overflow: hidden;
		img {
			display: block;
			width: 100%;
			border-radius: 4px;
		}
		span {
			display: block;
			color: #363636;
			text-align: center;
			font-size: 12px;
			height: 30px;
			line-height: 30px;
		}
	}
	
	.course-sort {
		background: #fff;
		background: url(~IMG/bg_img@3x.png) no-repeat center / 100% 100%;
		height: auto;
		overflow: hidden;
		ul {
			display: flex;
			flex-wrap: wrap;
			padding: 0 10px;
			box-sizing: border-box;
			list-style: none;
			li {
				flex: 1;
				padding: 3px;
				box-sizing: border-box;
				max-width: 33.33333%;
				min-width: 33.33333%;
				img {
					width: 100%;
				}
				span {
					display: block;
					color: #333333;
					font-size: 14px;
					text-align: center;
				}
			}
		}
		.more {
			text-align: center;
			line-height: 40px;
			font-size: 14px;
			color: #999999;
		}
	}
	
	.home-box {
		padding-bottom: 60px;
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
		.subject-text {
			margin-top: 10px;
			background: #fff;
			height: auto;
			overflow: hidden;
			li {
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
			min-height: 180px;
			.swiper-container {
				width: 100%;
				height: 300px;
				margin-top: 2px;
				margin-bottom: 10px;
			}
			.swiper-slide {
				text-align: center;
				font-size: 18px;
				background: #fff;
				display: -webkit-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				-webkit-box-pack: center;
				-ms-flex-pack: center;
				-webkit-justify-content: center;
				justify-content: center;
				-webkit-box-align: center;
				-ms-flex-align: center;
				-webkit-align-items: center;
				align-items: center;
			}
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
			padding: 8px 10px;
			box-sizing: border-box;
			background: #84bef3;
			display: flex;
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
				background: url(~IMG/iconsearch.png) no-repeat #fff;
				background-size: 15px;
				background-position: 4%;
				text-indent: 32px;
				margin-right: 8px;
			}
			div {
				display: flex;
				color: #fff;
				height: 28px;
				img {
					width: 16px;
					height: 16px;
					display: block;
					margin: 6px 3px;
				}
				em {
					font-size: 12px;
					line-height: 28px;
					color: #fff;
					font-style: normal;
				}
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
				/*display: flex;*/
				line-height: 17px;
				font-size: 15px;
				height: 17px;
				font-weight: bold;
				img {
					display: block;
					margin: 1px 0;
					width: auto;
					height: 15px;
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
			.vux-1px-t:after {
				border-color: #f5f5f5;
			}
			.vux-1px-b:after {
				border-color: #F0EFF5;
			}
			.sort-list {
				display: flex;
				padding: 8px 4px;
				height: auto;
				box-sizing: border-box;
				li {
					list-style: none;
					flex: 1;
					box-sizing: border-box;
					div {
						height: 44px;
						position: relative;
						text-align: center;
						img {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							margin: auto;
							max-width: 90%;
							max-height: 44px;
						}
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
			.hot-text {
				width: 100%;
				display: flex;
				padding: 9px 15px;
				box-sizing: border-box;
				height: 52px;
				overflow: hidden;
				position: relative;
				/*.swiper-slide{
					height: auto !important;
				}
				*/
				>.swiper-container {
					width: 100%;
				}
				img {
					position: absolute;
					top: 9px;
					left: 15px;
					width: 34px;
					height: 34px;
				}
				.div {
					flex: 1;
					padding-left: 45px;
					padding-right: 15px;
					box-sizing: border-box;
					color: #666;
					height: 50px;
					height: 34px;
					font-size: 12px;
					line-height: 17px;
					overflow: hidden;
					display: -webkit-box;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
			}
		}
	}
	/**/
</style>