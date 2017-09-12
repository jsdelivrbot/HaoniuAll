<template>
	<div class="list-body">
		<x-header>修改密码</x-header>

		<group>
			<x-input title="原一级密码" v-model='yyi' name="username"></x-input>
			<x-input title="一级密码" v-model='yi' name="username"></x-input>
			<x-input title="原二级密码" v-model='yer' name="username"></x-input>
			<x-input title="二级密码" v-model='er' name="username"></x-input>
		</group>
		<group style='padding: 0.240963rem;box-sizing: border-box;'>
			<x-button type="primary" @click.native='change()'>确认修改</x-button>
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
				yyi: '',
				yi: '',
				yer: '',
				er: ''
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
			change() {
				if(this.yyi === '' || this.yi === '' || this.yer === '' || this.er === '') {
					this.$vux.alert.show({
						title: '对不起',
						content: '请完善您的注册信息!'
					})
				} else {
					this.$http.get(this.enhttp + '/trees/mobile/user/modifyPassword?userId=' + this.id + '&oriPassword=' + this.yyi + '&newPassword=' + this.yi + '&oriDealPassword=' + this.yer + '&newDealPassword=' + this.er).then(
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