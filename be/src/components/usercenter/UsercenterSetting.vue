<template>
	<div class="usercenter-setting">
		<v-header title="系统设置"></v-header>
		<div class="list">
			<cell is-link style="height: 29px;" link="/usercenter/BindingPhoneNew" v-show="login && mobile === ''">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="22" src="../../../static/usercenter/icon12.png" style="vertical-align:middle; display: block; margin: auto; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">安全手机</span>
				</span>
				<span slot="default" style="font-size: 14px;">{{mobile}}</span>
			</cell>
			<cell style="height: 29px;" v-show="login && mobile !== ''">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="22" src="../../../static/usercenter/icon12.png" style="vertical-align:middle; display: block; margin: auto; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">安全手机</span>
				</span>
				<span slot="default" style="font-size: 14px;">{{mobile}}</span>
			</cell>
			<cell is-link style="height: 29px;" link="/changePsd" v-show="login">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="22" src="../../../static/usercenter/icon8.png" style="vertical-align:middle; display: block; margin: auto; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">重置密码</span>
				</span>
			</cell>
			<cell is-link style="height: 29px;" @click.native="clear">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="22" src="../../../static/usercenter/icon10.png" style="vertical-align:middle; display: block; margin: auto; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">清除缓存</span>
				</span>
			</cell>
			<cell is-link style="height: 29px;" link="/usercenter/AboutUs">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="22" src="../../../static/usercenter/icon11.png" style="vertical-align:middle; display: block; margin: auto; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">关于我们</span>
				</span>
			</cell>
			<cell is-link style="height: 29px;" @click.native="logout" v-show="login">
				<div slot="icon" style="width: 26px; margin-right: 20px;">
					<img slot="icon" width="22" src="../../../static/usercenter/icon9.png" style="vertical-align:middle; display: block; margin: auto; margin: auto;">
				</div>
				<span slot="title">
        			<span style="font-size: 14px; line-height: 49px;">退出登录</span>
				</span>
			</cell>
		</div>
		<loading :show="show" text="正在清理"></loading>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Cell, Loading } from 'vux'
	export default {
		components: {
			'v-header': Header,
			Cell,
			Loading
		},
		methods: {
			clear() {
				this.show = true
				setTimeout(() => {
					this.show = false
					this.$vux.toast.show({
						text: '缓存清理成功!',
						time: '1000'
					})
				}, 4000)
			},
			logout() {
				let _this = this
				this.$vux.confirm.show({
					title: '提示',
					content: '确认退出？',
					onConfirm() {
						sessionStorage.clear()
						localStorage.clear()
						//判断是否显示全部
						_this.$http.get('getData/index.php?m=home&c=Form&a=showMenu', {
								params: {
									seachdata: {
										versions: '1.0101'
									}
								}
							})
							.then((res) => { //		console.log(res)
								if(res.data.result === 0) {
									sessionStorage.setItem('showAll', '0')
								} else {
									sessionStorage.setItem('showAll', '1')
								}
							})
						//						localStorage.setItem('httpUrl', 'http://afx.hfrjkf.cn/')
						localStorage.setItem('httpUrl', 'http://aifengxiang.hfrjkf.cn/')
						_this.$http.defaults.baseURL = localStorage.getItem('httpUrl')
						localStorage.setItem('newUser', 'notNew')
						sessionStorage.setItem('city', '')
						sessionStorage.setItem('cityPosition', '')
						sessionStorage.setItem('counties', '')
						_this.$http.defaults.headers.get['token'] = ''
						//						_this.$router.replace('/usercenter')
						_this.$router.back(-2)
					}
				})
			}
		},
		data() {
			return {
				show: false,
				login: sessionStorage.getItem('token')
			}
		},
		computed: {
			mobile() {
				let mobile = localStorage.getItem('mobile')
				if(mobile === 'null' || !mobile) {
					return ''
				} else {
					return mobile
				}
			}
		}
	}
</script>

<style lang="less">
	.usercenter-setting {
		padding-top: 44px;
		.list {
			margin-top: 10px;
			background-color: white;
		}
	}
</style>