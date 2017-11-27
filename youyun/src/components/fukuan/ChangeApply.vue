<template>
	<div class="change-apply-box">
		<v-header title="修改申请" :iconShow="true" @history="history"></v-header>

		<div class="info">
			<p>成交时间：{{orderInfo.created_time}}</p>
			<p>运单号：{{orderInfo.waybill_no}}</p>
			<p>
				{{orderInfo.cart_badge_no}} {{orderInfo.driver_name}} {{orderInfo.mobile_no}}
				<!--皖A12345,袁自林,13900000000-->
			</p>
			<p>
				{{orderInfo.begin_province_name}}- {{orderInfo.begin_city_name}}- {{orderInfo.begin_county_name}} 至 {{orderInfo.end_province_name}}- {{orderInfo.end_city_name}}- {{orderInfo.end_county_name}}
			</p>
		</div>

		<div class="input">
			<div class="top">
				<span class="red">运费合计：{{orderInfo.all_pay_money}}</span>
				<span>已付：{{orderInfo.paid_money}}</span>
				<span>未付：{{orderInfo.not_paid_money}}</span>
			</div>
			<group style="margin-top: -16px;" labelWidth="105px">
				<x-input title="收款人姓名:" style="font-size: 13px;" :max="25" v-model="orderInfo.pay_name"></x-input>
				<selector title="开户行:" :options="banklist" v-model="orderInfo.bank_name"></selector>
				<!--<cell title="收 款 银 行:" value="平安银行" is-link value-align="left"></cell>-->
				<x-address title="开户行所在地:" :list="addressData" hide-district placeholder="省市选择" value-text-align="left" label-width="105px" v-model="city"></x-address>
				<x-input title="收款人卡号:" style="font-size: 13px;" :max="20" type="number" v-model="orderInfo.bank_card_no"></x-input>
				<x-input title="开 户 支 行:" style="font-size: 13px;" :max="15" v-model="orderInfo.bank_branch"></x-input>
				<x-input title="申&nbsp;请&nbsp;支&nbsp;付:" style="font-size: 13px;" type="number" v-model="orderInfo.pay_money" disabled>
					<span slot="right">元</span>
				</x-input>
			</group>
		</div>

		<div class="btn" @click="apply" v-show="!loading">
			确认修改
		</div>

		<div class="btn disabled" v-show="loading">
			稍等
			<spinner type="ios-small"></spinner>
		</div>

		<div class="master" v-show="masterShow">
			<div class="content">
				<div class="in-content">
					<div class="item vux-1px-b" v-for="(item, index) in hisPayerList" :key="index" @click="chooseHistory(item, index)">
						<div class="text">
							<p class="row">收款人姓名: {{item.pay_name}}</p>
							<p class="row">收款人卡号: {{item.bank_card_no}}</p>
							<p class="row">开户行: {{item.bank_name}}</p>
							<p class="row">开户行所在地: {{item.bank_province + item.bank_city}}</p>
							<p class="row" v-if="item.bank_branch">开户行支行: {{item.bank_branch}}</p>
						</div>
						<div class="checked">
							<img src="../../../static/image/weigouxuan@2x.png" v-if="historyCurrent !== index" />
							<img src="../../../static/image/gouxuan@2x.png" v-if="historyCurrent === index" />
						</div>
					</div>
					<p v-if="recordCount === '0'" style="line-height: 108px;">暂无历史收款人信息</p>
					<load-more :show-loading="true" tip="加载中" background-color="#f1eff2" v-show="recordLoading"></load-more>
				</div>
				<x-icon type="ios-close-empty" size="40" @click="closeMaster"></x-icon>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput, Selector, Cell, XAddress, ChinaAddressV2Data, Value2nameFilter as value2name, Spinner, LoadMore } from 'vux'
	export default {
		data() {
			return {
				addressData: ChinaAddressV2Data,
				masterShow: false,
				pos_id: '',
				orderInfo: [],
				loading: false,
				banklist: ['中国银行', '中国农业银行', '中国邮政储蓄银行', '交通银行', '中国建设银行', '上海浦东发展银行', '招商银行', '中国工商银行', '兴业银行', '中国光大银行', '平安银行', '中国民生银行', '广东发展银行', '北京银行', '天津银行', '杭州银行', '大连银行', '南京银行', '上海银行', '锦州银行', '宁波银行', '江苏省农村信用社', '安徽省农村信用社', '吉林省农村信用社', '浙江省农村信用社', '福建省农村信用社', '山东省农村信用社', '湖北省农村信用社', '广西壮族自治区农村信用社', '海南省农村信用社', '四川省农村信用社', '云南省农村信用社', '包商银行', '葫芦岛银行', '临商银行', '温州银行', '厦门银行', '南昌银行', '上饶银行', '日照银行', '长沙银行', '东莞银行', '浙商银行', '中信银行'],
				city: [],
				token: sessionStorage.getItem('token'),
				hisPayerList: [],
				recordCount: '',
				recordLoading: true,
				historyCurrent: -1
			}
		},
		computed: {
			bank_city_arry() {
				let text = value2name(this.city, ChinaAddressV2Data)
				return text.split(' ')
			}
		},
		components: {
			'v-header': Header,
			Group,
			XInput,
			Cell,
			XAddress,
			Selector,
			Spinner,
			LoadMore
		},
		mounted() {
			this.pos_id = this.$route.params.id
			this.$http.get('payapply/html/get/v1/into_pay_modify/' + this.pos_id, {
				params: {
					token: sessionStorage.getItem('token')
				}
			}).then(
				(res) => {
					this.orderInfo = res.data.data
					console.log(res.data)
				}
			)
		},
		methods: {
			apply() {
				console.log(this.orderInfo.bank_branch)
				if(this.orderInfo.pay_money === '' || this.orderInfo.pay_name === '' || this.orderInfo.bank_name === '' || this.city.length === 0 || this.orderInfo.bank_card_no === '' || this.orderInfo.bank_branch === '') {
					this.$vux.toast.text('请填写所有信息')
					return
				}
				this.loading = true
				this.$http.post('payapply/html/post/v1/pay_modify?token=' + this.token, {
					data: {
						waybill_id: this.orderInfo.waybill_id,
						pos_id: this.orderInfo.pos_id,
						tax_pos_id: this.orderInfo.tax_pos_id,
						tax_error_id: this.orderInfo.tax_error_id,
						//						tax_error_id: '12910',
						not_paid_money: this.orderInfo.not_paid_money.toString(),
						pay_money: this.orderInfo.pay_money.toString(),
						pay_name: this.orderInfo.pay_name,
						bank_card_no: this.orderInfo.bank_card_no,
						bank_name: this.orderInfo.bank_name,
						bank_province: this.bank_city_arry[0],
						bank_city: this.bank_city_arry[1],
						bank_branch: this.orderInfo.bank_branch
					}
				}).then((res) => {
					console.log(res)
					this.loading = false
					if(res.data.result.reCode === '0') {
						this.$vux.toast.text('修改成功')
						setTimeout(() => {
							this.$router.back()
						}, 500)
					} else {
						this.$vux.toast.text(res.data.result.reInfo)
					}
				})
			},
			closeMaster() {
				this.masterShow = false
			},
			history() {
				this.recordLoading = true
				this.hisPayerList = []
				this.recordCount = ''
				this.$http.get('payapply/html/get/v1/his_payer/' + this.orderInfo.waybill_id + '?token=' + this.token)
					.then((res) => {
						console.log(res)
						this.recordLoading = false
						if(res.data.result.reCode === '0') {
							this.hisPayerList = res.data.data.payer_list
							if(this.hisPayerList.length === 0) {
								this.recordCount = '0'
							}
						} else {
							this.recordCount = '0'
						}
					})
				this.masterShow = true
			},
			chooseHistory(item, index) {
				this.orderInfo.pay_name = item.pay_name
				this.orderInfo.bank_name = item.bank_name
				this.orderInfo.bank_card_no = item.bank_card_no
				this.orderInfo.bank_branch = item.bank_branch
				this.city = [item.bank_province_code, item.bank_city]
				this.historyCurrent = index
				this.masterShow = false
			}
		}
	}
