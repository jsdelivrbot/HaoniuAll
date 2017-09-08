<template>
	<div class="tixian">
		<topbar title='奖励提现'></topbar>

		<div class="total-money">
			<em>当前可提现金额:</em>
			<span>¥{{total.balance}}</span>
		</div>
		<div style="background: #fff;margin-top: 5px;">
			<x-input placeholder="请输入提现金额" v-model='money'></x-input>
		</div>

		<div class="button">
			<button @click="tixian()">
				提现
			</button>
		</div>

		<div class="intro">
			<h2 class="title">
				提现说明
			</h2>
			<p>1.奖励提现后,将提取到您的 <em>微信零钱包</em>中,请注意零钱包余额变化;</p>
			<p>2.为保障提现顺畅,请确保您 <em>已关注星星点课微信公众号</em>; </p>
			<p>3.若遇到其他问题,请与客服进行联系。</p>
		</div>

		<div class="tixian-record">
			<div class="title">
				最近一条提现记录:
			</div>
			<ul>
				<li>
					<span>时间</span>
					<span>金额</span>
					<span>状态</span>
				</li>
				<li v-if='total.userReward'>
					<span>{{ total.userReward.createTime}}</span>
					<span>¥{{ total.userReward.money}}</span>
					<span>{{ total.userReward.status|fitText}}</span>
				</li>
			</ul>
		</div>

	</div>
</template>
<script>
	import { XInput, Group } from 'vux'
	import topbar from '@/components/callback'
	export default {
		components: {
			topbar,
			Group,
			XInput
		},
		data() {
			return {
				total: [],
				money: ''
			}
		},
		mounted() {
			this.$http.get('/user/reward/findBalance').then(
				(res) => {
					this.total = res.data.obj
					console.log(res.data.obj)
				}
			)
		},
		filters: {
			fitText(val) {
				if(val === 0) {
					return '申请中'
				} else if(val === 1) {
					return '提现成功'
				} else {
					return '提现失败'
				}
			}
		},
		methods: {
			tixian() {
				if(isNaN(this.money)) {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入数字!'
					})
					return false
				}

				if(this.money <= 0) {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入正确的提现金额!'
					})
					return false
				}
				this.$http.get('/business/withdrawals/createWithdrawals', {
					params: {
						money: this.money
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '恭喜您,成功发起提现申请!'
							})
							this.money = ''
						} else {
							this.$vux.alert.show({
								title: '提示',
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
	.tixian {
		padding-top: 56px;
		box-sizing: border-box;
		.total-money {
			height: 70px;
			line-height: 70px;
			font-size: 17px;
			color: #333;
			background: #fff;
			padding: 0 15px;
			display: flex;
			box-sizing: border-box;
			em {
				font-style: normal;
				margin-right: 12px;
			}
			span {
				color: #ffa019;
				font-size: 27px;
			}
		}
		.intro {
			height: auto;
			overflow: hidden;
			padding: 15px;
			box-sizing: border-box;
			.title {
				font-size: 15px;
				color: #333;
				margin-bottom: 12px;
			}
			p {
				color: #999;
				font-size: 14px;
				line-height: 24px;
				em {
					color: #333;
					font-style: normal;
					font-weight: 600;
				}
			}
		}
		.tixian-record {
			height: auto;
			overflow: hidden;
			margin-top: 25px;
			.title {
				padding: 0 15px;
				box-sizing: border-box;
				font-size: 15px;
				color: #333;
				margin-bottom: 10px;
			}
			ul {
				height: auto;
				overflow: hidden;
				background: #fff;
				li:first-child {
					color: #232323;
				}
				li {
					height: 32px;
					display: flex;
					line-height: 32px;
					color: #666;
					font-size: 14px;
					span:first-child {
						flex: 2;
					}
					span {
						flex: 1;
						text-align: center;
					}
				}
			}
		}
	}
</style>