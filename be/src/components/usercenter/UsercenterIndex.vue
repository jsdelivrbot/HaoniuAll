<template>
	<div class="usercenter-box">
		<div class="header-unlogged" v-if="!login">
			<div class="top-bar">
				<div class="back">
					<!--<span class="iconfont icon-fanhui" @click="back"></span>-->
					<!--<span class="text">我</span>-->
				</div>
			</div>
			<router-link to="/login" tag="div" class="login-btn">
				<p>登录</p>
			</router-link>
			<router-link to="/register" class="regin">
				注册账号&nbsp;&rsaquo;
			</router-link>
		</div>
		<div class="header-logged" v-if="login">
			<div class="master"></div>
			<div class="top-bar clearfix">
				<!--<div class="back">
					<span class="iconfont icon-fanhui" @click="back"></span>
					<span class="text">我</span>
				</div>-->
				<router-link class="go" to="/usercenter/perfect" tag="div">
					<span class="text">完善信息</span>
					<span class="iconfont icon-gengduo"></span>
				</router-link>
			</div>
			<div class="head">
				<img :src="avatar" />
			</div>
			<p class="username">{{nickname}}</p>
			<p class="usernumber">{{mobile}}</p>
		</div>
		<div class="tab border-1px">
			<router-link to="/usercenter/ShoppingCar" tag="div" class="item border-1px-right withdrawals">
				<div class="item-img">
					<img src="../../../static/usercenter/gouwuche.png" />
					<!--<badge text="1" v-if="login"></badge>-->
				</div>
				<p>我的购物车</p>
			</router-link>
			<router-link to="/usercenter/MyOrder" tag="div" class="item border-1px-right order">
				<div class="item-img">
					<img src="../../../static/usercenter/order.png" />
					<!--<badge text="1" v-if="login"></badge>-->
				</div>
				<p>订单管理</p>
			</router-link>
			<router-link to="/Getqrcode" tag="div" class="item border-1px-right coupon">
				<div class="item-img">
					<img src="../../../static/usercenter/erweimazx.png" />
					<!--<badge text="1" v-if="login"></badge>-->
				</div>
				<p>我的二维码</p>
			</router-link>
		</div>
		<group>

			<cell is-link link="/usercenter/alltask" style="height: 29px;" v-if="showAll === '1'">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="18" src="../../../static/usercenter/icon1.png" style="vertical-align:middle; display: block; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">全部任务</span>
				</span>
			</cell>
			<cell is-link link="/coupon/myCoupon" style="height: 29px;" v-if="showAll === '1'">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="18" src="../../../static/usercenter/zkquan.png" style="vertical-align:middle; display: block; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">优惠券</span>
				</span>
			</cell>
			<cell is-link link="/usercenter/sharetask" style="height: 29px;" v-if="showAll === '1'">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="20" src="../../../static/usercenter/icon15.png" style="vertical-align:middle; display: block; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">分享购任务</span>
				</span>
			</cell>
			<cell is-link link="/usercenter/collection" style="height: 29px;" v-if="showAll === '1'">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="25" src="../../../static/usercenter/icon2.png" style="vertical-align:middle; display: block; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">任务收藏</span>
				</span>
			</cell>
			<cell is-link link="/usercenter/shoppingCollection" style="height: 29px;">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="25" src="../../../static/usercenter/icon16.png" style="vertical-align:middle; display: block; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">商品收藏</span>
				</span>
			</cell>
			<cell is-link link="/usercenter/getCash" style="height: 29px;" v-if="showAll === '1'">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="25" src="../../../static/usercenter/icon14.png" style="vertical-align:middle; display: block; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">提现管理</span>
				</span>
			</cell>
			<cell is-link link="/usercenter/adress" style="height: 29px;">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="22" src="../../../static/usercenter/icon3.png" style="vertical-align:middle; display: block; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">收货地址</span>
				</span>
			</cell>
			<cell is-link style="height: 29px;" link="/fleaMarket/my" v-if="showAll === '1'">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="20" src="../../../static/usercenter/icon4.png" style="vertical-align:middle; display: block; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">我的发布</span>
				<!--<badge text="1" style="float: right; margin-top: 17px;" v-if="login"></badge>-->
				</span>
			</cell>
			<cell is-link style="height: 29px;" link="/usercenter/myActivity" v-if="showAll === '1'">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="21" src="../../../static/usercenter/icon5.png" style="vertical-align:middle; display: block; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">我的活动</span>
				<!--<badge text="1" style="float: right; margin-top: 17px;" v-if="login"></badge>-->
				</span>
			</cell>
			<cell is-link style="height: 29px;" link="/usercenter/myFree" v-if="showAll === '1'">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="21" src="../../../static/usercenter/icon13.png" style="vertical-align:middle; display: block; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">我的免单</span>
				<!--<badge text="1" style="float: right; margin-top: 17px;" v-if="login"></badge>-->
				</span>
			</cell>
			<cell is-link style="height: 29px;" link="/usercenter/infoCenter">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="22" src="../../../static/usercenter/icon6.png" style="vertical-align:middle; display: block; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">消息中心</span>
				<!--<badge text="1" style="float: right; margin-top: 17px;" v-if="login"></badge>-->
				</span>
			</cell>
			<cell is-link style="height: 29px;" link="/usercenter/setting">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="22" src="../../../static/usercenter/icon7.png" style="vertical-align:middle; display: block; margin: auto; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">系统设置</span>
				</span>
			</cell>
			<!--<cell is-link style="height: 29px;" link="/changePsd">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="22" src="../../../static/usercenter/icon8.png" 
						style="vertical-align:middle; display: block; margin: auto; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">重置密码</span>
				</span>
			</cell>-->
			<!--<cell is-link style="height: 29px;" @click.native="logout">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="22" src="../../../static/usercenter/icon9.png" style="vertical-align:middle; display: block; margin: auto; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">退出登录</span>
				</span>
			</cell>-->
		</group>
		<index-footer></index-footer>
		<!--<x-button type="warn" style="margin-top: 20px; width: 90%;" @click.native="logout"
			v-show="login">退出登录</x-button>-->
	</div>
