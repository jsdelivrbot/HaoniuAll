<template>
	<section class="chenge-box">
		<v-header title="修改密码"></v-header>
		<group>
			<x-input title="验证码" v-model="code" class="weui-vcode">
				<x-button :class='{active:isGetCode}' @click.native='getCode' slot="right" type="primary" mini style='background: #E5E5E5;'>{{awaitText}}</x-button>
			</x-input>
			<x-input title="新密码" type='password' v-model="newpwd"></x-input>
			<x-input title="确认密码" type='password' v-model="pwd"></x-input>
		</group>

		<div class="global_btn_wrapper">
			<p class="btn active" @click="change" v-if="code!==''&&newpwd!==''&&pwd!==''">确认修改</p>
			<p class="btn" v-else>确认修改</p>
		</div>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	import { XInput, Group, XButton } from 'vux'
	export default {
		components: {
			'v-header': Header,
			XInput,
			Group,
			XButton
		},
		data() {
			return {
				userInfo: JSON.parse(localStorage.getItem('userInfo')),
				newpwd: '',
				pwd: '',
				code: '',
				isGetCode: true,
				awaitText: '获取验证码'
			}
		},
		methods: {
			getCode() {
				if(!this.isGetCode) {
					this.$vux.toast.text('验证码已发送!', 'middle')
					return false
				}
				this.$http.post('api/user/send', {
					phone: this.userInfo.phone
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.code = res.data.obj
							this.isGetCode = false
							let $this = this
							let time = 59
							let timeOut = setInterval(() => {
								if(time >= 0) {
									$this.awaitText = time + 's'
									time--
								} else {
									$this.awaitText = '获取验证码'
									$this.isGetCode = true
									clearInterval(timeOut)
								}
							}, 1000)
						}
					}
				)
			},
			change() {
				if(this.newpwd !== this.pwd) {
					this.$vux.toast.text('两次密码不一致!', 'middle')
					return false
				}
				this.$http.post('api/user/change', {
					phone: this.userInfo.phone,
					password: this.pwd,
					code: this.code
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.$vux.toast.text('修改成功!', 'middle')
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.chenge-box {
		padding-top: 60px;
		box-sizing: border-box;
		.active {
			background: #D9B160 !important;
		}
	}
</style>