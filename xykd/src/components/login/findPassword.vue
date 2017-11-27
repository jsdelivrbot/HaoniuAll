<template>
	<div class="find_password_box">
		<v-header title="找回密码"></v-header>

		<div class="input vux-1px-b input1">
			<input type="text" v-model="username" class="vux-1px-b" placeholder="手机号" />
		</div>

		<div class="input vux-1px-b">
			<input type="text" v-model="code" class="vux-1px-b" placeholder="请输入验证码" />
			<span @click="getCode" :class="{active:time<60}">{{codeText}}</span>
		</div>

		<div class="input vux-1px-b">
			<input type="password" v-model="password" class="vux-1px-b" placeholder="新密码(6-16位且包括字母和数字)" />
		</div>

		<div class="btn_wrapper">
			<p class="btn  active" @click="forget" v-if='username!==""&&password!==""&&code!==""'>提交</p>
			<p class="btn" v-else>提交</p>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		components: {
			'v-header': Header
		},
		data() {
			return {
				username: '18297911147',
				password: '',
				code: '',
				time: 60
			}
		},
		methods: {
			getCode() {
				if(this.username === '') {
					this.$vux.toast.text('请输入手机号!', 'middle')
					return false
				}
				let $this = this
				if(this.time < 60) {
					return false
				} else {
					this.time = 59
				}
				let codeTime = setInterval(() => {
					if($this.time <= 0) {
						$this.time = 60
						clearInterval(codeTime)
						return false
					} else {
						$this.time -= 1
					}
				}, 1000)
				this.$http.post('api/user/send', {
					phone: this.username
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.code = res.data.obj
							this.$vux.toast.text('请注意查收!', 'middle')
						}
					}
				)
			},
			forget() {
				this.$http.post('api/user/change', {
					phone: this.username,
					password: this.password,
					code: this.code
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.$vux.toast.text('修改密码成功!', 'middle')
							this.$router.replace('/login')
						}
					}
				)
			}
		},
		computed: {
			codeText() {
				if(this.time === 60) {
					return '获取验证码'
				} else {
					return this.time + 's'
				}
			}
		}
	}
</script>
<style lang="less">
	.find_password_box {
		min-height: 100vh;
		padding-top: 48px;
		background-color: white;
		box-sizing: border-box;
		.input {
			height: 48px;
			margin: 0 30px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			input {
				width: 0;
				height: 100%;
				flex: 1;
				outline: none;
				border: none;
				font-size: 12px;
				display: block;
			}
			span {
				flex: 0 0 auto;
				padding: 0 10px;
				box-sizing: border-box;
				min-width: 50px;
				display: block;
				text-align: center;
				border-radius: 15px;
				color: #D9B160;
				font-size: 13px;
				line-height: 30px;
			}
			.active {
				background: #E5E5E5;
				color: #fff;
			}
		}
		.input1 {
			margin-top: 100px;
		}
		.btn_wrapper {
			width: 100%;
			height: 50px;
			margin: 30px auto 0;
			padding: 0 30px;
			box-sizing: border-box;
			.btn {
				width: 100%;
				height: 100%;
				border-radius: 25px;
				background-color: #e5e5e5;
				font-size: 18px;
				text-align: center;
				line-height: 50px;
				color: white;
			}
			.active {
				background: #DBB76C;
			}
		}
	}
</style>