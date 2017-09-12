<template>
	<div class="list-body">
		<x-header>设置密保</x-header>

		<group>
			<x-input title="问题一" v-model='wen1' name="username" placeholder="例如:你的儿子叫什么?"></x-input>
			<x-input title="答案一" v-model='da1' name="username" placeholder="马云"></x-input>
			<x-input title="问题二" v-model='wen2' name="username"></x-input>
			<x-input title="答案" v-model='da2' name="username"></x-input>
			<x-input title="问题三" v-model='wen3' name="username"></x-input>
			<x-input title="答案" v-model='da3' name="username"></x-input>
		</group>
		<group style='padding: 0.240963rem;box-sizing: border-box;'>
			<x-button type="primary" @click.native='save()'>保存</x-button>
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
				wen1: '',
				wen2: '',
				wen3: '',
				da1: '',
				da2: '',
				da3: ''
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
			save() {
				if(this.wen1 === '' || this.wen2 === '' || this.wen3 === '' || this.da1 === '' || this.da2 === '' || this.da3 === '') {
					this.$vux.alert.show({
						title: '对不起',
						content: '请完善您的注册信息!'
					})
				} else {
					this.$http.get(this.enhttp + '/trees/mobile/user/userProblem?userId=' + this.id + '&Q1=' + this.wen1 + '&A1=' + this.da1 + '&Q2=' + this.wen2 + '&A2=' + this.da2 + '&Q3=' + this.wen3 + '&A3=' + this.da3).then(
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