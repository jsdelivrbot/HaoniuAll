<template>
	<div class="calendar">
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
		<vue-event-calendar :events="datetime" @month-changed="monthChange" @day-changed="dayChange"></vue-event-calendar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				childrenInfo: '',
				changeChildrenSelect: '',
				datetime: []
			}
		},
		mounted() {
			this.$http.get('/user/children/findChilrenByid', {
				params: {
					'childId': this.$route.params.id
				}
			}).then(
				(res) => {
					this.childrenInfo = res.data.obj
					console.log(res.data)
				}
			)

			this.$http.get('/business/timetable/getMonthBychildid', {
				params: {
					'id': this.$route.params.id
				}
			}).then(
				(res) => {
					for(var i = 0; i < res.data.obj.length; i++) {
						let arr = {}
						arr.date = res.data.obj[i]
						arr.title = 'null'
						this.datetime.push(arr)
					}
					console.log(res.data)
				}
			)
		},
		methods: {
			goback() {
				this.$router.go(-1)
			},
			monthChange(month) {
				console.log(month)
			},
			dayChange(day) {
				console.log(day)
				let dates = day.date.split('/')
				if(dates[1] < 10) {
					dates[1] = '0' + dates[1]
				}

				if(dates[2] < 10) {
					dates[2] = '0' + dates[2]
				}
				this.$router.push('/pub/kcb/weekCalendar/dateString=' + dates.join('-') + '&id=' + this.$route.params.id)
			}
		}
	}
</script>

<style type="text/css" lang="less">
	.calendar {
		background: #fff;
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
		.today .date-num {
			color: #fff;
		}
	}
</style>