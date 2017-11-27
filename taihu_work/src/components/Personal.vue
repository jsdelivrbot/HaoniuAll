<template>
	<div class="personal_box">
		<return title='个人资料'></return>
		<div class="header_pic" @click="changeImg">
			<div class="img">
				<img class="pic" :src="avatar" />
			</div>
			<div class="change_pic">
				<span>修改头像</span>
				<img src="../../static/img/icon-right.jpg" />
			</div>
			<input type="file" class="input_img" @change="updateAvatar" ref="input" />
		</div>
		<group style="margin-top: -20px;">
			<cell title="姓名" :value="userInfo.nickname"></cell>
			<cell title="所在职位" :value="departmentName + ' · ' + userInfo.position"></cell>
			<cell title="用户名" :value="userInfo.phone" is-link></cell>
		</group>
	</div>
</template>

<script>
	import Return from '@/components/Return'
	import { Group, Cell } from 'vux'
	export default {
		name: 'Personal',
		data() {
			return {
				userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
				httpUrl: localStorage.getItem('http'),
				departmentName: sessionStorage.getItem('departmentName')
			}
		},
		computed: {
			avatar() {
				if(this.userInfo.avatarUrl) {
					return this.httpUrl + this.userInfo.avatarUrl
				} else {
					return '../../static/img/avatar.png'
				}
			}
		},
		components: {
			Return,
			Group,
			Cell
		},
		created() {
//			console.log(this.userInfo)
//			this.$http.get('/api/frontBase/user/findUserDetail')
//				.then((res) => {
//					if(res.data.result === 0) {
//						console.log(res)
//						this.departmentName = res.data.obj.departmentName
//					}
//				})
		},
		methods: {
			changeImg() {
//				this.$router.push('/changeAvatar')
			},
			updateAvatar() {
				this.$vux.loading.show({
					text: '正在上传'
				})
				const img = this.$refs.input.files[0]
				const formData = new FormData()
				const config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				formData.append('file', img)
				this.$http.post('/api/frontBase/user/uploadAvatar', formData, config)
					.then((res) => {
//						console.log(res)
						this.$vux.loading.hide()
						if(res.data.result === 0) {
							this.$vux.toast.show({
								text: '修改成功'
							})
							this.userInfo.avatarUrl = res.data.obj
							let userInfo = sessionStorage.getItem('userInfo')
							userInfo = JSON.parse(userInfo)
							userInfo.avatarUrl = res.data.obj
							sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
						}else {
							this.$vux.alert.show({
								title: '提示',
								content: res.data.msg
							})
						}
					})
			},
			changeNickname() {
				let $this = this
				this.$vux.confirm.prompt('输入昵称', {
					title: '修改昵称',
					onShow() {
						$this.$vux.confirm.setInputValue($this.userInfo.nickname)
					},
					onConfirm(value) {
						$this.$vux.loading.show({
							text: '正在修改'
						})
						$this.$http.get('/api/frontBase/user/updateNickname', {
							params: {
								nickname: value
							}
						}).then((res) => {
							$this.$vux.loading.hide()
							if(res.data.result === 0) {
								$this.$vux.toast.show({
									text: '修改成功'
								})
								$this.userInfo.nickname = value
								sessionStorage.setItem('userInfo', JSON.stringify($this.userInfo))
							}else {
								$this.$vux.alert.show({
									title: '提示',
									content: res.data.msg
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.personal_box {
		min-height: 100vh;
		background-color: #f7f7f7;
		padding-top: 44px;
		box-sizing: border-box;
		.header_pic {
			height: 130px;
			background-color: white;
			padding: 0 15px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			position: relative;
			.img {
				width: 80px;
				height: 80px;
				border-radius: 50%;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				.pic {
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
			.input_img {
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				opacity: 0;
			}
		}
		.weui-cell {
			font-size: 14px;
			padding: 15px;
		}
	}
</style>