<template>
	<div class="fast-dispatch-box">
		<v-header title="快速调车" :iconShow="true" @history="goHistory"></v-header>
		<group label-width="102px">
			<!--<x-input title="装货地：" placeholder="请选择装货地"></x-input>-->
			<x-address title="装货地" :list="addressData" placeholder="请选择装货地" value-text-align="left" v-model="beginValue" @on-hide="test"></x-address>
			<!--<x-input title="卸货地：" placeholder="请选择卸货地"></x-input>-->
			<x-address title="卸货地" :list="addressData" placeholder="请选择卸货地" value-text-align="left" v-model="endValue"></x-address>
			<!--<x-input title="装车时间：" placeholder="请选择装车时间"></x-input>-->
			<datetime v-model="time" value-text-align="left" placeholder="请选择装车时间" format="YYYY-MM-DD HH:mm" @on-change="change" title="装车时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分"></datetime>
			<selector title="项目名称" :options="optionsList" v-model="optionValue" placeholder="选择项目" @on-change="test2">
			</selector>
		</group>
		<group>
			<x-input title="货物名称：" placeholder="请输入货物名称" v-model="goods_name"></x-input>
			<x-input title="货物数量：" placeholder="请输入货物数量" v-model="goods_num" type="number"></x-input>
			<selector title="车型要求" :options="categoryList" v-model="cart_type" placeholder="请选择车型">
			</selector>
			<!--<x-input title="车型要求：" placeholder="请输入车型要求" v-model="cart_type"></x-input>-->
			<selector title="车长要求" :options="lengthList" v-model="cart_length" placeholder="请选择车长">
			</selector>
			<!--<x-input title="车长要求：" placeholder="请输入车长要求" v-model="cart_length"></x-input>-->
		</group>
		<group>
			<cell title="货源时效：">
				<checker default-item-class="item" selected-item-class="item-selected" v-model="goods_aging">
					<checker-item value="12小时">12小时</checker-item>
					<checker-item value="24小时">24小时</checker-item>
					<checker-item value="36小时">36小时</checker-item>
				</checker>
			</cell>
			<cell title="报价方式：">
				<checker default-item-class="item" selected-item-class="item-selected" v-model="offer_type" @on-change="test2">
					<!--<checker-item value="按车">按车</checker-item>-->
					<checker-item value="0">按吨</checker-item>
					<checker-item value="1">按方</checker-item>
				</checker>
			</cell>
			<x-textarea title="货源描述：" v-model="goods_description"></x-textarea>
		</group>
		<div class="btn" @click="start" v-show="!loading">
			开始调车
		</div>
		<div class="btn disabled" v-show="loading">
			稍等
			<spinner type="ios-small"></spinner>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput, Cell, Checker, CheckerItem, XTextarea, Selector, XAddress, ChinaAddressV2Data, Value2nameFilter as value2name, Datetime, Spinner } from 'vux'
	export default {
		data() {
			return {
				optionsList: [],
				optionValue: '',
				beginValue: [],
				addressData: ChinaAddressV2Data,
				endValue: [],
				token: sessionStorage.getItem('token'),
				time: '',
				goods_aging: '',
				offer_type: '',
				goods_description: '',
				goods_name: '',
				goods_num: '',
				cart_type: '',
				cart_length: '',
				loading: false,
				categoryList: ['普通', '平板', '高低平板', '厢式', '封闭', '开项箱', '罐式', '集装箱', '自卸', '高栏', '轴线板', '满轮车', '框架板', '高低高板', '抽拉板', '簸箕板', '超低板', '高低板高栏', '笼子车', '叶片车'],
				lengthList: ['4m', '4.2m', '4.3m', '4.5m', '4.8m', '5m',
					'5.2m', '5.8m', '6m', '6.2m', '6.8m', '7m', '7.2m',
					'7.4m', '7.6m', '7.7m', '7.8m', '8m', '8.2m', '8.6m',
					'8.7m', '8.8m', '9m', '9.2m', '9.6m', '9.8m', '10m',
					'11m', '12.5m', '13m', '13.5m', '14m', '14.5m', '15m',
					'15.5m', '16m', '16.5m', '17m', '17.5m', '18m', '19.5m',
					'20m', '20.5m', '20.6m', '20.8m', '21.5m', '21.6m',
					'21.8m', '22.5m', '22.6m', '22.8m', '30.5m', '31m', '31.5m',
					'32m', '32.5m', '3.3m', '3.5m', '3.8m'
				]
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
			//项目id
			optionValueText() {
				let list = this.optionsList
				for(let i = 0; i <= list.length; i++) {
					if(list[i].key === this.optionValue) {
						return list[i].value
					}
				}
			}
		},
		components: {
			'v-header': Header,
			Group,
			XInput,
			Cell,
			Checker,
			CheckerItem,
			XTextarea,
			Selector,
			XAddress,
			Datetime,
			Spinner
		},
		created() {
			this.$http.get('pub/html/get/v1/projects?token=' + this.token)
				.then((res) => {
					console.log(res)
					let projectList = res.data.data.project_list
					for(let i = 0; i < projectList.length; i++) {
						this.optionsList.push({
							key: projectList[i].project_id,
							value: projectList[i].project_name
						})
					}
				})
		},
		methods: {
			goHistory() {
				this.$router.push('/DiaoDu')
			},
			toNum(value) {
				return parseFloat(value).toString()
			},
			test() {
				console.log(this.beginValue)
				console.log(this.beginValueText)
			},
			test2() {
				console.log(this.offer_type)
			},
			change() {
				console.log(this.time)
			},
			start() {
				if(this.beginValue.length === 0) {
					this.$vux.toast.text('请选择装货地')
					return
				}
				if(this.endValue.length === 0) {
					this.$vux.toast.text('请选择卸货地')
					return
				}
				if(this.time === '') {
					this.$vux.toast.text('请选择装车时间')
					return
				}
				if(this.goods_name === '') {
					this.$vux.toast.text('请填写货物名称')
					return
				}
				if(this.goods_num === '') {
					this.$vux.toast.text('请填写货物数量')
					return
				}
				if(this.cart_type === '') {
					this.$vux.toast.text('请填写车型要求')
					return
				}
				if(this.cart_length === '') {
					this.$vux.toast.text('请填写车长要求')
					return
				}
				if(this.goods_aging === '') {
					this.$vux.toast.text('请选择货源时效')
					return
				}
				if(this.offer_type === '') {
					this.$vux.toast.text('请选择报价方式')
					return
				}
				if(this.goods_description === '') {
					this.$vux.toast.text('请填写货源描述')
					return
				}
				if(this.optionValue === '') {
					this.$vux.toast.text('请选择项目名称')
					return
				}
				this.loading = true
				this.$http.post('dispatch/html/post/v1/dispatch_quick?token=' + this.token, {
					data: {
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
						load_time: this.time,
						goods_name: this.goods_name,
						goods_num: this.goods_num,
						cart_type: this.cart_type,
						cart_length: this.toNum(this.cart_length),
						goods_aging: this.goods_aging,
						offer_type: this.offer_type.toString(),
						goods_description: this.goods_description,
						project_id: this.optionValue,
						project_name: this.optionValueText
					}
				}).then((res) => {
					console.log(res)
					this.loading = false
					if(res.data.result.reCode === 0) {
						this.$vux.toast.text('调车成功')
						setTimeout(() => {
							this.$router.push('/DiaoDu')
						}, 500)
					} else {
						this.$vux.toast.text(res.data.result.reInfo)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.fast-dispatch-box {
		padding-top: 45px;
		.item {
			width: 64px;
			height: 26px;
			line-height: 26px;
			text-align: center;
			border-radius: 3px;
			border: 1px solid #ccc;
			background-color: #fff;
			margin-right: 4px;
		}
		.item-selected {
			background: #ffffff url(../../../static/image/selected.png) no-repeat right bottom;
			border-color: #ff4a00;
		}
		.btn {
			width: 68%;
			height: 36px;
			background-color: #63bffe;
			margin: 18px auto;
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