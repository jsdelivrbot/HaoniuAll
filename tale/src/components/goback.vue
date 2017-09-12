<template>
	<div class="top-out-bar">
		<div @click="goback()">
			<img src="../../static/img/left.svg" class="img" />
		</div>
		<span>{{title}}</span>
		<router-link :to='islink' v-if='islink'>
			{{linkname}}
		</router-link>
		<div class="share-btn" v-if="isShare=='isShare'" @click="showAlert">
			<img src="../../static/img/39.png" />
		</div>
		<div class="share-btn-search" v-if="isShare=='isSearch'" @click="search">
			<img src="../../static/img/search.png" />
		</div>
		<div class="share-btn-login" v-if="isShare=='isLogin'&&!token" @click="gologin">
			<img src="../../static/img/8.png" />
		</div>
		<div class="alert" v-show="alertShow">
			<div class="alert-content">
				<div class="share-title">
					<h2>分享到</h2>
				</div>
				<div class="share-content">
					<div class="share-item" @click="share(2)">
						<img src="../../static/img/46.png" />
						<p>微信好友</p>
					</div>
					<div class="share-item" @click="share(0)">
						<img src="../../static/img/47.png" />
						<p>微信朋友圈</p>
					</div>
				</div>
				<div class="share-btn" @click="hideAlert">
					<p>取&nbsp消</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: String,
		islink: String,
		linkname: String,
		isShare: String,
		id: String,
		ifm: String,
		shareTitle: String
	},
	data() {
		return {
			token: localStorage.getItem('token'),
			alertShow: false
		}
	},
	methods: {
		addjf() {
			this.$http.get(this.lchttp + '/app/user/creditAdd').then(
				(res) => {
				}
			)
		},
		gologin() {
			this.$router.push('/login')
		},
		showAlert() {
			this.alertShow = true
		},
		hideAlert() {
			this.alertShow = false
		},
		share(vals) {
			const $this = this
			let shares = {}
			mui.plusReady(function() {
				plus.share.getServices(function(s) {
					for (var i in s) {
						var t = s[i]
						shares[t.id] = t
					}
					$this.abc = shares
					if (vals > 1) {
						shareAction('weixin', 'WXSceneSession')
					} else {
						shareAction('weixin', 'WXSceneTimeline')
					}
				}, function(e) { })

				function shareAction(id, ex) {
					var s = null
					if (!id || !(s = $this.abc[id])) {
						return
					}
					if (s.authenticated) {
						shareMessage(s, ex)
					} else {
						s.authorize(function() {
							shareMessage(s, ex)
						}, function(e) { })
					}
				}

				function shareMessage(s, ex) {
					var msg = {
						href: localStorage.getItem('http') + '/#' + $this.$route.path,
						title: $this.shareTitle,
						content: '',
						thumbs: [localStorage.getItem('http') + '/file/logo.png'],
						pictures: [localStorage.getItem('http') + '/file/logo.png'],
						extra: {
							scene: ex
						}
					}
					s.send(msg, function() {
						$this.$vux.alert.show({
							title: '提示',
							content: '分享成功,积分已增加!',
							onHide() {
								$this.addjf()
								$this.alertShow = false
							}
						})
					}, function(e) {
						alert('分享失败!')
					})
				}
			})
		},
		goback() {
			if (this.ifm > 0) {
				this.$router.replace('/pub/job')
				return false
			}
			this.$router.back(-1)
		},
		search() {
			this.$router.push('/search/' + this.id)
		}
	}
}
</script>
<style lang="less">
.top-out-bar:before {
	content: '';
	pointer-events: none;
	box-sizing: border-box;
	position: absolute;
	left: 0;
	bottom: 0;
	width: 200%;
	height: 1px;
	border-bottom: 1px solid #dbdbdb;
	transform: (scale(0.5));
	transform-origin: 0 0;
}

.top-out-bar {
	height: 46px;
	line-height: 46px;
	display: flex;
	padding: 0 10px;
	box-sizing: border-box;
	background: #fff;
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	width: 100%;
	div {
		width: 46px;
		height: 46px;
		position: absolute;
		left: 0;
		display: flex;
		>.img {
			margin: auto;
			width: 18px;
			height: auto;
		}
	}
	span {
		flex: 1;
		color: #333333;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-left: 20px;
	}
	a {
		position: absolute;
		right: 15px;
		font-size: 13px;
		color: #333333;
	}
}

.top-out-bar .share-btn {
	position: absolute;
	right: 0;
	left: auto;
	top: 30%;
	display: block;
	img {
		width: 18px;
		height: 18px;
		margin: auto;
	}
}

.top-out-bar .share-btn-search {
	position: absolute;
	right: 0;
	left: auto;
	top: 24%;
	display: block;
	img {
		width: 20px;
		height: 20px;
		margin: auto;
	}
}

.top-out-bar .share-btn-login {
	position: absolute;
	right: 0;
	left: auto;
	top: 24%;
	display: block;
	img {
		width: 26px;
		height: 26px;
		margin: auto;
	}
}

.top-out-bar {
	.alert {
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 9999;
		position: fixed;
		.alert-content {
			width: 100%;
			height: 260px;
			position: fixed;
			bottom: 0;
			background-color: white;
			z-index: 9999;
			display: block;
			.share-title {
				width: 100%;
				position: static;
				color: rgb(52, 164, 252);
				font-size: 20px;
				border-bottom: 1px solid rgb(240, 240, 240);
				h2 {
					margin: auto;
				}
			}
			.share-content {
				width: 79%;
				margin: auto;
				position: static;
				height: 166px;
				overflow: hidden;
				.share-item {
					width: 50%;
					height: 166px;
					position: relative;
					float: left;
					overflow: hidden;
					clear: both;
					img {
						width: 76px;
						height: 76px;
						clear: both;
						overflow: hidden;
						position: absolute;
						left: 50%;
						top: 50%;
						margin-left: -38px;
						margin-top: -60px;
					}
					p {
						height: 46px;
						position: static;
						width: 100%;
						text-align: center;
						font-size: 16px;
						margin-top: 100px;
					}
				}
			}
			.share-btn {
				width: 100%;
				text-align: center;
				position: absolute;
				top: 214px;
				p {
					background-color: rgb(245, 245, 245);
					border-top: 1px solid rgb(232, 232, 232);
					font-size: 16px;
					color: rgb(152, 152, 152);
				}
			}
		}
	}
}
</style>