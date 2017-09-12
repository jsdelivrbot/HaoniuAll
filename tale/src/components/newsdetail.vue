<template>
	<div class="newsdetail-box">
		<goback title='文章详情' isShare='isShare' :shareTitle='newsinfo.title'></goback>
		<div class="text">
			<h2 class="title" style='padding:10px 0'>
				{{newsinfo.title}}
			</h2>
			<p class="subhead">
				{{newsinfo.createTime}}
				<span>阅读:{{newsinfo.readCount}}</span>
			</p>

			<div class="newscontent" v-html="newsinfo.content">
			</div>

			<div class="append-item" v-html="info1">
				<!--<img src="../assets/append-item.png" />
									<p>
										很多颈肩腰腿痛者，在一片凄风悲雨的生活里挣扎， 我愿意给他们撑一把阳光的伞，直到真的走出风雨，迎来阳光。
									</p>
									<p>
										我是王厚义，坚守初心与情怀， 甘做人体慢病防控和预防医学的耕耘者。
									</p>
									<p>
										涉及颈椎病，腰间盘突出，肩周炎， 骨刺 骨质增生 膝关节炎方面的问题， 可以通过我的私人微信向我咨询。
									</p>
									<p class="wechat-title">
										我的私人微信:
									</p>
									<a class="wechat-number">
										13074026876
									</a>
									<p class="wechat-footer">
										（↑长按复制加微信↑）
									</p>-->
			</div>

			<div class="append-item append-item2" v-html="info2">
				<!--<p class="wechat-title">免费：</p>
									<p> 我朋友圈里，在进行” 颈椎病典型病案征集，有440元的体验礼包免费领活动“， 如果你或你的家人颈椎比较重，或久治未愈，可以试着加一下 王厚义医生的微信 领一份先试试：微信: 13074026876 （←长按复制加微信）
									</p>-->
			</div>

		</div>
		<div class="readnum">
			<div>阅读:{{newsinfo.readCount}}</div>
			<div><img @click="upVote" src="../../static/img/upvote.png">
				<span>{{newsinfo.upVoteCount}}</span>
			</div>
		</div>

		<div class="share">
			<h2 class="title" style="padding: 16px 0;">
				我想托你件事!!!
			</h2>
			<p>
				如果你的亲人或者身边有朋友正经受这样的病痛折磨,请将此文转发给他,除了遵从文中要求,还可以通过微信向我咨询.助人为乐是美德!立即转发有积分哦!
			</p>

			<ul class="share-icon">
				<li @click="share(2)">
					<img src="../../static/img/46.png" />
					<span>微信分享</span>
				</li>
				<li @click="share(0)">
					<img src="../../static/img/47.png" />
					<span>朋友圈分享</span>
				</li>
				<li @click="collect()">
					<img src="../../static/img/collect.png" />
					<span>收藏</span>
				</li>
			</ul>
		</div>

		<div class="pl">
			<div class="title">
				评论({{commentCount}})
			</div>
			<ul class="commnet-list">
				<li v-for="comment in commentList">
					<div class="img" v-if="!comment.avatarUrl">
						<img src="../../static/img/headimg.png" />
					</div>
					<div class="img" v-if="comment.avatarUrl">
						<img :src="comment.avatarUrl" />
					</div>
					<div class="content">
						<p>
							<span>{{comment.userVo.nickname}}</span>
							<em>{{comment.createTime.substr(0,10)}}</em>
						</p>
						<span>{{comment.content}}</span>
					</div>
				</li>
			</ul>
			<div class="more">
				<button @click='loadMoreComment'>查看更多评论</button>
			</div>
		</div>

		<div class="about-read">
			<div class="titles">
				相关阅读
			</div>

			<ul>
				<li v-for="xgNewsInfo in xgNewsInfoList">
					<router-link :to='"/newsdetail/"+xgNewsInfo.id'>
						<img :src="xgNewsInfo.imgUrl" />
						<div>
							<h2>{{xgNewsInfo.title}}</h2>
							<p>{{xgNewsInfo.content}}</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="append-footer">
			<a :href="phonenumberfull" class="append-footer-item">
				<img src="../../static/img/phone.png" />
				<p>电话咨询</p>
			</a>
			<!--<router-link href='javascript:;' tag='div' class="append-footer-item">-->

			<!--</router-link>-->
			<router-link to='/pub/find' tag='div' class="append-footer-item">
				<img src="../../static/img/discover.png" />
				<p>发现</p>
			</router-link>
			<router-link :to='"/commentlist/"+id' tag='div' class="append-footer-item">
				<img src="../../static/img/comment.png" />
				<p>评论</p>
			</router-link>
			<router-link to='/wechat' tag='div' class="append-footer-item">
				<img src="../../static/img/wechat.png" />
				<p>微信咨询</p>
			</router-link>
		</div>
	</div>
