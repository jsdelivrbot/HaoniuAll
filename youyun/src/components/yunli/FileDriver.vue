<template>
	<div class="file-driver-box">
		<v-header title="运力档案"></v-header>
		<group>
			<x-input title="车牌号码：" :value="fileInfo.cart_badge_no" disabled></x-input>
			<x-input title="司机姓名：" :value="fileInfo.realname" disabled>
				<span slot="right" style="color: #fea509;" v-show="fileInfo.approve_state === '3'">
					<img src="../../../static/image/rengzheng@2x.png" style="width: 14px; height: 14px;" />
					已认证
				</span>
			</x-input>
			<x-input title="手机号码：" :value="fileInfo.mobile_no" disabled></x-input>
		</group>
		<div class="tab vux-1px-b">
			<div class="item" @click="goRoute">
				卡车档案
			</div>
			<span class="line vux-1px-r"></span>
			<div class="item current">
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
		<group label-width="85px" style="margin-top: -1.17647059em;">
			<x-input title="身份证号：" :value="fileInfo.id_card" disabled></x-input>
			<!--<x-input title="期望流向：" :value="fileInfo.direction_name" disabled></x-input>-->
			<cell title="期望流向：" value-align="left">
				<p style="color: black;">{{fileInfo.direction_name}}</p>
			</cell>
		</group>
		<group label-width="85px">
			<x-input title="收款人姓名：" :value="fileInfo.pay_name" disabled></x-input>
			<x-input title="收款银行：" :value="fileInfo.bank_name" disabled></x-input>
			<x-input title="银行卡号：" :value="fileInfo.driver_bank_no" disabled></x-input>
			<x-input title="开户支行：" :value="fileInfo.bank_branch" disabled></x-input>
			<x-input title="开户手机：" :value="fileInfo.pay_mobile" disabled></x-input>
			<x-input title="开户城市：" :value="fileInfo.bank_city" disabled></x-input>
		</group>
		<router-link :to="'/DriverInfo/' + my_driver_id" tag="div" class="btn" v-if="$power('CAP_TRAARCH_DRINFO_BTN')">
		</router-link>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput, Swiper, SwiperItem, Cell } from 'vux'
	export default {
		data() {
			return {
				baseList: [],
				masterShow: true,
				my_driver_id: this.$route.params.id,
				token: sessionStorage.getItem('token'),
				fileInfo: {}
			}
		},
		components: {
			'v-header': Header,
			Swiper,
			Group,
			XInput,
			SwiperItem,
			Cell
		},
		created() {
			this.$http.get('driver/html/get/v1/driver_record/' + this.my_driver_id + '?token=' + this.token)
				.then((res) => {
					console.log(res)
					this.fileInfo = res.data.data
					this.baseList.push({
						img: this.fileInfo.id_card_front_photo,
						title: '身份证正面照片'
					}, {
						img: this.fileInfo.id_card_reverse_photo,
						title: '身份证反面照片'
					}, {
						img: this.fileInfo.driver_licence_photo,
						title: '驾驶证照片'
					}, {
						img: this.fileInfo.contract_photo,
						title: '合同文件'
					})
					let fileInfo = JSON.stringify(this.fileInfo)
					sessionStorage.setItem('fileInfo', fileInfo)
				})
		},
		methods: {
			goRoute() {
				this.$router.replace('/FileVehicle/' + this.my_driver_id)
			}
		}
	}
</script>

<style lang="less">
	.file-driver-box {
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
		.btn {
			width: 80px;
			height: 80px;
			background: url(../../../static/image/xiugairukou@2x.png) center no-repeat;
			background-size: 80px 80px;
			/*background-color: #3386ff;*/
			border-radius: 50%;
			position: fixed;
			right: 24px;
			bottom: 24px;
		}
	}
</style>