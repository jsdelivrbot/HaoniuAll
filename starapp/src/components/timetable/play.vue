<template>
	<div id="play-main">
		<topbar title='视频详情'></topbar>
		<div :class="{'fullScreen':isfullScreen}" class="video-box">
			<div class="prism-player" id="J_prismPlayer" @click="showbar"></div>
			<div class="ranges" v-if='videoBar'>
				<range v-model="timeline" decimal @on-change="onChange"></range>
			</div>
			<!--<div class="ranges-top">
				<range v-model="timelines" @on-change="onChange" decimal></range>
			</div>-->
			<div class="bar" v-show='videoBar'>
				<div class="play-box">
					<p @click="playClick()" v-if='!play'>
						<img src="../../../static/img/play.png" />
					</p>
					<p @click="stop()" v-if='play'>
						<img src="../../../static/img/stop.png" />
					</p>
				</div>
				<div class="selectVideo">
					<p @click="selectShow = !selectShow">
						HD
					</p>
					<ul>
						<li v-show="selectShow" v-for="item in videoUrlList " @click="changeUrl(item.playURL)" class="vux-1px-b">
							{{item.definition}}
						</li>
					</ul>

				</div>

				<p class="p" @click="plays()" v-if="!isfullScreen">
					<img src="../../../static/img/qp.png" />
				</p>
				<p class="p" @click="nofullScreen()" v-if="isfullScreen">
					<img src="../../../static/img/noqp.png" />
				</p>
			</div>
		</div>
		<!--<range v-model="timeline" decimal></range>-->
		<!--<div id="info-box">
			<div class="courseName">{{videoDetail.courseName}}</div>
			<div class="videoInfo">
				<h2 class="title vux-1px-b">主讲老师:{{videoDetail.teacherName}}</h2>
				<div>
					<h3>直播内容介绍:</h3>
					<p>{{videoDetail.onlinedIntroduce}}</p>
				</div>
			</div>
		</div>-->

	</div>
</template>

<script>
	import topbar from '@/components/callback'
	import { Range } from 'vux'
	export default {
		name: 'nokeep',
		components: {
			topbar,
			Range
		},
		data() {
			return {
				videoDetail: '',
				isfullScreen: false,
				play: false,
				videoBar: false,
				activatedTrue: false,
				timeline: 0,
				allTime: 0,
				newstime: 0,
				timelineStatus: false,
				videoUrlList: '',
				selectShow: false
			}
		},
		mounted() {
			let $this = this
			mui.plusReady(function() {
				mui.init({
					beforeback: function() {
						if($this.isfullScreen) {
							$this.nofullScreen()
							return false
						} else {
							return true
						}
					}
				})
			})
			let id = this.$route.params.id
			this.$http.get('/classHour/datum/getDatumById', {
				params: {
					'id': id
				}
			}).then(
				(res) => {
					this.videoUrlList = res.data.obj.urlList
					this.player = new prismplayer({
						id: 'J_prismPlayer',
						preload: true,
						autoplay: false,
						playsinline: false,
						skinLayout: false,
						source: res.data.obj.urlList[0].playURL,
						cover: res.data.obj.cover
					})

					this.player.on('ready', function() {
						$this.activatedTrue = true
						$this.videoBar = true
						$this.allTime = parseInt($this.player.getDuration())
					})
					this.player.on('pause', function() {
						$this.play = false
					})
					this.player.on('play', function() {
						$this.play = true
						$this.getPercent()
						setTimeout(function() {
							$this.videoBar = false
						}, 1500)
					})
					this.player.on('m3u8Retry', function() {
						mui.toast('重新连接中.....')
						$this.player.play()
					})
				}
			)
		},
		methods: {
			changeUrl(url) {
				this.selectShow = false
				this.player.loadByUrl(url)
				let times = parseInt(this.allTime * (this.timeline / 100))
				this.player.seek(times)
				this.playClick()
			},
			onChange(val) {
				let times = parseInt(this.allTime * (val / 100))
				this.player.seek(times)
			},
			getPercent() {
				this.timelineStatus = true
				let $this = this
				if($this.play) {
					setTimeout(function() {
						$this.getPercent()
						$this.timeline = parseInt($this.player.getCurrentTime()) / $this.allTime * 100
					}, 1)
				}
			},
			showbar() {
				if(this.videoBar) {
					this.videoBar = false
				} else {
					this.videoBar = true
				}
			},
			playClick() {
				this.player.play()
			},
			stop() {
				this.player.pause()
			},
			plays() {
				plus.navigator.setFullscreen(true)
				plus.screen.lockOrientation('landscape-primary')
				this.player.play()
				this.isfullScreen = true
			},
			nofullScreen() {
				plus.navigator.setFullscreen(false)
				plus.screen.unlockOrientation()
				plus.screen.lockOrientation('portrait-primary')
				this.isfullScreen = false
				this.player.play()
			}
		}
	}
