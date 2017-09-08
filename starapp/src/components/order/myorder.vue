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
		<div class="none-order" v-if='orderlist.length==0'>
			暂无订单数据...
		</div>

	</div>
</template>
<script>
	import title from '@/components/callback'
	import orderlist from '@/components/order/orderlist'
	import { Tab, TabItem } from 'vux'
	export default {
		name: 'nokeep',
		components: {
			'v-title': title,
			orderlist,
			Tab,
			TabItem
		},
		data() {
			return {
				token: sessionStorage.getItem('token'),
				orderlist: []
			}
		},
		created() {
			this.getall()
		},
		methods: {
			getall() {
				let $this = this
				this.$vux.loading.show({
					text: '数据加载中...'
				})
				setTimeout(function() {
					if(sessionStorage.getItem('token')) {
						$this.$http.get('/business/order/downOrderList?status=9').then(
							(res) => {
								$this.$vux.loading.hide()
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
				this.$vux.loading.show({
					text: '数据加载中...'
				})
				this.$http.get('/business/order/downOrderList?status=' + id).then(
					(res) => {
						this.$vux.loading.hide()
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
		.none-order {
			text-align: center;
			line-height: 180px;
			color: #666;
		}
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