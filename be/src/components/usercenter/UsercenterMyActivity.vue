<template>
	<div class="usercenter-my-activity">
		<v-header title="我的活动"></v-header>
		<div class="list">
			<router-link to="/usercenter/myActivityDetail/15" tag="div" class="item">
				<div class="content vux-1px-b">
					<div class="img">
						<img src="../../../static/usercenter/usercenter1.png" />
					</div>
					<div class="text">
						<p class="text-title">
							香港迪士尼温馨亲子游
						</p>
						<div class="text-detail">
							<p class="time">活动时间：2017-6-1 08:00</p>
							<p class="address">地点：香港大屿山竹篙湾</p>
						</div>
					</div>
				</div>
				<div class="total">
					<p>
						<span>成人票</span>
						<span class="count">×2</span>
						<span class="price">￥200.00</span>
					</p>
					<p>
						<span>免费票</span>
						<span class="count">×2</span>
						<span class="price">￥0.00</span>
					</p>
				</div>
			</router-link>
			<router-link to="/usercenter/myActivityDetail/15" tag="div" class="item">
				<div class="content vux-1px-b">
					<div class="img">
						<img src="../../../static/usercenter/usercenter1.png" />
					</div>
					<div class="text">
						<p class="text-title">
							香港迪士尼温馨亲子游
						</p>
						<div class="text-detail">
							<p class="time">活动时间：2017-6-1 08:00</p>
							<p class="address">地点：香港大屿山竹篙湾</p>
						</div>
					</div>
				</div>
				<div class="total">
					<p>
						<span>免费票</span>
						<span class="count">×2</span>
						<span class="price">￥0.00</span>
					</p>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	export default {
		components: {
			'v-header': Header
		}
	}
</script>

<style lang="less">
	.usercenter-my-activity {
		padding-top: 44px;
		.list {
			.item {
				margin-top: 10px;
				background-color: white;
				.content {
					padding: 10px 12px;
					display: flex;
					.img {
						flex: 0 0 120px;
						width: 120px;
						img {
							width: 100%;
						}
					}
					.text {
						margin-left: 16px;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.text-title {
							font-size: 14px;
						}
						.text-detail {
							font-size: 12px;
							color: #707070;
						}
					}
				}
				.total {
					padding: 10px 12px;
					p {
						display: flex;
						font-size: 12px;
						line-height: 22px;
						justify-content: space-between;
						.count {
							margin-left: 40%;
						}
						.price {
							flex: 0 0 80px;
							text-align: right;
						}
					}
				}
			}
		}
	}
</style>