</script>

<style lang="less">
	#play-main {
		min-height: 100vh;
		width: 100%;
		background: #fff;
		#info-box {
			background: #f0eff5;
		}
		
		video{
			width: 100%;
			height: 100%;
			max-height: 500px;
		}
		
		.courseName {
			height: 40px;
			line-height: 40px;
			padding: 0 15px;
			box-sizing: border-box;
			font-size: 15px;
			color: #333;
			font-weight: normal;
			margin-bottom: 10px;
			background: #fff;
		}
		.videoInfo {
			background: #fff;
			.title {
				height: 40px;
				line-height: 40px;
				padding: 0 15px;
				box-sizing: border-box;
				font-size: 15px;
				color: #333;
				font-weight: normal;
			}
			h3 {
				padding: 10px 15px;
				box-sizing: border-box;
				font-size: 13px;
				color: #333;
				font-weight: normal;
			}
			p {
				padding: 0 15px;
				box-sizing: border-box;
				font-size: 13px;
				color: #666;
			}
		}
		.ranges {
			position: absolute;
			/*padding: 0 40px;*/
			box-sizing: border-box;
			bottom: 40px;
			height: 20px;
			left: 0;
			width: 100%;
			flex: 1;
			z-index: 999;
			background: rgba(0, 0, 0, 0.5);
			.vux-range-input-box {
				margin: 0 10px !important;
			}
			.vux-range-input-box {
				position: relative;
				top: 20px;
			}
			.range-handle {
				width: 20px;
				height: 20px;
				top: -10px !important;
			}
			.range-min {
				display: none;
			}
			.range-max {
				display: none;
			}
			.range-bar {
				top: -10px;
			}
		}
		.video-box {
			margin-top: 54px;
			position: relative;
			overflow: hidden;
			background: #000;
			.selectVideo {
				list-style: none;
				color: #fff;
				text-align: center;
				position: relative;
				p {
					width: 45px;
					line-height: 26px;
					height: 26px;
					margin: 6px;
					border: 1px solid #fff;
					border-radius: 3px;
				}
				ul {
					position: absolute;
					top: -60px;
					left: 0px;
					width: 100%;
					height: auto;
					overflow: hidden;
					z-index: 99999;
					li {
						height: 30px;
						font-size: 12px;
						line-height: 30px;
						background: rgba(0, 0, 0, 0.5);
					}
				}
			}
			.bar {
				position: absolute;
				bottom: 0;
				height: 40px;
				width: 100%;
				text-align: right;
				display: flex;
				background: rgba(0, 0, 0, 0.5);
				.play-box {
					padding: 0;
					width: 40px;
					flex: 1;
					p {
						height: 40px;
						width: 40px;
						padding: 8px;
						box-sizing: border-box;
						img {
							display: block;
							width: 24px;
							height: 24px;
						}
					}
				}
				.p {
					height: 40px;
					width: 40px;
					padding: 8px;
					box-sizing: border-box;
					img {
						display: block;
						width: 24px;
						height: 24px;
					}
				}
			}
		}
		.operation {
			position: fixed;
			top: 0;
			right: 0;
			width: 50px;
			height: 100vh;
			background: rgba(0, 0, 0, 0.5);
			z-index: 99999999999999999;
		}
		.fullScreen {
			margin: 0;
			position: fixed;
			z-index: 99999999999999;
			top: 0;
			width: 100%;
			height: 100vh;
		}
	}
</style>