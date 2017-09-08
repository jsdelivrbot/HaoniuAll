<template>
	<div class="changepwd">
		<goback title='修改密码'></goback>
		<group>
			<x-input title="原密码" v-model="old" placeholder="请输入原密码"></x-input>
			<x-input title="新密码" v-model="news" placeholder="请输入新密码"></x-input>
		</group>

		<div class="btn">
			<x-button type="primary" action-type="button" @click.native='change()'>确认修改</x-button>
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
				old: '',
				news: ''
			}
		},
		methods: {
			change() {
				if(this.old === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入原密码!'
					})
					return false
				}
				if(this.news === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入新密码!'
					})
					return false
				}

				this.$http.get(this.lchttp + '/app/user/updatePassword', {
					params: {
						oldPassword: this.old,
						newPassword: this.news
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '密码修改成功!'
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: res.data.msg
							})
						}
						console.log(res.data)
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