</template>
<script>
import goback from '../components/goback'
import { XButton } from 'vux'
export default {
	components: {
		XButton,
		goback
	},
	data() {
		return {
			lchttp: localStorage.getItem('http'),
			newsinfo: {},
			commentList: [],
			commentCount: 0,
			xgNewsInfoList: [],
			abc: '',
			//				title: '',
			id: '',
			info1: '',
			info2: '',
			phonenumber: Number
		}
	},
	computed: {
		phonenumberfull() {
			return 'tel:' + this.phonenumber
		}
	},
	watch: {
		$route() {
			this.$http.post(this.lchttp + '/app/news/infoDetail?infoId=' + this.$route.params.id).then(
				(res) => {
					this.newsinfo = res.data.obj
				}
			)
		}
	},
	mounted() {
		let that = this
		this.id = that.$route.params.id
		that.$http.post(this.lchttp + '/app/news/infoDetail?infoId=' + that.$route.params.id).then(
			(res) => {
				that.newsinfo = res.data.obj
			}
		)
		that.$http.post(this.lchttp + '/app/comment/list?page=1&rows=3&newsInfoId=' + that.$route.params.id).then(
			(res) => {
				let obj = res.data.obj
				that.commentList = obj.result
				that.commentCount = obj.totalRows
			}
		)
		that.$http.post(this.lchttp + '/app/news/xgNewsInfoList?id=' + that.$route.params.id).then(
			(res) => {
				that.xgNewsInfoList = res.data.obj
			}
		)

		that.$http.post(this.lchttp + '/app/news/column?newsId=19').then(
			(res) => {
				that.info1 = res.data.obj.content
			}
		)
		that.$http.post(this.lchttp + '/app/news/column?newsId=20').then(
			(res) => {
				that.info2 = res.data.obj.content
			}
		)
		this.$http.get(this.lchttp + '/app/dictionary/get?id=1').then(
			(res) => {
				console.log(res.data.obj.value)
				this.phonenumber = res.data.obj.value
			}
		)
	},
	methods: {
		addjf() {
			this.$http.get(this.lchttp + '/app/user/creditAdd').then(
				(res) => {
				}
			)
		},
		share(vals) {
			const $this = this
			this.addjf()
			let shares = {}
			mui.plusReady(function() {
				plus.share.getServices(function(s) {
					for (var i in s) {
						var t = s[i]
						shares[t.id] = t
					}
					$this.abc = shares
					if (vals > 1) {
						shareAction('weixin', 'WXSceneSession')
					} else {
						shareAction('weixin', 'WXSceneTimeline')
					}
				}, function(e) { })

				function shareAction(id, ex) {
					var s = null
					if (!id || !(s = $this.abc[id])) {
						return
					}
					if (s.authenticated) {
						shareMessage(s, ex)
					} else {
						s.authorize(function() {
							shareMessage(s, ex)
						}, function(e) { })
					}
				}

				function shareMessage(s, ex) {
					var msg = {
						href: localStorage.getItem('http') + '/#' + $this.$route.path,
						title: $this.newsinfo.title,
						content: '',
						thumbs: [localStorage.getItem('http') + '/file/logo.png'],
						pictures: [localStorage.getItem('http') + '/file/logo.png'],
						extra: {
							scene: ex
						}
					}
					s.send(msg, function() {
						$this.$vux.alert.show({
							title: '提示',
							content: '分享成功,积分已增加!',
							onHide() {
								$this.addjf()
								$this.alertShow = false
							}
						})
					}, function(e) {
						alert('分享失败!')
					})
				}
			})
		},
		loadMoreComment() {
			this.$router.push('/commentlist/' + this.$route.params.id)
		},
		upVote() {
			this.$http.get(this.lchttp + '/app/news/upVote?infoId=' + this.$route.params.id, {
				headers: {
					token: localStorage.getItem('token')
				}
			}).then(
				(res) => {
					console.log(res)
					if (res.data.result === 0) {
						this.newsinfo.upVoteCount = this.newsinfo.upVoteCount + 1
					} else if (res.data.msg === '重复点赞') {
						this.$vux.alert.show({
							title: '提示',
							content: '您已经点过赞了'
						})
					} else {
						//							this.$vux.alert.show({
						//								title: '提示',
						//								content: res.data.msg
						//							})
						this.$router.push('/login')
					}
				}
				)
		},
		collect() {
			if (!localStorage.getItem('token')) {
				this.$router.push('/login')
				return false
			}
			this.$http.get(this.lchttp + '/app/collection/collection?newsInfoId=' + this.$route.params.id, {
				headers: {
					token: localStorage.getItem('token')
				}
			}).then(
				(res) => {
					let $this = this
					if (res.data.result === 0) {
						this.$vux.alert.show({
							title: '提示',
							content: '恭喜您， 已收藏成功。您可以在：我的 > 个人收藏中心可以查看收藏结果。'
						})
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				}
				)
		}
	}
}
</script>
<style lang="less">
.newsdetail-box {
	padding-bottom: 60px;
}

.append-item {
	width: 100%;
	border: 1px dashed red;
	padding: 10px;
	box-sizing: border-box;
	/*img {
			width: 90px;
			margin: auto;
			margin-top: 14px;
		}
		p {
			padding: 0 10px 20px;
			font-size: 20px;
			line-height: 34px;
			color: rgb(124, 78, 20);
		}
		.wechat-title {
			color: red;
			font-size: 20px;
		}
		.wechat-footer {
			color: red;
			text-align: center;
			font-size: 14px;
		}
		a.wechat-number {
			display: block;
			background-color: red;
			color: yellow;
			padding-bottom: 0;
			margin-bottom: 4px;
			margin-top: -16px;
			margin: -16px auto 4px;
			width: 140px;
			text-align: center;
			font-size: 20px;
		}*/
}

.append-item2 {
	margin-top: 20px;
	background-color: rgb(252, 228, 214);
	border: 1px solid red;
	padding: 10px;
	box-sizing: border-box;
	.wechat-title {
		font-size: 40px;
		margin-top: 20px;
	}
}

.newsdetail-box {
	height: auto;
	overflow: hidden;
	min-height: 100vh;
	box-sizing: border-box;
	.about-read {
		padding: 0 15px;
		box-sizing: border-box;
		padding-bottom: 10px;
		background: #fff;
		.titles {
			height: 60px;
			line-height: 60px;
			text-indent: 8px;
			box-sizing: border-box;
			background: #fff;
			font-size: 22px;
			position: relative;
			color: #333333;
		}
		.title:before {
			content: '';
			position: absolute;
			left: 0px;
			top: 20px;
			width: 3px;
			height: 20px;
			background: #ff5d5c;
		}
		>ul {
			height: auto;
			overflow: hidden;
			>li {
				height: 65px;
				margin-bottom: 150px;
				overflow: hidden;
				a {
					display: flex;
					overflow: hidden;
				}
				img {
					width: 65px;
					height: 65px;
					margin-right: 10px;
				}
				div {
					flex: 1;
					overflow: hidden;
					h2 {
						font-size: 18px;
						line-height: 25px;
						height: 25px;
						color: #333333;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					p {
						height: 40px;
						color: #999999;
						line-height: 20px;
						font-size: 16px;
						overflow: hidden;
					}
				}
			}
		}
	}
	.pl {
		height: auto;
		overflow: hidden;
		background: #f3f3f3;
		padding-bottom: 10px;
		margin-top: 10px;
		box-sizing: border-box;
		.title {
			height: 40px;
			line-height: 40px;
			padding: 0 22px;
			box-sizing: border-box;
			background: #fff;
			font-size: 14px;
			position: relative;
			color: #333333;
		}
		.title:before {
			content: '';
			position: absolute;
			left: 15px;
			top: 10px;
			width: 3px;
			height: 20px;
			background: #ff5d5c;
		}
		.commnet-list {
			height: auto;
			overflow: hidden;
			padding-left: 15px;
			background: #fff;
			border-bottom: 0.5px solid #dadada;
			li:last-child {
				border: none !important;
			}
			li {
				height: 65px;
				display: flex;
				border-bottom: 0.5px solid #eeeeee;
				padding-top: 5px;
				box-sizing: border-box;
				.img {
					width: 40px;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 12px;
					height: 100%;
					img {
						width: 100%;
						border-radius: 50%;
					}
				}
				.content {
					flex: 1;
					margin: 5px 0;
					padding-right: 15px;
					box-sizing: border-box;
					p {
						display: flex;
						height: 25px;
						line-height: 25px;
						color: #666666;
						span {
							flex: 1;
							text-align: left;
						}
						em {
							flex: 1;
							font-size: 14px;
							text-align: right;
							width: 150px;
						}
					}
					>span {
						line-height: 25px;
						color: #333333;
						font-size: 14px;
					}
				}
			}
		}
		.more {
			background-color: white;
			text-align: center;
			padding: 15px;
			button {
				width: 50%;
				height: 44px;
				background: #eeeeee;
				border-radius: 20px;
				border: none;
				font-size: 16px;
				letter-spacing: 2px;
				color: #ff5d5c;
				border-radius: 5px;
				color: #666;
				/*border: 1px #ff5d5c solid;*/
				outline: none;
			}
		}
	}
	.share {
		margin-top: 10px;
		background: #fff;
		padding: 0px 15px;
		padding-bottom: 10px;
		box-sizing: border-box;
		.title {
			color: #ff5d5c;
			font-size: 18px;
		}
		p {
			color: #333333;
			line-height: 26px;
			font-size: 16px;
		}
		.share-icon {
			display: flex;
			margin-top: 10px;
			padding: 0 20px;
			box-sizing: border-box;
			li {
				flex: 1;
				text-align: center;
				img {
					width: 50px;
					margin: auto;
				}
				span {
					font-size: 14px;
					color: #696969;
				}
			}
		}
	}
	.text {
		padding: 15px;
		background: #fff;
		box-sizing: border-box;
		margin-top: 35px;
	}
	.title {
		font-size: 28px !important;
		color: black !important;
		line-height: 40px;
		color: #343434;
		text-align: left;
		box-sizing: border-box;
	}
	.subhead {
		box-sizing: border-box;
		color: #999999;
		font-size: 14px;
		padding-top: 7px;
		span {
			float: right;
		}
	}
	.newscontent {
		padding: 15px 0;
		box-sizing: border-box;
		img {
			max-width: 100%;
		}
	}
	.readnum {
		box-sizing: border-box;
		height: auto;
		overflow: hidden;
		background: #fff;
		font-size: 14px;
		color: #999;
		line-height: 20px;
		display: flex;
		padding: 5px 10px;
		div:first-child {
			flex: 1;
		}
		div:last-child {
			text-align: right;
			display: flex;
			img {
				height: 20px;
				width: 20px;
				margin-right: 5px;
			}
		}
	}
}

.append-footer {
	height: 60px;
	width: 100%;
	padding: 0 4%;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	z-index: 99;
	background-color: whitesmoke;
	border-top: 1px solid rgb(240, 240, 240);
	.append-footer-item {
		width: 25%;
		float: left;
		img {
			width: 30px;
			height: 30px;
			margin: 4px auto 0;
		}
		p {
			text-align: center;
			font-size: 14px;
		}
	}
}
</style>