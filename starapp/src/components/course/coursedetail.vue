<template>
	<div class="course-detail">
		<topbar title='课程简介'></topbar>
		<div class="course-info vux-1px-b">
			<img :src="detailInfo.school.thumbnail" @click="show(0)" v-if='detailInfo.school' />
			<div>
				<h2>{{detailInfo.name}}</h2>
				<h1><em style="font-size: 15px; font-style: normal;margin-right: 2px;">¥</em>{{detailInfo.price}}</h1>
				<p>开课时间:{{detailInfo.openDate}}</p>
				<p>上课时间:{{detailInfo.openTime}}</p>
			</div>
		</div>
		<div v-transfer-dom>
			<previewer :list="list" ref="previewer" :options="options"></previewer>
		</div>
		<div class="link" v-if='detailInfo.school'>
			<ul>
				<li class="vux-1px-b">
					<router-link :to='"/maps/"+detailInfo.school.coords' v-if='detailInfo.school'>
						<img src="../../../static/img/address.png" />
						<span v-if="detailInfo.school">
							{{detailInfo.school.address}}
						</span>
						<div class="goto">
							<img src="../../../static/img/righticon.png" />
						</div>
					</router-link>
				</li>
				<li class="vux-1px-b">
					<a :href="'tel:'+detailInfo.school.phoneNumber">
						<img src="../../../static/img/phone.png" />
						<span>
							{{detailInfo.school.phoneNumber}}
						</span>
						<div class="goto">
							<img src="../../../static/img/righticon.png" />
						</div>
					</a>
				</li>
			</ul>
		</div>

		<!--<div class="intro-box">
			<div class="title vux-1px-b">
				优惠活动
			</div>
			<div class="couponlist">
				<p class="p">1.购买可以获得{{detailInfo.douAmount}}转换豆(等值{{detailInfo.douAmount}}人民币)</p>
				<p class="p" v-if='detailInfo.coupon.name'>2.{{detailInfo.coupon.name}}</p>
			</div>
			<p>以上优惠二选一</p>
		</div>-->

		<div class="intro-box" v-if='detailInfo.douAmount>0||detailInfo.couponId>0||detailInfo.discount>0'>
			<div class="title vux-1px-b">
				优惠活动
			</div>
			<div class="couponlist">
				<p class="p">1.购买可以获得{{detailInfo.douAmount}}转换豆(等值{{detailInfo.douAmount}}人民币)</p>
				<p class="p">2.{{detailInfo.discount}}折优惠</p>
				<p class="p" v-if='detailInfo.couponId>0'>3.{{detailInfo.coupon.name}}</p>
			</div>
		</div>

		<div class="intro-box">
			<div class="title vux-1px-b">
				课程内容
			</div>
			<div v-html="detailInfo.intro"></div>
		</div>

		<div class="link" style="margin: 5px 0;">
			<ul>
				<li class="vux-1px-tb">
					<router-link :to='"/jigoudetail/"+detailInfo.companyName'>
						<span>
							{{detailInfo.companyName}}
						</span>
						<div class="goto">
							<img src="../../../static/img/righticon.png" />
						</div>
					</router-link>
				</li>
			</ul>
		</div>

		<div class="intro-box" style="padding-bottom: 0;margin-bottom: 10px;" v-if='pllist.length>0'>
			<div class="title vux-1px-b">
				课程评价
			</div>
			<ul>
				<li class="vux-1px-b" v-for='item in pllist'>
					<div class="top">
						<img :src="item.avatar_url" />
						<div>
							<h2 class="name">{{item.nickname}}</h2>
							<rater id='star' v-model="item.score" slot="value" star="★" active-color="#ff9600" disabled></rater>
						</div>
					</div>
					<p>{{item.content}}</p>
				</li>
			</ul>

			<div class="more" v-if='pltotal>1' @click="getmore()">
				<span>查看全部评价</span>
			</div>

		</div>

		<div class="static-footer vux-1px-t">
			<ul>
				<li v-if='!detailInfo.watched' @click="nocollect()">
					已收藏
				</li>
				<li v-if='detailInfo.watched' @click="collect()">
					加入收藏
				</li>
				<li>
					<router-link :to='"/orderaffirm/"+urls' v-if='token && detailInfo.priced'>
						我要报名
					</router-link>
					<a href="javascript:;" @click="nologin()" v-if='!token'>
						我要报名
					</a>

					<a href="javascript:;" v-if='token && !detailInfo.priced' style="background: #d2d2d2;">
						我要报名
					</a>
				</li>
				<!--<li v-if='!detailInfo.priced'>
					<router-link :to='"/orderaffirm/"+urls' v-if='token'>
						我要报名
					</router-link>
					<a href="javascript:;" style="background: #eee;" @click="nologin()" v-if='!token'>
						我要报名
					</a>
				</li>-->
			</ul>
		</div>
	</div>
