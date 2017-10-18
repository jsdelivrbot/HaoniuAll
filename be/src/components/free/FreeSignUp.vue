<template>
	<div class="free-sign-up-box">
		<v-header title="填写报名信息"></v-header>
		<group labelWidth="85px">
			<x-input title="姓名：" v-model="username"></x-input>
			<x-input title="联系电话：" v-model="phone"></x-input>
		</group>
		<p class="text">
			*中奖信息会通过短信的方式发送到您的手机，请注意查看
		</p>
		<x-button style="margin-top: 20px; background-color: #e60012; color: white; width: 80%;" @click.native="goSignUp">
			确定抽奖
		</x-button>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Group, XInput, XButton } from 'vux'
	export default {
		name: 'FreeSignUp',
		components: {
			'v-header': Header,
			Group,
			XInput,
			XButton
		},
		methods: {
			goSignUp() {
				//				console.log(this.username)
				//				console.log(this.phone)
				if(this.username === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请填写姓名'
					})
					return
				}
				if(this.phone.length !== 11) {
					this.$vux.alert.show({
						title: '提示',
						content: '请填写正确的手机号码'
					})
					return
				}
				this.$http.get('getData/index.php?m=home&c=Form&a=infoJoin', {
					params: {
						seachdata: {
							'info_id': this.$route.params.id,
							'username': this.username,
							'phone': this.phone,
							'action_type': 5
						}
					}
				}).then((res) => {
					console.log(res)
					let $this = this
					if(res.data.datastatus === 1) {
						this.$vux.alert.show({
							title: '提示',
							content: '报名成功',
							onHide() {
								$this.$router.back(-1)
							}
						})
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.message
						})
					}
				})
			}
		},
		data() {
			return {
				username: '',
				phone: ''
			}
		}
	}
</script>

<style lang="less">
	.free-sign-up-box {
		padding-top: 44px;
		.weui-cell {
			font-size: 14px;
			.weui-label {
				color: #707070;
			}
		}
		.text {
			width: 100%;
			height: 60px;
			background-color: white;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			color: #707070;
		}
	}
</style>