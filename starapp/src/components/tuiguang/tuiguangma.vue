<template>
	<div class="tuiguangma">
		<topbar title='我的推广码' isshare='true' @sharealert='share()'></topbar>
		<img :src="img" v-if='img'>
		<div class="intro">
			<h2 class="title">
				使用说明
			</h2>
			<p>1.点击右上角分享按钮,分享该页面给您的好友;</p>
			<p>2.点开分享页面,并关注『星星点课』,即可成为您的推广下级; </p>
			<p>3.仅限首次关注星星点课并且未注册过星星点课的用户方能成功推荐。</p>
			<p>4.最终解释权归星星点课所有。</p>
		</div>

		<div class="select-share" v-show="shaershow">
			<div class="bgcolor" @click="shaershow=!shaershow"></div>
			<div class="icon-box">
				<p class="title">
					分享到
				</p>
				<ul>
					<li @click="sharewx('wx')">
						<img src="../../../static/img/wecharticon.png" />
						<span>微信好友</span>
					</li>
					<li @click="sharewx('tm')">
						<img src="../../../static/img/friendiocn.png" />
						<span>微信朋友圈</span>
					</li>
				</ul>
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
				token: sessionStorage.getItem('token'),
				img: '',
				username: '',
				shaershow: false
			}
		},
		methods: {
			sharewx(shareName) {
				let $this = this
				$this.shaershow = false
				let opt = {
					url: 'http://wx.dianke8.com/?username=' + $this.username + '#/tuiguangma',
					title: '星星点课',
					content: '快来成为星星点课会员吧，立即获得更多优惠少儿课程!',
					img: 'http://wx.dianke8.com/xxdk/logo/123.png'
				}
				this.$CwxShare(shareName, opt, function(res) {
					if(res) {
						$this.alertShow = false
						mui.toast('分享成功!')
					} else {
						mui.toast('分享失败,请重试!')
					}
				})
			},
			share() {
				this.shaershow = true
			},
			getall() {
				let $this = this
				setTimeout(function() {
					if(sessionStorage.getItem('token')) {
						$this.$http.get('/user/reward/createErwei').then(
							(res) => {
								$this.img = res.data.obj.url
								$this.username = res.data.obj.username
							}
						)
					} else {
						$this.getall()
					}
				}, 100)
			}
		},
		mounted() {
			this.getall()
		}
	}
</script>
<style lang="less">
	.tuiguangma {
		height: auto;
		overflow: hidden;
		padding-top: 46px;
		box-sizing: border-box;
		.select-share {
			width: 100%;
			height: 100vh;
			position: fixed;
			z-index: 1111111111;
			top: 0;
			left: 0;
			.bgcolor {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				background: rgba(0, 0, 0, 0.5);
			}
			.icon-box {
				padding: 15px;
				box-sizing: border-box;
				position: absolute;
				bottom: 0;
				background: #fff;
				height: auto;
				width: 100%;
				z-index: 99999999999;
				font-size: 12px;
				.title {
					color: #999;
					margin-top: 5px;
				}
				ul {
					margin-top: 15px;
					display: block;
					height: auto;
					overflow: hidden;
					li {
						display: inline-block;
						list-style: none;
						width: auto;
						margin-right: 30px;
						img {
							display: block;
							width: 49px;
							margin-bottom: 7px;
						}
						span {
							color: #333333;
							display: block;
						}
					}
				}
			}
		}
		>img {
			width: 186px;
			display: block;
			margin: auto;
			margin-top: 35px;
			margin-bottom: 43px;
		}
		.intro {
			padding: 0 15px;
			box-sizing: border-box;
			.title {
				font-size: 15px;
				color: #333;
				margin-bottom: 10px;
			}
			p {
				color: #999;
				line-height: 24px;
				font-size: 13px;
			}
		}
	}
</style>