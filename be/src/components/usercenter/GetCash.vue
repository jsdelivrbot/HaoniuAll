<template>
	<div class="get-cash-box">
		<v-header title="提现管理"></v-header>
		<!--<div class="top">
			<span class="total">累计提现</span>
			<span class="cash">1123.35元</span>
		</div>-->
		<div class="content">
			<div class="item vux-1px-b" v-for="(item, index) in infoList" :key="index">
				<div class="text">
					<p class="first">
						单次转出
						<span class="label" v-if="item.status === '0'">
							提现中
						</span>
						<span class="label token" v-if="item.status === '1'">
							已提现
						</span>
						<span class="label token" v-if="item.status === '-1'">
							已驳回
						</span>
					</p>
					<p class="second">{{item.createtime | formDate}}</p>
				</div>
				<div class="price">
					-{{item.tx_num}}
				</div>
			</div>
			<!--<div class="item vux-1px-b">
				<div class="text">
					<p class="first">
						单次转出
						<span class="label token">
							提现中
						</span>
					</p>
					<p class="second">2017-6-27 14:44</p>
				</div>
				<div class="price">
					-300.5
				</div>
			</div>-->
		</div>
		<div v-if="infoList.length === 0">
			<load-more :show-loading="false" tip="暂无提现记录" background-color="#f0f0f0"></load-more>
		</div>
		<!--<router-link to="/usercenter/getCashBindingPhone" tag="div" class="btn" v-if="!mobile">
			立即提现
		</router-link>-->
		<div class="btn" @click="goCash">
			立即提现
		</div>
		<!--<router-link to="/usercenter/getCashBindingPay" tag="div" class="btn" v-if="pay">
			立即提现
		</router-link>-->
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { LoadMore } from 'vux'
	export default {
		data() {
			return {
				infoList: [],
				mobile: localStorage.getItem('mobile'),
				pay: localStorage.getItem('ali_pay_phone')
			}
		},
		components: {
			'v-header': Header,
			LoadMore
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=txList', {
				params: {
					seachdata: {
						limit: '100'
					}
				}
			}).then((res) => {
				this.infoList = res.data.data
				console.log(res)
//				console.log(this.mobile)
			})
		},
		methods: {
			goCash() {
				if(!this.mobile || this.mobile === 'null') {
					this.$router.replace('/usercenter/getCashBindingPhone')
				}else if(!this.pay || this.pay === 'null') {
					this.$router.replace('/usercenter/getCashBindingPay')
				}else {
					this.$router.replace('/usercenter/getCashGo')
				}
			}
		}
	}
</script>

<style lang="less">
	.get-cash-box {
		padding: 44px 0 50px;
		.top {
			height: 40px;
			background-color: white;
			margin-top: 10px;
			font-size: 0;
			line-height: 40px;
			padding: 0 12px;
			.total {
				font-size: 14px;
			}
			.cash {
				font-size: 16px;
				color: #e70012;
				margin-left: 6px;
			}
		}
		.content {
			margin-top: 10px;
			background-color: white;
			.item {
				height: 54px;
				display: flex;
				padding: 0 12px;
				align-items: center;
				.text {
					flex: 1;
					width: 0;
					.first {
						font-size: 14px;
						color: #333333;
						.label {
							width: 50px;
							height: 14px;
							background-color: #e60012;
							display: inline-block;
							color: white;
							font-size: 12px;
							text-align: center;
							line-height: 14px;
							border-radius: 20px;
							margin-left: 10px;
						}
						.token {
							background-color: #f39800;
						}
					}
					.second {
						font-size: 12px;
						color: #afafaf;
					}
				}
				.price {
					font-size: 16px;
					color: #ff0000;
				}
			}
		}
		.btn {
			position: fixed;
			width: 100%;
			height: 50px;
			background-color: #e60012;
			bottom: 0;
			left: 0;
			text-align: center;
			line-height: 50px;
			color: white;
			font-size: 16px;
			font-weight: 500;
		}
	}
</style>