<template>
	<div class="manage-box">
		<search-header></search-header>
		<div class="content">
			<div class="item">
				<div class="first">
					<p>皖A12345,袁自林,13900000000</p>
				</div>
				<div class="second">
					<div class="text">
						<p>高栏平板,17.5米,0.5吨</p>
						<p>定位时间：2017-10-10 13:09</p>
					</div>
					<div class="score">
						3.5分
					</div>
				</div>
				<div class="third">
					当前位置：安徽省合肥市高新区创新2700号
				</div>
			</div>
		</div>
		<div class="btn">
			注册<br/>车辆
		</div>
	</div>
</template>

<script>
	import SearchHeader from '@/components/base/SearchHeader'
	export default {
		components: {
			SearchHeader
		}
	}
</script>

<style lang="less">
	.manage-box {
		padding-top: 45px;
		.content {
			padding: 0 10px;
			font-size: 16px;
			.item {
				margin-top: 10px;
				background-color: white;
				padding: 15px;
				.first {
					display: flex;
					p {
						width: 0;
						flex: 1;
					}
				}
				.second {
					display: flex;
					align-items: center;
					.text {
						width: 0;
						flex: 1;
						color: #646464;
					}
					.score {
						font-size: 18px;
					}
				}
				.third {
					color: #646464;
				}
			}
		}
		.btn {
			width: 60px;
			height: 60px;
			background-color: #ffc71a;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 16px;
			border-radius: 50%;
			line-height: 20px;
			position: fixed;
			right: 24px;
			bottom: 68px;
		}
	}
</style>