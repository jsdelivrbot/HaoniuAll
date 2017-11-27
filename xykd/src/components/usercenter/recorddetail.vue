<template>
	<section class="record_detail-box">
		<v-header title='借款详情' class='vux-1px-b'></v-header>
		<div class="info vux-1px-b">
			<p>已结清本金(元)</p>
			<h2>1000.00</h2>
			<span class="tips">
				好借好还,再借不难!
			</span>
		</div>
		<div class="detail vux-1px-tb">
			<div class="jie_detail">
				<p class="title">借款明细</p>
				<div>
					<span>借款金额</span>
					<em>1000.00</em>
				</div>
				<div>
					<span>合同期限</span>
					<em>2017-11-20至2017-12-12</em>
				</div>
				<div>
					<span>还款方式</span>
					<em>先息后本</em>
				</div>
				<div>
					<span>借款合同</span>
					<router-link to='/'>
						查看
					</router-link>
				</div>
			</div>
			<div class="jie_detail vux-1px-t">
				<p class="title">还款明细</p>
				<div>
					<span>已还本金</span>
					<em>1000.00</em>
				</div>
				<div>
					<span>已还利息</span>
					<em>30.00</em>
				</div>
				<div>
					<span>手续费</span>
					<em>0.00</em>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		components: {
			'v-header': Header
		}
	}
</script>
<style lang="less">
	.record_detail-box {
		height: auto;
		overflow: hidden;
		.info {
			padding: 13px;
			box-sizing: border-box;
			background: #fff;
			text-align: center;
			p {
				font-size: 17px;
				color: #282828;
			}
			h2 {
				color: rgb(219, 183, 108);
				font-size: 39px;
			}
			span {
				font-size: 14px;
				color: #999;
			}
		}
		.detail {
			margin-top: 10px;
			background: #fff;
			.jie_detail {
				padding: 20px;
				color: #999;
				box-sizing: border-box;
				.title {
					font-size: 16px;
				}
				div {
					font-size: 14px;
					line-height: 26px;
					display: flex;
					span {
						flex: 1;
					}
					em {
						font-style: normal;
					}
					a{
						color: #0187e8;
					}
				}
			}
		}
	}
</style>