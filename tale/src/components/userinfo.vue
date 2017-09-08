<template>
	<div class="userinfo-box">
		<!--<div class="top-out-bar">
			<img src="../../static/img/left.svg" />
			<span>个人资料</span>
		</div>-->
		<goback title='个人资料'></goback>
		<!--<goback title='个人资料'></goback>-->

		<div class="userImg">
			<img :src="userInfo.avatarUrl" v-if='userInfo.avatarUrl' />
			<img src="../../static/img/gscqlogo.png" v-if='!userInfo.avatarUrl' />
			<h2>{{userInfo.nickname}}</h2>
		</div>

		<group title=''>
			<cell title="昵称" :value='userInfo.nickname' is-link link='/changeusername'>
			</cell>
			<cell title="手机号" :value='userInfo.phone'>
			</cell>
			<cell title="登录密码" is-link link='/changepwd'>
			</cell>
		</group>

		<div class="btn">
			<button @click="logout">退出登录</button>
		</div>

	</div>
</template>
<script>
	import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
	import goback from '../components/goback'
	export default {
		components: {
			goback,
			Cell,
			CellBox,
			CellFormPreview,
			Group,
			Badge
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				userInfo: []
			}
		},
		mounted() {
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
			logout() {
				localStorage.removeItem('token')
				this.$router.push('/login')
			}
		}
	}
</script>
<style lang="less">
	.userinfo-box {
		background: #fff;
		min-height: 100vh;
		.userImg {
			width: 100%;
			height: auto;
			overflow: hidden;
			background: #fff;
			padding-top: 45px;
			>img {
				width: 80px;
				border-radius: 50%;
				margin: 20px auto;
			}
			h2 {
				text-align: center;
				font-size: 16px;
			}
		}
		.btn {
			position: fixed;
			bottom: 20px;
			width: 100%;
			height: auto;
			text-align: center;
		}
		button {
			background: #ff5d5c;
			height: 40px;
			width: 90%;
			border: none;
			margin: 20px auto;
			color: #fff;
			font-size: 16px;
			border-radius: 5px;
		}
	}
</style>