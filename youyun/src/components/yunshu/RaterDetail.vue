<template>
	<div class="rater-detail-box">
		<v-header title="评价详情"></v-header>
		<div class="list">
			<div class="item">
				<div class="text">
					<p class="first">皖A12345,袁自林,13900000000</p>
					<p class="second">非常满意的一次</p>
				</div>
				<div class="rater">
					<rater :value="5" :font-size="18" disabled></rater>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Rater } from 'vux'
	export default {
		components: {
			'v-header': Header,
			Rater
		}
	}
</script>

<style lang="less">
	.rater-detail-box {
		padding-top: 45px;
		.list {
			.item {
				margin: 10px;
				background-color: white;
				display: flex;
				padding: 15px;
				.text {
					flex: 1;
					.first {
						font-size: 14px;
					}
					.second {
						font-size: 16px;
						color: #686868;
					}
				}
				.rater {
					width: 100px;
					flex: 0 0 100px;
				}
			}
		}
	}
</style>