</template>

<script>
	import { Badge, Group, Cell, XButton } from 'vux'
	import IndexFooter from '@/common/vue/IndexFooter'
	export default {
		name: 'UserCenterIndex',
		methods: {
			back() {
				this.$router.replace('/home')
			},
			logout() {
				let _this = this
				this.$vux.confirm.show({
					title: '提示',
					content: '确认退出？',
					onConfirm() {
						sessionStorage.removeItem('token')
						_this.$router.push('/login')
					}
				})
			}
		},
		components: {
			Badge,
			Group,
			Cell,
			XButton,
			IndexFooter
		},
		data() {
			return {
				login: sessionStorage.getItem('token'),
				path: this.$route.fullPath,
				httpUrl: localStorage.getItem('httpUrl'),
				//				avatar: localStorage.getItem('avatar'),
				mobile: localStorage.getItem('mobile'),
				nickname: localStorage.getItem('nickname'),
				showAll: sessionStorage.getItem('showAll')
			}
		},
		created() {
			if(!this.mobile || this.mobile === 'null') {
				this.mobile = ''
			}
			if(!this.nickname || this.nickname === 'null') {
				this.nickname = ''
			}
		},
		computed: {
			avatar() {
				if(!localStorage.getItem('avatar')) {
					return '../../../../static/usercenter/avatar.png'
				} else {
					let res = localStorage.getItem('avatar').substring(0, 4)
					if(res === 'http') {
						return localStorage.getItem('avatar')
					} else {
						return localStorage.getItem('httpUrl') + localStorage.getItem('avatar')
					}
				}
			}
		}
		//		beforeRouteEnter(to, from, next) {
		//			next(vm => {
		//				vm.login = sessionStorage.getItem('token')
		//				vm.path = vm.$route.fullPath
		//				vm.httpUrl = localStorage.getItem('httpUrl')
		//				//				avatar: localStorage.getItem('avatar')
		//				vm.mobile = localStorage.getItem('mobile')
		//				vm.nickname = localStorage.getItem('nickname')
		//			})
		//		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.usercenter-box {
		padding-bottom: 64px;
		/*未登录状态*/
		.header-unlogged {
			width: 100%;
			height: 185px;
			box-shadow: 0 4px 4px #ab9c9b;
			background-color: #e60012;
			position: relative;
			.top-bar {
				width: 100%;
				height: 44px;
				line-height: 44px;
				padding: 0 12px 0 0;
				box-sizing: border-box;
				.back {
					.icon-fanhui {
						font-size: 22px;
						color: white;
						font-weight: bold;
						vertical-align: middle;
						display: inline-block;
						padding-left: 26px;
					}
					.text {
						font-size: 16px;
						color: white;
						vertical-align: middle;
					}
				}
			}
			.login-btn {
				width: 140px;
				height: 44px;
				background-color: #e5000e;
				box-shadow: 0 2px 2px white inset, 0 2px 2px rgba(0, 0, 0, 0.6);
				border-radius: 24px;
				position: absolute;
				left: 0;
				right: 0;
				bottom: 63px;
				margin: auto;
				p {
					text-align: center;
					line-height: 44px;
					color: white;
					font-size: 18px;
				}
			}
			.regin {
				width: 100%;
				text-align: center;
				position: absolute;
				bottom: 20px;
				font-size: 14px;
				color: white;
			}
		}
		/*登录状态*/
		.header-logged {
			width: 100%;
			height: 185px;
			box-shadow: 0 4px 4px #ab9c9b;
			/*background-image: url(../../../static/usercenter/head.png);*/
			background-repeat: no-repeat;
			background-size: cover;
			position: relative;
			.master {
				width: 100%;
				height: 185px;
				position: absolute;
				z-index: 2;
				top: 0;
				left: 0;
				background-color: rgb(209, 18, 36);
			}
			.top-bar {
				width: 100%;
				height: 44px;
				line-height: 44px;
				padding: 0 12px 0 0;
				box-sizing: border-box;
				position: relative;
				z-index: 2;
				.back {
					float: left;
					.icon-fanhui {
						font-size: 22px;
						color: white;
						font-weight: bold;
						vertical-align: middle;
						padding-left: 27px;
						display: inline-block;
					}
					.text {
						font-size: 16px;
						color: white;
						vertical-align: middle;
					}
				}
				.go {
					float: right;
					.text {
						font-size: 14px;
						color: white;
						vertical-align: middle;
					}
					.icon-gengduo {
						font-size: 12px;
						color: white;
						font-weight: bold;
						padding-right: 12px;
					}
				}
			}
			.head {
				height: 80px;
				width: 80px;
				border-radius: 50%;
				/*margin: -16px auto 0;*/
				position: relative;
				z-index: 2;
				overflow: hidden;
				left: 50%;
				transform: translateX(-50%);
				margin-top: -16px;
				background-color: #999999;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					width: 100%;
				}
			}
			.username,
			.usernumber {
				position: relative;
				z-index: 2;
				text-align: center;
				color: white;
				font-size: 16px;
				line-height: 24px;
			}
			.username {
				margin-top: 10px;
			}
		}
		.tab {
			width: 100%;
			height: 64px;
			margin-top: 10px;
			background-color: white;
			display: flex;
			.border-1px(#afafaf);
			.item {
				flex: 1;
				height: 44px;
				margin-top: 10px;
				position: relative;
				.border-1px-right(#afafaf);
				&:last-child {
					.border-none;
				}
				.item-img {
					width: 26px;
					margin: auto;
					position: relative;
					img {
						display: block;
					}
					.vux-badge {
						position: absolute;
						top: -7px;
						right: -10px;
					}
				}
				p {
					text-align: center;
					font-size: 12px;
					color: #333333;
					position: absolute;
					bottom: 0;
					width: 100%;
				}
			}
			.withdrawals {
				img {
					width: 22px;
					height: 22px;
					margin: auto;
				}
			}
			.order {
				img {
					width: 18px;
					height: 20px;
					margin: auto;
				}
			}
			.coupon {
				img {
					height: 16px;
					margin: auto;
					margin-top: 3px;
				}
			}
		}
		.weui-cells {
			margin-top: 10px;
		}
	}
</style>