<template>
	<div class="vehicle-info-box">
		<v-header title="运单修改"></v-header>
		<group>
			<x-input title="承运车辆：" :value="formInfo.driver_name + '，' + formInfo.cart_badge_no + '，' + formInfo.mobile_no" :disabled="true"></x-input>
		</group>
		<group label-width="102px">
			<x-input title="运单号:" placeholder="请输入运单号" v-model="formInfo.waybill_no"></x-input>
			<!--<x-input title="装货地:" placeholder="请输入装货地" :required="true">
				<span slot="right" style="color: #63bffe;">*必填</span>
			</x-input>-->
			<div class="address vux-1px-t">
				<x-address title="装货地" :list="addressData" placeholder="请选择装货地" value-text-align="left" v-model="beginValue" @on-hide="test"></x-address>
				<p class="label">*必选</p>
			</div>
			<!--<x-input title="卸货地:" placeholder="请输入卸货地" :required="true">
				<span slot="right" style="color: #63bffe;">*必填</span>
			</x-input>-->
			<div class="address vux-1px-t">
				<x-address title="卸货地" :list="addressData" placeholder="请选择卸货地" value-text-align="left" v-model="endValue"></x-address>
				<p class="label">*必选</p>
			</div>
			<!--<x-input title="起运时间:" v-model="qy_time" :required="true">
				<span slot="right" style="color: #63bffe;">*必填</span>
			</x-input>-->
			<div class="address vux-1px-t">
				<datetime v-model="qy_time" value-text-align="left" placeholder="请选择起运时间" format="YYYY-MM-DD HH:mm" title="起运时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分"></datetime>
				<!--<p class="label">*必选</p>-->
			</div>
		</group>
		<group label-width="102px">
			<x-input title="货物名称：" placeholder="请输入货物名称" v-model="goods_name"></x-input>
			<x-input title="货物数量：" placeholder="请输入货物数量" v-model="goods_num"></x-input>
			<!--<x-input title="货物单位：" placeholder="请输入货物数量单位" v-model="unit"></x-input>-->
			<selector title="货物单位" :options="unitsList" v-model="unit"></selector>
			<x-input title="运输单价：" placeholder="请输入运输单价" v-model="unit_price"></x-input>
			<x-input title="运单总价：" placeholder="请输入运单总价" v-model="total_price"></x-input>
			<x-input title="预付款：" placeholder="请输入预付款" v-model="prepayments"></x-input>
			<x-input title="回单押金：" placeholder="请输入回单押金" v-model="back_fee"></x-input>
			<div class="selector vux-1px-t">
				<selector title="项目名称" :options="optionsList" v-model="optionValueKey" placeholder="请选择项目">
				</selector>
				<!--<p class="label">*必选</p>-->
			</div>
		</group>
		<div class="btn" @click="create" v-show="!loading">
			确认
		</div>
		<div class="btn disabled" v-show="loading">
			稍等
			<spinner type="ios-small"></spinner>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput, Selector, XAddress, ChinaAddressV2Data, Value2nameFilter as value2name, Spinner, Datetime } from 'vux'
	export default {
		data() {
			return {
				optionsListAll: [],
				addressData: ChinaAddressV2Data,
				token: sessionStorage.getItem('token'),
				waybill_id: this.$route.params.id,
				loading: false,
				formInfo: {},
				//表单信息
				beginValue: [],
				endValue: [],
				qy_time: '',
				optionValueKey: '',
				goods_name: '',
				goods_num: '',
				unit_price: '',
				total_price: '',
				prepayments: '',
				back_fee: '',
				unitsList: ['吨', '方'],
				unit: '吨',
				unitKey: ''
			}
		},
		computed: {
			//发货地名称
			beginValueText() {
				let text = value2name(this.beginValue, ChinaAddressV2Data)
				return text.split(' ')
			},
			//卸货地名称
			endValueText() {
				let text = value2name(this.endValue, ChinaAddressV2Data)
				return text.split(' ')
			},
			//项目列表
			optionsList() {
				let options = []
				for(let i = 0; i < this.optionsListAll.length; i++) {
					options.push({
						key: this.optionsListAll[i].project_id,
						value: this.optionsListAll[i].project_name,
						drawee: this.optionsListAll[i].drawee,
						drawee_id: this.optionsListAll[i].drawee_id
					})
				}
				return options
			}
		},
		components: {
			'v-header': Header,
			Group,
			XInput,
			Selector,
			XAddress,
			Spinner,
			Datetime
		},
		created() {
			this.$http.get('waybill/html/get/v1/waybill_detail/' + this.waybill_id + '?token=' + this.token)
				.then((res) => {
					console.log(res)
					if(res.data.result.reCode === '0') {
						this.formInfo = res.data.data
						this.goods_name = this.formInfo.goods_name
						this.goods_num = this.formInfo.goods_num
						if(this.formInfo.unit === '') {
							this.unit = '吨'
						}else {
							this.unit = this.formInfo.unit
						}
						this.unit_price = this.formInfo.unit_price
						this.total_price = this.formInfo.total_price
						this.prepayments = this.formInfo.prepayments
						this.back_fee = this.formInfo.back_fee
//						this.$set(this.beginValue, 0, this.formInfo.begin_province_code)
//						this.beginValue = [this.formInfo.begin_province_code, this.formInfo.begin_city_code, this.formInfo.begin_county_code]
//						this.beginValue = [110000, 110000, 110000]
//						this.endValue = [this.formInfo.end_province_code, this.formInfo.end_city_code, this.formInfo.end_county_code]
//						console.log(this.beginValue)
//						console.log(this.beginValueText)
						this.qy_time = this.formInfo.qy_time
						this.optionValueKey = this.formInfo.project_id
					}
				})
			this.$http.get('pub/html/get/v1/projects?token=' + this.token).then((res) => {
				//				console.log(res)
				if(res.data.result.reCode === '0') {
					this.optionsListAll = res.data.data.project_list
					//					console.log(this.optionsListAll)
				}
			})
		},
		methods: {
			create() {
//				console.log(this.optionValueKey.toString() === this.optionsList[0].key)
				if(this.beginValue.length === 0) {
					this.$vux.toast.text('请选择发货地')
					return
				}
				if(this.endValue.length === 0) {
					this.$vux.toast.text('请选择卸货地')
					return
				}
				if(this.formInfo.waybill_no === '') {
					this.$vux.toast.text('请输入运单号')
					return
				}
				if(this.formInfo.cart_badge_no === '') {
					this.$vux.toast.text('请输入车牌号')
					return
				}
				if(this.formInfo.driver_name === '') {
					this.$vux.toast.text('请输入司机姓名')
					return
				}
				if(this.formInfo.mobile_no === '') {
					this.$vux.toast.text('请输入手机号')
					return
				}
				if(this.qy_time === '') {
					this.$vux.toast.text('请输入起运时间')
					return
				}
				if(this.optionValueKey === '') {
					this.$vux.toast.text('请选择项目名称')
					return
				}
				if(this.unit === '吨') {
					this.unitKey = '0'
				}
				if(this.unit === '方') {
					this.unitKey = '1'
				}
				this.loading = true
				this.$http.post('waybill/html/post/v1/waybill_modify?token=' + this.token, {
						data: {
							waybill_id: this.waybill_id,
							//							driver_id: this.formInfo.my_driver_id,
							waybill_no: this.formInfo.waybill_no,
							cart_badge_no: this.formInfo.cart_badge_no,
							driver_name: this.formInfo.driver_name,
							mobile_no: this.formInfo.mobile_no,
							begin_province_code: this.beginValue[0],
							begin_province_name: this.beginValueText[0],
							begin_city_code: this.beginValue[1],
							begin_city_name: this.beginValueText[1],
							begin_county_code: this.beginValue[2],
							begin_county_name: this.beginValueText[2],
							end_province_code: this.endValue[0],
							end_province_name: this.endValueText[0],
							end_city_code: this.endValue[1],
							end_city_name: this.endValueText[1],
							end_county_code: this.endValue[2],
							end_county_name: this.endValueText[2],
							qy_time: this.qy_time,
							project_id: this.optionValueKey,
							project_name: this.getOptionName(this.optionValueKey).project_name,
							goods_name: this.goods_name,
							goods_num: this.goods_num,
							unit: this.unitKey,
							total_price: this.total_price,
							unit_price: this.unit_price,
							prepayments: this.prepayments,
							back_fee: this.back_fee
						}
					})
					.then((res) => {
						console.log(this.getOptionName(this.optionValueKey).project_name)
						this.loading = false
						if(res.data.result.reCode === '0') {
							this.$vux.toast.text('修改成功')
							this.$router.back(-1)
						} else {
							this.$vux.toast.text(res.data.result.reInfo)
						}
					})
			},
			test() {
				console.log(this.beginValue)
				console.log(this.beginValueText)
			},
			//获取项目名称
			getOptionName(key) {
				for(let i = 0; i < this.optionsList.length; i++) {
					if(this.optionsList[i].key === key) {
						return {
							project_name: this.optionsList[i].value,
							drawee: this.optionsList[i].drawee,
							drawee_id: this.optionsList[i].drawee_id
						}
					}
				}
			}
		}
	}
</script>

<style lang="less">
	.vehicle-info-box {
		padding-top: 44px;
		.address {
			display: flex;
			padding-right: 15px;
			margin-left: 15px;
			&>div,
			&>a {
				width: 0;
				flex: 1;
				margin-left: -15px;
			}
			.label {
				font-size: 16px;
				color: rgb(99, 191, 254);
				display: flex;
				align-items: center;
			}
		}
		.selector {
			display: flex;
			padding-right: 15px;
			margin-left: 15px;
			.vux-selector {
				width: 0;
				flex: 1;
				margin-left: -15px;
			}
			.label {
				font-size: 16px;
				color: rgb(99, 191, 254);
				display: flex;
				align-items: center;
			}
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