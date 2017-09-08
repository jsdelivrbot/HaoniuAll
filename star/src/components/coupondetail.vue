<template>
	<div class="coupon-detail">
		<topbar title='优惠券详情'></topbar>
		<div class="coupon-info vux-1px-b">
			<!--<img src="../../static/img/1498630391.png" />-->
			<!--<img :src="'http://192.168.1.121:8080/xingxingdianke'+info.backgroundUrl" v-if='info.backgroundUrl' />-->
			<img :src="'http://wx.dianke8.com/xxdk'+info.backgroundUrl" />
			<div>
				<h2>{{info.name}}</h2>
				<p>适用范围</p>
				<span>游泳课优惠游泳课优惠游泳课优惠游泳课优惠游泳课优惠</span>
				<p>有效期</p>
				<span>{{info.endDate}}</span>
			</div>
		</div>
		<ul class="list">
			<li class="vux-1px-b">
				券码: {{info.number}}
			</li>
			<li class="vux-1px-b">
				机构: {{info.companyName}}
			</li>
		</ul>

		<div class="intro">
			<h2>使用说明:</h2>
			<p>{{info.instructions}}</p>
		</div>
	</div>
</template>
<script>
	import topbar from '../components/callback'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				localhttp: localStorage.getItem('localhttp'),
				info: []
			}
		},
		mounted() {
			let detailId = this.$route.params.id
			this.$http.get('/user/coupon/getCouponById', {
				params: {
					id: detailId
				}
			}).then(
				(res) => {
					this.info = res.data.obj
					console.log(this.info)
				}
			)
		}
	}
</script>
<style lang="less">
	.coupon-detail {
		height: auto;
		padding: 20px 15px;
		padding-top: 66px;
		box-sizing: border-box;
		min-height: 100vh;
		background: #fff;
		box-sizing: border-box;
		.intro {
			padding: 20px 0px;
			box-sizing: border-box;
			h2 {
				font-size: 15px;
				color: #333;
				font-weight: normal;
				margin-bottom: 6px;
			}
			p {
				font-size: 13px;
				color: #999;
				line-height: 22px;
			}
		}
		.list {
			height: 90px;
			li {
				height: 44px;
				line-height: 44px;
				list-style: none;
				color: #666;
				font-size: 14px;
			}
		}
		.coupon-info {
			padding-bottom: 19px;
			display: flex;
			img {
				display: block;
				width: 120px;
				height: 120px;
				margin-right: 15px;
			}
			div {
				/*margin-left: 15px;*/
				height: 120px;
				overflow: hidden;
				h2 {
					font-size: 15px;
					font-weight: normal;
					color: #333;
				}
				p {
					font-size: 13px;
					line-height: 20px;
					color: #666;
					overflow: hidden;
				}
				span {
					font-size: 12px;
					color: #999;
					width: 100%;
					display: block;
					overflow: hidden;
					line-height: 18px;
				}
			}
		}
	}
</style>