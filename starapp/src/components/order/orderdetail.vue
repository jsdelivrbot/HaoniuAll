<template>
	<div class="order-affirm">
		<topbar title='订单详情'></topbar>

		<div class="order-top vux-1px-b">
			<p>订单编号:{{ordernum}}</p>
			<div>
				<span>
					订单状态: <em>{{detailInfo.courseStatus}}</em>
				</span>
				<span v-if="detailInfo.orderEndDateString">
					<i>请在</i>
					<div>
						<clocker :time="detailInfo.orderEndDateString" slot="value" v-if='detailInfo.orderEndDateString' >
							<span class="day">%_M1</span>
				<span class="day">%_M2</span>:
				<span class="day">%_S1</span>
				<span class="day">%_S2</span>
				</clocker>
			</div>
			内支付
			</span>
		</div>
	</div>

	<div class="order-info" style="margin: 0;">
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
			<span>
					智力开发
				</span>
			<span>
					¥{{detailInfo.price}}
				</span>
			<span>
					1
				</span>
			<span style="color: #ffa019;">
					¥{{detailInfo.price}}
				</span>
		</div>
	</div>

	<div class="coupon-text vux-1px-t">
		<div>
			<span>
					已选择奖励
				</span>
			<p>
				{{detailInfo.couponName}}
			</p>
		</div>
		<p>优惠金额: <em v-if='detailInfo.price'>¥{{(detailInfo.price - detailInfo.realPayment).toFixed(2)}}</em></p>
	</div>

	<div class="total vux-1px-t">
		合计:
		<em v-if='detailInfo.realPayment'>
				¥{{detailInfo.realPayment.toFixed(2)}}
			</em>
	</div>

	<div class="wait" v-if='token'>
		<div class="linkman" v-if='detailInfo!==""'>
			<p>上课子女信息</p>
			<div>
				<span><em>姓名:</em>{{detailInfo.children.name}}
				<img src="../../../static/img/boy.png" v-if='detailInfo.children.gender===0'/>
				<img src="../../../static/img/girl.png" v-if='detailInfo.children.gender===1'/>
				</span>
				<span><em>出生日期:</em>{{detailInfo.children.birthday.substring(0,4)+'年'+detailInfo.children.birthday.substring(5,7)+'月'+detailInfo.children.birthday.substring(8,10)+'日'}}</span>
			</div>
		</div>

		<div class="course-info" v-if="detailInfo.status>0">
			<p>课程状态:{{detailInfo.courseStatus}}</p>
			<p>课程时间:{{detailInfo.opendateString}}至{{detailInfo.endDateString}}</p>
			<p>教学地点:{{detailInfo.address}}</p>
		</div>

	</div>

	<div class="cancel" v-if='detailInfo.status==0' @click="cancelorder()">
		<span>取消订单</span>
	</div>

	<!--<group title="联系人信息" v-if='token'>
			<x-input title="姓名" placeholder="请输入您的姓名">
			</x-input>
			<x-input title="手机号" placeholder="请输入手机号码">
			</x-input>
		</group>-->

	<!--<timeline v-if='token'>
			<timeline-item>
				<p class="recent">提交申请</p>
			</timeline-item>
			<timeline-item>
				<p class="recent">客服介入</p>
			</timeline-item>
			<timeline-item>
				<p>申请通过</p>
			</timeline-item>
			<timeline-item>
				<p>已退款</p>
			</timeline-item>
		</timeline>-->
	<plan :index='detailInfo.refundStatus' v-if='detailInfo.refundStatus!==5'></plan>

	<router-link :to='"/orderevaluation/"+ordernum' class='topj' v-if='detailInfo.evaluateStatusString'>
		立即评价
	</router-link>

	<div class="footer vux-1px-t" v-if='token&&detailInfo.status<=0'>
		<div class="left">
			<em>还需支付:</em>¥{{detailInfo.realPayment}}
		</div>
		<div class="right" @click='topay()'>
			前往支付
		</div>
	</div>

	</div>
</template>
<script>
	import topbar from '@/components/callback'
	import plan from '@/components/usercenter/plan'

	import { Timeline, Clocker, TimelineItem, XInput, Group, Checker, CheckerItem, CheckIcon } from 'vux'
	export default {
		name: 'nokeep',
		components: {
			Timeline,
			TimelineItem,
			XInput,
			Group,
			Checker,
			CheckerItem,
			CheckIcon,
			topbar,
			Clocker,
			plan
		},
		data() {
			return {
				token: sessionStorage.getItem('token'),
				select: '1',
				detailInfo: '',
				ordernum: ''
			}
		},
		mounted() {
			let props = this.$route.params.id
			this.ordernum = props
			this.$http.get('/business/order/downOrderDetail', {
				params: {
					number: props
				}
			}).then(
				(res) => {
					this.detailInfo = res.data.obj
				}
			)
		},
		methods: {
			topay() {
				this.$router.replace('/orderpay/' + this.ordernum)
			},
			cancelorder() {
				let $this = this
				this.$vux.confirm.show({
					title: '提示',
					content: '确定取消订单吗?',
					onConfirm() {
						$this.$http.get('/business/order/downCancelOrder', {
							params: {
								number: $this.ordernum
							}
						}).then(
							(res) => {
								if(res.data.result === 0) {
									$this.$router.go(0)
								}
							}
						)
					}
				})
			}
		}
	}
</script>
<style lang="less">
	.order-affirm {
		.cancel {
			text-align: right;
			span {
				display: block;
				float: right;
				width: 70px;
				padding-top: 5px;
				padding-bottom: 4px;
				margin-top: 20px;
				margin-right: 25px;
				font-size: 12px;
				color: #999;
				position: relative;
				text-align: center;
			}
			span:before {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 200%;
				height: 200%;
				border: 1px solid #b8b8b8;
				border-radius: 6px;
				transform: scale(0.5);
				transform-origin: 0 0;
			}
		}
		.topj {
			display: block;
			width: 180px;
			height: 35px;
			border: 1px solid #84BEF3;
			margin: auto;
			line-height: 35px;
			margin-top: 30px;
			text-align: center;
			border-radius: 5px;
			font-size: 14px;
			color: #84BEF3;
		}
		.coupon-text {
			padding: 15px 15px 10px 15px;
			box-sizing: border-box;
			background: #fff;
			font-size: 14px;
			color: #666;
			div {
				display: flex;
				span {
					width: 80px;
				}
				p {
					flex: 1;
					margin-left: 25px;
				}
			}
			>p {
				margin-top: 5px;
				text-align: right;
				em {
					color: #ffa019;
					font-style: normal;
				}
			}
		}
		.order-top {
			margin-top: 55px;
			padding: 15px;
			box-sizing: border-box;
			font-size: 14px;
			color: #333;
			background: #fff;
			p {
				margin-bottom: 10px;
			}
			>div {
				display: flex;
				span {
					flex: 1;
					display: flex;
					em {
						font-style: normal;
						margin-left: 5px;
						color: #ffa019;
					}
					i {
						flex: 1;
						font-style: normal;
						text-align: right;
					}
					>div {
						/*flex: 1;*/
						margin: 0 5px;
						text-align: center;
						color: #ff1818;
						>div div {
							display: flex;
						}
						span {
							flex: 1;
						}
					}
				}
			}
		}
	}
</style>