<template>
	<div class="file-vehicle-box" v-show="isComplete">
		<v-header title="运力档案"></v-header>
		<group>
			<x-input title="车牌号码：" :value="fileInfo.cart_badge_no" disabled></x-input>
			<x-input title="司机姓名：" :value="fileInfo.realname" disabled>
				<span slot="right" style="color: #fea509;">
					<!--<img src="../../../static/image/rengzheng@2x.png" style="width: 14px; height: 14px;" />-->
					{{fileInfo.approve_state}}
				</span>
			</x-input>
			<x-input title="手机号码：" :value="fileInfo.mobile_no" disabled type="tel"></x-input>
		</group>
		<div>
			<div class="tab vux-1px-b">
				<div class="item current">
					卡车档案
				</div>
				<span class="line vux-1px-r"></span>
				<div class="item" @click="goRoute">
					司机档案
				</div>
			</div>
			<div class="swiper-wrapper">
				<swiper :aspect-ratio="340/690" :show-desc-mask="false" :show-dots="false">
					<swiper-item class="swiper-demo-img" v-for="(item, index) in baseList" :key="index">
						<img :src="item.img">
						<p>{{item.title}}</p>
					</swiper-item>
				</swiper>
				<div class="swiper-master" @touchstart="masterShow=false" v-show="masterShow">
					<p>可左右滑动切换</p>
					<img src="../../../static/image/zuoyou@2x.png" class="img1" />
					<img src="../../../static/image/shou@2x.png" class="img2" />
				</div>
			</div>
			<group label-width="60px">
				<!--<x-input title="车型：" :value="fileInfo.cart_type" disabled></x-input>-->
				<cell title="车型：" value-align="left">
					<p style="color: black;">{{fileInfo.cart_type}}</p>
				</cell>
				<cell title="车长：" value-align="left">
					<span style="color: black" v-if="fileInfo.cart_length">{{fileInfo.cart_length}}米</span>
				</cell>
				<cell title="车宽：" value-align="left">
					<span style="color: black" v-if="fileInfo.cart_width">{{fileInfo.cart_width}}米</span>
				</cell>
				<cell title="车高：" value-align="left">
					<span style="color: black" v-if="fileInfo.cart_height">{{fileInfo.cart_height}}米</span>
				</cell>
				<cell title="吨位：" value-align="left">
					<span style="color: black" v-if="fileInfo.cart_tonnage">{{fileInfo.cart_tonnage}}吨</span>
				</cell>
				<!--<cell title="容积：" value-align="left">
					<span style="color: black" v-if="fileInfo.cart_volume">{{fileInfo.cart_volume}}方</span>
				</cell>-->
			</group>
		</div>
		<div class="nothing">
			<img src="../../../static/image/zanwu@2x.png" />
			<p>当前暂无任何信息</p>
		</div>
		<router-link :to="'/VehicleInfo/' + my_driver_id" tag="div" class="btn" v-if="$power('CAP_TRAARCH_TRUINFO_BTN')">
		</router-link>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput, Swiper, SwiperItem, Cell } from 'vux'
	export default {
		data() {
			return {
				isComplete: true,
				baseList: [],
				masterShow: true,
				my_driver_id: this.$route.params.id,
				token: sessionStorage.getItem('token'),
				fileInfo: {
					cart_badge_no: '',
					realname: '',
					mobile_no: '',
					cart_type: '',
					cart_width: '',
					cart_length: '',
					cart_height: '',
					cart_tonnage: '',
					cart_volume: ''
				},
				baseList2: [{
					url: 'javascript:',
					img: 'https://static.vux.li/demo/1.jpg',
					title: '送你一朵fua'
				}, {
					url: 'javascript:',
					img: 'https://static.vux.li/demo/2.jpg',
					title: '送你一辆车'
				}, {
					url: 'javascript:',
					img: 'https://static.vux.li/demo/5.jpg',
					title: '送你一次旅行',
					fallbackImg: 'https://static.vux.li/demo/3.jpg'
				}]
			}
		},
		components: {
			'v-header': Header,
			Swiper,
			SwiperItem,
			Group,
			XInput,
			Cell
		},
		created() {
			this.$vux.loading.show({
				text: '加载中'
			})
			this.$http.get('driver/html/get/v1/driver_record/' + this.my_driver_id + '?token=' + this.token)
				.then((res) => {
					console.log(res)
					this.fileInfo = res.data.data
					let fileInfo = JSON.stringify(res.data.data)
//					console.log(fileInfo)
					sessionStorage.setItem('fileInfo', fileInfo)
					this.baseList.push({
						img: this.fileInfo.carframe_photo,
						title: '车辆门头照'
					}, {
						img: this.fileInfo.car_photo,
						title: '车身照'
					}, {
						img: this.fileInfo.rtc_photo,
						title: '道路运输证'
					}, {
						img: this.fileInfo.tqc_photo,
						title: '运输从业资格证'
					}, {
						img: this.fileInfo.vfi_photo,
						title: '机动车强制保险'
					}, {
						img: this.fileInfo.driving_permit_photo,
						title: '行驶证照片'
					})
					this.$nextTick(() => {
						this.isComplete = true
						this.$vux.loading.hide()
					})
				})
		},
		methods: {
			goRoute() {
				this.$router.replace('/FileDriver/' + this.my_driver_id)
			}
		}
	}
</script>

<style lang="less">
	.file-vehicle-box {
		padding: 45px 10px;
		.weui-cell {
			font-size: 13px;
		}
		.tab {
			width: 100%;
			height: 40px;
			background-color: white;
			display: flex;
			align-items: center;
			color: #999999;
			line-height: 40px;
			margin-top: 20px;
			.item {
				width: 0;
				flex: 1;
				display: flex;
				justify-content: center;
				font-size: 14px;
				color: #646464;
			}
			.line {
				height: 26px;
				&.vux-1px-r:after {
					color: #999999;
					border-right: 1px solid #999999;
				}
			}
			.current {
				color: #fea509;
			}
		}
		.swiper-wrapper {
			position: relative;
			.vux-swiper {
				background-color: white;
				.swiper-demo-img {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					img {
						/*width: 63.9vw;*/
						max-height: 33.6vw;
						border-radius: 8px;
					}
					p {
						font-size: 16px;
						margin-top: 6px;
					}
				}
			}
			.swiper-master {
				width: 100%;
				height: 100%;
				position: absolute;
				background-color: rgba(40, 40, 40, 0.4);
				left: 0;
				top: 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				p {
					font-size: 20px;
					color: white;
				}
				.img1 {
					width: 116px;
					margin-top: 16px;
				}
				.img2 {
					width: 60px;
					margin-top: -10px;
				}
			}
		}
		.nothing {
			width: 100%;
			height: 134px;
			margin-top: 10px;
			background-color: white;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			display: none;
			img {
				width: 40px;
				height: 40px;
			}
			p {
				font-size: 16px;
				color: #9a9a9a;
				padding-top: 4px;
			}
		}
		.btn {
			width: 80px;
			height: 80px;
			border-radius: 50%;
			position: fixed;
			right: 24px;
			bottom: 24px;
			background: url(../../../static/image/kacheziliaoxiugai@2x.png) center no-repeat;
			background-size: 80px 80px;
		}
	}
</style>