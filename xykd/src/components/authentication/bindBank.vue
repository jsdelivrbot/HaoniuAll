<template>
	<section class="bind_bank-box">
		<v-header title="绑定银行卡"></v-header>
		<group>
			<x-input title="手机号码" v-model='bankInfo.mobile' disabled placeholder="请输入银行卡号"></x-input>
			<x-input title="真实姓名" v-model='bankInfo.realName' disabled placeholder="请输入银行卡号"></x-input>
			<x-input title="身份证号" v-model='bankInfo.cardNo' disabled placeholder="请输入银行卡号"></x-input>
			<x-input title="银行卡号" v-model='bankInfo.bankcard' placeholder="请输入银行卡号"></x-input>
		</group>

		<div class="global_btn_wrapper">
			<p class="btn active" v-if="bankInfo.bankcard!==''" @click="submit">确认提交</p>
			<p v-else class="btn">确认提交</p>
		</div>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	import { XInput, Group } from 'vux'
	export default {
		components: {
			'v-header': Header,
			XInput,
			Group
		},
		data() {
			return {
				bankInfo: ''
			}
		},
		mounted() {
			this.getInfo()
		},
		methods: {
			submit() {
				this.$http.get('api/certify/bankCertify', {
					mobile: this.bankInfo.mobile,
					cardNo: this.bankInfo.cardNo,
					bankcard: this.bankInfo.bankcard,
					realName: this.bankInfo.realName
				}).then(
					(res) => {
						if(res.data.result === 0) {
							alert('提交成功!')
						}
					}
				)
				//							let $this = this
				//							plus.webview.getLaunchWebview().setStyle({
				//								height: '64px',
				//								zindex: 1111
				//							})
				//							mui.openWindow({
				//								url: 'http://empty.chenbowen.cc?token=' + sessionStorage.getItem('token') + '&bank=' + $this.bank,
				//								id: 'bank',
				//								styles: {
				//									top: '20px',
				//									bottom: '0px',
				//									zindex: 1
				//								},
				//								show: {
				//									autoShow: true,
				//									aniShow: 'slide-in-right'
				//								},
				//								waiting: {
				//									autoShow: true,
				//									title: '正在加载...'
				//								}
				//							})
			},
			getInfo() {
				debug
				this.$http.get('api/user/userInfo').then(
					(res) => {
						this.bankInfo = res.data.obj
						console.log(res.data)
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.bind_bank-box {
		padding-top: 60px;
		box-sizing: border-box;
	}
</style>