<template>
	<div class="driver-info-box">
		<v-header title="司机信息"></v-header>
		<group label-width="93.5">
			<x-input title="司机姓名:" placeholder="请输入姓名" :required="true" v-model="realname" :max="25"></x-input>
			<x-input title="手机号码:" placeholder="请输入手机号" :required="true" v-model="mobile_no" type="number" :max="11" disabled></x-input>
			<x-input title="身份证号:" placeholder="请输入身份证号" :required="true" v-model="id_card" type="number" :max="18"></x-input>
			<x-input title="车牌号码:" placeholder="请输入车牌号码" v-model="cart_badge_no"></x-input>
			<!--<x-input title="期望流向:" placeholder="请输入期望流向" v-model="direction_name"></x-input>-->
			<x-address title="期望流向：" v-model="addressValue" :list="addressData" hide-district placeholder="省市选择" value-text-align="left" @on-hide="chooseDirection" cancel-text="清空选择"></x-address>
			<x-input title="已选择:" placeholder="暂未选择期望流向" :value="direction_name" disabled></x-input>
		</group>
		<div class="btn" @click="goNext">
			下一步
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput, XAddress, ChinaAddressV2Data, Value2nameFilter as value2name } from 'vux'
	export default {
		data() {
			return {
				realname: '',
				mobile_no: '',
				id_card: '',
				cart_badge_no: '',
				direction_name_arry: [],
				direction_code_arry: [],
				my_driver_id: this.$route.params.id,
				addressData: ChinaAddressV2Data,
				addressValue: [],
				service_state: ''
			}
		},
		computed: {
			addressValueText() {
				let text = value2name(this.addressValue, ChinaAddressV2Data)
				return text.split(' ')
			},
			direction_name() {
				return this.direction_name_arry.join(',')
			},
			direction_code() {
				return this.direction_code_arry.join(',')
			}
		},
		components: {
			'v-header': Header,
			Group,
			XInput,
			XAddress
		},
		created() {
			let fileInfoString = sessionStorage.getItem('fileInfo')
			let fileInfo = JSON.parse(fileInfoString)
			console.log(fileInfo)
			this.realname = fileInfo.realname
			this.mobile_no = fileInfo.mobile_no
			this.id_card = fileInfo.id_card
			this.cart_badge_no = fileInfo.cart_badge_no
			this.direction_name_arry = fileInfo.direction_name.split(',')
//			console.log(fileInfo.direction_code)
			this.direction_code_arry = fileInfo.direction_code.split(',')
			this.service_state = fileInfo.service_state
		},
		methods: {
			//选择城市
			chooseDirection(params) {
				if(params) {
//					console.log(this.direction_name)
//					console.log(this.addressValueText[1])
//					console.log(this.direction_name.indexOf(this.addressValueText[1]))
					if(this.direction_name.indexOf(this.addressValueText[1]) !== -1) {
						this.$vux.toast.text('请勿重复选择期望流向')
//						this.addressValue = []
						return
					}
					//					console.log(this.direction_code_arry)
					//把城市名添加到城市数组
					this.direction_name_arry.push(this.addressValueText[1])
					//把城市编码添加到城市数组
					this.direction_code_arry.push(this.addressValue[1])
//					this.addressValue = []
//					console.log(this.addressValue)
//					console.log(this.addressValueText)
					console.log(this.direction_code_arry)
					console.log(this.direction_name_arry)
					console.log(this.direction_code)
					console.log(this.direction_name)
				}else {
					this.direction_name_arry = []
					this.direction_code_arry = []
				}
			},
			goNext() {
				if(this.service_state === '1' || this.service_state === '2') {
					this.$vux.toast.text('请先注册')
					return
				}
				if(this.realname === '') {
					this.$vux.toast.text('请输入司机姓名')
					return
				}
//				if(this.mobile_no === '') {
//					this.$vux.toast.text('请输入手机号码')
//					return
//				}
				let pattern2 = /^(1[38][0-9]|15[0-35-9]|14[579]|17[0135678])[0-9]{8}$/
				if(!pattern2.test(this.mobile_no)) {
					this.$vux.toast.text('手机号不正确，请重新输入')
					return
				}
				let pattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$/
				if(!pattern.test(this.cart_badge_no)) {
					this.$vux.toast.text('车牌号码格式有误')
					return
				}
				if(this.id_card === '') {
					this.$vux.toast.text('请填写身份证号码')
					return
				}
				let driverInfo = {
					realname: this.realname,
					mobile_no: this.mobile_no,
					id_card: this.id_card,
					cart_badge_no: this.cart_badge_no,
					direction_name: this.direction_name,
					direction_code: this.direction_code
				}
				let string = JSON.stringify(driverInfo)
				sessionStorage.setItem('driverInfo', string)
				this.$router.push('/Receipt/' + this.my_driver_id)
			}
		}
	}
</script>

<style lang="less">
	.driver-info-box {
		padding-top: 45px;
		.btn {
			width: 68%;
			height: 36px;
			background-color: #63bffe;
			margin: 50px auto 18px;
			text-align: center;
			color: white;
			line-height: 36px;
			border-radius: 18px;
			font-size: 16px;
		}
	}
</style>