<template>
	<div class="collect-box">
		<topbar title='我的收藏' :isshow='topbarstatus'></topbar>
		<div class="tabbar">
			<ul>
				<li :class="[tabbar==1?'active':'']" @click="change(1)">
					课程
				</li>
				<li :class="[tabbar==2?'active':'']" @click="change(2)">
					授课点
				</li>
			</ul>
		</div>
		<courselist v-if='tabbar==1' :data='course'></courselist>
		<jigoulist v-if='tabbar==2' :list='jigou'></jigoulist>
		<div class="null" v-if='tabbar==1&&course==""'>
			您的收藏为空~~~
		</div>

		<div class="null" v-if='tabbar==2&&jigou==""'>
			您的收藏为空~~~
		</div>
	</div>
</template>
<script>
	import topbar from '../components/callback'
	import courselist from '../components/courselist'
	import jigoulist from '../components/jigoulist'

	export default {
		components: {
			topbar,
			courselist,
			jigoulist
		},
		data() {
			return {
				tabbar: 1,
				token: sessionStorage.getItem('token'),
				course: [],
				jigou: [],
				topbarstatus: false
			}
		},
		mounted() {
			let $this = this
			this.$http.get('/user/watch/watchMyCourse', {
				params: {
					lng: localStorage.getItem('lng'),
					lat: localStorage.getItem('lat')
				}
			}).then(
				(res) => {
					if(res.data.result === 0) {
						this.course = res.data.obj
					}
				}
			)

			this.$http.get('/user/watch/watchMySchool', {
				params: {
					lng: localStorage.getItem('lng'),
					lat: localStorage.getItem('lat')
				}
			}).then(
				(res) => {
					if(res.data.result === 0) {
						this.jigou = res.data.obj
					}
					console.log(res.data)
				}
			)
		},
		methods: {
			change(num) {
				this.tabbar = num
			}
		}
	}
</script>
<style lang="less">
	.collect-box {
		height: auto;
		overflow: hidden;
		min-height: 100vh;
		padding-top: 45px;
		padding-bottom: 60px;
		box-sizing: border-box;
		padding-top: 92px;
		.null {
			padding: 150px 0;
			box-sizing: border-box;
			text-indent: 112px;
			font-size: 17px;
			color: #999;
		}
		.tabbar {
			height: auto;
			overflow: hidden;
			padding: 7px 16px;
			box-sizing: border-box;
			background: #fff;
			position: fixed;
			z-index: 999;
			top: 45px;
			width: 100%;
			ul {
				display: flex;
				border: 1px solid #84BEF3;
				border-radius: 4px;
				li {
					height: 29px;
					line-height: 30px;
					list-style: none;
					flex: 1;
					text-align: center;
					font-size: 13px;
					color: #84BEF3;
				}
				.active {
					color: #fff;
					background: #84BEF3;
				}
			}
		}
	}
</style>