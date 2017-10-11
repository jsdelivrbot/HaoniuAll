<template>
	<div class="sure-sign-in-box2">
		<v-header title="确认签收"></v-header>
		<group>
			<cell title="签单照片上传" is-link style="height: 40px;" link="/SureSignIn">
				<span class="value" v-if="img">已上传</span>
			</cell>
		</group>
		<group>
			<x-textarea title="填写备注" v-model="sign_content"></x-textarea>
		</group>
		<div class="btn" @click="sure" v-show="!loading">
			确认修改
		</div>
		<div class="btn disabled" v-show="loading">
			正在上传
			<spinner type="ios-small"></spinner>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, Cell, XTextarea, Spinner } from 'vux'
	export default {
		data() {
			return {
				img: sessionStorage.getItem('signInImg'),
				token: sessionStorage.getItem('token'),
				waybill_id: this.$route.params.id,
				sign_content: '',
				loading: false
			}
		},
		components: {
			'v-header': Header,
			Cell,
			Group,
			XTextarea,
			Spinner
		},
		created() {
//			let img = sessionStorage.getItem('signInImg')
//			if(img) {
//				return
//			}
//			this.$http.get('waybill/html/get/v1/sign_detail/' + this.waybill_id + '?token=' + this.token)
//				.then((res) => {
//					console.log(res)
//					if(res.data.data.sign_img_url !== '') {
//						sessionStorage.setItem('signInImg', res.data.data.sign_img_url)
//					}
//				})
		},
		methods: {
			sure() {
				if(!this.img) {
					this.$vux.toast.text('未上传图片')
					return
				}
				this.loading = true
				this.$http.post('waybill/html/post/v1/sign_confirm?token=' + this.token, {
					data: {
						waybill_id: this.waybill_id,
						sign_img_url: this.img,
						sign_content: this.sign_content
					}
				}).then((res) => {
					this.loading = false
					if(res.data.result.reCode === '0') {
						this.$vux.toast.text('提交成功')
						setTimeout(() => {
							this.$router.push('/OrderDetail/' + this.waybill_id)
						}, 500)
					}else {
						this.$vux.toast.text(res.data.result.reInfo)
					}
					sessionStorage.removeItem('signInImg')
					this.img = ''
//					console.log(res)
				})
			}
		}
	}
</script>

<style lang="less">
	.sure-sign-in-box2 {
		padding-top: 45px;
		.value {
			display: block;
			width: 56px;
			height: 20px;
			font-size: 14px;
			line-height: 20px;
			text-align: center;
			color: #fb9646;
			border: 1px solid #fb9646;
			border-radius: 8px;
			margin-right: 10px;
		}
		.btn {
			width: 68%;
			height: 36px;
			background-color: #ffce4e;
			margin: 50px auto 18px;
			text-align: center;
			color: white;
			line-height: 36px;
			border-radius: 18px;
			font-size: 16px;
		}
		.disabled {
			background-color: #999999;
		}
	}
</style>