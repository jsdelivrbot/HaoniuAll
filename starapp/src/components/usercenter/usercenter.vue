<template>
	<div class="user-center">

		<div class="top">
			<div class="bg">
				<img src="../../../static/img/usercenterbg.png" />
			</div>
			<div class="userimg">
				<img :src="userInfo.avatarUrl" v-if='userInfo.avatarUrl' />
			</div>
			<h2>{{userInfo.nickname}}</h2>

			<router-link tag='div' to='/setuserinfo' class="set">
				<img src="../../../static/img/seticon.png" />
				<span>设置</span>
			</router-link>
		</div>

		<group class='sm-margin'>
			<cell title='我的订单' is-link link='/myorder'></cell>
			<cell title='我的收藏' link='/collect' is-link></cell>
			<cell title='我的推广' link='/generalize' is-link></cell>
			<cell title='我的转换豆' is-link link='/dou'></cell>
			<cell title='我的优惠券' is-link link='/coupon'></cell>
		</group>

		<group class='sm-margin'>
			<cell title='子女信息' is-link link='/childrenlist'></cell>
		</group>

		<!--<group class='sm-margin'>
			<cell title='评价与反馈' link='/feedback' is-link></cell>
			<cell title='关于我们' link='/about' is-link></cell>
		</group>

		<group class='sm-margin'>
			<cell title='退出登录' is-link @click.native='outlogin'></cell>
		</group>-->

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
				token: sessionStorage.getItem('token'),
				userInfo: querystring.parse(localStorage.getItem('userinfos'))
			}
		},
		activated() {
			this.userInfo = querystring.parse(localStorage.getItem('userinfos'))
			window.scrollTo(0, 0)
		},
		mounted() {
			window.scrollTo(0, 0)
		}
	}
</script>
<style lang="less">
	.user-center {
		height: auto;
		overflow: hidden;
		min-height: 100vh;
		padding-bottom: 64px;
		box-sizing: border-box;
		.sm-margin .weui-cells {
			margin-top: 15px;
		}
		.userimg {
			width: 77px;
			height: 77px;
			overflow: hidden;
			margin: auto;
			border-radius: 50%;
			background: url(../../../static/img/loginlogo.png);
			background-size: 100% 100%;
			img {
				display: block;
				width: 100%;
			}
		}
		.top {
			width: 100%;
			height: 125px;
			/*background: url(../../../static/img/../../static/img/usercenterbg.png) no-repeat center;*/
			background-size: 100% 100%;
			padding: 15px 0;
			text-align: center;
			position: relative;
			box-sizing: border-box;
			.bg {
				width: 100%;
				height: 125px;
				z-index: -1;
				position: absolute;
				top: 0;
				left: 0;
				img {
					display: block;
					width: 100%;
				}
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
			>img {
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
		}
	}
</style>