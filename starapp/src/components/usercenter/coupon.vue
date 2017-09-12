<template>
	<div class="coupon-box">
		<topbar title='我的优惠'></topbar>
		<div class="coupon-list">
			<ul>
				<li v-for="item in couponList">
					<router-link :to='"/coupondetail/"+item.coupon_id'>
						<img :src="'http://wx.dianke8.com/xxdk'+item.background_url" />
						<div>
							<div class="top">
								<h2>{{item.name}}</h2>
								<span>查看详情</span>
							</div>
							<p>有效期:{{item.create_time.substring(0,10)}}至{{item.end_date.substr(0,10)}}</p>
							<p>{{item.descript}}</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import topbar from '@/components/callback'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				couponList: []
			}
		},
		methods: {
			getall() {
				let $this = this
				setTimeout(function() {
					if(sessionStorage.getItem('token')) {
						$this.$http.get('/user/coupon/list?page=1&rows=1000').then(
							(res) => {
								$this.couponList = res.data.obj.result
							}
						)
					} else {
						$this.getall()
					}
				}, 100)
			}
		},
		mounted() {
			this.getall()
		}
	}
</script>
<style lang="less">
	.coupon-box {
		height: auto;
		padding-top: 51px;
		box-sizing: border-box;
		.coupon-list {
			height: auto;
			overflow: hidden;
			li {
				height: 91px;
				padding: 15px;
				box-sizing: border-box;
				list-style: none;
				background: #fff;
				display: flex;
				margin-bottom: 5px;
				a {
					display: flex;
					color: #000000;
					img {
						width: 90px;
						height: 60px;
						margin-right: 10px;
						display: block;
					}
					>div {
						flex: 1;
						height: 60px;
						.top {
							display: flex;
							height: 20px;
							line-height: 20px;
							h2 {
								font-size: 17px;
								color: #333;
								font-weight: normal;
							}
							span {
								font-size: 14px;
								color: #666;
								flex: 1;
								text-align: right;
							}
						}
						p {
							line-height: 16px;
							margin-top: 4px;
							font-size: 13px;
							color: #666;
						}
					}
				}
			}
		}
	}
</style>