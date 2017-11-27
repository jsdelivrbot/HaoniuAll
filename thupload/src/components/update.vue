<template>
	<div class="update">
		<div class="update_box">
			<div class="left" @click="showLeft(true)">
				<img src="../../static/img/my.png" />
			</div>
			<div class="title" @click="userLocation">
				文明太湖
			</div>
			<router-link tag='div' to='info' class="right">
				<img src="../../static/img/msg.png" />
			</router-link>
		</div>

		<div style="height: calc(100vh - 244px);">
			<div class="add_map" style="height: calc(100vh - 244px);" id='map'>
			</div>
		</div>

		<router-link tag='div' to='woyaoshangbao' class="submit">
			<button class="pub_button">我要上报</button>
		</router-link>
		<router-link tag='div' to='shangbaojilu' class="submit">
			<button class="pub_button">上报记录</button>
		</router-link>
		<!--fixed-->
		<div class="fixed" v-show="fixedShow">
			<div class="half">
				<div class="person_pic">
					<img :src="avatar" />
				</div>
				<router-link tag='p' to='/personal_data' class="personal_data">
					个人资料
				</router-link>
				<router-link tag='p' to='/change_pass' class="change_pass">
					修改密码
				</router-link>
				<router-link tag='p' to='/help' class="help">
					帮助中心
				</router-link>
				<router-link tag='p' to='/wmkb' class="help">
					文明快报
				</router-link>
				<router-link tag='p' to='/about_us' class="about_us">
					关于我们
				</router-link>
				<p class="back_login" @click="tuichu">
					退出登录
				</p>
			</div>
			<div class="other" @click="showLeft(false)"></div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'updata',
		data() {
			return {
				fixedShow: false,
				localmap: '',
				isapp: false,
				userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
				avatar: '',
				httpUrl: localStorage.getItem('http'),
				changUvatarShow: false
			}
		},
		created() {
			if(this.isapp) {
				this.localmap.show()
			}
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			if(this.userInfo) {
				this.avatar = this.httpUrl + this.userInfo.avatarUrl
			} else {
				this.avatar = '../../static/img/avatar.png'
			}
		},
		mounted() {
			let $this = this
			setTimeout(function() {
				mui.plusReady(function() {
					$this.isapp = true
					$this.localmap = new plus.maps.Map('map')
					window.closeMap = $this.localmap
					$this.userLocation()
				})
			}, 300)
		},
		methods: {
			showLeft(state) {
				if(state) {
					this.fixedShow = true
					if(this.isapp) {
						this.localmap.hide()
					}
				} else {
					if(this.isapp) {
						this.localmap.show()
					}
					this.fixedShow = false
				}
			},
			userLocation() {
				let $this = this
				$this.localmap.showUserLocation(true)
				$this.localmap.getUserLocation(function(state, pos) {
					if(state === 0) {
						$this.localmap.setZoom(16)
						$this.localmap.setCenter(pos) //$this.createMarker(pos)
						console.log(JSON.stringify(pos))
					}
				})
			},
			createMarker(pos) {
				let marker = new plus.maps.Marker(new plus.maps.Point(pos.longitude, pos.latitude))
				marker.setLabel('1111')
				let bubble = new plus.maps.Bubble('打造最好的HTML5移动开发工具')
				marker.setBubble(bubble)
				this.localmap.addOverlay(marker)
			},
			tuichu() {
				sessionStorage.clear()
				sessionStorage.removeItem('userInfo')
				this.$router.replace('/login')
				localStorage.removeItem('phone')
				localStorage.removeItem('password')
			}
		},
		beforeRouteLeave(to, from, next) {
			if(this.isapp) {
				this.localmap.hide()
				this.fixedShow = false
				setTimeout(function() {
					next()
				})
			} else {
				next()
			}
		}
	}
</script>
<style lang="less">
	.update {
		width: 100%;
		height: 100vh;
	}
	
	.update_box {
		height: 44px;
		background: #0c81e0;
		position: relative;
		.left {
			width: 44px;
			height: 44px;
			position: absolute;
			left: 0;
			top: 0;
			text-align: center;
			img {
				margin: 13px auto;
				width: 20px;
			}
		}
		.title {
			text-align: center;
			line-height: 44px;
			color: #fff;
			font-size: 16px;
		}
		.right {
			width: 44px;
			height: 44px;
			position: absolute;
			right: 0;
			top: 0;
			text-align: center;
			img {
				margin: 13px auto;
				width: 20px;
			}
		}
	}
	
	.add_map {
		width: 100%;
		height: 400px;
		background-color: lightblue;
		opacity: 0;
	}
	
	.submit {
		margin-top: 45px;
		padding: 0 50px;
		box-sizing: border-box;
		.pub_button {
			height: 40px;
			border-radius: 3px;
			width: 100%;
			border: none;
			color: #fff;
			background: url(../../static/img/addRefrash.png);
			background: #0c81e0;
		}
	}
	
	.fixed {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		display: flex;
		flex-flow: row;
		top: 0;
		left: 0;
		.half {
			width: 50%;
			height: 100%;
			background-color: white;
			overflow: hidden;
			display: flex;
			flex-flow: column;
			.person_pic {
				margin: 100px auto 50px auto;
				width: 106px;
				height: 106px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
				}
			}
			p {
				margin: 15px auto;
				font-size: 16px;
			}
		}
		.other {
			width: 50%;
			height: 100%;
		}
	}
</style>