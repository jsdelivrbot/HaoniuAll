<template>
	<div class="change_psw_box">
		<goback title='修改密码'></goback>
		<div class="group">
			<x-input title="原密码" type="password" label-width="100px" placeholder="请输入原密码" v-model="password1" :min="6" :max="20"></x-input>
			<x-input title="设置新密码" type="password" label-width="100px" placeholder="请输入6-20位字符" v-model="password2" :min="6" :max="20"></x-input>
			<x-input title="确认密码" type="password" v-model="password3" label-width="100px" placeholder="请再次输入新密码" :equal-with="password2"></x-input>
		</div>
		<div class="submit">
			<button class="pub_button" @click="change">提交</button>
		</div>
	</div>
</template>

<script>
	import { XInput, Group, XButton, Cell } from 'vux'
	import goback from '@/components/Return'

	export default {
		name: 'ChangePsw',
		components: {
			goback,
			XInput,
			XButton,
			Group,
			Cell
		},
		data() {
			return {
				password1: '',
				password2: '',
				password3: '',
				password: ''
			}
		},
		methods: {
			change() {
				if(this.password1 === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入原密码'
					})
					return
				}
				if(this.password2 === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入新密码'
					})
					return
				}
				if(this.password3 === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请再次输入新密码'
					})
					return
				}
				if(this.password2 !== this.password3) {
					this.$vux.alert.show({
						title: '提示',
						content: '两次密码输入不一致'
					})
					return
				}
				this.$vux.loading.show({
					text: '正在修改'
				})
				this.$http.get('/api/frontBase/user/updatePassword', {
					params: {
						oldPassword: this.password1,
						password: this.password2
					}
				}).then((res) => {
//					console.log(res)
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
	.change_psw_box {
		height: 100vh;
		background-color: #f7f7f7;
		padding-top: 44px;
		box-sizing: border-box;
		.group {
			background-color: white;
		}
		.submit {
			margin-top: 45px;
			padding: 0 50px;
			box-sizing: border-box;
			.pub_button {
				height: 40px;
				border-radius: 3px;
				width: 100%;
				border: none;
				color: #fff;
				background: #0c81e0;
			}
		}
	}
</style>