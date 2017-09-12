<template>
	<div class="list-body">
		<x-header>用户信息</x-header>
		<group>
			<!--<x-input title="二级密码" v-model='erjimima' name="username" is-type="china-mobile"></x-input>-->
			<cell title="账号" :value="phone"></cell>
			<!--<cell title="姓名" :value="username"></cell>-->
			<x-input type='text' v-model='username' title="昵称" name="username"></x-input>
		</group>
		<group>
			<x-textarea title="备注" v-model="beizhu"></x-textarea>
		</group>
		<flexbox style='margin-top: 0.240963rem;padding: 0 0.240963rem;box-sizing: border-box;'>
			<flexbox-item>
				<x-button type="primary" @click.native='querenxiugai'>确认修改</x-button>
			</flexbox-item>
		</flexbox>

	</div>
</template>
<script>
	import { XHeader, XButton, Flexbox, FlexboxItem, XInput, Group, Cell, XTextarea } from 'vux'
	export default {
		components: {
			XHeader,
			XButton,
			Flexbox,
			FlexboxItem,
			XInput,
			Group,
			Cell,
			XTextarea
		},
		data() {
			return {
				enhttp: localStorage.getItem('htppurl'),
				id: '',
				username: '',
				erjimima: '',
				phone: '',
				beizhu: ''

			}
		},
		mounted() {
			let id = localStorage.getItem('id')
			this.id = id
			this.$http.get(this.enhttp + '/trees/mobile/user/getUserInfo?userId=' + this.id).then(
				(res) => {
					if(!res.data.success) {
						this.$vux.alert.show({
							title: '对不起',
							content: res.data.message
						})
					} else {
						this.username = res.data.data.nickName
						this.phone = res.data.data.userPhone
						this.beizhu = res.data.data.remark
						console.log(res.data)
					}
				}
			)
		},
		methods: {
			querenxiugai() {
				this.$http.get(this.enhttp + '/trees/mobile/user/updateUserInfo?nickName=' + this.username + '&remark=' + this.beizhu + '&userId=' + this.id).then(
					(res) => {
						if(!res.data.success) {
							this.$vux.alert.show({
								title: '对不起',
								content: res.data.message
							})
						} else {
							this.$vux.alert.show({
								title: '恭喜您',
								content: res.data.message
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