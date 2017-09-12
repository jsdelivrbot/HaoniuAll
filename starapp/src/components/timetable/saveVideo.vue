<template>
	<div id="play-main">
		<topbar title='视频详情' issave=t rue @topSaves='topSaves'></topbar>
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
				selectShow: false,
				chidlrenId: this.$route.params.childrenId,
				timetableId: this.$route.params.timetableId
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
			this.$http.get('/classHour/aliLive/getPlayInfoById', {
				params: {
					'videoId': id
				}
			}).then(
				(res) => {
					this.videoUrlList = res.data.obj.urlList
					this.player = new prismplayer({
						id: 'J_prismPlayer',
						width: '100%',
						height: 'auto',
						preload: true,
						autoplay: false,
						playsinline: false,
						skinLayout: false,
						source: res.data.obj.playInfoList[0].playURL,
						cover: res.data.obj.videoBase.coverURL
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
			topSaves() {
				this.$http.get('/classHour/datum/saveDatum', {
					params: {
						childId: this.chidlrenId,
						timetableId: this.timetableId,
						url: this.$route.params.id,
						type: 1
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '保存成功!'
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: '保存失败,请重试!'
							})
						}
					}
				)
			},
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