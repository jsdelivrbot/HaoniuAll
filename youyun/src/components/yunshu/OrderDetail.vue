<template>
	<div class="order-detail-box" v-show="isComplete">
		<v-header title="运单详情"></v-header>

		<div class="tab" v-if="fromFuKuan === '1'">
			<div class="tab-item current">
				运单信息
			</div>
			<span class="line vux-1px-r"></span>
			<router-link :to="'/ChargeApply3/' + waybill_id + '?from_type=' + fromType" replace class="tab-item">
				支付信息
			</router-link>
		</div>

		<div :class="{fromFuKuan: fromFuKuan === '1'}">
			<div class="item go-rater" v-if="raterShow">
				<p @click="masterShow = true">您还没评价,请前往评价！ >></p>
			</div>

			<div class="item" v-if="info.star !== ''">
				<div class="rater">
					<rater :value="toNumber(info.star)" :font-size="36" disabled></rater>
					<p @click="masterShow2 = true">查看评价 >></p>
				</div>
			</div>

			<div class="item">
				<p>运单号：{{info.waybill_no}}</p>
				<p>建单时间：{{info.created_time}}</p>
				<p>项目名称：{{info.project_name}}</p>
				<p>
					<span v-if="info.goods_name">{{info.goods_name}},</span>
					<span v-if="info.goods_num">{{info.goods_num}}</span>
					<span v-if="info.goods_num">{{info.unit}}</span>
				</p>
				<p>{{info.begin_address}} 至 {{info.end_address}}</p>
			</div>

			<div class="item">
				<p>{{info.cart_badge_no}},{{info.driver_name}},{{info.mobile_no}}</p>
				<p>{{info.cart_type}},{{info.cart_length}}米</p>
				<p>定位时间：{{info.last_cur_modified_time}}</p>
				<p>当前位置：{{info.cur_position}}</p>
			</div>

			<div class="footer">
				<p class="vux-1px-r" @click="ydLocation(info.driver_name, info.mobile_no, info.cart_badge_no, waybill_id)" v-if="$power('TRA_BILLDET_LOC_BTN')">
					<img src="../../../static/image/jingquedingwei@2x.png" width="13px" height="16px" />
					<span>精确定位</span>
				</p>
				<p @click="ydTrack(info.driver_name, info.mobile_no, info.cart_badge_no, waybill_id)" v-if="$power('TRA_BILLDET_HISTRAT_BTN')">
					<img src="../../../static/image/lishiguiji@2x.png" width="16px" height="16px" />
					<span>历史轨迹</span>
				</p>
			</div>

			<div class="item onRoad" v-if="info.state === '1'">
				<p>
					发货时间：{{info.qy_time}}
					<span class="label">在途中</span>
				</p>
				<p>预计到货时间：{{info.predict_end_time}}</p>
			</div>

			<div class="footer-on-road vux-1px-t" v-if="info.state === '1'">
				全程<span class="red">{{info.mileage}}</span>公里,预计用时<span class="red">{{info.use_time}}</span>小时
			</div>

			<div class="item" v-if="info.state === '2'">
				<p>发货时间：{{info.qy_time}}<span class="label">已到货</span></p>
				<p>预计到货时间：{{info.predict_end_time}}</p>
				<p>实际到货时间：{{info.real_end_time}}</p>
			</div>

			<div class="item" v-if="info.state === '3'">
				<p>发货时间：{{info.qy_time}}<span class="label">已签收</span></p>
				<p>预计到货时间：{{info.predict_end_time}}</p>
				<p>
					实际到货时间：{{info.real_end_time}}
					<span class="label2" @click="signInDetail" v-if="$power('TRA_BILLDET_SIGNDET_BTN')" v-show="info.sign_time">查看签收详情</span>
				</p>
				<p>签收时间：{{info.sign_time}}</p>
			</div>

			<div class="btn" v-if="info.state === '1'" @click="receive(info.waybill_id)" v-show="$power('TRA_BILLDET_CONARR_BTN')">
				确认到货
			</div>

			<div class="btn" v-if="info.state === '2'" @click="signIn" v-show="$power('TRA_BILLDET_CONREC_BTN')">
				确认签收
			</div>

			<div class="master" v-show="masterShow">
				<div class="content">
					<p>您已确认该订单已到达目的地,快来评价吧</p>
					<div class="rater">
						<rater :font-size="30" style="margin-top: 10px;" v-model="rater"></rater>
					</div>
					<textarea v-model="content" :max="64"></textarea>
					<x-icon type="ios-close-empty" size="40" @click="closeMaster"></x-icon>
					<div class="content-btn" @click="evaluation">
						完成评价
					</div>
				</div>
			</div>

			<div class="master" v-show="masterShow2">
				<div class="content">
					<p>{{evaluationInfo.cart_badge_no}},{{evaluationInfo.driver_name}},{{evaluationInfo.mobile_no}}</p>
					<div class="rater">
						<rater :font-size="30" style="margin-top: 10px;" :value="toNumber(evaluationInfo.star)" disabled></rater>
					</div>
					<p>{{evaluationInfo.content}}</p>
					<x-icon type="ios-close-empty" size="40" @click="closeMaster2"></x-icon>
				</div>
			</div>

			<div class="master" v-show="masterShow3">
				<div class="content">
					<img :src="signDetail.sign_img_url" class="signImg" />
					<p>{{signDetail.sign_content}}</p>
					<x-icon type="ios-close-empty" size="40" @click="closeMaster3"></x-icon>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Rater } from 'vux'
	export default {
		data() {
			return {
				isComplete: false,
				masterShow: false,
				token: sessionStorage.getItem('token'),
				waybill_id: this.$route.params.id,
				info: {
					star: '',
					state: '1'
				},
				rater: 0,
				content: '',
				masterShow2: false,
				evaluationInfo: {},
				masterShow3: false,
				signDetail: {},
				fromFuKuan: this.$route.query.fromFuKuan,
				fromType: this.$route.query.from_type
			}
		},
		computed: {
			raterShow() {
				return this.info.star === '' && this.info.state !== '1'
			}
		},
		components: {
			'v-header': Header,
			Rater
		},
		created() {
			this.$vux.loading.show({
				text: '加载中'
			})
			this.init()
		},
		methods: {
			init() {
				this.$http.get('waybill/html/get/v1/waybill_detail/' + this.waybill_id + '?token=' + this.token)
					.then((res) => {
						//					console.log(res)
						this.info = res.data.data
					})
				this.$http.get('waybill/html/get/v1/evaluation_detail/' + this.waybill_id + '?token=' + this.token)
					.then((res) => {
						console.log(res)
						this.evaluationInfo = res.data.data
						this.$nextTick(() => {
							this.isComplete = true
							this.$vux.loading.hide()
						})
					})
			},
			signIn() {
				this.$router.replace('/SureSignIn2/' + this.waybill_id)
			},
			signInDetail() {
				this.$http.get('waybill/html/get/v1/sign_detail/' + this.waybill_id + '?token=' + this.token)
					.then((res) => {
						console.log(res)
						this.signDetail = res.data.data
					})
				this.masterShow3 = true
			},
			closeMaster() {
				this.masterShow = false
			},
			closeMaster2() {
				this.masterShow2 = false
			},
			closeMaster3() {
				this.masterShow3 = false
			},
			toNumber(value) {
				return parseInt(value)
			},
			ydLocation(name, mobile, cart, id) {
				window.android.ydLocation(name, mobile, cart, id)
			},
			ydTrack(name, mobile, cart, id) {
				window.android.ydTrack(name, mobile, cart, id)
			},
			evaluation() {
				if(this.rater === 0) {
					this.$vux.toast.text('打个分吧')
					return
				}
				if(this.content.length > 64) {
					this.$vux.toast.text('评价内容超出最大长度限制')
					return
				}
				this.$http.post('waybill/html/post/v1/evaluation?token=' + this.token, {
					data: {
						waybill_id: this.waybill_id,
						my_driver_id: this.info.my_driver_id,
						star: this.rater.toString(),
						content: this.content
					}
				}).then((res) => {
					if(res.data.result.reCode === '0') {
						this.$vux.toast.text('评价成功')
						this.masterShow = false
						this.init()
					} else {
						this.$vux.toast.text(res.data.result.reInfo)
					}
					//					console.log(res)
				})
			},
			receive(id) {
				let $this = this
				this.$vux.confirm.show({
					title: '提示',
					content: '是否确认订单已到达目的地？',
					onConfirm() {
						$this.$http.get('waybill/html/get/v1/goods_arrival/' + id + '?token=' + $this.token)
							.then((res) => {
								console.log(res)
								if(res.data.result.reCode === '0') {
									//									$this.masterShow = true
									$this.$vux.toast.text('确认收货成功')
									setTimeout(() => {
										$this.$router.replace('/Yunshu')
									}, 500)
								} else {
									$this.$vux.toast.text(res.data.result.reInfo)
								}
							})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.order-detail-box {
		padding-top: 45px;
		padding-bottom: 40px;
		.tab {
			width: 100%;
			height: 40px;
			position: fixed;
			top: 45px;
			left: 0;
			background-color: white;
			display: flex;
			align-items: center;
			color: #999999;
			line-height: 40px;
			.tab-item {
				width: 0;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 15px;
				color: #646464;
				&.current {
					color: #63bffe;
				}
			}
			.line {
				height: 26px;
				&.vux-1px-r:after {
					color: #999999;
					border-right: 1px solid #999999;
				}
			}
		}
		.fromFuKuan {
			margin-top: 50px;
		}
		.item {
			margin: 10px 10px 0;
			padding: 15px;
			background-color: white;
			font-size: 14px;
			p {
				.label {
					color: #60befb;
					float: right;
					font-size: 16px;
				}
				.label2 {
					font-size: 14px;
					text-decoration: underline;
					float: right;
					color: #60befb;
				}
			}
			.rater {
				display: flex;
				flex-direction: column;
				align-items: center;
				p {
					color: #fcad6b;
					font-size: 14px;
					margin-top: 16px;
				}
			}
		}
		.go-rater {
			height: 80px;
			p {
				text-align: center;
				line-height: 80px;
				font-size: 16px;
				color: #ffac5c;
			}
		}
		.onRoad {
			p {
				.label {
					color: #f64440;
					float: right;
					font-size: 16px;
				}
			}
		}
		.footer-on-road {
			height: 30px;
			background-color: white;
			margin: 0 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			.red {
				color: red;
			}
		}
		.footer {
			display: flex;
			align-items: center;
			background-color: white;
			height: 30px;
			margin: 2px 10px;
			p {
				width: 0;
				flex: 1;
				font-size: 0;
				color: #656565;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					margin-right: 6px;
				}
				span {
					font-size: 14px;
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
				p {
					font-size: 14px;
					text-align: center;
					color: #666666;
					margin-top: 10px;
				}
				.rater {
					display: flex;
					justify-content: center;
				}
				textarea {
					width: 240px;
					min-height: 80px;
					display: block;
					margin: 10px auto;
					font-size: 14px;
				}
				.content-btn {
					width: 92px;
					height: 30px;
					background-color: #ffce4e;
					color: white;
					text-align: center;
					line-height: 30px;
					border-radius: 15px;
					font-size: 14px;
					margin: 0 auto;
				}
				svg {
					position: absolute;
					top: 4px;
					right: 4px;
				}
				.vux-x-icon {
					fill: #9b9b9b;
				}
				.signImg {
					display: block;
					margin: 0 auto;
					max-width: 200px;
					max-height: 300px;
				}
			}
		}
	}
</style>