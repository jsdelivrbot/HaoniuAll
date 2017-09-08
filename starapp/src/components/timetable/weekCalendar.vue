<template>
	<div class="weekCalendar-box" style="min-height: calc(100vh - 54px);">
		<div class="kcb-topbar">
			<em @click="goback()">
				<img src="../../../static/img/lefticon.png"/>
			</em>
			<ul>
				<li style="color: #fff;">
					{{childrenInfo.name}}
				</li>
			</ul>
			<em></em>
			<div class="right-icon">
				<router-link to='/pub/kcb'>
					<img src="../../../static/img/timeline.png" />
				</router-link>
			</div>
		</div>

		<div class="weekCalendar-bar">
			<ul>
				<li @click="clickDay(item.dateString)" v-for="item in weekinfo" :class="{tips:item.status==0,active:item.dateString==selectDay}">
					<p>{{item.week.substring(2,3)}}</p>
					<div>{{item.dateString.substring(8,10)}}</div>
				</li>
			</ul>
		</div>

		<div class="timeline-box">
			<h2 class="title vux-1px-b">
				{{timeline.someDay}}
			</h2>

			<div v-if='!timeline.list' class="no-course">
				今日暂无课程安排
			</div>

			<ul class="timeline-list" v-if='timeline.list!==""'>
				<li class="vux-1px-b" :class="{'active-two':item.xing==2,'active-today':item.xing==0,'active-before':item.xing==1}" v-for='item in timeline.list'>
					<div>
						<h2>{{item.classTimeString}}</h2>
						<router-link tag='p' v-if='item.xing==0' :to='"/videoDetail/"+item.id'>
							{{item.liveBroadcast}}
						</router-link>
						<p v-if='item.xing!==0'>{{item.liveBroadcast}}</p>
					</div>
					<h2>{{item.courseName}}</h2>
					<p>地址:{{item.address}}</p>
					<ul>
						<router-link tag='li' :to="'/tips/'+item.id+'/'+childrenId" class="icon-tips">
							通知
							<span v-if="item.countNotiec>0">
								{{item.countNotiec}}
							</span>
						</router-link>
						<router-link tag='li' class="icon-img" :to='"/databank/"+childrenId+"/"+item.id'>
							相册
						</router-link>

						<router-link class="icon-msg" tag='li' :to='"/msg/"+childrenId+"/"+item.id'>
							私信
							<span v-if="item.countMessage>0">
									{{item.countMessage}}
							</span>
						</router-link>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { querystring } from 'vux'
	export default {
		data() {
			return {
				childrenId: '',
				childrenInfo: '',
				weekinfo: '',
				selectDay: '',
				timeline: {
					list: '',
					someDay: ''
				},
				datetime: []
			}
		},
		mounted() {
			this.selectDay = querystring.parse(this.$route.params.id).dateString
			this.childrenId = querystring.parse(this.$route.params.id).id
			this.$http.get('/user/children/findChilrenByid', {
				params: {
					'childId': this.childrenId
				}
			}).then(
				(res) => {
					this.childrenInfo = res.data.obj
				}
			)
			this.getweekinfo()
			this.getTimeline()
		},
		methods: {
			getTimeline() {
				this.$http.get('/business/timetable/getDayBychildid', {
					params: {
						'id': this.childrenId,
						'dateString': this.selectDay
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.timeline = res.data.obj
						} else if(res.data.result === -26) {
							this.timeline = res.data.obj
						} else {
							this.timeline = ''
						}
						console.log(res.data)
					}
				)
			},
			getweekinfo() {
				this.$http.get('/business/timetable/getWeekBychildid', {
					params: {
						'id': this.childrenId,
						'dateString': this.selectDay
					}
				}).then(
					(res) => {
						this.weekinfo = res.data.obj
					}
				)
			},
			goback() {
				this.$router.go(-1)
			},
			clickDay(day) {
				this.selectDay = day
				this.getTimeline()
			}
		}
	}
</script>
<style lang="less">
	.weekCalendar-box {
		min-height: 100vh;
		box-sizing: border-box;
		background: #fff;
		.timeline-box {
			.no-course {
				text-align: center;
				line-height: 220px;
				color: #666;
			}
			>.title {
				height: 36px;
				line-height: 36px;
				font-size: 14px;
				color: #333;
				padding: 0 15px;
				box-sizing: border-box;
				font-weight: normal;
			}
			.timeline-list {
				padding: 0px 0 15px 15px;
				box-sizing: border-box;
				>li {
					list-style: none;
					padding-bottom: 10px;
					box-sizing: border-box;
					div {
						margin-top: 10px;
						display: flex;
						height: 20px;
						overflow: hidden;
						margin-bottom: 8px;
						h2 {
							font-weight: normal;
							font-size: 20px;
							height: 20px;
							line-height: 20px;
							margin-right: 10px;
						}
						p {
							margin-top: 6px;
							height: 12px;
							line-height: 12px;
							font-size: 12px;
							color: inherit;
						}
					}
					>h2 {
						font-size: 15px;
						color: #333;
						font-weight: normal;
						margin-bottom: 5px;
					}
					p {
						font-size: 12px;
						color: #666;
						margin-bottom: 4px;
					}
					ul {
						display: flex;
						li {
							height: 12px;
							padding: 5px 0;
							background-size: auto 100%;
							background-repeat: no-repeat;
							list-style: none;
							text-indent: 27px;
							line-height: 12px;
							font-size: 12px;
							margin-right: 12px;
						}
					}
				}
			}
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
		}
		.kcb-topbar em img {
			margin: 13px 0;
			padding: 0 15px;
			padding-top: 0px;
			padding-right: 15px;
			padding-bottom: 0px;
			padding-left: 15px;
			display: block;
			height: 18px;
		}
		.weekCalendar-bar {
			width: 100%;
			overflow: hidden;
			background: #F8F8F8;
			height: 65px;
			padding: 10px 5px;
			padding-top: 5px;
			box-sizing: border-box;
			ul {
				display: flex;
				font-size: 13px;
				.active div {
					width: 25px;
					height: 25px;
					background: #ff3c29;
					margin: auto;
					border-radius: 50%;
					color: #fff;
				}
				.tips:before {
					position: absolute;
					content: '';
					bottom: -9px;
					width: 6px;
					height: 6px;
					left: 0;
					right: 0;
					margin: auto;
					border-radius: 50%;
					background: #ff3c29;
				}
				li {
					flex: 1;
					height: 44px;
					list-style: none;
					text-align: center;
					position: relative;
					p {
						line-height: 18px;
					}
					div {
						line-height: 26px;
					}
				}
			}
		}
	}
</style>