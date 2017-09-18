<template>
	<div class="reg">
		<topbar title='绑定手机'></topbar>
		<div class="form">
			<div class="input vux-1px-tb">
				<input type="text" v-model='iphone' placeholder="请输入11位手机号" />
				<span @click="getCode">{{codetxt}}</span>
			</div>
			<div class="input vux-1px-tb">
				<input type="text" v-model='code' placeholder="请输入短信验证码" />
			</div>
			<div class="input vux-1px-tb">
				<input type="password" v-model='pwd' placeholder="请输入6-18位密码" />
			</div>
			<div class="input vux-1px-tb">
				<input type="password" v-model='repwd' placeholder="重复密码" />
			</div>
			<div class="check">
				<check-icon :value.sync="ischeck"></check-icon>
				<span>
					<em>已阅读并同意 </em>
					<router-link to='/compact'>
						星星点课用户注册协议
					</router-link>
				</span>
			</div>
		</div>
		<div class="button">
			<button @click="reg()">
				确定
			</button>
		</div>
	</div>
</template>
<script>
	import { CheckIcon, querystring } from 'vux'
	import topbar from '../components/callback'
	export default {
		name: 'nokeep',
		components: {
			topbar,
			CheckIcon
		},
		data() {
			return {
				id: this.$route.params.id,
				iphone: '',
				code: '',
				pwd: '',
				repwd: '',
				headUrl: '',
				codetxt: ' 发送验证码  ',
				time: 0,
				ischeck: false
			}
		},
		methods: {
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
						type: 0
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
			},
			reg() {
				if(!(/^1[1-9][0-9]\d{4,8}$/.test(this.iphone))) {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入正确的手机号码!'
					})
					return false
				}

				if(this.pwd.length < 6) {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入6-18位密码!'
					})
					return false
				}

				if(this.repwd === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请再次输入密码!'
					})
					return false
				}

				if(this.repwd !== this.pwd) {
					this.$vux.alert.show({
						title: '提示',
						content: '两次输入的密码不一致!'
					})
					return false
				}

				if(!this.ischeck) {
					this.$vux.alert.show({
						title: '提示',
						content: '请同意用户协议!'
					})
					return false
				}

				this.$http.get('/weixin/updateLoginWeixin', {
					params: {
						userId: this.id,
						phone: this.iphone,
						password: this.repwd,
						phoneCode: this.code
					}
				}).then(
					(res) => {
						let $this = this
						if(res.data.result === 0) {
							localStorage.removeItem('username')
							localStorage.setItem('loginname', this.iphone)
							localStorage.setItem('loginpwd', this.repwd)
							sessionStorage.setItem('regpath', 'regs')
							this.$vux.alert.show({
								title: '成功!',
								content: '恭喜您,注册成功!',
								onHide() {
									sessionStorage.setItem('token', res.data.obj.token)
									localStorage.setItem('userinfos', querystring.stringify(res.data.obj))
									$this.$http.defaults.headers.get['token'] = res.data.obj.token
									$this.$router.replace('/pub/home')
								}
							})
						} else {
							this.$vux.alert.show({
								title: '失败',
								content: res.data.msg
							})
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">

</style>