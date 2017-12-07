<template>
	<section class="emergency-box">
		<v-header title="紧急联系人认证"></v-header>
		<group title="联系人一">
			<x-input title="姓名" v-model='one.name' placeholder="请输入姓名"></x-input>
			<selector title="关系" placeholder="请选择关系" :options="list" v-model="one.dicid"></selector>
			<x-input title="手机号" v-model='one.phone' placeholder="请输入手机号"></x-input>
		</group>
		<group title="联系人二">
			<x-input title="姓名" v-model='two.name' placeholder="请输入姓名"></x-input>
			<selector title="关系" v-model="two.dicid" placeholder="请选择关系" :options="list"></selector>
			<x-input title="手机号" v-model='two.phone' placeholder="请输入手机号"></x-input>
		</group>

		<div class="global_btn_wrapper">
			<p v-if="one.name!==''&&two.name!==''&&one.dicid!==''&&two.dicid!==''&&one.phone!==''&&two.phone!==''" class="btn active" @click="submit">确认提交</p>
			<p v-else class="btn">确认提交</p>
		</div>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	import { XInput, Group, Selector } from 'vux'
	export default {
		name: 'nokeep',
		components: {
			'v-header': Header,
			XInput,
			Group,
			Selector
		},
		data() {
			return {
				list: [],
				linkMans: [],
				one: {
					name: '1',
					dicid: '37',
					phone: '1'
				},
				two: {
					name: '1',
					dicid: '36',
					phone: '3'
				}
			}
		},
		mounted() {
			let $this = this
			this.$ClinkMan(function(res) {
				for(var i = 0; i < res.length; i++) {
					let arr = {}
					arr.name = res[i].displayName
					if(res[i].phoneNumbers[0]) {
						arr.phone = res[i].phoneNumbers[0].value
					} else {
						arr.phone = ''
					}
					$this.linkMans.push(arr)
				}
			})
			this.$http.get('api/dic/relation', {
				params: {
					parentKey: 'family'
				}
			}).then(
				(res) => {
					this.list = res.data.obj
				}
			)
		},
		methods: {
			submit() {
				let arr = []
				arr.push(this.one)
				arr.push(this.two)
				let $this = this
				this.$vux.loading.show({
					text: '数据上传中...'
				})
				this.$http.post('api/certify/emergency', {
					emergencyArray: arr,
					contactArray: this.linkMans
				}).then(
					(res) => {
						this.$vux.loading.hide()
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '数据上传完成!',
								onHide() {
									$this.$router.go(-1)
								}
							})
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.emergency-box {
		padding-top: 50px;
		box-sizing: border-box;
		.weui-label {
			width: 70px !important;
			text-align: left;
		}
	}
</style>