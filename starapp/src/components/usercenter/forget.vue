<template>
	<div class="resetPassword">
		<topbar title='找回密码'></topbar>
		<div class="form">
			<div class="input vux-1px-tb">
				<input type="text" v-model='iphone' placeholder="请输入手机号码" />
			</div>
			<div class="input vux-1px-tb">
				<input type="text" v-model='code' placeholder="输入验证码" />
				<span @click="getCode">{{codetxt}}</span>
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
		components: {
			topbar
		},
		data() {
			return {
				iphone: '',
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
				if(this.iphone === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入正确的手机号码!'
					})
					return false
				}

				if(this.code === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入正确的验证码!'
					})
					return false
				}

				if(this.pwd === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '密码不能为空!'
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

				this.$http.get('/user/updateBackPassword', {
					params: {
						phone: this.iphone,
						phoneCode: this.code,
						password: this.repwd
					}
				}).then(
					(res) => {
						let $this = this
						if(res.data.result === 0) {
							this.iphone = ''
							this.code = ''
							this.pwd = ''
							this.repwd = ''
							this.$vux.alert.show({
								title: '提示',
								content: '密码修改成功!',
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
						console.log(res.data)
					}
				)
			},
			getCode() {
				if(this.time > 0) {
					return false
				}
				if(!(/^1[1-9][0-9]\d{4,8}$/.test(this.iphone))) {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入正确的手机号码!'
					})
					return false
				}
				let $this = this
				this.time = 60
				this.$http.get('/sendPhoneCode', {
					params: {
						phone: this.iphone,
						type: 2
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '获取成功,请注意查看!'
							})
							$this.codetime()
						} else {
							$this.time = 60
							this.$vux.alert.show({
								title: '提示',
								content: '获取失败,请重试!'
							})
						}
						console.log(res.data)
					}
				)
			},
			codetime() {
				let $this = this
				if(this.time >= 0) {
					setTimeout(function() {
						$this.codetxt = '(' + $this.time + 's)重新发送'
						$this.time--
							$this.codetime()
					}, 1000)
				} else {
					$this.codetxt = '发送验证码'
				}
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