<template>
	<div class="personal_data_box">
		<goback title='个人资料'></goback>
		<div class="header_pic">
			<div class="pic">
				<img :src="avatar" />
			</div>
			<div class="change_pic">
				<span @click="changUvatar">修改头像</span>
				<img src="../../static/img/icon-right.jpg" />
			</div>
		</div>
		<div class="vux-1px-t"></div>
		<div class="header_pic header_pic_text">
			<p class="pic_text">昵称</p>
			<div class="change_pic" @click="changNicknameShow=true">
				<span>{{userInfo.nickname}}</span>
				<img src="../../static/img/icon-right.jpg" />
			</div>
		</div>
		<div class="vux-1px-t"></div>
		<div class="header_pic header_pic_text">
			<p class="pic_text">手机号码</p>
			<div class="change_pic">
				<span>{{userInfo.phone}}</span>
				<img src="../../static/img/icon-right.jpg" />
			</div>
		</div>
		<div class="vux-1px-t"></div>
		<!--弹层-->
		<div class="jihuo" v-show="changNicknameShow" @click="changNicknameShow=false">
			<group style="background-color: white;" title="修改昵称" @click.native.stop>
				<x-input title="新昵称" text-align='right' placeholder="请输入新昵称" v-model='newNickname' novalidate placeholder-align="right"></x-input>
				<x-button @click.native="changNickname">确认更改</x-button>
			</group>
		</div>
	</div>
</template>

<script>
	import { Group, XInput, XButton } from 'vux'
	import goback from '@/components/return'
	export default {
		name: 'personalData',
		data() {
			return {
				userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
				avatar: '',
				httpUrl: localStorage.getItem('http'),
				changNicknameShow: false,
				newNickname: ''
			}
		},
		components: {
			goback,
			Group,
			XInput,
			XButton
		},
		created() {
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			if(this.userInfo) {
				this.avatar = this.httpUrl + this.userInfo.avatarUrl
			} else {
				this.avatar = '../../static/img/avatar.png'
			}
		},
		methods: {
			changUvatar() {
				this.$router.push('/changeAvatar')
			},
			changNickname() {
				this.$http.get('/api/frontBase/user/updateNickname', {
					params: {
						nickname: this.newNickname
					}
				}).then((res) => {
					let $this = this
					if(this.newNickname === '') {
						this.$vux.alert.show({
							title: '提示',
							content: '请输入新昵称'
						})
						return
					}
					if(res.data.result === 0) {
						this.$vux.loading.hide()
						this.$vux.toast.show({
							text: '修改成功'
						})
						this.userInfo.nickname = this.newNickname
						$this.changNicknameShow = false
					} else {
						this.$vux.loading.hide()
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.personal_data_box {
		min-height: 100vh;
		padding-top: 44px;
		box-sizing: border-box;
		background-color: #f7f7f7;
		.header_pic {
			height: 130px;
			background-color: white;
			padding: 0 10px 0 15px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			.pic {
				width: 80px;
				height: 80px;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				img {
					width: 100%;
				}
			}
			.change_pic {
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
				color: #999999;
				span {
					font-size: 14px;
				}
				img {
					width: 15px;
					margin-left: 10px;
				}
			}
		}
		.header_pic_text {
			height: 60px;
		}
	}
	
	.jihuo {
		width: 100%;
		height: 100vh;
		background-color: rgba(40, 40, 40, 0.4);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>