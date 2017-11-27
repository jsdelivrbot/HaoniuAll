<template>
	<div class="reg_box">
		<goback title='找回密码'></goback>
		<div class="form_box vux-1px-b">
			<x-input type="tel" placeholder="请输入11位手机号码" v-model='phone'>
				<x-button slot="right" style='background: #0c81e0;' type="primary" mini @click.native="sendCode">{{word}}</x-button>
			</x-input>
			<x-input placeholder="请输入验证码" v-model="phoneCode">
			</x-input>
			<x-input type="password" placeholder="请输入密码" v-model='pwd1'></x-input>
			<x-input type="password" placeholder="请确认密码" v-model='pwd2'></x-input>
		</div>

		<div class="submit">
			<button class="pub_button" @click="find">提交</button>
		</div>
	</div>
</template>
<script>
	import { XInput, Group, XButton, Cell } from 'vux'
	import goback from '@/components/return'
	export default {
		name: 'forget',
		components: {
			goback,
			XInput,
			Group,
			XButton,
			Cell
		},
		data() {
			return {
				phone: '',
				pwd1: '',
				pwd2: '',
				password: '',
				phoneCode: '',
				word: '发送验证码',
				isOvertime: false
			}
		},
		methods: {
			sendCode() {
				if(this.phone === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入手机号'
					})
					return
				}
				if(this.isOvertime) {
					return false
				}
				let that = this
				let time = 60
				var sendTimer = setInterval(function() {
					that.isOvertime = true
					time--
					that.word = '重新发送' + time
					if(time < 0) {
						that.isOvertime = false
						clearInterval(sendTimer)
						that.word = '获取验证码'
					}
				}, 1000)
				this.$http.get('/api/common/sendPhoneCode', {
					params: {
						phone: this.phone
					}
				}).then((res) => {
					console.log(res)
					if(res.data.result === 0) {
						this.$vux.loading.hide()
						this.$vux.toast.show({
							text: '发送成功'
						})
					} else {
						this.$vux.loading.hide()
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				})
			},
			find() {
				if(this.phone === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入手机号'
					})
					return
				}
				if(this.phoneCode === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入验证码'
					})
					return
				}
				if(this.pwd1 === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入新密码'
					})
					return
				}
				if(this.pwd2 === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请再次输入新密码'
					})
					return
				}
				if(this.pwd1 !== this.pwd2) {
					this.$vux.alert.show({
						title: '提示',
						content: '两次输入不一致'
					})
					return
				}
				this.$http.get('/api/frontBase/user/updateForgetPassword', {
					params: {
						phone: this.phone,
						password: this.pwd1,
						phoneCode: this.phoneCode
					}
				}).then((res) => {
					console.log(res)
					if(res.data.result === 0) {
						this.$vux.loading.hide()
						this.$vux.toast.show({
							text: '修改成功'
						})
						//跳转路由
						this.$router.replace('/login')
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

</style>