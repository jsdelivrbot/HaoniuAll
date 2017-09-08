<template>
	<div class="user-center">
		<div class="top">
			<img :src="userInfo.avatarUrl" />
			<h2>{{userInfo.nickname}}</h2>

			<router-link tag='div' to='/setuserinfo' class="set">
				<img src="../../static/img/seticon.png" />
				<span>设置</span>
			</router-link>
		</div>

		<group>
			<cell title='我的订单' is-link link='/myorder'></cell>
			<cell title='我的推广' link='/generalize' is-link></cell>
			<cell title='我的转换豆' is-link link='/dou'></cell>
			<cell title='我的优惠券' is-link link='/coupon'></cell>
		</group>
		<group>
			<cell title='子女信息' link='/childrenlist' is-link></cell>
		</group>
	</div>
</template>
<script>
	import { Cell, Group, querystring } from 'vux'
	export default {
		components: {
			Cell,
			Group
		},
		data() {
			return {
				localhttp: localStorage.getItem('localhttp'),
				token: sessionStorage.getItem('token'),
				userInfo: []
			}
		},
		activated() {
			this.userInfo = querystring.parse(localStorage.getItem('userinfos'))
		},
		mounted() {
			function GetQueryString(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				var r = window.location.search.substr(1).match(reg)
				if(r != null) return unescape(r[2])
				return ''
			}

			if(GetQueryString('token').length === 32) {
				sessionStorage.setItem('token', GetQueryString('token'))
				this.$http.defaults.headers.get['token'] = sessionStorage.getItem('token')
				this.logins()
			} else {
				this.userInfo = querystring.parse(localStorage.getItem('userinfos'))
			}
		},
		methods: {
			logins() {
				let $this = this
				if(sessionStorage.getItem('token')) {
					this.$http.get('/personal', {
						headers: {
							token: sessionStorage.getItem('token')
						}
					}).then(
						(res) => {
							this.userInfo = res.data.obj
							console.log(res.data)
						}
					)
				} else {
					this.$vux.alert.show({
						title: '提示!',
						content: '您还没有登录,请先登录!',
						onHide() {
							$this.$router.replace('/login')
						}
					})
				}
			}
		}
	}
</script>
<style lang="less">
	.user-center {
		height: auto;
		overflow: hidden;
		min-height: 100vh;
		padding-bottom: 54px;
		box-sizing: border-box;
		.top {
			width: 100%;
			height: 125px;
			background: url(../../static/img/usercenterbg.png) no-repeat center;
			background-size: 100% 100%;
			padding: 15px 0;
			text-align: center;
			box-sizing: border-box;
			img {
				width: 77px;
				margin: auto;
				display: block;
				border-radius: 50%;
			}
			h2 {
				font-size: 17px;
				color: #fff;
				font-weight: normal;
			}
			.set {
				position: absolute;
				top: 10px;
				right: 15px;
				height: 22px;
				display: flex;
				img {
					display: block;
					width: 22px;
					margin-right: 3px;
				}
				span {
					color: #fff;
					line-height: 23px;
					font-size: 14px;
				}
			}
		}
	}
</style>