</script>

<style lang="less">
	.change-apply-box {
		padding-top: 45px;
		.info {
			margin: 10px 10px 0;
			padding: 15px;
			background-color: white;
			font-size: 14px;
		}
		.input {
			margin: 10px;
			.top {
				padding: 0 15px;
				height: 32px;
				line-height: 32px;
				background-color: white;
				color: #666666;
				font-size: 12px;
				display: flex;
				justify-content: space-between;
				.red {
					color: #ff423a;
				}
			}
			.weui-input {
				height: 18px;
				line-height: 18px;
			}
			.weui-cell {
				font-size: 13px;
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
		.master {
			position: fixed;
			z-index: 3;
			width: 100%;
			height: 100vh;
			top: 0;
			left: 0;
			background-color: rgba(40, 40, 40, 0.4);
			display: flex;
			justify-content: center;
			align-items: center;
			.content {
				width: 320px;
				background-color: white;
				border-radius: 10px;
				padding: 30px 0;
				position: relative;
				max-height: 54vh;
				/*overflow-y: hidden;*/
				.in-content {
					min-height: 108px;
					max-height: 54vh;
					overflow-y: auto;
					margin: 0 15px;
					.weui-loadmore {
						margin-top: 42px;
					}
				}
				p {
					font-size: 14px;
					text-align: center;
					color: #666666;
				}
				.item {
					padding: 10px 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.text {
						.row {
							display: flex;
							justify-content: space-between;
							/*padding: 0 15px;*/
							.time {
								margin-left: 10px;
							}
						}
					}
					.checked {
						width: 20px;
						height: 20px;
						img {
							width: 100%;
						}
					}
				}
				svg {
					position: absolute;
					top: 4px;
					right: 4px;
				}
				.vux-x-icon {
					fill: #9b9b9b;
				}
			}
		}
	}
</style>