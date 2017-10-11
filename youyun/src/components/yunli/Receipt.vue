<template>
	<div class="receipt-box">
		<v-header title="收款信息"></v-header>
		<group label-width="110.5px">
			<x-input title="收款人姓名:" placeholder="请输入姓名" v-model="pay_name" :max="25"></x-input>
			<x-input title="收款银行:" placeholder="请输入银行名称" v-model="bank_name" :max="15"></x-input>
			<x-input title="银行卡号:" placeholder="请输入银行卡号" v-model="driver_bank_no" type="number" :max="20"></x-input>
			<x-input title="开户支行:" placeholder="请输入开户支行" v-model="bank_branch" :max="15"></x-input>
			<x-input title="开户手机:" placeholder="请输入开行手机号" v-model="pay_mobile" type="number" :max="11"></x-input>
			<x-address title="开户城市：" v-model="addressValue" :list="addressData" hide-district placeholder="省市选择" value-text-align="left" @on-hide="test"></x-address>
		</group>
		<div class="choose-img">
			<div class="row">
				<div class="item" v-show="id_card_front_photo64 !== ''">
					<img :src="id_card_front_photo64" />
					<p>身份证正面照</p>
					<span @click="id_card_front_photo64 = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="id_card_front_photo64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
					</div>
					<p>身份证正面照</p>
					<input type="file" ref="file1" @change="file1Changed" />
				</div>
				<div class="item" v-show="driver_licence_photo64 !== ''">
					<img :src="driver_licence_photo64" />
					<p>驾驶证</p>
					<span @click="driver_licence_photo64 = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="driver_licence_photo64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
					</div>
					<p>驾驶证</p>
					<input type="file" ref="file2" @change="file2Changed" />
				</div>
				<div class="item" v-show="contract_photo64 !== ''">
					<img :src="contract_photo64" />
					<p>合同文件</p>
					<span @click="contract_photo64 = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="contract_photo64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
					</div>
					<p>合同文件</p>
					<input type="file" ref="file3" @change="file3Changed" />
				</div>
			</div>
			<div class="row">
				<div class="item" v-show="id_card_reverse_photo64 !== ''">
					<img :src="id_card_reverse_photo64" />
					<p>身份证反面照</p>
					<span @click="id_card_reverse_photo64 = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="id_card_reverse_photo64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
					</div>
					<p>身份证反面照</p>
					<input type="file" ref="file4" @change="file4Changed" />
				</div>
				<div class="item" v-show="driving_permit_photo64 !== ''">
					<img :src="driving_permit_photo64" />
					<p>行驶证</p>
					<span @click="driving_permit_photo64 = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="driving_permit_photo64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
					</div>
					<p>行驶证</p>
					<input type="file" ref="file5" @change="file5Changed" />
				</div>
				<div class="item">
				</div>
			</div>
		</div>
		<div class="btn" @click="complete" v-show="!loading">
			确认完成
		</div>
		<div class="btn disabled" v-show="loading">
			稍等
			<spinner type="ios-small"></spinner>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput, XAddress, ChinaAddressV2Data, Value2nameFilter as value2name, Spinner } from 'vux'
	export default {
		data() {
			return {
				addressData: ChinaAddressV2Data,
				addressValue: [],
				pay_name: '',
				bank_name: '',
				driver_bank_no: '',
				bank_branch: '',
				pay_mobile: '',
				token: sessionStorage.getItem('token'),
				my_driver_id: this.$route.params.id,
				loading: false,
				id_card_front_photo64: '',
				id_card_front_phototype: '',
				id_card_front_photoname: '',
				id_card_front_photo: '',
				id_card_reverse_photo64: '',
				id_card_reverse_phototype: '',
				id_card_reverse_photoname: '',
				id_card_reverse_photo: '',
				driving_permit_photo64: '',
				driving_permit_phototype: '',
				driving_permit_photoname: '',
				driving_permit_photo: '',
				driver_licence_photo64: '',
				driver_licence_phototype: '',
				driver_licence_photoname: '',
				driver_licence_photo: '',
				contract_photo64: '',
				contract_phototype: '',
				contract_photoname: '',
				contract_photo: ''
			}
		},
		computed: {
			driverInfo() {
				let info = sessionStorage.getItem('driverInfo')
				return JSON.parse(info)
			},
			addressValueText() {
				let text = value2name(this.addressValue, ChinaAddressV2Data)
				return text.split(' ')
			}
		},
		components: {
			'v-header': Header,
			Group,
			XInput,
			XAddress,
			Spinner
		},
		created() {
			let fileInfoString = sessionStorage.getItem('fileInfo')
			let fileInfo = JSON.parse(fileInfoString)
			console.log(fileInfo)
			this.pay_name = fileInfo.pay_name
			this.bank_name = fileInfo.bank_name
			this.driver_bank_no = fileInfo.driver_bank_no
			this.bank_branch = fileInfo.bank_branch
			this.pay_mobile = fileInfo.pay_mobile
		},
		methods: {
			test() {
				console.log(this.addressValue)
				console.log(this.addressValueText)
			},
			file1Changed() {
				const img = this.$refs.file1.files[0]
				const reader = new FileReader()
				reader.onload = (e) => {
					this.id_card_front_photo64 = e.target.result
					this.id_card_front_photoname = img.name
					this.id_card_front_phototype = img.type
					//					console.log(base64)
				}
				reader.readAsDataURL(img)
			},
			file2Changed() {
				const img = this.$refs.file2.files[0]
				const reader = new FileReader()
				reader.onload = (e) => {
					this.driver_licence_photo64 = e.target.result
					this.driver_licence_photoname = img.name
					this.driver_licence_phototype = img.type
				}
				reader.readAsDataURL(img)
			},
			file3Changed() {
				const img = this.$refs.file3.files[0]
				const reader = new FileReader()
				reader.onload = (e) => {
					this.contract_photo64 = e.target.result
					this.contract_photoname = img.name
					this.contract_phototype = img.type
				}
				reader.readAsDataURL(img)
			},
			file4Changed() {
				const img = this.$refs.file4.files[0]
				const reader = new FileReader()
				reader.onload = (e) => {
					this.id_card_reverse_photo64 = e.target.result
					this.id_card_reverse_photoname = img.name
					this.id_card_reverse_phototype = img.type
				}
				reader.readAsDataURL(img)
			},
			file5Changed() {
				const img = this.$refs.file5.files[0]
				const reader = new FileReader()
				reader.onload = (e) => {
					this.driving_permit_photo64 = e.target.result
					this.driving_permit_photoname = img.name
					this.driving_permit_phototype = img.type
				}
				reader.readAsDataURL(img)
			},
			upDataImg1() {
				return this.$http.post('waybill/html/post/v1/sign_img_upload?token=' + this.token, {
					data: {
						file_stream: this.id_card_front_photo64,
						file_name: this.id_card_front_photoname,
						file_type: this.id_card_front_phototype
					}
				}).then((res) => {
					this.id_card_front_photo = res.data.data.sign_img_url || ''
				})
			},
			upDataImg2() {
				return this.$http.post('waybill/html/post/v1/sign_img_upload?token=' + this.token, {
					data: {
						file_stream: this.driver_licence_photo64,
						file_name: this.driver_licence_photoname,
						file_type: this.driver_licence_phototype
					}
				}).then((res) => {
					this.driver_licence_photo = res.data.data.sign_img_url || ''
				})
			},
			upDataImg3() {
				return this.$http.post('waybill/html/post/v1/sign_img_upload?token=' + this.token, {
					data: {
						file_stream: this.contract_photo64,
						file_name: this.contract_photoname,
						file_type: this.contract_phototype
					}
				}).then((res) => {
					this.contract_photo = res.data.data.sign_img_url || ''
				})
			},
			complete() {
				if(this.pay_name !== '' || this.bank_name !== '' || this.driver_bank_no !== '' || this.pay_mobile !== '' || this.addressValue.length !== 0) {
					if(this.pay_name === '') {
						this.$vux.toast.text('请输入收款人姓名')
						return
					}
					if(this.bank_name === '') {
						this.$vux.toast.text('请输入收款银行')
						return
					}
					if(this.pay_mobile === '') {
						this.$vux.toast.text('请输入开户手机号码')
						return
					}
					if(this.driver_bank_no === '') {
						this.$vux.toast.text('请输入银行卡号')
						return
					}
					if(this.addressValue.length === 0) {
						this.$vux.toast.text('请选择开户城市')
						return
					}
				}
				this.loading = true
				let receiptParams = {
					my_driver_id: this.my_driver_id,
					pay_name: this.pay_name,
					bank_name: this.bank_name,
					driver_bank_no: this.driver_bank_no,
					bank_branch: this.bank_branch,
					pay_mobile: this.pay_mobile,
					bank_province: this.addressValueText[0],
					bank_city: this.addressValueText[1] || '',
					id_card_front_photo: this.id_card_front_photo,
					id_card_reverse_photo: this.id_card_reverse_photo,
					driving_permit_photo: this.driving_permit_photo,
					driver_licence_photo: this.driver_licence_photo,
					contract_photo: this.contract_photo
				}
				let params = {}
				params = Object.assign(params, this.driverInfo, receiptParams)
				//				console.log(params)
				//				console.log(this.addressValue)
				//				console.log(this.addressValueText)
				this.$http.all([this.upDataImg1(), this.upDataImg2(), this.upDataImg3()])
					.then(this.$http.spread(() => {
						this.$http.post('driver/html/post/v1/driver_maintain?token=' + this.token, {
								data: params
							})
							.then((res) => {
								this.loading = false
								if(res.data.result.reCode === '0') {
									this.$vux.toast.text('提交成功')
									setTimeout(() => {
										this.$router.push('/FileDriver/' + this.my_driver_id)
									}, 500)
								} else {
									this.$vux.toast.text(res.data.result.reInfo)
								}
							})
					}))
			}
		}
	}
</script>

<style lang="less">
	.receipt-box {
		padding-top: 45px;
		.choose-img {
			width: 100%;
			background-color: white;
			margin-top: 20px;
			.row {
				display: flex;
				justify-content: space-around;
				/*align-items: center;*/
				box-sizing: border-box;
				padding: 0 12px;
			}
			.item {
				width: 0;
				flex: 1;
				position: relative;
				font-size: 0;
				margin: 20px 6%;
				input {
					display: block;
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0;
				}
				img {
					width: 100%;
				}
				p {
					text-align: center;
					font-size: 12px;
					color: #646464;
					margin-top: 4px;
				}
				span {
					position: absolute;
					top: -10px;
					right: -10px;
					z-index: 2;
					background-color: #ff423a;
					width: 30px;
					height: 30px;
					display: block;
					border-radius: 50%;
					.vux-x-icon {
						fill: white;
					}
				}
				.add {
					width: 100%;
					height: 19.976vw;
					display: flex;
					align-items: center;
					justify-content: center;
					.vux-x-icon {
						fill: #C7C7C7;
					}
				}
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