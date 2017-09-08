<template>
	<div class="newsdetail-box">
		<!--<div class="top-out-bar" style="position: fixed;top: 0;width: 100%;">
			<img src="../../static/img/left.svg" @click="goback()" />
			<span>文章详情</span>
		</div>-->

		<goback title='更多评论'></goback>

		<!--<div class="text">
			<h2 class="title">
				{{newsinfo.title}}
			</h2>
			<p class="subhead">
				<!-- 后面是作者 -->
		<!--{{newsinfo.createTime}} {{newsinfo.createTime}}
			</p>

			<div class="newscontent" v-html="newsinfo.content">
				<!--颈椎病一直是上班族的痛。那么上班族如何检测自己是不是得了颈椎病呢？要怎么预防呢？ 很多长期在室内对着电脑蛮干的上班族都会十分担心自己会患上颈椎病，而且上班族的确是颈椎病爆发的高发人群，那么，上班族应该如何知道自己是否患有颈椎病呢？下面有一些小问题，方便大家自测一下自己的颈椎健康，做到有病早发现早治疗早痊愈。另外，上班族们别忘了适时运动一下预防颈椎问题哦。下面来教大家几个小妙招吧。 上班族颈椎病小自测 长期上网、经常面对电脑屏幕工作的上班族们，来做个小测试，看看你的颈椎还好吗？颈椎病可发于任何年龄，以40岁以上的中老年人为多。其表现常为颈、肩臂、肩胛上背及胸前区疼痛，臂手麻木，肌肉萎缩，甚至四肢瘫痪。如果你的颈椎常常跟你闹别扭？对照下面的问题检查一下颈椎吧。 1、也许是常开车的缘故，最近你常常感到四肢无力，走起路来打飘？ 2、在最近的几个月里，你发生了几次莫名其妙的落枕事件？ 3、除了颈部不适外，你经常头晕、眼花、心慌，你联想到了心脏病？ 4、写完了明天开会要用的策划案，你发现整个肩膀酸疼得抬不起来？ 颈背酸痛，你抽空去附近推拿按摩店按摩，每当出现颈椎疼痛等问题，人们才会想起去做脊椎修护，其实常出现的颈椎疼痛是由于脊椎神经受压迫、脊椎侧弯、前后弯曲弧度异常等原因造成的颈椎疼痛，不是短时间形成的颈椎疼痛。 时时运动保持健康 人们需要认清颈椎保健的重要性，平常姿势习惯、运动、活动等都与颈椎疼痛健康息息相关。 上班族如何预防颈椎病-->
		<!--</div>

			<div class="readnum">
				<span>阅读:{{newsinfo.readCount}}</span>
				<em>点赞:{{newsinfo.upVoteCount}}</em>
			</div>
		</div>

		<div class="share">
			<h2 class="title">
				我想托你件事!!!
			</h2>
			<p>
				如果你的亲人或者身边有朋友正经受这样的病痛折磨,请将此文转发给他,除了遵从文中要求,还可以通过微信向我咨询.助人为乐是美德!立即转发有积分哦!
			</p>

			<ul class="share-icon">
				<li>
					<img src="../../static/img/46.png" />
					<span>微信分享</span>
				</li>
				<li>
					<img src="../../static/img/45.png" />
					<span>微博分享</span>
				</li>
				<li>
					<img src="../../static/img/47.png" />
					<span>朋友圈分享</span>
				</li>
			</ul>

		</div>-->
		<v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
			<div class="pl">
				<div class="title">
					评论({{totalRows}})
				</div>
				<ul class="commnet-list">
					<li v-for="comment in list">
						<div class="img" v-if="!comment.avatarUrl">
							<img src="../../static/img/headimg.png" />
						</div>
						<div class="img" v-if="comment.avatarUrl">
							<img :src="comment.avatarUrl" />
						</div>
						<div class="content">
							<p><span>{{comment.userVo.nickname}}</span> <em>{{comment.createTime}}</em></p>
							<span>{{comment.content}}</span>
						</div>
					</li>
				</ul>
			</div>
		</v-scroll>
		<div class="static-footer">
			<input type="text" v-model="content" placeholder="在这里输入评论的内容....." />
			<span @click='comment'>发送</span>
		</div>
		
		<!--<div class="bottom">
			<input type="text" v-model="content" placeholder="在这里输入评论的内容..">
			<button @click='comment'>评论</button>
		</div>-->
	</div>

