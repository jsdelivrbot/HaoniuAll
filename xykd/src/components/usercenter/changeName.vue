<template>
	<section class="chenge-box">
		<v-header title="修改昵称"></v-header>
		<group>
			<x-input v-model="nickName" placeholder="给自己起一个好听的名字吧!"></x-input>
		</group>
		<div class="global_btn_wrapper">
			<p class="btn active" @click="change">确认修改</p>
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
				nickName: JSON.parse(localStorage.getItem('userInfo')).nickName
			}
		},
		methods: {
			change() {
				if(this.nickName === '') {
					this.$vux.toast.text('请填写昵称哦!', 'middle')
					return false
				}
				this.$http.post('api/user/modify', {
					nickName: this.nickName
				}).then(
					(res) => {
						if(res.data.result === 0) {
							let userinfo = JSON.parse(localStorage.getItem('userInfo'))
							userinfo.nickName = this.nickName
							localStorage.setItem('userInfo', JSON.stringify(userinfo))
							this.$vux.toast.text('修改成功!', 'middle')
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.chenge-box {
		padding-top: 60px;
		box-sizing: border-box;
	}
</style>