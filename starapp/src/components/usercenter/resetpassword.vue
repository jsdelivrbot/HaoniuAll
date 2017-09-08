<template>
	<div class="resetPassword">
		<topbar title='修改密码'></topbar>
		<div class="form">
			<div class="input vux-1px-tb">
				<input type="password" v-model='old' placeholder="请输入旧密码" />
			</div>
			<div class="input vux-1px-tb">
				<input type="password" v-model='pwd' placeholder="请输入新密码" />
			</div>
			<div class="input vux-1px-tb">
				<input type="password" v-model='repwd' placeholder="请再次输入新密码" />
			</div>
		</div>
		<div class="button" style="margin-top: 30px;">
			<button @click="resetpwd()">
				提交
			</button>
		</div>
	</div>
</template>
<script>
	import topbar from '@/components/callback'
	export default {
		name: 'nokeep',
		components: {
			topbar
		},
		data() {
			return {
				old: '',
				code: '',
				pwd: '',
				repwd: '',
				codetxt: ' 发送验证码  ',
				time: 0,
				ischeck: false
			}
		},
		methods: {
			resetpwd() {
				if(this.old === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入旧密码!'
					})
					return false
				}

				if(this.pwd === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '新密码不能为空!'
					})
					return false
				}

				if(this.pwd !== this.repwd) {
					this.$vux.alert.show({
						title: '提示',
						content: '两次输入的密码不同!'
					})
					return false
				}

				this.$http.get('/user/updatePassword', {
					params: {
						oldPassword: this.old,
						newPassword: this.repwd
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.iphone = ''
							this.code = ''
							this.pwd = ''
							this.repwd = ''
							let $this = this
							localStorage.clear()
							sessionStorage.clear()
							this.$vux.alert.show({
								title: '提示',
								content: '密码修改成功,请重新登录!',
								onHide() {
									$this.$router.replace('/login')
								}
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: '密码修改失败!'
							})
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.resetPassword {
		.form {
			margin-top: 60px;
			.input {
				display: flex;
				height: 44px;
				background: #fff;
				margin-bottom: 5px;
				span {
					margin: 0 15px;
					line-height: 44px;
					text-align: center;
					font-size: 14px;
					color: #666;
					text-align: left;
					/*text-align: center;*/
				}
				input {
					flex: 1;
					border: none;
					line-height: 44px;
					font-size: 17px;
					outline: none;
					color: #333;
					text-indent: 15px;
				}
			}
		}
	}
</style>