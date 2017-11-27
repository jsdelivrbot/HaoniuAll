<template>
	<div class="order-affirm" v-if='detailInfo'>
		<topbar title='订单确认'></topbar>
		<div class="order-info">
			<h2>商品清单</h2>
			<div>
				<span>
					课程名称
				</span>
				<span>
					单价
				</span>
				<span>
					数量
				</span>
				<span>
					小计
				</span>
			</div>
			<div>
				<span v-if='detailInfo.name'>
					{{detailInfo.name.substring(0,5)}}
				</span>
				<span>
					¥{{oldmoney}}
				</span>
				<span>
					1
				</span>
				<span style="color: #ffa019;">
					¥{{oldmoney}}
				</span>
			</div>
		</div>

		<div class="coupon vux-1px-t" v-if='detailInfo.douAmount>0||detailInfo.couponId>0||detailInfo.discount>0'>
			<span>可选择优惠</span>
			<div class="select">
				<checker v-model="select" default-item-class="select-item" @on-change='changecoupon' selected-item-class="select-item-active">
					<checker-item value="2" v-if='!detailInfo.douAmount==0'>
						<span></span>
						<em>{{detailInfo.douAmount}}个转换豆(等值{{detailInfo.douAmount}}元)</em>
					</checker-item>
					<checker-item value="3" v-if='detailInfo.coupon'>
						<span></span>
						<em>{{detailInfo.coupon.name}}</em>
					</checker-item>
					<checker-item value="1" v-if='detailInfo.discount!=0'>
						<span></span>
						<em>{{detailInfo.discount}}折优惠</em>
					</checker-item>
				</checker>
			</div>
		</div>
		<div class="coupon vux-1px-t" v-if='CouponInfo.length>0'>
			<span>选择优惠券</span>
			<div class="select">
				<checker v-model="Coupon" default-item-class="select-item" @on-change='selectcoupon' selected-item-class="select-item-active">
					<checker-item :value="index" v-for='(item,index) in CouponInfo' :key='index'>
						<span></span>
						<em>{{item.descript}}</em>
					</checker-item>
				</checker>

			</div>
		</div>

		<div class="total vux-1px-t" style="height: auto;">
			<p style="font-size: 14px;color: #666;text-align: right;">优惠金额: <em style="font-style: normal;color: #ffa019;">¥{{getCouponVal}}</em> </p>
			<!--合计:
			<em>
				¥{{(oldmoney - getCouponVal).toFixed(2)}}
			</em>-->
		</div>
		<div class="select-children">
			<h2>选择上课的子女</h2>
			<ul class="vux-1px-t" v-if='list!==""'>
				<li class="vux-1px-b" v-for="item in list" @click="selectfn(item.id)">
					<div class="left-info">
						<div>
							<h2>{{item.name}}</h2>
							<img src="~IMG/girl.png" v-if='item.gender ===1' />
							<img src="~IMG/boy.png" v-if='item.gender ===0' />
							<em></em>
						</div>
						<p>
							出生日期: <span>{{item.birthday}}</span>
						</p>
					</div>
					<div class="right-info">
						<div :class="{active:selectIndex===item.id}">
						</div>
					</div>
				</li>
			</ul>

			<div class="btn-addchildren vux-1px-b" v-if='list!==""&&list.length<3'>
				<router-link tag='div' to='/addchildreninfo'>
					<em></em>
					<img src="~IMG/addicon3.png" />
					<p>
						添加子女信息
					</p>
					<em></em>
				</router-link>
			</div>

			<div class="children-null" v-if='list===""'>
				<h3>您尚未填写任何子女信息</h3>
				<router-link tag='div' to='/addchildreninfo'>
					<em></em>
					<img src="~IMG/addicon.png" />
					<p>
						添加子女信息
					</p>
					<em></em>
				</router-link>
			</div>

		</div>
		<div class="no-login" v-if='!token'>
			<p>您尚未登录,无法提交订单</p>
			<router-link to='/login'>
				登录
			</router-link>
			<h3>还没有账号?
				<router-link to='/reg' replace>立即注册</router-link>
			</h3>
		</div>

		<div class="footer vux-1px-t" v-if='token'>
			<div class="left">
				<em>还需支付:</em>¥{{(oldmoney - getCouponVal).toFixed(2)}}
			</div>
			<div class="right" @click="topay()">
				确认订单
			</div>
		</div>
	</div>
