<template>
	<div class="feedback">
		<v-title title='评价与反馈'></v-title>
		<group style='margin-top: 55px;'>
			<x-textarea v-model='content' :max="125" placeholder="请输入评价与反馈"></x-textarea>
		</group>
		<group title="">
			<x-input title="联系方式" v-model='contact' placeholder="请输入联系方式"></x-input>
		</group>
		<p class="tips">请输入手机号、邮箱、QQ、微信等联系方式</p>
		<div class="button">
			<button @click="tomsg()">
				提交
			</button>
		</div>

	</div>
</template>
<script>
	import title from '../components/callback'
	import { XTextarea, Group, XInput } from 'vux'
	export default {
		components: {
			XTextarea,
			Group,
			XInput,
			'v-title': title
		},
		data() {
			return {
				localhttp: localStorage.getItem('localhttp'),
				content: '',
				contact: ''
			}
		},
		methods: {
			tomsg() {
				if(this.content === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请填写您的反馈信息!'
					})
					return false
				}
				if(this.contact === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请填写您的联系方式!'
					})
					return false
				}
				this.$http.get('/business/orderEvaluate/createAppEvaluate', {
					params: {
						phone: this.contact,
						content: this.content
					}
				}).then(
					(res) => {
						let $this = this
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '反馈成功!',
								onHide() {
									$this.contact = ''
									$this.content = ''
								}
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
	.feedback {
		height: auto;
		overflow: hidden;
		.tips {
			padding: 0 15px;
			box-sizing: border-box;
			color: #999;
			font-size: 13px;
			margin-top: 10px;
		}
	}
</style>