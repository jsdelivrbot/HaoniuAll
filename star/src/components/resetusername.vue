<template>
	<div class="resetusername">
		<topbar title='用户名修改' @topSaves='save' issave=true></topbar>
		<input type="text" v-model="username" />
		<p>建议您使用真实姓名,方便老师与您联系</p>
	</div>
</template>
<script>
	import { querystring } from 'vux'
	import topbar from '../components/callback'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				localhttp: localStorage.getItem('localhttp'),
				username: ''
			}
		},
		mounted() {
			this.$http.get('/user/getNickname').then(
				(res) => {
					this.username = res.data.obj.nickname
					console.log(res.data)
				}
			)
		},
		methods: {
			save() {
				if(this.username === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '用户名不能为空!'
					})
					return false
				}

				this.$http.get('/user/updateNicname', {
					params: {
						nicKname: this.username
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							localStorage.setItem('userinfos', querystring.stringify(res.data.obj))
							this.$vux.alert.show({
								title: '提示',
								content: '修改成功!'
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: '修改失败!'
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
	.resetusername {
		padding-top: 74px;
		min-height: 100vh;
		box-sizing: border-box;
		padding-left: 15px;
		input {
			width: 100%;
			border: none;
			background: none;
			border-bottom: 1px solid #84BEF3;
			outline: none;
			font-size: 17px;
			color: #333;
			padding-bottom: 5px;
			margin-bottom: 10px;
		}
		p {
			font-size: 12px;
			color: #999;
		}
	}
</style>