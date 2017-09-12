<template>
	<div class="list-body">
		<x-header>开发果园</x-header>
		<group>
			<x-input title="手机号" v-model='username' name="username" placeholder="账号" is-type="china-mobile"></x-input>
			<x-input type='text' v-model='nicName' title="被注册人昵称" name="username" placeholder="被注册人昵称"></x-input>
			<x-input type='password' v-model='passwords' title="一级密码" name="username" placeholder="登录密码(一级密码)"></x-input>
			<x-input type='password' v-model='dbpwd' title="二级密码" name="username" placeholder="交易密码（二级密码）"></x-input>
			<x-input type='text' v-model='tuUserPhone' title="推荐人手机号" name="username" placeholder="推荐人手机号"></x-input>
			<x-input type='password' v-model='dangDealPassword' title="当前用户二级密码" name="username" placeholder="交易密码（二级密码）"></x-input>
		</group>
		<group style='padding: 0.240963rem;box-sizing: border-box;'>
			<x-button type="primary" @click.native='gotoreg()'>注册会员</x-button>
		</group>
	</div>
</template>
<script>
	import { XHeader, XButton, Flexbox, FlexboxItem, XInput, Group } from 'vux'
	export default {
		data() {
			return {
				enhttp: localStorage.getItem('htppurl'),
				id: '',
				username: '',
				passwords: '',
				dbpwd: '',
				tuUserPhone: '',
				dangDealPassword: '',
				nicName: ''
			}
		},
		components: {
			XHeader,
			XButton,
			Flexbox,
			FlexboxItem,
			XInput,
			Group
		},
		mounted() {
			let id = localStorage.getItem('id')
			this.id = id
		},
		methods: {
			gotoreg() {
				if(this.id === '' || this.username === '' || this.passwords === '' || this.dbpwd === '' || this.tuUserPhone === '' || this.dangDealPassword === '' || this.nicName === '') {
					this.$vux.alert.show({
						title: '对不起',
						content: '请完善您的注册信息!'
					})
				} else {
					this.$http.get(this.enhttp + '/trees/mobile/user/appReg?loginUserId=' + this.id + '&userPhone=' + this.username + '&userPassword=' + this.passwords + '&dealPassword=' + this.dbpwd + '&tuUserPhone=' + this.tuUserPhone + '&dangDealPassword=' + this.dangDealPassword + '&nicName=' + this.nicName).then(
						(res) => {
							let $this = this
							if(!res.data.success) {
								this.show = false
								this.$vux.alert.show({
									title: '对不起',
									content: res.data.message
								})
							} else {
								this.show = false
								this.$vux.alert.show({
									title: '恭喜您',
									content: res.data.message,
									onHide() {
										$this.$router.go(0)
									}
								})
							}
						}
					)
				}
			}
		}

	}
</script>
<style lang="less">

</style>