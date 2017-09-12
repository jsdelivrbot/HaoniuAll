<template>
	<div class="userCenter-box">
		<div class="userinfo">
			<router-link v-if='isLogin' to='/userinfo'>
				<img :src="userInfo.avatarUrl" v-if='userInfo.avatarUrl' />
				<img src="../../static/img/gscqlogo.png" v-if='!userInfo.avatarUrl' />
				<h2 v-if="!isLogin">未登录</h2>
				<p v-if="!isLogin">点击登录</p>
				<h2 v-else-if="isLogin">
					{{userInfo.nickname}}
				</h2>
			</router-link>

			<router-link to='/login' v-if='!isLogin'>
				<img :src="userInfo.avatarUrl" v-if='userInfo.avatarUrl' />
				<img src="../../static/img/gscqlogo.png" v-if='!userInfo.avatarUrl' />
				<h2 v-if="!isLogin">未登录</h2>
				<p v-if="!isLogin">点击登录</p>
				<h2 v-else-if="isLogin">
					{{userInfo.nickname}}
				</h2>
			</router-link>
		</div>

		<group title='个人中心'>
			<cell title="我的积分" is-link link='/integral'>
				<img slot="icon" width="28" style="margin-right: 10px;" src="../../static/img/35.png">
			</cell>
			<cell title="我的收藏" is-link link='/collect'>
				<img slot="icon" width="28" style="margin-right: 10px;" src="../../static/img/34.png">
			</cell>
		</group>

		<group title='系统设置'>
			<cell title="将此APP推荐给好友" is-link @click.native='share(2)'>
				<img slot="icon" width="28" style="margin-right: 10px;" src="../../static/img/32.png">
			</cell>
			<cell title="给这个软件美言评价几句" is-link link='/goodsay'>
				<img slot="icon" width="28" style="margin-right: 10px;" src="../../static/img/33.png">
			</cell>
			<cell title="清除缓存" is-link @click.native='clear()'>
				<img slot="icon" width="28" style="margin-right: 10px;" src="../../static/img/36.png">
			</cell>
		</group>

		<group title='建议反馈'>
			<cell title="关于我们" is-link link='/about'>
				<img slot="icon" width="28" style="margin-right: 10px;" src="../../static/img/31.png">
			</cell>
			<cell title="意见反馈--投诉通道" is-link link='/feedback'>
				<img slot="icon" width="28" style="margin-right: 10px;" src="../../static/img/37.png">
			</cell>
		</group>

	</div>

</template>
<script>
	import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
	export default {
		components: {
			Cell,
			CellBox,
			CellFormPreview,
			Group,
			Badge
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				userInfo: {},
				isLogin: false
			}
		},
		created() {
			this.$http.get(this.lchttp + '/app/user/info', {
				headers: {
					token: localStorage.getItem('token')
				}
			}).then(
				(res) => {
					if(res.data.result === 0) {
						this.isLogin = true
						this.userInfo = res.data.obj
					} else {
						localStorage.removeItem('token')
						this.isLogin = false
						this.loginUrl = '/login/' + encodeURIComponent('/pub/my')
					}
				}
			)
		},
		methods: {
			share(vals) {
				const $this = this
				let shares = {}
				mui.plusReady(function() {
					plus.share.getServices(function(s) {
						for(var i in s) {
							var t = s[i]
							shares[t.id] = t
						}
						$this.abc = shares
						if(vals > 1) {
							shareAction('weixin', 'WXSceneSession')
						} else {
							shareAction('weixin', 'WXSceneTimeline')
						}
					}, function(e) {})

					function shareAction(id, ex) {
						var s = null
						if(!id || !(s = $this.abc[id])) {
							return
						}
						if(s.authenticated) {
							shareMessage(s, ex)
						} else {
							s.authorize(function() {
								shareMessage(s, ex)
							}, function(e) {})
						}
					}

					function shareMessage(s, ex) {
						var msg = {
							href: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.haoniu.gscq',
							title: '民间骨事',
							content: '分享：有缓解颈肩腰腿痛小妙方，超实用！',
							thumbs: [localStorage.getItem('http') + '/file/logo.png'],
							pictures: [localStorage.getItem('http') + '/file/logo.png'],
							extra: {
								scene: ex
							}
						}
						s.send(msg, function() {
							$this.$vux.alert.show({
								title: '提示',
								content: '分享成功!'
							})
						}, function(e) {
							alert('分享失败!')
						})
					}
				})
			},
			clear() {
				this.$vux.toast.show({
					text: '缓存清理成功!'
				})
			}
		}
	}
</script>
<style lang="less">
	.userCenter-box {
		min-height: 100vh;
		background: #f3f3f3;
		padding-bottom: 100px;
	}
	
	.userinfo {
		height: 180px;
		background: #fff;
		overflow: hidden;
		text-align: center;
		padding: 20px;
		box-sizing: border-box;
		a {
			display: block;
		}
		img {
			display: block;
			width: 90px;
			margin: auto;
			margin-bottom: 10px;
			border: 0.5px solid #707070;
			border-radius: 50%;
		}
		h2 {
			font-size: 16px;
			line-height: 30px;
			color: #3c3c3c;
		}
		p {
			color: #666;
			font-size: 13px;
		}
	}
</style>