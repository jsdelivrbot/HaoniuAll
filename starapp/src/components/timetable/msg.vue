<template>
	<div class="msg">
		<div class="msg-header">
			<div class="goback" @click="goback">
				<img src="../../../static/img/lefticon.png" />
			</div>
			<div class="msg-center">
				<h3>{{msgInfo.teacherName}}</h3>
				<p>{{msgInfo.CourseName}}</p>
			</div>
			<div class="msg-right">
				<img src="../../../static/img/timeline.png" />
			</div>
		</div>
		<div class="msg-content" ref='scroll' style="position: fixed; top: 0px;bottom: 54px;width: 100%;">
			<transition-group name="fade" tag='div' style='height: auto; padding-bottom: 150px; overflow: hidden;'>
				<ul v-for="(item,index) in msgInfo.page2" class="selectSc" :key='index'>
					<li class="left" v-if="item.sourceType==1">
						<div class="info">
							<img :src="item.url" />
						</div>
						<div class="detail">
							{{item.content}}
						</div>
					</li>
					<li class="right" v-if="item.sourceType==0">
						<em></em>
						<div class="detail">
							{{item.content}}
						</div>
						<div class="info">
							<img :src="msgInfo.userUrl" v-if='msgInfo.userUrl' />
						</div>
					</li>
				</ul>
			</transition-group>
		</div>

		<div class="msg-send vux-1px-t">
			<input type="text" name="" id="" v-model="msgContent" value="" />
			<button @click="sendMsg">发送</button>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	export default {
		name: 'nokeep',
		data() {
			return {
				msgInfo: '',
				msgContent: ''
			}
		},
		mounted() {
			this.$http.get('/classHour/message/listMessageById', {
				params: {
					childId: this.$route.params.childid,
					timetableId: this.$route.params.timetableId
				}
			}).then(
				(res) => {
					this.msgInfo = res.data.obj
					let $this = this
					this.$nextTick(() => {
						$this.bs()
					})
				}
			)
		},
		methods: {
			bs() {
				let $this = this
				if(!this.$refs.scroll) {
					return
				}
				this.scroll = new BScroll(this.$refs.scroll, {
					scrollY: true,
					probeType: 1,
					click: true
				})
				this.scroll.on('touchend', (pos) => {
				})
				let foodsList = $this.$refs.scroll.getElementsByClassName('selectSc')
				let el = foodsList[$this.msgInfo.page2.length - 1]
				$this.scroll.scrollToElement(el, 300)
			},
			goback() {
				this.$router.go(-1)
			},
			sendMsg() {
				this.$http.get('/classHour/message/saveNewContent', {
					params: {
						childId: this.$route.params.childid,
						teacherId: this.msgInfo.teacherId,
						context: this.msgContent
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.msgContent = ''
							this.msgInfo.page2.push(res.data.obj)
							let $this = this
							this.$nextTick(() => {
								$this.scroll.refresh()
								let foodsList = $this.$refs.scroll.getElementsByClassName('selectSc')
								let el = foodsList[$this.msgInfo.page2.length - 1]
								$this.scroll.scrollToElement(el, 600)
							})
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0
	}
	
	.msg-header {
		display: flex;
		height: 45px;
		background: linear-gradient(to bottom, #92c1ed, #84bef3);
		position: fixed;
		top: 0;
		width: 100%;
		.goback {
			text-align: center;
			height: 45px;
			img {
				margin: 13px auto;
				padding: 0 15px;
				display: block;
				height: 18px;
			}
		}
		.msg-center {
			flex: 1;
			color: #fff;
			text-align: center;
			h3 {
				font-size: 15px;
				font-weight: normal;
			}
			p {
				font-size: 11px;
			}
		}
		.msg-right {
			width: 45px;
			height: 45px;
			img {
				margin: 9px auto;
				padding: 0 15px;
				display: block;
				height: 26px;
			}
		}
	}
	
	.msg-content {
		height: auto;
		overflow: hidden;
		margin-top: 45px;
		padding: 0 10px;
		padding-top: 20px;
		padding-bottom: 60px;
		box-sizing: border-box;
		transition: all 1s;
		li {
			display: flex;
			margin-bottom: 13px;
			em {
				flex: 1;
			}
		}
		.left {
			.info {
				flex: 1;
				max-width: 40px;
				min-width: 40px;
				width: 40px;
				height: 40px;
				margin-right: 10px;
				img {
					display: block;
					width: 100%;
				}
			}
			.detail {
				padding: 10px;
				background: #fff;
				font-size: 14px;
				border-radius: 5px;
				color: #333;
				word-wrap: break-word;
			}
		}
		.right {
			.info {
				flex: 1;
				max-width: 40px;
				min-width: 40px;
				width: 40px;
				height: 40px;
				margin-left: 10px;
				img {
					display: block;
					width: 100%;
				}
			}
			.detail {
				/*max-width: 80%;*/
				padding: 10px;
				background: #fff;
				font-size: 14px;
				border-radius: 5px;
				height: auto;
				overflow: hidden;
				word-wrap: break-word;
				color: #333;
			}
		}
	}
	
	.msg-send {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 44px;
		padding: 7px;
		box-sizing: border-box;
		/*background: #fff;*/
		display: flex;
		input {
			flex: 1;
			border: 1px solid #eee;
			border-radius: 4px;
			outline: none;
			margin-right: 10px;
			text-indent: 20px;
		}
		button {
			background: #fff;
			width: 60px;
			border: none;
			border-radius: 4px;
			color: #666;
		}
	}
</style>