</template>
<script>
	import topbar from '@/components/callback'
	import { Timeline, TimelineItem, XInput, Group, Checker, CheckerItem, CheckIcon } from 'vux'
	export default {
		components: {
			Timeline,
			TimelineItem,
			XInput,
			Group,
			Checker,
			CheckerItem,
			CheckIcon,
			topbar
		},
		data() {
			return {
				token: sessionStorage.getItem('token'),
				select: '',
				Coupon: '',
				CouponPrice: 0,
				CouponInfo: [],
				detailInfo: [],
				oldmoney: '',
				contacts: '',
				contactsPhone: '',
				disabled: true,
				list: JSON.parse(localStorage.getItem('childrenInfo')),
				selectIndex: '',
				id: ''
			}
		},
		activated() {
			this.selectIndex = ''
			this.select = ''
			this.id = this.$route.params.name
			this.$http.get('/business/course/courseDetail', {
				params: {
					courseId: this.id
				}
			}).then(
				(res) => {
					this.detailInfo = res.data.obj
					this.oldmoney = this.detailInfo.price
				}
			)

			this.$http.get('/user/info').then(
				(res) => {
					this.contacts = res.data.obj.nickname
					this.contactsPhone = res.data.obj.phone
					console.log(res.data)
				}
			)

			this.$http.get('/user/coupon/findCoupon', {
				params: {
					courseId: this.id
				}
			}).then(
				(res) => {
					this.CouponInfo = res.data.obj
					console.log(res.data)
				}
			)
			this.list = JSON.parse(localStorage.getItem('childrenInfo'))
		},
		computed: {
			getCouponVal() {
				let val = this.oldmoney - this.detailInfo.price + this.CouponPrice
				if(val <= 0) {
					return 0
				} else {
					if(val > this.oldmoney) {
						return this.oldmoney
					} else {
						return val
					}
				}
			}
		},
		methods: {
			selectfn(val) {
				this.selectIndex = val
			},
			selectcoupon(res) {
				if(res !== '') {
					this.CouponPrice = this.CouponInfo[res].dkPrice
				}
			},
			changecoupon(val) {
				if(val === '1') {
					this.detailInfo.price = this.detailInfo.price * this.detailInfo.discount / 10
				} else {
					this.detailInfo.price = this.oldmoney
				}
			},
			topay() {
				if(this.selectIndex === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请选择上课子女!'
					})
					return false
				}
				let applyCouponId = ''
				if(this.CouponInfo.length > 0) {
					applyCouponId = this.CouponInfo[this.Coupon].id
				}
				let props = this.$route.params.name.split(',')
				this.$http.get('/business/order/downOrder', {
					params: {
						courseId: this.id,
						type: this.select,
						childId: this.selectIndex,
						applyCouponId: applyCouponId
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.$router.replace('/orderdetail/' + res.data.obj)
						} else {
							this.$vux.alert.show({
								title: '提示!',
								content: res.data.msg
							})
						}
						console.log(res.data)
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.order-affirm {
		padding-bottom: 60px;
		box-sizing: border-box;
		.select-children {
			.children-null {
				padding: 0 15px;
				box-sizing: border-box;
				h3 {
					padding: 15px 0;
					text-align: center;
					font-size: 14px;
					color: #333;
					font-weight: normal;
				}
				div {
					height: 44px;
					width: 100%;
					font-size: 18px;
					padding: 13px 0;
					box-sizing: border-box;
					margin-bottom: 15px;
					border-radius: 5px;
					border: none;
					background: #84BEF3;
					color: #fff;
					display: flex;
					img {
						width: 18px;
						height: 18px;
						margin-right: 5px;
					}
					p {
						line-height: 18px;
					}
					em {
						flex: 1;
					}
				}
			}
			.btn-addchildren {
				box-sizing: border-box;
				background: #fff;
				div {
					height: 44px;
					width: 100%;
					font-size: 18px;
					box-sizing: border-box;
					border: none;
					padding: 13px 0;
					color: #84BEF3;
					display: flex;
					img {
						width: 20px;
						height: 20px;
						margin-right: 5px;
					}
					p {
						line-height: 18px;
					}
					em {
						flex: 1;
					}
				}
			}
			>h2 {
				font-size: 14px;
				padding: 0 15px;
				box-sizing: border-box;
				color: #666;
				line-height: 40px;
				font-weight: normal;
			}
			li {
				padding: 12px 15px;
				box-sizing: border-box;
				background: #fff;
				height: 62px;
				display: flex;
				.left-info {
					overflow: hidden;
					flex: 2;
					p {
						font-size: 14px;
						color: #999;
						line-height: 14px;
					}
					div {
						display: flex;
						margin-bottom: 4px;
						h2 {
							font-size: 17px;
							font-weight: normal;
							color: #333;
							line-height: 18px;
						}
						img {
							width: 13px;
							height: 13px;
							margin: 1px 6px;
						}
						em {
							flex: 1;
						}
					}
				}
				.right-info {
					overflow: hidden;
					.active {
						background: url(~IMG/selectround2.png) no-repeat center;
						background-size: 100% auto;
					}
					div {
						margin: 10px 0;
						width: 20px;
						height: 20px;
						/*padding: 2px 0;*/
						text-align: center;
						background: url(~IMG/selectround.png) no-repeat center;
						background-size: 100% auto;
					}
				}
			}
		}
		.footer {
			width: 100%;
			height: 45px;
			background: #fff;
			line-height: 45px;
			position: fixed;
			z-index: 999;
			bottom: 0;
			display: flex;
			div {
				flex: 1;
				text-align: center;
				font-size: 14px;
			}
			.left {
				color: #000;
				em {
					margin-right: 10px;
					font-style: normal;
				}
			}
			.right {
				color: #fff;
				background: #84BEF3;
			}
		}
		.wait {
			/*background: #000;*/
			margin-top: 10px;
			padding-bottom: 0;
			height: 98px;
			overflow: hidden;
			padding: 0 15px;
			background: #fff;
			box-sizing: border-box;
			.linkman {
				box-sizing: border-box;
				height: auto;
				overflow: hidden;
				p {
					font-size: 15px;
					color: #333;
					padding: 10px 0;
					/*line-height: 37px;*/
				}
				div {
					color: #666;
					height: auto;
					span {
						display: block;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 14px;
						line-height: 14px;
						margin-bottom: 10px;
						em {
							font-style: normal;
							margin-right: 5px;
						}
						img {
							display: inline-block;
							width: 14px;
							height: 14px;
						}
					}
					span:last-child {
						margin-bottom: 15px;
					}
				}
			}
			.course-info {
				margin-top: 10px;
				padding: 15px;
				box-sizing: border-box;
				background: #fff;
				font-size: 14px;
				color: #666;
				padding-bottom: 10px;
				p {
					margin-bottom: 5px;
				}
			}
		}
		.wait1 {
			/*background: #000;*/
			margin-top: 10px;
			padding-bottom: 0;
			.linkman {
				padding: 0 15px;
				/*height: 74px;*/
				box-sizing: border-box;
				height: auto;
				overflow: hidden;
				background: #fff;
				p {
					font-size: 15px;
					color: #333;
					padding: 15px 0;
					/*line-height: 37px;*/
				}
				div {
					color: #666;
					height: auto;
					/*line-height: 37px;*/
					/*display: flex;*/
					span {
						display: block;
						/*flex: 1;*/
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 14px;
						margin-bottom: 10px;
					}
					span:last-child {
						margin-bottom: 15px;
					}
				}
			}
			.course-info {
				margin-top: 10px;
				padding: 15px;
				box-sizing: border-box;
				background: #fff;
				font-size: 14px;
				color: #666;
				padding-bottom: 10px;
				p {
					margin-bottom: 5px;
				}
			}
		}
		.no-login {
			padding: 40px 15px;
			box-sizing: border-box;
			height: auto;
			overflow: hidden;
			text-align: center;
			>p {
				font-size: 14px;
				color: #666;
				text-align: left;
			}
			>a {
				width: 180px;
				line-height: 35px;
				height: 35px;
				display: inline-block;
				color: #84BEF3;
				font-size: 16px;
				margin: 20px auto 15px auto;
				border: 1px solid #84BEF3;
				border-radius: 5px;
			}
			h3 {
				font-size: 14px;
				font-weight: normal;
				color: #666;
				a {
					font-weight: 600;
					font-style: normal;
					color: #333;
					margin-left: 8px;
				}
			}
		}
	}
	
	.order-info {
		margin-top: 55px;
		background: #fff;
		height: 93px;
		padding: 10px 15px;
		box-sizing: border-box;
		h2 {
			font-size: 15px;
			color: #333;
			font-weight: normal;
			/*margin-bottom: 15px;*/
		}
		div:first-child {
			margin-bottom: 10px;
		}
		div {
			display: block;
			height: auto;
			overflow: hidden;
			display: flex;
			span {
				flex: 1;
				/*display: inline-block;*/
				/*float: left;*/
				/*width: 33.3333333%;*/
				color: #666;
				font-size: 14px;
			}
		}
	}
	
	.coupon {
		background: #fff;
		height: auto;
		overflow: hidden;
		padding: 15px;
		box-sizing: border-box;
		display: flex;
		span {
			width: 90px;
			font-size: 14px;
		}
		div {
			flex: 2;
		}
	}
	
	.total {
		height: 44px;
		line-height: 44px;
		text-align: right;
		background: #fff;
		font-size: 15px;
		padding: 0 15px;
		em {
			font-style: normal;
			color: #ffa019;
		}
	}
	
	.select-item {
		width: 100%;
		overflow: hidden;
		height: 24px;
		line-height: 24px;
		display: flex;
		span {
			width: 16px;
			height: 16px;
			border: 1px solid #797979;
			border-radius: 50%;
			display: inline-block;
			margin: 4px 8px;
			position: relative;
			float: left;
		}
		em {
			flex: 1;
			float: left;
			line-height: 28px;
			font-style: normal;
			color: #797979;
			font-size: 14px;
		}
	}
	
	.select-item-active {
		span {
			border: 1px solid #84BEF3;
		}
		span:before {
			content: '';
			position: absolute;
			top: 0px;
			left: 0px;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 10px;
			height: 10px;
			background: #84BEF3;
			border-radius: 50%;
		}
	}
</style>