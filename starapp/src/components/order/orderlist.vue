<template>
	<div class="order-list">
		<ul>
			<li v-for='item in list'>
				<router-link :to="'/orderdetail/'+item.number">
					<div class="top vux-1px-b">
						<span>
						订单编号:{{item.number.substr(0,13)}}
					</span>
						<span>
						订单状态: <em>{{item.courseStatus}}</em>
					</span>
					</div>

					<div class="bottom">
						<img :src="item.thumbnail" />
						<div class="center-order">
							<h2>{{item.courseName}}</h2>
							<p>课程时间:{{item.opendateString}}至{{item.endDateString}}</p>
							<div>
								<img src="../../../static/img/address.png" />
								<span>{{item.address}}</span>
							</div>
						</div>

						<div class="right">
							<h2 class="money">
							¥{{item.price.toFixed(2)}}
						</h2>

							<router-link :to='"/orderevaluation/"+item.number' v-if='item.evaluateStatusString'>
								评价
							</router-link>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: {
			list: Array
		}
	}
</script>
<style lang="less">
	.order-list {
		height: auto;
		overflow: hidden;
		ul {
			height: auto;
			overflow: hidden;
			li {
				height: 136px;
				width: 100%;
				background: #fff;
				overflow: hidden;
				margin-top: 5px;
				list-style: none;
				a {
					display: block;
				}
				.top {
					height: 44px;
					padding: 12px 15px;
					box-sizing: border-box;
					display: flex;
					span {
						flex: 4;
						font-size: 14px;
						color: #333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					span:last-child {
						flex: 3;
						min-width: 120px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						text-align: right;
						em {
							color: #84BEF3;
							font-style: normal;
						}
					}
				}
				.bottom {
					padding: 15px;
					overflow: hidden;
					box-sizing: border-box;
					display: flex;
					img {
						width: 60px;
						height: 60px;
						display: block;
						margin-right: 10px;
					}
					.center-order {
						flex: 1;
						max-width: 60%;
						overflow: hidden;
						h2 {
							font-size: 16px;
							color: #333;
							height: 20px;
							line-height: 18px;
							font-weight: normal;
						}
						p {
							font-size: 13px;
							line-height: 20px;
							color: #999;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						div {
							display: flex;
							height: 20px;
							line-height: 20px;
							img {
								width: 11px;
								height: 13px;
								margin-top: 4px;
								margin-right: 3px;
							}
							span {
								font-size: 13px;
								color: #999999;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
					}
					.right {
						width: 80px;
						height: 60px;
						flex: 1;
						text-align: right;
						.money {
							color: #ffa019;
							height: 40px;
							font-size: 15px;
							font-weight: normal;
							text-align: right;
						}
						a {
							display: block;
							width: 50px;
							height: 21px;
							border: 1px solid #84BEF3;
							color: #84BEF3;
							text-align: center;
							line-height: 21px;
							border-radius: 3px;
							font-size: 13px;
							float: right;
						}
					}
				}
			}
		}
	}
</style>