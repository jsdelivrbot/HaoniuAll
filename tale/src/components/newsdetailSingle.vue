<template>
	<div class="newsdetail-box">
		<!--<div class="top-out-bar" style="position: fixed;top: 0;width: 100%;">
			<img src="../../static/img/left.svg" @click="goback()" />
			<span>文章详情</span>
		</div>-->

		<goback :title='title[$route.params.id]' isShare='isShare' :shareTitle='title[$route.params.id]'></goback>

		<div class="text">
			<!--<h2 class="title">
				怎样判断是否有颈椎病?该如何预防111?
			</h2>
			<p class="subhead">
				10-29 16:34 安徽医科大学
			</p>-->

			<div class="newscontent" v-html="newsInfo.content">
				<!--颈椎病一直是上班族的痛。那么上班族如何检测自己是不是得了颈椎病呢？要怎么预防呢？ 很多长期在室内对着电脑蛮干的上班族都会十分担心自己会患上颈椎病，而且上班族的确是颈椎病爆发的高发人群，那么，上班族应该如何知道自己是否患有颈椎病呢？下面有一些小问题，方便大家自测一下自己的颈椎健康，做到有病早发现早治疗早痊愈。另外，上班族们别忘了适时运动一下预防颈椎问题哦。下面来教大家几个小妙招吧。 上班族颈椎病小自测 长期上网、经常面对电脑屏幕工作的上班族们，来做个小测试，看看你的颈椎还好吗？颈椎病可发于任何年龄，以40岁以上的中老年人为多。其表现常为颈、肩臂、肩胛上背及胸前区疼痛，臂手麻木，肌肉萎缩，甚至四肢瘫痪。如果你的颈椎常常跟你闹别扭？对照下面的问题检查一下颈椎吧。 1、也许是常开车的缘故，最近你常常感到四肢无力，走起路来打飘？ 2、在最近的几个月里，你发生了几次莫名其妙的落枕事件？ 3、除了颈部不适外，你经常头晕、眼花、心慌，你联想到了心脏病？ 4、写完了明天开会要用的策划案，你发现整个肩膀酸疼得抬不起来？ 颈背酸痛，你抽空去附近推拿按摩店按摩，每当出现颈椎疼痛等问题，人们才会想起去做脊椎修护，其实常出现的颈椎疼痛是由于脊椎神经受压迫、脊椎侧弯、前后弯曲弧度异常等原因造成的颈椎疼痛，不是短时间形成的颈椎疼痛。 时时运动保持健康 人们需要认清颈椎保健的重要性，平常姿势习惯、运动、活动等都与颈椎疼痛健康息息相关。 上班族如何预防颈椎病-->
			</div>

			<!--<div class="readnum">
				<span>阅读:{{newsInfo.readCount}}</span>
				<em>点赞:{{newsInfo.upVoteCount}}</em>
			</div>-->
		</div>

		<!--<div class="share">
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

		</div>

		<div class="pl">
			<div class="title">
				评论
			</div>
			<ul class="commnet-list">
				<li>
					<div class="img">
						<img src="../../static/img/meizi.jpg" />
					</div>
					<div class="content">
						<p><span>王先生</span> <em>今天 20:50</em></p>
						<span>你好请问你是怎么治好的?</span>
					</div>
				</li>
				<li>
					<div class="img">
						<img src="../../static/img/logo.png" />
					</div>
					<div class="content">
						<p><span>李女士</span> <em>前天 08:50</em></p>
						<span>真的可以治好吗?</span>
					</div>
				</li>
				<li>
					<div class="img">
						<img src="../../static/img/logo.png" />
					</div>
					<div class="content">
						<p><span>王大夫</span> <em>昨天 12:50</em></p>
						<span>只要谨遵医嘱一定可以治好的!</span>
					</div>
				</li>
			</ul>
		</div>

		<div class="about-read">
			<div class="title">
				相关阅读
			</div>

			<ul>
				<li>
					<img src="../../static/img/meizi.jpg" />
					<div>
						<h2>脖子疼?是不是肩周炎?</h2>
						<p>
							如果你的亲人或者身边有朋友正经受这样的病痛折磨

						</p>
					</div>
				</li>
				<li>
					<img src="../../static/img/23.png" />
					<div>
						<h2>告别肩周炎的有效方法?</h2>
						<p>
							颈肩部疾病患者在逐年增加且年龄逐渐趋向年轻化，其中以肩周炎最为代表。
						</p>
					</div>
				</li>
				<li>
					<img src="../../static/img/19.png" />
					<div>
						<h2>腰痛？腰椎病？这些你都知道吗?</h2>
						<p>
							有意地伸上几个懒腰，可以令全身舒畅、精神充裕。即使身体本身并未感觉疲劳
						</p>
					</div>
				</li>
			</ul>

		</div>-->

	</div>
</template>
<script>
	import goback from '../components/goback'
	export default {
		components: {
			goback
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				newsInfo: '',
				title: ['', '', '自我介绍', '我的语录', '相关视频', '我的客户']
			}
		},
		created() {
			var _self = this
			this.$http.get(this.lchttp + '/app/news/column?newsId=' + this.$route.params.id).then(
				(res) => {
					_self.newsInfo = res.data.obj
				}
			)
		}
	}
</script>
<style lang="less">
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
			.title {
				height: 60px;
				line-height: 60px;
				text-indent: 8px;
				box-sizing: border-box;
				background: #fff;
				font-size: 14px;
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
			ul {
				height: auto;
				overflow: hidden;
				li {
					display: flex;
					height: 65px;
					margin-bottom: 10px;
					img {
						width: 65px;
						height: 65px;
						margin-right: 10px;
					}
					div {
						flex: 1;
						h2 {
							font-size: 16px;
							line-height: 25px;
							height: 25px;
							color: #333333;
						}
						p {
							height: 40px;
							color: #999999;
							line-height: 20px;
							font-size: 14px;
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
		}
		.share {
			margin-top: 10px;
			background: #fff;
			padding: 0px 15px;
			padding-bottom: 10px;
			box-sizing: border-box;
			.title {
				color: #ff5d5c;
			}
			p {
				color: #333333;
				line-height: 26px;
				font-size: 15px;
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
			/*p,pre,span{
				font-size: 20px !important;
				line-height: 34px !important;
				color: #282828 !important;
				
			}*/
			video {
				width: 100%;
				/*background-image: url(../../dist/static/img/preload.jpg);*/
				/*border: 1px solid darkgreen;*/
				/*background-size: cover;*/
			}
		}
		.readnum {
			box-sizing: border-box;
			font-size: 14px;
			color: #999;
		}
	}
</style>