</template>
<script>
	import topbar from '@/components/callback'
	import { Rater, Previewer, TransferDom } from 'vux'
	export default {
		name: 'nokeep',
		directives: {
			TransferDom
		},
		components: {
			topbar,
			Rater,
			Previewer
		},
		data() {
			return {
				token: sessionStorage.getItem('token'),
				star: 3,
				options: {
				},
				detailInfo: {},
				urls: '',
				pllist: [],
				pltotal: '',
				list: []
			}
		},
		mounted() {
			window.scrollTo(0, 0)
			if(this.urls === this.$route.params.name) {
				return false
			} else {
				this.$vux.loading.show({
					text: '数据加载中...'
				})
			}
			this.token = sessionStorage.getItem('token')
			let props = this.$route.params.name.split(',')
			this.urls = this.$route.params.name
			let urls = 'schoolName=' + props[0] + '&companyName=' + props[1] + '&name=' + props[2]
			this.$http.get('/business/course/detail?' + urls).then(
				(res) => {
					this.$vux.loading.hide()
					if(res.data.obj.school.nphotos >= 2) {
						this.getPhotos()
					}
					this.detailInfo = res.data.obj
				}
			)

			this.$http.get('/business/course/detailEvaluate?page=1&rows=1&' + urls).then(
				(res) => {
					if(res.data.result === 0) {
						this.pllist = res.data.obj.result
						this.pltotal = res.data.obj.totalRows
					}
				}
			)
		},
		methods: {
			show(index) {
				this.$refs.previewer.show(index)
			},
			getPhotos() {
				let props = this.$route.params.name.split(',')
				this.$http.get('/business/course/schoolPic', {
					params: {
						companyName: props[1],
						schoolName: props[0]
					}
				}).then(
					(res) => {
						for(var i = 0; i < res.data.obj.length; i++) {
							let arr = {}
							arr.src = res.data.obj[i]
							this.list.push(arr)
						}
					}
				)
			},
			getmore() {
				let props = this.$route.params.name.split(',')
				let urls = 'schoolName=' + props[0] + '&companyName=' + props[1] + '&name=' + props[2]
				this.$http.get('/business/course/detailEvaluate?page=1&rows=1000&' + urls).then(
					(res) => {
						if(res.data.result === 0) {
							this.pllist = res.data.obj.result
							this.pltotal = 0
						}
					}
				)
			},
			nocollect() {
				let $this = this
				if(this.token === null) {
					this.$vux.alert.show({
						title: '提示',
						content: '您还没有登录,请登录!',
						onHide() {
							$this.$router.replace('/login')
						}
					})
					return false
				}

				this.$vux.confirm.show({
					title: '提示',
					content: '确定取消收藏吗?',
					onConfirm() {
						let props = $this.urls.split(',')
						$this.$http.get('/user/watch/disWatchCourse', {
							params: {
								schoolName: props[0],
								companyName: props[1],
								courseName: props[2]
							}
						}).then(
							(res) => {
								$this.detailInfo.watched = true
							}
						)
					}
				})
			},
			nologin() {
				let $this = this
				this.$vux.alert.show({
					title: '提示',
					content: '您还没有登录,请登录!',
					onHide() {
						$this.$router.replace('/login')
					}
				})
			},
			collect() {
				let $this = this
				if(this.token === null) {
					this.$vux.alert.show({
						title: '提示',
						content: '您还没有登录,请登录!',
						onHide() {
							$this.$router.replace('/login')
						}
					})
					return false
				}
				let props = this.urls.split(',')

				this.$http.get('/user/watch/watchCourse', {
					params: {
						schoolName: props[0],
						companyName: props[1],
						courseName: props[2]
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							$this.$vux.toast.text('收藏成功!', 'center')
							$this.detailInfo.watched = false
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	/*@import url("../../../static/font/iconfont.css");*/
	
	#star {
		a {
			width: 20px !important;
			span {
				width: 20px;
				height: 20px;
				font-size: 22px;
			}
		}
	}
	
	.course-detail {
		height: auto;
		overflow: hidden;
		padding-top: 44px;
		padding-bottom: 44px;
		box-sizing: border-box;
		.static-footer {
			position: fixed;
			bottom: 0;
			height: 44px;
			background: #fff;
			width: 100%;
			ul {
				display: flex;
				line-height: 46px;
				li {
					list-style: none;
					flex: 1;
					text-align: center;
					font-size: 18px;
					a {
						display: block;
						color: #fff;
					}
				}
				li:first-child {
					color: #333;
				}
				li:last-child {
					background: #84BEF3;
					color: #fff;
				}
			}
		}
		.intro-box {
			height: auto;
			overflow: hidden;
			background: #fff;
			/*padding: 0 15px;*/
			padding-left: 15px;
			padding-bottom: 10px;
			margin-top: 5px;
			box-sizing: border-box;
			.title {
				height: 44px;
				line-height: 44px;
				font-size: 15px;
				color: #333;
				/*margin-bottom: 10px;*/
			}
			.couponlist {
				padding: 8px 0;
				p {
					font-size: 14px;
					line-height: 20px;
					color: #666;
					padding-right: 15px;
				}
			}
			>p {
				font-size: 14px;
				line-height: 24px;
				color: #666;
				padding-right: 15px;
				/*margin-top: 6px;*/
				box-sizing: border-box;
			}
			li {
				list-style: none;
				padding-top: 10px;
				box-sizing: border-box;
				.top {
					height: 44px;
					overflow: hidden;
					margin-bottom: 10px;
					display: flex;
					img {
						width: 44px;
						height: 44px;
						display: block;
						margin-right: 6px;
						border-radius: 50%;
					}
					.name {
						font-size: 15px;
						line-height: 15px;
						color: #333;
						font-weight: normal;
						margin-bottom: 6px;
						text-indent: 3px;
					}
				}
				p {
					padding-left: 54px;
					padding-bottom: 15px;
					box-sizing: border-box;
				}
			}
			.more {
				height: 75px;
				background: #fff;
				text-align: center;
				padding: 20px 0;
				padding-bottom: 0;
				box-sizing: border-box;
				span {
					display: block;
					width: 104px;
					height: 25px;
					line-height: 25px;
					border: 1px solid #666;
					font-size: 14px;
					margin: auto;
					border-radius: 3px;
					color: #666666;
				}
			}
		}
		.link {
			height: auto;
			overflow: hidden;
			li {
				height: 44px;
				line-height: 44px;
				display: flex;
				padding: 0 15px;
				box-sizing: border-box;
				background: #fff;
				a {
					display: flex;
					flex: 1;
					img {
						width: auto;
						height: 16px;
						margin-top: 14px;
					}
					span {
						flex: 1;
						margin-left: 5px;
						font-size: 14px;
						color: #666;
					}
				}
			}
		}
		.course-info {
			display: flex;
			padding: 15px;
			box-sizing: border-box;
			background: #fff;
			height: 112px;
			img {
				width: 120px;
				height: 80px;
				margin-right: 10px;
			}
			div {
				flex: 1;
				overflow: hidden;
				h2 {
					font-size: 17px;
					color: #333;
					font-weight: normal;
					line-height: 20px;
					height: 20px;
					margin-bottom: 3px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				h1 {
					font-size: 20px;
					line-height: 20px;
					color: #ffa019;
					font-weight: normal;
					margin-bottom: 3px;
				}
				p {
					font-size: 13px;
					line-height: 13px;
					color: #999;
					margin-bottom: 3px;
				}
			}
		}
	}
</style>