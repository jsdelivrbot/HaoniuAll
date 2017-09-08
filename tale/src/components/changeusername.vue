<template>
	<div class="changepwd">
		<goback title='修改昵称'></goback>
		<group>
			<x-input title="昵称" v-model="nickname" placeholder="请输入新昵称"></x-input>
		</group>

		<div class="btn">
			<x-button type="primary" action-type="button" @click.native='surechange()'>确认修改</x-button>
		</div>

	</div>
</template>
<script>
	import { XInput, Group, XButton } from 'vux'
	import goback from '../components/goback'

	export default {
		components: {
			XInput,
			Group,
			XButton,
			goback
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				nickname: ''
			}
		},
		methods: {
			surechange() {
				if(this.nickname) {
					this.change()
				} else {
					this.$vux.alert.show({
						title: '提示',
						content: '昵称不能为空!'
					})
				}
			},
			change() {
				this.$http.get(this.lchttp + '/app/user/updateNickname', {
					params: {
						nickname: this.nickname
					}
				}).then(
					(res) => {
						let $this = this
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '昵称修改成功!',
								onHide() {
									$this.$router.push('/userinfo')
								}
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
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
	.changepwd {
		padding-top: 50px;
		box-sizing: border-box;
		.btn {
			padding: 20px 10px;
			box-sizing: border-box;
		}
	}
</style>