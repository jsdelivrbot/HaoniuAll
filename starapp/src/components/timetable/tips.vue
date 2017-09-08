<template>
	<div class="tips-box">
		<topbar :title='tipsInfo.courseName'></topbar>
		<div class="tipsList" v-for="item in tipsInfo.list">
			<div class="text vux-1px-b" v-if='item.type==0'>
				<p>{{item.content}}</p>
				<span class="time">
					{{item.createTime}}
				</span>
			</div>
			<div class="photo  vux-1px-b" v-if='item.type==1'>
				<h2 class="title">{{item.content}}</h2>
				<ul class="imglist">
					<router-link tag='li' v-for="(items,index) in item.objectSome" :key='index' :to='"/saveImg/"+items.id+"/"+childrenId+"/"+timetableId'>
						<img :src="items.url" />
					</router-link>
					<!--					
					<li >
						<img :src="items.url" />
					</li>-->
				</ul>

				<span class="time">
					{{item.createTime}}
				</span>
			</div>

			<div class="video  vux-1px-b" v-if='item.type==2'>
				<h2 class="title">视频:</h2>
				<router-link tag='div' :to='"/play2/"+item.objectSome[0].url+"/"+childrenId+"/"+timetableId'>
					<img :src="item.objectSome[0].cover" />
				</router-link>
				<!--<d-player :video="{url: item.objectSome[0].url,pic: 'http://chenbowen.cc/kindeditor/attached/image/20170112/20170112012144_75926.jpg'}" :contextmenu="contextmenu" :autoplay="autoplay" ref="player"></d-player>-->
			</div>
		</div>
	</div>
</template>
<script>
	import VueDPlayer from 'vue-dplayer'
	import topbar from '@/components/callback'
	export default {
		name: 'nokeep',
		components: {
			topbar,
			'd-player': VueDPlayer
		},
		data() {
			return {
				tipsInfo: '',
				childrenId: this.$route.params.childid,
				timetableId: this.$route.params.id,
				video: {
					url: 'https://ak0.picdn.net/shutterstock/videos/19708150/preview/stock-footage-footage-of-a-crowd-partying-dancing-at-a-concert-shot-on-red-epic-cinema-camera-in-slow-motion.mp4',
					pic: 'http://chenbowen.cc/kindeditor/attached/image/20170112/20170112012144_75926.jpg'
				},
				autoplay: false,
				contextmenu: [{
					text: 'GitHub',
					link: 'https://github.com/MoePlayer/vue-dplayer'
				}]
			}
		},
		mounted() {
			this.$http.get('/classHour/notice/listNotices', {
				params: {
					timetableId: this.$route.params.id
				}
			}).then(
				(res) => {
					if(res.data.result === 0) {
						this.tipsInfo = res.data.obj
					}
					console.log(res.data)
				}
			)
			let $this = this
			this.$nextTick(() => {
				//				if($this.$refs.player) $this.player = $this.$refs.player
			})
		},
		methods: {
			play() {
				alert(1)
			}
		}
	}
</script>
<style lang="less">
	.tips-box {
		padding-top: 54px;
		padding-bottom: 60px;
		box-sizing: border-box;
		background: #fff;
		min-height: 100vh;
		.tipsList {
			/*padding: 0 15px;*/
			padding-top: 15px;
			box-sizing: border-box;
			.title {
				padding: 10px 0;
				font-size: 15px;
				color: #666;
				font-weight: normal;
			}
			.time {
				display: block;
				font-size: 12px;
				padding: 10px 0;
				color: #999;
				text-align: right;
			}
			.text {
				font-size: 14px;
				color: #666;
				padding: 0 15px;
			}
			.photo {
				padding: 0 15px;
				height: auto;
				overflow: hidden;
				.imglist {
					height: auto;
					overflow: hidden;
					li {
						display: inline-block;
						width: 33.3333333%;
						float: left;
						padding: 3px;
						box-sizing: border-box;
					}
					img {
						display: block;
						width: 100%;
					}
				}
			}
			.video {
				padding: 0 15px;
				padding-bottom: 20px;
				box-sizing: border-box;
				div {
					position: relative;
					height: auto;
					overflow: hidden;
					img {
						display: block;
						width: 100%;
					}
				}
				div:before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					z-index: 9;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, 0.4) url(../../../static/img/play2.png) no-repeat center;
				}
			}
		}
	}
</style>