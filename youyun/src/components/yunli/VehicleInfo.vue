<template>
	<div class="vehicle-info-box">
		<v-header title="车辆信息" :iconShow="false"></v-header>
		<group>
			<x-input title="车牌号码:" :required="true" v-model="fileInfo.cart_badge_no">
				<span slot="right" style="color: #63bffe;">*必填</span>
			</x-input>
			<x-input title="司机姓名:" :required="true" v-model="fileInfo.realname" :max="16">
				<span slot="right" style="color: #63bffe;">*必填</span>
			</x-input>
			<x-input title="手机号码:" :required="true" v-model="fileInfo.mobile_no" type="number" :max="11" disabled>
				<span slot="right" style="color: #63bffe;">*必填</span>
			</x-input>
			<x-input title="身份证号码:" :required="true" v-model="fileInfo.id_card">
				<span slot="right" style="color: #63bffe;">*必填</span>
			</x-input>
		</group>
		<group labelWidth="65px">
			<selector title="车型：" :options="categoryList1" v-model="fileInfo.axle" placeholder="拖挂及游轮"></selector>
			<selector title=" " :options="categoryList2" v-model="fileInfo.supplyofgoods" placeholder="货箱结构"></selector>
			<selector title=" " :options="categoryList3" v-model="fileInfo.corps" placeholder="特殊功能"></selector>
			<selector title=" " :options="categoryList4" v-model="fileInfo.manufacturer" placeholder="厂商品牌"></selector>
			<div class="current-option">
				<span class="title">已选：</span>
				<div class="content">
					<span class="vux-1px" v-show="fileInfo.axle !== ''">{{fileInfo.axle}}</span>
					<span class="vux-1px" v-show="fileInfo.supplyofgoods !== ''">{{fileInfo.supplyofgoods}}</span>
					<span class="vux-1px" v-show="fileInfo.corps !== ''">{{fileInfo.corps}}</span>
					<span class="vux-1px" v-show="fileInfo.manufacturer !== ''">{{fileInfo.manufacturer}}</span>
				</div>
			</div>
			<selector title="车长：" :options="lengthList" v-model="fileInfo.cart_length" placeholder="选择车长"></selector>
			<x-input title="车宽：" type="number" label-width="65px" v-model="fileInfo.cart_width" :max="8">
				<span slot="right">米</span>
			</x-input>
			<x-input title="车高：" type="number" label-width="65px" v-model="fileInfo.cart_height" :max="8">
				<span slot="right">米</span>
			</x-input>
			<selector title="吨位：" :options="weightList" v-model="fileInfo.cart_tonnage" placeholder="选择吨位"></selector>
			<!--<x-input title="容积：" type="number" label-width="65px" v-model="fileInfo.cart_volume" :max="8">
				<span slot="right">方</span>
			</x-input>-->
		</group>
		<div>
			<x-dialog v-model="show" class="dialog-demo6">
				<div class="img-box">
					<img :src="showPhote" style="max-width:60%">
				</div>
				<div @click="show=false">
					<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>
		<div class="choose-img">
			<div class="row">
				<div class="item" v-show="carframe64 !== ''">
					<img :src="carframe64" @click="previewPhone(carframe64)" />
					<p>车辆门头照</p>
					<span @click="carframe64 = '';fileInfo.carframe_photo = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="carframe64 === ''">
					<div class="add vux-1px img">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
						<input type="file" @change="carframeChange" ref="carframe" />
					</div>
					<p>车辆门头照</p>
				</div>
				<div class="item" v-show="car64 !== ''">
					<img :src="car64" @click="previewPhone(car64)" />
					<p>车身照</p>
					<span @click="car64 = '';fileInfo.car_photo = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="car64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
						<input type="file" @change="carChange" ref="car" />
					</div>
					<p>车身照</p>
				</div>
				<div class="item" v-show="rtc64 !== ''">
					<img :src="rtc64" @click="previewPhone(rtc64)" />
					<p>道路运输证</p>
					<span @click="rtc64 = '';fileInfo.rtc_photo = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="rtc64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
						<input type="file" @change="rtcChange" ref="rtc" />
					</div>
					<p>道路运输证</p>
				</div>
			</div>
			<div class="row">
				<div class="item" v-show="tqc64 !== ''">
					<img :src="tqc64" @click="previewPhone(tqc64)" />
					<p>运输从业资格证</p>
					<span @click="tqc64 = '';fileInfo.tqc_photo = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="tqc64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
						<input type="file" @change="tqcChange" ref="tqc" />
					</div>
					<p>运输从业资格证</p>
				</div>
				<div class="item" v-show="permit64 !== ''">
					<img :src="permit64" @click="previewPhone(permit64)" />
					<p>行驶证</p>
					<span @click="permit64 = '';fileInfo.driving_permit_photo = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="permit64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
						<input type="file" @change="permitChange" ref="permit" />
					</div>
					<p>行驶证</p>
				</div>
				<div class="item" v-show="vfi64 !== ''">
					<img :src="vfi64" @click="previewPhone(vfi64)" />
					<p>机动车强制保险</p>
					<span @click="vfi64 = '';fileInfo.vfi_photo = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="vfi64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
						<input type="file" @change="vfiChange" ref="vfi" />
					</div>
					<p>机动车强制保险</p>
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
	import { Group, XInput, Cell, Selector, Spinner, XDialog } from 'vux'
	export default {
		data() {
			return {
				categoryList1: ['半挂一拖二', '半挂一拖三', '半挂二拖二', '半挂二拖三', '前四后四半挂', '前四后四', '前四后六', '前四后八', '前四后十', '后八轮', '五轮车', '单桥', '双桥', '四桥', '五桥', '六桥', '七桥', '八桥', '九桥', '全挂', '其他'],
				//				axle: '',
				categoryList2: ['普通', '平板', '高低平板', '厢式', '封闭', '开项箱', '罐式', '集装箱', '自卸', '高栏', '轴线板', '满轮车', '框架板', '高低高板', '抽拉板', '簸箕板', '超低板', '高低板高栏', '笼子车', '叶片车'],
				//				supplyofgoods: '',
				categoryList3: ['冷藏车', '危险品', '邮政车', '棉被车', '起重车', '搅拌机', '推土机', '装载机', '挖掘机', '平地机', '压路车', '爬梯车', '随车吊', '汽车吊', '大件车', '罐体专用车', '飞翼车', '尾板车'],
				//				corps: '',
				categoryList4: ['中国重汽', '一汽解放', '东风商用车', '东风柳汽', '东风日产柴', '陕西重汽', '北汽福田', '依维柯', '重庆重汽', '北方奔驰', '江淮格尔发', '安徽华菱', '湖北三环', '福建新马龙', '精工镇江', '春兰卡车', '上海汇众', '金华青年曼', '洛阳福德', '南汽凌野', '瑞典沃尔沃', '法国雷诺', '德国曼', '德国奔驰', '瑞典斯堪尼亚', '日本五十玲', '日本日野', '其他'],
				//				manufacturer: '',
				lengthList: ['4米', '4.2米', '4.3米', '4.5米', '4.8米', '5米',
					'5.2米', '5.8米', '6米', '6.2米', '6.8米', '7米', '7.2米',
					'7.4米', '7.6米', '7.7米', '7.8米', '8米', '8.2米', '8.6米',
					'8.7米', '8.8米', '9米', '9.2米', '9.6米', '9.8米', '10米',
					'11米', '12.5米', '13米', '13.5米', '14米', '14.5米', '15米',
					'15.5米', '16米', '16.5米', '17米', '17.5米', '18米', '19.5米',
					'20米', '20.5米', '20.6米', '20.8米', '21.5米', '21.6米',
					'21.8米', '22.5米', '22.6米', '22.8米', '30.5米', '31米', '31.5米',
					'32米', '32.5米', '3.3米', '3.5米', '3.8米'
				],
				//				cart_length: '',
				weightList: ['2吨', '3吨', '4吨', '5吨', '6吨', '8吨', '10吨', '12吨', '13吨', '14吨', '15吨', '18吨', '20吨', '25吨', '28吨', '30吨', '33吨', '34吨', '35吨', '36吨', '37吨', '38吨', '40吨', '42吨', '45吨', '48吨', '50吨', '55吨', '60吨', '65吨', '70吨', '75吨', '80吨', '85吨', '90吨', '95吨', '100吨'],
				//				cart_tonnage: '',
				my_driver_id: this.$route.params.id,
				//				cart_badge_no: '',
				//				realname: '',
				//				mobile_no: '',
				token: sessionStorage.getItem('token'),
				//				cart_width: '',
				//				cart_height: '',
				//				carframe_photo: '',
				//				car_photo: '',
				//				rtc_photo: '',
				//				tqc_photo: '',
				//				driving_permit_photo: '',
				//				vfi_photo: '',
				loading: false,
				fileInfo: {},
				carframe64: '',
				carframename: '',
				carframetype: '',
				car64: '',
				carname: '',
				cartype: '',
				rtc64: '',
				rtcname: '',
				rtctype: '',
				tqc64: '',
				tqcname: '',
				tqctype: '',
				permit64: '',
				permitname: '',
				permittype: '',
				vfi64: '',
				vfiname: '',
				vfitype: '',
				show: false,
				showPhote: ''
			}
		},
		components: {
			'v-header': Header,
			Group,
			XInput,
			Cell,
			Selector,
			Spinner,
			XDialog
		},
		created() {
			let fileInfoString = sessionStorage.getItem('fileInfo')
			this.fileInfo = JSON.parse(fileInfoString)
			this.fileInfo.cart_length = this.fileInfo.cart_length + '米'
			this.fileInfo.cart_tonnage = this.fileInfo.cart_tonnage + '吨'
			this.carframe64 = this.fileInfo.carframe_photo
			this.car64 = this.fileInfo.car_photo
			this.rtc64 = this.fileInfo.rtc_photo
			this.tqc64 = this.fileInfo.tqc_photo
			this.permit64 = this.fileInfo.driving_permit_photo
			this.vfi64 = this.fileInfo.vfi_photo
			//			console.log(this.fileInfo)
		},
		methods: {
			previewPhone(src) {
				this.show = true
				this.showPhote = src
			},
			toNum(value) {
				return parseFloat(value).toString()
			},
			carframeChange() {
				const img = this.$refs.carframe.files[0]
				lrz(img, {quality: 0.6}).then((rst) => {
					this.carframe64 = rst.base64
					this.carframename = img.name
					this.carframetype = img.type
				})
//				const reader = new FileReader()
//				reader.onload = (e) => {
//					this.carframe64 = e.target.result
//					this.carframename = img.name
//					this.carframetype = img.type
//				}
//				reader.readAsDataURL(img)
			},
			carChange() {
				const img = this.$refs.car.files[0]
				lrz(img, {quality: 0.6}).then((rst) => {
					this.car64 = rst.base64
					this.carname = img.name
					this.cartype = img.type
				})
//				const reader = new FileReader()
//				reader.onload = (e) => {
//					this.car64 = e.target.result
//					this.carname = img.name
//					this.cartype = img.type
//				}
//				reader.readAsDataURL(img)
			},
			rtcChange() {
				const img = this.$refs.rtc.files[0]
				lrz(img, {quality: 0.6}).then((rst) => {
					this.rtc64 = rst.base64
					this.rtcname = img.name
					this.rtctype = img.type
				})
//				const reader = new FileReader()
//				reader.onload = (e) => {
//					this.rtc64 = e.target.result
//					this.rtcname = img.name
//					this.rtctype = img.type
//				}
//				reader.readAsDataURL(img)
			},
			tqcChange() {
				const img = this.$refs.tqc.files[0]
				lrz(img, {quality: 0.6}).then((rst) => {
					this.tqc64 = rst.base64
					this.tqcname = img.name
					this.tqctype = img.type
				})
//				const reader = new FileReader()
//				reader.onload = (e) => {
//					this.tqc64 = e.target.result
//					this.tqcname = img.name
//					this.tqctype = img.type
//				}
//				reader.readAsDataURL(img)
			},
			permitChange() {
				const img = this.$refs.permit.files[0]
				lrz(img, {quality: 0.6}).then((rst) => {
					this.permit64 = rst.base64
					this.permitname = img.name
					this.permittype = img.type
				})
//				const reader = new FileReader()
//				reader.onload = (e) => {
//					this.permit64 = e.target.result
//					this.permitname = img.name
//					this.permittype = img.type
//				}
//				reader.readAsDataURL(img)
			},
			vfiChange() {
				const img = this.$refs.vfi.files[0]
				lrz(img, {quality: 0.6}).then((rst) => {
					this.vfi64 = rst.base64
					this.vfiname = img.name
					this.vfitype = img.type
				})
//				const reader = new FileReader()
//				reader.onload = (e) => {
//					this.vfi64 = e.target.result
//					this.vfiname = img.name
//					this.vfitype = img.type
//				}
//				reader.readAsDataURL(img)
			},
			upDataImg1() {
//				var update = this.$http.create()
//				update.interceptors.request.use(function(config) {
//					let params = config.data.data
//					if(params.file_name === '') {
//						return
//					}
//					return config
//				}, function(err) {
//					return Promise.reject(err)
//				})
				if(this.carframename === '') {
					return
				}
				return this.$http.post('waybill/html/post/v1/sign_img_upload?token=' + this.token, {
					data: {
						file_stream: this.carframe64,
						file_name: this.carframename,
						file_type: this.carframetype
					}
				}).then((res) => {
					this.fileInfo.carframe_photo = res.data.data.sign_img_url || ''
				})
			},
			upDataImg2() {
				if(this.carname === '') {
					return
				}
				return this.$http.post('waybill/html/post/v1/sign_img_upload?token=' + this.token, {
					data: {
						file_stream: this.car64,
						file_name: this.carname,
						file_type: this.cartype
					}
				}).then((res) => {
					this.fileInfo.car_photo = res.data.data.sign_img_url || ''
				})
			},
			upDataImg3() {
				if(this.rtcname === '') {
					return
				}
				return this.$http.post('waybill/html/post/v1/sign_img_upload?token=' + this.token, {
					data: {
						file_stream: this.rtc64,
						file_name: this.rtcname,
						file_type: this.rtctype
					}
				}).then((res) => {
					this.fileInfo.rtc_photo = res.data.data.sign_img_url || ''
				})
			},
			upDataImg4() {
				if(this.tqcname === '') {
					return
				}
				return this.$http.post('waybill/html/post/v1/sign_img_upload?token=' + this.token, {
					data: {
						file_stream: this.tqc64,
						file_name: this.tqcname,
						file_type: this.tqctype
					}
				}).then((res) => {
					this.fileInfo.tqc_photo = res.data.data.sign_img_url || ''
				})
			},
			upDataImg5() {
				if(this.permitname === '') {
					return
				}
				return this.$http.post('waybill/html/post/v1/sign_img_upload?token=' + this.token, {
					data: {
						file_stream: this.permit64,
						file_name: this.permitname,
						file_type: this.permittype
					}
				}).then((res) => {
					this.fileInfo.driving_permit_photo = res.data.data.sign_img_url || ''
				})
			},
			upDataImg6() {
				if(this.vfiname === '') {
					return
				}
				return this.$http.post('waybill/html/post/v1/sign_img_upload?token=' + this.token, {
					data: {
						file_stream: this.vfi64,
						file_name: this.vfiname,
						file_type: this.vfitype
					}
				}).then((res) => {
					this.fileInfo.vfi_photo = res.data.data.sign_img_url || ''
				})
			},
			complete() {
				if(this.fileInfo.service_state === '1' || this.fileInfo.service_state === '2') {
					this.$vux.toast.text('请先注册')
					return
				}
				if(this.fileInfo.cart_badge_no === '') {
					this.$vux.toast.text('请输入车牌号码')
					return
				}
				let pattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$/
				if(!pattern.test(this.fileInfo.cart_badge_no)) {
					this.$vux.toast.text('车牌号码格式有误')
					return
				}
				if(this.fileInfo.realname === '') {
					this.$vux.toast.text('请输入司机姓名')
					return
				}
				let pattern2 = /^(1[38][0-9]|15[0-35-9]|14[579]|17[0135678])[0-9]{8}$/
				//				console.log(pattern.test(str))
				if(!pattern2.test(this.fileInfo.mobile_no)) {
					this.$vux.toast.text('手机号不正确,请重新输入')
					return
				}
				//				if(this.fileInfo.mobile_no === '') {
				//					this.$vux.toast.text('请输入手机号码')
				//					return
				//				}
				if(this.fileInfo.id_card.length !== 18) {
					this.$vux.toast.text('身份证号码格式有误')
					return
				}
				this.loading = true
				this.$http.all([this.upDataImg1(), this.upDataImg2(), this.upDataImg3(), this.upDataImg4(), this.upDataImg5(), this.upDataImg6()])
					.then(this.$http.spread(() => {
						this.$http.post('driver/html/post/v1/truck_maintain?token=' + this.token, {
							data: {
								my_driver_id: this.fileInfo.my_driver_id,
								cart_badge_no: this.fileInfo.cart_badge_no,
								realname: this.fileInfo.realname,
								mobile_no: this.fileInfo.mobile_no,
								supplyofgoods: this.fileInfo.supplyofgoods,
								axle: this.fileInfo.axle,
								corps: this.fileInfo.corps,
								manufacturer: this.fileInfo.manufacturer,
								cart_width: this.fileInfo.cart_width,
								cart_length: this.toNum(this.fileInfo.cart_length),
								cart_height: this.fileInfo.cart_height,
								cart_tonnage: this.toNum(this.fileInfo.cart_tonnage),
								carframe_photo: this.fileInfo.carframe_photo,
								car_photo: this.fileInfo.car_photo,
								rtc_photo: this.fileInfo.rtc_photo,
								tqc_photo: this.fileInfo.tqc_photo,
								driving_permit_photo: this.fileInfo.driving_permit_photo,
								vfi_photo: this.fileInfo.vfi_photo,
								id_card: this.fileInfo.id_card
//								cart_volume: this.fileInfo.cart_volume
							}
						}).then((res) => {
							console.log(res)
							this.loading = false
							if(res.data.result.reCode === '0') {
								this.$vux.toast.text('提交成功')
								setTimeout(() => {
									//									this.$router.push('/FileVehicle/' + this.my_driver_id)
									this.$router.back(-1)
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
	@import '~vux/src/styles/close';
	.vehicle-info-box {
		.weui-cell {
			font-size: 13px;
		}
		padding-top: 44px;
		.current-option {
			display: flex;
			padding: 10px 0 10px 80px;
			background-color: white;
			.title {
				width: 50px;
				display: block;
				flex: 0 0 50px;
				font-size: 13px;
			}
			.content {
				font-size: 0;
				span {
					display: inline-block;
					padding: 2px 10px;
					background-color: #f7f7f7;
					font-size: 13px;
					margin: 4px;
				}
			}
		}
		.choose-img {
			width: 100%;
			/*height: 140px;*/
			background-color: white;
			margin-top: 20px;
			box-sizing: border-box;
			padding: 20px 12px;
			.row {
				display: flex;
				/*align-items: center;*/
				margin: 10px 0;
				.item {
					width: 0px;
					flex: 1;
					margin: 0 8%;
					position: relative;
					font-size: 0;
					img {
						width: 100%;
					}
					p {
						text-align: center;
						font-size: 13px;
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
						height: 16.224vw;
						display: flex;
						align-items: center;
						justify-content: center;
						position: relative;
						.vux-x-icon {
							fill: #C7C7C7;
						}
						input {
							width: 100%;
							height: 16.224vw;
							position: absolute;
							left: 0;
							top: 0;
							opacity: 0;
						}
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
		.dialog-demo6 {
			.weui-dialog {
				border-radius: 8px;
				padding-bottom: 8px;
			}
			.dialog-title {
				line-height: 30px;
				color: #666;
			}
			.img-box {
				height: 350px;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.vux-close {
				margin-top: 8px;
				margin-bottom: 8px;
			}
		}
	}
</style>