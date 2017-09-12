<template>
	<div id="video-main">
		<topbar :title='videoDetail.courseName'></topbar>
		<div :class="{'fullScreen':isfullScreen}" class="video-box">
			<div class="prism-player" id="J_prismPlayer" @click="showbar"></div>
			<div class="bar" v-show='videoBar'>
				<div class="play-box">
					<p @click="playClick()" v-if='!play'>
						<img src="../../../static/img/play.png" />
					</p>
					<p @click="stop()" v-if='play'>
						<img src="../../../static/img/stop.png" />
					</p>
				</div>
				<p @click="plays()" v-if="!isfullScreen">
					<img src="../../../static/img/qp.png" />
				</p>
				<p @click="nofullScreen()" v-if="isfullScreen">
					<img src="../../../static/img/noqp.png" />
				</p>
			</div>
		</div>

		<div id="info-box">
			<div class="courseName">{{videoDetail.courseName}}</div>
			<div class="videoInfo">
				<h2 class="title vux-1px-b">主讲老师:{{videoDetail.teacherName}}</h2>
				<div>
					<h3>直播内容介绍:</h3>
					<p>{{videoDetail.onlinedIntroduce}}</p>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import topbar from '@/components/callback'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				videoDetail: '',
				isfullScreen: false,
				play: true,
				videoBar: false,
				activatedTrue: false
			}
		},
		activated() {
			this.getdetail()
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
			let id = this.$route.params.url
			this.$http.get('/business/timetable/getLive', {
				params: {
					'id': id
				}
			}).then(
				(res) => {
					this.player = new prismplayer({
						id: 'J_prismPlayer',
						width: '100%',
						height: 'auto',
						autoplay: true,
						playsinline: true,
						skinLayout: false,
						source: res.data.obj.flvUrl,
						cover: ''
					})

					this.player.on('ready', function() {
						$this.activatedTrue = true
						$this.showbar()
					})
					this.player.on('pause', function() {
						$this.play = false
					})
					this.player.on('play', function() {
						$this.play = true
					})
					this.player.on('m3u8Retry', function() {
						mui.toast('重新连接中.....')
						$this.player.play()
					})
				}
			)
		},
		methods: {
			getdetail() {
				let id = this.$route.params.url
				this.$http.get('/business/timetable/getLive', {
					params: {
						'id': id
					}
				}).then(
					(res) => {
						this.videoDetail = res.data.obj
						this.player.loadByUrl(res.data.obj.flvUrl)
					}
				)
			},
			showbar() {
				if(this.videoBar) {
					this.videoBar = false
				} else {
					this.videoBar = true
					let $this = this
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
	#video-main {
		min-height: 100vh;
		width: 100%;
		background: #fff;
		#info-box {
			background: #f0eff5;
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
		.video-box {
			margin-top: 54px;
			position: relative;
			overflow: hidden;
			.bar {
				position: absolute;
				bottom: 0;
				height: 40px;
				width: 100%;
				text-align: right;
				display: flex;
				background: rgba(0, 0, 0, 0.5);
				.play-box {
					flex: 1;
					padding: 0;
				}
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