<template>
	<div class="change_avatar_box">
		<return title="修改头像"></return>
		<div class="avatar">
			<img :src="avatar" />
		</div>
		<div class="submit">
			<button class="pub_button">
				选择图片
				<input type="file" @change="fileChange" ref="input" />
			</button>
			<button class="pub_button" @click="updateAvatar">确认修改</button>
		</div>
	</div>
</template>

<script>
	import Return from '@/components/Return'
	export default {
		name: 'ChangeAvatar',
		data() {
			return {
				avatar: '',
				httpUrl: localStorage.getItem('http')
			}
		},
		components: {
			Return
		},
		created() {
			let avatar = JSON.parse(sessionStorage.getItem('userInfo'))
			if(avatar) {
				this.avatar = this.httpUrl + avatar.avatarUrl
			}else {
				this.avatar = '../../static/img/avatar.png'
			}
		},
		methods: {
			fileChange() {
				this.$vux.loading.show({
					text: '正在读取图片'
				})
				const img = this.$refs.input.files[0]
				const reader = new FileReader()
				reader.onload = (e) => {
					this.avatar = e.target.result
					this.$vux.loading.hide()
				}
				reader.readAsDataURL(img)
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
								text: '上传成功'
							})
							let userInfo = sessionStorage.getItem('userInfo')
							userInfo = JSON.parse(userInfo)
							userInfo.avatarUrl = res.data.obj
							sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
							this.$router.back()
						}else {
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

<style lang="less">
	.change_avatar_box {
		min-height: 100vh;
		box-sizing: border-box;
		padding-top: 44px;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		.avatar {
			width: 140px;
			height: 140px;
			margin: 60px 0 40px;
			border-radius: 50%;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 100%;
			}
		}
		.submit {
			.pub_button {
				width: 185px;
				height: 30px;
				border-radius: 5px;
				background-color: #0c81e0;
				color: white;
				border: none;
				display: block;
				position: relative;
				&+.pub_button {
					margin-top: 10px;
				}
				input {
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					opacity: 0;
				}
			}
		}
	}
</style>