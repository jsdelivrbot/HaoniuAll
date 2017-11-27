<template>
	<div class="register-vehicle-box">
		<v-header title="注册车辆" :iconShow="false"></v-header>
		<group style="margin-left: -15px;">
			<x-input title="车牌号码:" :required="true" :border-intent="false" v-model="cart_badge_no">
				<span slot="right" style="color: #63bffe; font-size: 13px;">*必填</span>
			</x-input>
			<x-input title="司机姓名:" :required="true" :border-intent="false" v-model="realname" :max="16">
				<span slot="right" style="color: #63bffe; font-size: 13px;">*必填</span>
			</x-input>
			<x-input title="手机号码:" :required="true" v-model="mobile_no" type="number" :max="11">
				<span slot="right" style="color: #63bffe; font-size: 13px;">*必填</span>
			</x-input>
		</group>
		<group style="margin-left: -15px;" labelWidth="65px">
			<selector title="车型：" :options="categoryList1" v-model="axle" placeholder="拖挂及游轮"></selector>
			<selector title=" " :options="categoryList2" v-model="supplyofgoods" placeholder="货箱结构"></selector>
			<selector title=" " :options="categoryList3" v-model="corps" placeholder="特殊功能"></selector>
			<selector title=" " :options="categoryList4" v-model="manufacturer" placeholder="厂商品牌"></selector>
			<div class="current-option">
				<span class="title">已选：</span>
				<div class="content">
					<span class="vux-1px" v-show="axle !== ''">{{axle}}</span>
					<span class="vux-1px" v-show="supplyofgoods !== ''">{{supplyofgoods}}</span>
					<span class="vux-1px" v-show="corps !== ''">{{corps}}</span>
					<span class="vux-1px" v-show="manufacturer !== ''">{{manufacturer}}</span>
				</div>
			</div>
			<selector title="车长：" :options="lengthList" v-model="cart_length" placeholder="选择车长"></selector>
			<x-input title="车宽：" type="number" label-width="65px" v-model="cart_width" :max="8">
				<span slot="right">米</span>
			</x-input>
			<x-input title="车高：" type="number" label-width="65px" v-model="cart_height" :max="8">
				<span slot="right">米</span>
			</x-input>
			<selector title="吨位：" :options="weightList" v-model="cart_tonnage" placeholder="选择吨位"></selector>
		</group>
		<div class="choose-img">
			<div class="row">
				<div class="item" v-show="carframe64 !== ''">
					<div class="img">
						<img :src="carframe64" />
					</div>
					<p>车辆门头照</p>
					<span @click="carframe64 = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="carframe64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
						<input type="file" @change="carframeChange" ref="carframe" />
					</div>
					<p>车辆门头照</p>
				</div>
				<div class="item" v-show="car64 !== ''">
					<div class="img">
						<img :src="car64" />
					</div>
					<p>车身照</p>
					<span @click="car64 = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="car64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
						<input type="file" @change="carChange" ref="car" />
					</div>
					<p>车身照</p>
				</div>
				<div class="item" v-show="rtc64 !== ''">
					<div class="img">
						<img :src="rtc64" />
					</div>
					<p>道路运输证</p>
					<span @click="rtc64 = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
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
					<div class="img">
						<img :src="tqc64" />
					</div>
					<p>运输从业资格证</p>
					<span @click="tqc64 = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="tqc64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
						<input type="file" @change="tqcChange" ref="tqc" />
					</div>
					<p>运输从业资格证</p>
				</div>
				<div class="item" v-show="permit64 !== ''">
					<div class="img">
						<img :src="permit64" />
					</div>
					<p>行驶证</p>
					<span @click="permit64 = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
				</div>
				<div class="item" v-show="permit64 === ''">
					<div class="add vux-1px">
						<x-icon type="ios-plus-empty" size="60"></x-icon>
						<input type="file" @change="permitChange" ref="permit" />
					</div>
					<p>行驶证</p>
				</div>
				<div class="item" v-show="vfi64 !== ''">
					<div class="img">
						<img :src="vfi64" />
					</div>
					<p>机动车强制保险</p>
					<span @click="vfi64 = ''"><x-icon type="ios-close-empty" size="30"></x-icon></span>
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
	import { Group, XInput, Cell, Selector, Spinner } from 'vux'
	export default {
		data() {
			return {
				categoryList1: ['半挂一拖二', '半挂一拖三', '半挂二拖二', '半挂二拖三', '前四后四半挂', '前四后四', '前四后六', '前四后八', '前四后十', '后八轮', '五轮车', '单桥', '双桥', '四桥', '五桥', '六桥', '七桥', '八桥', '九桥', '全挂', '其他'],
				axle: '',
				categoryList2: ['普通', '平板', '高低平板', '厢式', '封闭', '开项箱', '罐式', '集装箱', '自卸', '高栏', '轴线板', '满轮车', '框架板', '高低高板', '抽拉板', '簸箕板', '超低板', '高低板高栏', '笼子车', '叶片车'],
				supplyofgoods: '',
				categoryList3: ['冷藏车', '危险品', '邮政车', '棉被车', '起重车', '搅拌机', '推土机', '装载机', '挖掘机', '平地机', '压路车', '爬梯车', '随车吊', '汽车吊', '大件车', '罐体专用车', '飞翼车', '尾板车'],
				corps: '',
				categoryList4: ['中国重汽', '一汽解放', '东风商用车', '东风柳汽', '东风日产柴', '陕西重汽', '北汽福田', '依维柯', '重庆重汽', '北方奔驰', '江淮格尔发', '安徽华菱', '湖北三环', '福建新马龙', '精工镇江', '春兰卡车', '上海汇众', '金华青年曼', '洛阳福德', '南汽凌野', '瑞典沃尔沃', '法国雷诺', '德国曼', '德国奔驰', '瑞典斯堪尼亚', '日本五十玲', '日本日野', '其他'],
				manufacturer: '',
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
				cart_length: '',
				weightList: ['2吨', '3吨', '4吨', '5吨', '6吨', '8吨', '10吨', '12吨', '13吨', '14吨', '15吨', '18吨', '20吨', '25吨', '28吨', '30吨', '33吨', '34吨', '35吨', '36吨', '37吨', '38吨', '40吨', '42吨', '45吨', '48吨', '50吨', '55吨', '60吨', '65吨', '70吨', '75吨', '80吨', '85吨', '90吨', '95吨', '100吨'],
				cart_tonnage: '',
				my_driver_id: this.$route.params.id,
				cart_badge_no: '',
				realname: '',
				mobile_no: '',
				token: sessionStorage.getItem('token'),
				cart_width: '',
				cart_height: '',
				carframe_photo: '',
				car_photo: '',
				rtc_photo: '',
				tqc_photo: '',
				driving_permit_photo: '',
				vfi_photo: '',
				loading: false,
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
				vfitype: ''
			}
		},
		components: {
			'v-header': Header,
			Group,
			XInput,
			Cell,
			Selector,
			Spinner
		},
		methods: {
			toNum(value) {
				if(value === '') {
					return ''
				}
				return parseFloat(value).toString()
			},
			deleM(value) {
				return value.substring(0, value.length - 1)
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
					this.carframe_photo = res.data.data.sign_img_url || ''
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
					this.car_photo = res.data.data.sign_img_url || ''
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
					this.rtc_photo = res.data.data.sign_img_url || ''
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
					this.tqc_photo = res.data.data.sign_img_url || ''
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
					this.driving_permit_photo = res.data.data.sign_img_url || ''
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
					this.vfi_photo = res.data.data.sign_img_url || ''
				})
			},
			complete() {
				if(this.cart_badge_no === '') {
					this.$vux.toast.text('请输入车牌号码')
					return
				}
//				if(this.cart_length === '') {
//					this.$vux.toast.text('请选择车长')
//					return
//				}
//				if(this.cart_tonnage === '') {
//					this.$vux.toast.text('请选择吨位')
//					return
//				}
				let pattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$/
				if(!pattern.test(this.cart_badge_no)) {
					this.$vux.toast.text('车牌号码格式有误')
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
					this.$vux.toast.text('手机号不正确,请重新输入')
					return
				}
				if(this.cart_height.length > 8) {
					this.$vux.toast.text('车高字符超出最大长度')
					return
				}
				if(this.cart_width.length > 8) {
					this.$vux.toast.text('车宽字符超出最大长度')
					return
				}
				this.loading = true
				this.$http.all([this.upDataImg1(), this.upDataImg2(), this.upDataImg3(), this.upDataImg4(), this.upDataImg5(), this.upDataImg6()])
					.then(this.$http.spread(() => {
						this.$http.post('driver/html/post/v1/driver_register?token=' + this.token, {
							data: {
								cart_badge_no: this.cart_badge_no,
								realname: this.realname,
								mobile_no: this.mobile_no,
								supplyofgoods: this.supplyofgoods,
								axle: this.axle,
								corps: this.corps,
								manufacturer: this.manufacturer,
								cart_width: this.cart_width,
								cart_length: this.deleM(this.cart_length),
								cart_height: this.cart_height,
								cart_tonnage: this.toNum(this.cart_tonnage),
								carframe_photo: this.carframe_photo,
								car_photo: this.car_photo,
								rtc_photo: this.rtc_photo,
								tqc_photo: this.tqc_photo,
								driving_permit_photo: this.driving_permit_photo,
								vfi_photo: this.vfi_photo
							}
						}).then((res) => {
							console.log(res)
							this.loading = false
							if(res.data.data.registerReCode === '0') {
								this.$vux.toast.text('注册成功')
								setTimeout(() => {
									this.$router.push('/YunLi')
								}, 500)
							} else {
								this.$vux.toast.text(res.data.data.registerReInfo)
							}
						})
					}))
			}
		}
	}
</script>

<style lang="less">
	.register-vehicle-box {
		padding-top: 44px;
		.weui-cell__hd {
			padding-left: 15px;
		}
		.weui-cell {
			font-size: 13px;
		}
		.current-option {
			display: flex;
			padding: 10px 0 10px 120px;
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
					.img {
						width: 100%;
						height: 16.224vw;
						overflow: hidden;
						display: flex;
						justify-content: center;
						align-items: center;
						img {
							width: 100%;
						}
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
						/*svg {
							width: 95%;
						}*/
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
	}
</style>