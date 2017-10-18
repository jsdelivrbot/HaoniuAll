<template>
	<div class="vehicle-info-box" v-show="isComplete">
		<v-header title="快速建单" :iconShow="true" @history="goHistory"></v-header>
		<group>
			<!--<x-input title="承运车辆：" :value="formInfo.realname + '，' + formInfo.cart_badge_no + '，' + formInfo.mobile_no" :disabled="true" label-width="88px"></x-input>-->
			<cell title="承运车辆：" value-align="left">
				<p style="color: black;">{{formInfo.realname + '，' + formInfo.cart_badge_no + '，' + formInfo.mobile_no}}</p>
			</cell>
		</group>
		<group label-width="102px">
			<x-input title="运单号:" placeholder="请输入运单号" v-model="formInfo.waybill_no" :max="128" label-width="69px"></x-input>
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
				<datetime v-model="qy_time" value-text-align="left" placeholder="请选择装车时间" format="YYYY-MM-DD HH:mm" title="装车时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分"></datetime>
				<p class="label">*必选</p>
			</div>
			<div class="selector vux-1px-t">
				<selector title="项目名称" :options="optionsList" v-model="optionValueKey" placeholder="请选择项目">
				</selector>
				<p class="label">*必选</p>
			</div>
		</group>
		<group label-width="102px">
			<x-input title="货物名称：" placeholder="请输入货物名称" v-model="goods_name"></x-input>
			<x-input title="货物数量：" placeholder="请输入货物数量" v-model="goods_num" type="number"></x-input>
			<!--<x-input title="货物单位：" placeholder="请输入货物数量单位" v-model="unit"></x-input>-->
			<selector title="货物单位" :options="unitsList" v-model="unit" placeholder="请选择货物数量单位"></selector>
			<x-input title="运输单价：" placeholder="请输入运输单价" v-model="unit_price"></x-input>
			<x-input title="运单总价：" placeholder="请输入运单总价" v-model="total_price"></x-input>
			<x-input title="预付款：" placeholder="请输入预付款" v-model="prepayments"></x-input>
			<x-input title="回单押金：" placeholder="请输入回单押金" v-model="back_fee"></x-input>
		</group>
		<div class="btn" @click="create" v-show="!loading">
			建单
		</div>
		<div class="btn disabled" v-show="loading">
			稍等
			<spinner type="ios-small"></spinner>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput, Selector, XAddress, ChinaAddressV2Data, Value2nameFilter as value2name, Spinner, Datetime, Cell } from 'vux'
	export default {
		data() {
			return {
				optionsListAll: [],
				addressData: ChinaAddressV2Data,
				token: sessionStorage.getItem('token'),
				my_driver_id: this.$route.params.id,
				loading: false,
				formInfo: {
					realname: '',
					cart_badge_no: '',
					mobile_no: '',
					waybill_no: ''
				},
				//表单信息
				beginValue: [],
				endValue: [],
				qy_time: '',
				optionValueKey: '',
				goods_name: '',
				goods_num: '',
				unit: '',
				unit_price: '',
				total_price: '',
				prepayments: '',
				back_fee: '',
				unitsList: ['吨', '方', '车'],
				unitKey: '',
				isComplete: false
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
			Datetime,
			Cell
		},
		created() {
			this.$vux.loading.show({
				text: '加载中'
			})
			this.$http.get('driver/html/get/v1/into_fast_create_waybill/' + this.my_driver_id + '?token=' + this.token)
				.then((res) => {
					console.log(res)
					if(res.data.result.reCode === '0') {
						this.formInfo = res.data.data
						this.qy_time = res.data.data.qy_time
						if(res.data.data.project_list) {
							this.optionsListAll = res.data.data.project_list
						}
					}
					this.$vux.loading.hide()
					this.isComplete = true
				})
		},
		methods: {
			goHistory() {
//				this.$router.push({
//					path: '/DiaoDu',
//					query: {
//						mobile: this.formInfo.mobile_no,
//						data: '1'
//					}
//				})
				let src = '/DiaoDu?mobile=' + this.formInfo.mobile_no + '&data=1'
				window.android.Ddfcgl(src)
			},
			create() {
//				console.log(this.getOptionName(this.optionValueKey))
				if(this.beginValue.length === 0) {
					this.$vux.toast.text('请选择发货地')
					return
				}
				if(this.endValue.length === 0) {
					this.$vux.toast.text('请选择卸货地')
					return
				}
				if(this.qy_time === '') {
					this.$vux.toast.text('请填写起运时间')
					return
				}
				if(!this.getOptionName(this.optionValueKey)) {
					this.$vux.toast.text('请选择项目名称')
					return
				}
				if(this.unit === '') {
					this.$vux.toast.text('请选择货物数量单位')
					return
				}
				//				let pattern = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/
				//				console.log(pattern.test(this.qy_time))
				//				if(!pattern.test(this.qy_time)) {
				//					this.$vux.toast.show({
				//						text: '请填写正确的起运时间格式 yyyy-MM-dd HH:mm:ss',
				//						type: 'text',
				//						time: 5000
				//					})
				//					return
				//				}
				if(this.qy_time === '') {
					this.$vux.toast.text('请选择装车时间')
					return
				}
				if(this.optionValue === '') {
					this.$vux.toast.text('请选择项目名称')
					return
				}
				let $this = this
				this.$vux.confirm.show({
					content: '本次快速建单成功起运后将扣除 1元',
					onCancel() {
						return
					},
					onConfirm() {
						if($this.unit === '吨') {
							$this.unitKey = '0'
						}
						if($this.unit === '方') {
							$this.unitKey = '1'
						}
						if($this.unit === '车') {
							$this.unitKey = '2'
						}
						$this.loading = true
						$this.$http.post('driver/html/post/v1/fast_create_waybill?token=' + $this.token, {
								data: {
									waybill_no: $this.formInfo.waybill_no,
									begin_province_code: $this.beginValue[0],
									begin_province_name: $this.beginValueText[0],
									begin_city_code: $this.beginValue[1],
									begin_city_name: $this.beginValueText[1],
									begin_county_code: $this.beginValue[2],
									begin_county_name: $this.beginValueText[2],
									end_province_code: $this.endValue[0],
									end_province_name: $this.endValueText[0],
									end_city_code: $this.endValue[1],
									end_city_name: $this.endValueText[1],
									end_county_code: $this.endValue[2],
									end_county_name: $this.endValueText[2],
									qy_time: $this.qy_time,
									project_id: $this.optionValueKey,
									project_name: $this.getOptionName($this.optionValueKey).project_name || '',
									goods_name: $this.goods_name,
									goods_num: $this.goods_num,
									unit: $this.unitKey,
									cart_badge_no: $this.formInfo.cart_badge_no,
									driver_name: $this.formInfo.realname,
									mobile_no: $this.formInfo.mobile_no,
									//							mobile_no: '13770575704',
									//						state: '',
									//						data_type: '',
									total_price: $this.total_price,
									unit_price: $this.unit_price,
									prepayments: $this.prepayments,
									back_fee: $this.back_fee,
									drawee_id: $this.getOptionName($this.optionValueKey).drawee_id,
									drawee: $this.getOptionName($this.optionValueKey).drawee
								}
							})
							.then((res) => {
								console.log(res)
								$this.loading = false
								if(res.data.result.reCode === '0') {
									$this.$vux.toast.text('建单成功')
									$this.$router.back(-1)
								} else {
									$this.$vux.toast.text(res.data.result.reInfo)
								}
							})
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
			background-color: #63bffe;
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