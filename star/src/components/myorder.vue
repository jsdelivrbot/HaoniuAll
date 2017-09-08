<template>
	<div class="my-order">
		<v-title title='我的订单'></v-title>
		<div style="width: 100%;overflow:scroll;-webkit-overflow-scrolling:touch;">
			<tab bar-active-color="#84BEF3" active-color='#84BEF3' :line-width="1">
				<tab-item selected @on-item-click='change(9)'>全部</tab-item>
				<tab-item @on-item-click='change(0)'>待支付</tab-item>
				<tab-item @on-item-click='change(1)'>支付完成</tab-item>
				<tab-item @on-item-click='change(5)'>已完成</tab-item>
			</tab>
		</div>
		<orderlist :list='orderlist'></orderlist>
	</div>
</template>
<script>
	import title from '../components/callback'
	import orderlist from '../components/orderlist'
	import { Tab, TabItem } from 'vux'
	export default {
		components: {
			'v-title': title,
			orderlist,
			Tab,
			TabItem
		},
		data() {
			return {
				localhttp: localStorage.getItem('localhttp'),
				token: sessionStorage.getItem('token'),
				orderlist: []
			}
		},
		created() {
			this.getall()
			//			else {
			//				alert(1)
			//				this.$vux.alert.show({
			//					title: '提示!',
			//					content: '您还没有登录,请先登录!',
			//					onHide() {
			//						$this.$router.replace('/login')
			//					}
			//				})
			//			}
		},
		methods: {
			getall() {
				let $this = this
				setTimeout(function() {
					if(sessionStorage.getItem('token')) {
						$this.$http.get('/business/order/downOrderList?status=9').then(
							(res) => {
								$this.orderlist = res.data.obj
								console.log(res.data)
							}
						)
					} else {
						$this.getall()
					}
				}, 100)
			},
			change(id) {
				this.$http.get('/business/order/downOrderList?status=' + id).then(
					(res) => {
						this.orderlist = res.data.obj
						console.log(res.data)
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.my-order {
		min-height: 100vh;
		padding-top: 45px;
		box-sizing: border-box;
		.cut-bar {
			height: 44px;
			background: #fff;
			line-height: 44px;
			ul {
				display: flex;
				li {
					flex: 1;
					list-style: none;
					text-align: center;
					font-size: 15px;
					color: #333;
				}
				.active {
					color: #84BEF3;
				}
			}
		}
	}
</style>