</template>
<script>
	import goback from '../components/goback'
	import Scroll from '../components/scroll'
	import { XInput, Group, XButton } from 'vux'
	export default {
		components: {
			goback,
			XInput,
			Group,
			XButton,
			'v-scroll': Scroll
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				list: [],
				nextPage: 1,
				rows: 100000,
				totalPage: 0,
				totalRows: 0,
				content: ''
			}
		},
		created() {
			let that = this
			this.loadData(true)
//			that.$http.post(this.lchttp + '/app/comment/list?page=1&rows=3&newsInfoId=' + that.$route.params.newsInfoId).then(
//				(res) => {
//					let obj = res.data.obj
//					that.list = obj.result
//					that.totalPage = obj.totalPage
//				}
//			)
		},
		methods: {
			loadData: function(empty, done) {
				let that = this
				that.$http.post(this.lchttp + '/app/comment/list?page=' + that.nextPage + '&rows=' + that.rows + '&newsInfoId=' + that.$route.params.newsInfoId).then(
					(res) => {
						let pages = res.data.obj
						that.totalPage = pages.totalPage
						that.nextPage = pages.page + 1
						that.totalRows = pages.totalRows
						if(empty) {
							that.list = []
						}
						that.list.push.apply(that.list, pages.result)
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
			},
			comment() {
				let that = this
				if(that.content === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请填写评论内容!'
					})
					return false
				}
				if(that.content.length >= 500) {
					this.$vux.alert.show({
						title: '提示',
						content: '评论不能多于500个!'
					})
					return false
				}
				that.$http.get(this.lchttp + '/app/comment/comment?content=' + this.content + '&newsInfoId=' + that.$route.params.newsInfoId, {
					headers: {
						token: localStorage.getItem('token')
					}
				}).then(
					(res) => {
						let data = res.data
						if(data.result === 0) {
							that.loadData(true)
							that.content = ''
						} else if(data.result === -13) {
							that.$router.push('/login')
						} else {
							that.$vux.alert.show({
								title: '错误',
								content: data.msg
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
		height: auto;
		overflow: hidden;
		min-height: 100vh;
		box-sizing: border-box;
		.pl {
			height: auto;
			overflow: hidden;
			background: #f3f3f3;
			padding-bottom: 50px;
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
					height: auto;
					display: flex;
					border-bottom: 0.5px solid #eeeeee;
					padding-top: 5px;
					box-sizing: border-box;
					overflow: hidden;
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
						height: auto;
						margin: 5px 0;
						padding-right: 15px;
						box-sizing: border-box;
						overflow: hidden;
						p {
							width: 100%;
							height: auto;
							overflow: hidden;
							line-height: 25px;
							color: #666666;
							span {
								display: block;
								height: auto;
								overflow: hidden;
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
							display: block;
							line-height: 25px;
							height: auto;
							overflow: hidden;
							color: #333333;
							font-size: 14px;
							word-break: break-all;
							line-height: 16px;
							margin-top: 6px;
						}
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
			font-size: 18px;
			line-height: 40px;
			color: #343434;
			text-align: left;
			box-sizing: border-box;
		}
		.subhead {
			box-sizing: border-box;
			color: #999999;
			font-size: 14px;
		}
		.newscontent {
			padding: 15px 0;
			box-sizing: border-box;
		}
		.readnum {
			box-sizing: border-box;
			font-size: 14px;
			color: #999;
		}
		.bottom {
			position: fixed;
			background-color: white;
			width: 100%;
			bottom: 0px;
			padding: 10px 5px;
			input {
				border: 1px #ececec solid;
				width: 70%;
				height: 43px;
				border-radius: 5px;
			}
			button {
				width: 80px;
				height: 44px;
				background: #ff5d5c;
				border-radius: 5px;
				border: none;
				font-size: 18px;
				letter-spacing: 2px;
				color: #fff;
			}
		}
	}
</style>