<template>
	<section class="zhima-box">
		<v-header title="芝麻信用"></v-header>
		<group>
			<x-input v-model="username" placeholder="真实姓名"></x-input>
			<x-input v-model="idcard" placeholder="身份证号码"></x-input>
			<x-input v-model="address" placeholder="居住地"></x-input>
		</group>

		<div class="global_btn_wrapper">
			<p class="btn active" @click="submit" v-if='username!==""&&idcard!==""&&address!==""'>立即授权</p>
			<p class="btn" v-else>下一步</p>
		</div>

	</section>
</template>

<script>
	import { XInput, Group } from 'vux'
	import Header from '@/components/element/header'
	export default {
		components: {
			'v-header': Header,
			XInput,
			Group
		},
		data() {
			return {
				username: '陈博文',
				idcard: '340123199509081413',
				address: '合肥'
			}
		},
		methods: {
			submit() {
				if(this.idcard.length < 18) {
					this.$vux.toast.text('请输18位身份证号!', 'middle')
					return false
				}
				this.$http.post('api/certify/zmCertify', {
					name: this.username,
					idCard: this.idcard,
					address: this.address
				}).then(
					(res) => {
						if(res.data.result === 0) {
							mui.openWindow({
								url: res.data.obj,
								id: 'zhima',
								styles: {
									top: '44px',
									bottom: '0px'
								},
								show: {
									autoShow: true,
									aniShow: 'slide-in-right'
								},
								waiting: {
									autoShow: true,
									title: '正在加载...'
								}
							})
						}
					}
				)
			}
		},
		beforeRouteLeave(to, from, next) {
			try {
				if(plus.webview.getWebviewById('zhima') !== null) {
					plus.webview.getWebviewById('zhima').close()
					next(false)
				} else {
					next()
				}
			} catch(err) {
				next()
			}
		}
	}
</script>
<style lang="less">
	.zhima-box {
		min-height: 100vh;
		padding-top: 50px;
		box-sizing: border-box;
		overflow: hidden;
	}
</style>