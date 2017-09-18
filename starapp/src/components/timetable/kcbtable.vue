<template>
	<div>
		<div class="kcb-topbar">
			<em></em>
			<ul>
				<li v-for="(item,index) in childrenList" :key="index" @click="getTimeline(item.id)" :class="{'tips':item.tixin,'active':changeChildrenSelect==item.id}">
					{{item.name}}
				</li>
			</ul>
			<em></em>
			<div class="right-icon" v-if='childrenList.length > 0'>
				<router-link :to='"/pub/kcb/calendar/"+changeChildrenSelect'>
					<img src="../../../static/img/calendar.png" />
				</router-link>
			</div>
		</div>
		<div class="timelinebg">
			<img src="../../../static/img/timelinebg.png" />
		</div>
		<div class="no-info" v-if='timeline == ""'>
			暂无课程信息
		</div>
		<div class="timeline" ref='bsc' :style="{height:bsheight+'px'}" style="position: fixed;top: 44px;bottom: 54px;width: 100%;">
			<ul class="timeline-list" ref='ht'>
				<li v-for="(item,index) in timeline" :key="index" :class="{'active-two':item.xing==2,'active-today':item.xing==0,'active-before':item.xing==1}">
					<div class="left-line">
						<p>{{item.classDateString}}</p>
						<p>{{item.classTimeString}}</p>
						<h3>{{item.weekString}}</h3>
					</div>
					<div class="vertical-line"></div>
					<div class="right-line">
						<div>
							<span>{{item.courseName}}</span>
							<router-link tag='em' v-if='item.xing==0' :to='"/videoDetail/"+item.id'>
								{{item.liveBroadcast}}
							</router-link>
							<em v-if='item.xing!==0'>{{item.liveBroadcast}}</em>
						</div>
						<h3>地址:{{item.address}}</h3>
						<ul>
							<router-link tag='li' :to="'/tips/'+item.id+'/'+changeChildrenSelect" class="icon-tips">
								通知
								<span v-if="item.countNotiec>0">
									{{item.countNotiec}}
								</span>
							</router-link>
							<!--<li class="icon-tips">
												通知
												<span v-if="item.countNotiec>0">
													{{item.countNotiec}}
												</span>
											</li>-->

							<router-link tag='li' class="icon-img" :to='"/databank/"+changeChildrenSelect+"/"+item.id'>
								相册
							</router-link>
							<!--<li class="icon-img">
												相册
											</li>-->
							<router-link class="icon-msg" tag='li' :to='"/msg/"+changeChildrenSelect+"/"+item.id'>
								私信
								<span v-if="item.countMessage>0">
									{{item.countMessage}}
								</span>
							</router-link>
							<!--<li class="icon-msg">
												私信
												<span v-if="item.countMessage>0">
													{{item.countMessage}}
												</span>
											</li>-->
						</ul>
					</div>

					<div class="icon-line">
						<img src="../../../static/img/star1.png" v-if='item.xing==0' />
					</div>
					<div class="icon-line" v-if='item.xing==2'>
						<img src="../../../static/img/star2.png" />
					</div>
					<div class="icon-line" v-if='item.xing==1'>
						<img src="../../../static/img/star0.png" />
					</div>
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				changeChildrenSelect: '',
				childrenList: [],
				timeline: '',
				childrenId: '',
				clickone: true,
				beforeEnd: true,
				laterEnd: true,
				endpx: ''
			}
		},
		computed: {
			bsheight() {
				let max = document.documentElement.clientHeight - 98
				let px = this.timeline.length * 122
				if(px < max) {
					return px
				} else {
					return max
				}
			}
		},
		activated() {
			if(this.$route.params.id >= 0) {
				this.getAllChildren(this.$route.params.id)
			} else {
				this.getAllChildren()
			}
		},
		mounted() {
			if(this.$route.params.id >= 0) {
				this.getAllChildren(this.$route.params.id)
			} else {
				this.getAllChildren()
			}
		},
		methods: {
			getAllChildren(id) {
				this.$http.get('/business/timetable/getByUserId').then(
					(res) => {
						if(res.data.result === 0) {
							this.bs()
							if(res.data.obj.length === 0) {
								mui.toast('请添加子女信息!')
							} else {
								this.childrenList = res.data.obj
								if(id) {
									this.getTimeline(id)
								} else {
									let allNo = true
									for(var i = 0; i < this.childrenList.length; i++) {
										if(this.childrenList[i].tixin) {
											this.getTimeline(this.childrenList[i].id)
											allNo = false
											return false
										}
									}
									if(allNo) {
										this.getTimeline(this.childrenList[0].id)
									}
								}
							}
						}
					}
				)
			},
			bs() {
				let $this = this
				if(!this.$refs.bsc) {
					return
				}
				this.scroll = new BScroll(this.$refs.bsc, {
					scrollY: true,
					probeType: 1,
					click: true
				})
				this.scroll.on('touchend', (pos) => {
					if(pos.y > 50 && this.beforeEnd) {
						this.upTimeline()
						return false
					}
					if(pos.y < -50 && this.laterEnd) {
						this.downTimeline()
						return false
					}
				})
			},
			getTimeline(id) {
				this.childrenId = id
				this.changeChildrenSelect = id
				this.$http.get('/business/timetable/listBychildid', {
					params: {
						'id': id
					}
				}).then(
					(res) => {
						let $this = this
						this.timeline = res.data.obj
						this.beforeEnd = true
						this.laterEnd = true
						$this.$nextTick(() => {
							$this.scroll.refresh()
						})
					}
				)
			},
			upTimeline() {
				const $this = this
				this.beforeEnd = false
				this.$http.get('/business/timetable/listBychildid', {
					params: {
						'id': this.changeChildrenSelect,
						'dateString': this.timeline[0].classStartTime,
						'flag': 'up'
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.beforeEnd = true
							for(var i = 0; i < res.data.obj.length; i++) {
								this.timeline.unshift(res.data.obj[i])
							}
							this.$nextTick(() => {
								$this.scroll.refresh()
							})
						} else {
							this.$vux.toast.text('已经没有啦!!')
							this.beforeEnd = false
						}
					}
				)
			},
			downTimeline() {
				const $this = this
				let end = this.timeline.length - 1
				this.laterEnd = false
				this.$http.get('/business/timetable/listBychildid', {
					params: {
						'id': this.changeChildrenSelect,
						'dateString': this.timeline[end].classStartTime,
						'flag': 'down'
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							for(var i = 0; i < res.data.obj.length; i++) {
								this.timeline.push(res.data.obj[i])
							}
							this.$nextTick(() => {
								$this.scroll.refresh()
							})
							this.laterEnd = true
						} else {
							this.$vux.toast.text('已经没有啦!!')
							this.laterEnd = false
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.no-info {
		position: fixed;
		width: 100%;
		z-index: 9999;
		line-height: 260px;
		color: #666;
		text-align: center;
		font-size: 18px;
	}
	
	.timelinebg {
		position: fixed;
		bottom: 0px;
		width: 100vw;
		height: 100vh;
		background: #fff;
		img {
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			width: 100%;
		}
	}
	
	.timeline {
		padding-top: 15px;
		padding-bottom: 60px;
		/*overflow: hidden;*/
		.active-before {
			color: #999;
			.icon-tips {
				background-image: url(../../../static/img/tips3.png);
			}
			.icon-img {
				background-image: url(../../../static/img/photo3.png);
			}
			.icon-msg {
				background-image: url(../../../static/img/sixin3.png);
			}
		}
		.active-two {
			color: #84bef3;
			.icon-tips {
				background-image: url(../../../static/img/tips2.png);
			}
			.icon-img {
				background-image: url(../../../static/img/photo2.png);
			}
			.icon-msg {
				background-image: url(../../../static/img/sixin2.png);
			}
		}
		.active-today {
			color: #ff9600;
			.icon-tips {
				background-image: url(../../../static/img/tips1.png);
			}
			.icon-img {
				background-image: url(../../../static/img/photo1.png);
			}
			.icon-msg {
				background-image: url(../../../static/img/sixin1.png);
			}
		}
		.timeline-list {
			padding-bottom: 20px;
			box-sizing: border-box;
		}
		.timeline-list>li {
			height: auto;
			padding: 24px 0;
			display: flex;
			position: relative;
			.left-line {
				display: block;
				width: 108px;
				padding-left: 15px;
				padding-top: 7px;
				box-sizing: border-box;
				p {
					color: inherit;
					font-size: 12px;
					margin-bottom: 3px;
				}
				h3 {
					font-size: 12px;
					font-weight: normal;
					color: #666;
				}
			}
			.vertical-line {
				position: absolute;
				top: -15px;
				left: 108px;
				width: 2px;
				height: 100%;
				background: #d5e1e1;
			}
			.right-line {
				flex: 1;
				padding-left: 25px;
				box-sizing: border-box;
				div {
					span {
						font-size: 15px;
						color: #333;
						font-weight: normal;
					}
					em {
						font-size: 12px;
						font-style: normal;
					}
				}
				ul {
					height: auto;
					/*overflow: hidden;*/
					display: flex;
					li {
						flex: 1;
						height: 12px;
						padding: 5px 0;
						background-size: auto 100%;
						background-repeat: no-repeat;
						list-style: none;
						text-indent: 27px;
						line-height: 12px;
						font-size: 12px;
						position: relative;
						span {
							position: absolute;
							z-index: 9999;
							left: 53px;
							top: -3px;
							padding: 1px 3px;
							box-sizing: border-box;
							height: 14px;
							font-size: 12px;
							text-indent: 0;
							border-radius: 6px;
							background: red;
							color: #fff;
						}
					}
					/*.icon-tips {
						background-image: url(../../static/img/tips1.png);
					}
					.icon-img {
						background-image: url(../../static/img/photo1.png);
					}
					.icon-msg {
						background-image: url(../../static/img/sixin1.png);
					}*/
				}
				h3 {
					font-size: 12px;
					color: #666;
					font-weight: normal;
					margin-bottom: 8px;
				}
			}
			.icon-line {
				position: absolute;
				top: 0;
				left: -11px;
				bottom: 0;
				margin: auto;
				left: 98px;
				width: 22px;
				height: 22px;
				img {
					width: 100%;
				}
			}
		}
	}
	
	.kcb-topbar {
		height: 45px;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		background: #ffffff;
		background: linear-gradient(to bottom, #92c1ed, #84bef3);
		display: flex;
		z-index: 999;
		em {
			flex: 1;
			min-width: 50px;
		}
		ul {
			flex: 3;
			display: flex;
			overflow: hidden;
			.tips {
				position: relative;
			}
			.tips:before {
				position: absolute;
				content: '';
				right: 10px;
				margin: auto;
				top: 10px;
				width: 8px;
				height: 8px;
				background: red;
				border-radius: 50%;
			}
			.active {
				position: relative;
				color: #fff;
			}
			.active:after {
				position: absolute;
				content: '';
				left: 0;
				right: 0;
				margin: auto;
				bottom: 6px;
				width: 30%;
				height: 2px;
				background: #fff;
				border-radius: 1px;
			}
			li {
				flex: 1;
				padding: 0 10px;
				list-style: none;
				line-height: 44px;
				color: #363636;
				font-size: 16px;
				text-align: center;
			}
		}
		.right-icon {
			position: absolute;
			right: 0;
			height: 44px;
			width: 44px;
			text-align: center;
			img {
				margin: 11px auto;
				height: 22px;
			}
		}
	}
</style>