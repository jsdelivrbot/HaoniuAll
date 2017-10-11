<template>
	<div class="choose-bank-card-box">
		<v-header title="选择银行卡"></v-header>
		<div class="list">
			<div class="item">
				<div class="icon">
					<img src="../../../static/image/xingyeyinhang-tubiao@2x.png" />
				</div>
				<div class="text">
					<p>兴业银行</p>
					<p class="label">储蓄卡</p>
					<p class="label">**** **** **** 
						<span>0988</span>
					</p>
				</div>
				<div class="bg-img">
					<img src="../../../static/image/xingyeyinhang-diwen@2x.png" />
				</div>
			</div>
			<div class="item">
				<div class="icon">
					<img src="../../../static/image/xingyeyinhang-tubiao@2x.png" />
				</div>
				<div class="text">
					<p>兴业银行</p>
					<p class="label">储蓄卡</p>
					<p class="label">**** **** **** 
						<span>0988</span>
					</p>
				</div>
				<div class="bg-img">
					<img src="../../../static/image/xingyeyinhang-diwen@2x.png" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	export default {
		components: {
			'v-header': Header
		}
	}
</script>

<style lang="less">
	.choose-bank-card-box {
		padding-top: 45px;
		.list {
			margin: 0 10px 10px;
			.item {
				margin-top: 10px;
				background-color: white;
				display: flex;
				padding: 10px;
				position: relative;
				.icon {
					flex: 0 0 34px;
					width: 34px;
					img {
						width: 100%;
					}
				}
				.text {
					flex: 1;
					width: 0;
					margin-left: 12px;
					font-size: 16px;
					position: relative;
					z-index: 2;
					.label {
						color: #969696;
						span {
							color: black;
						}
					}
				}
				.bg-img {
					position: absolute;
					top: 0;
					right: 0;
					height: 100%;
					img {
						height: 100%;
					}
				}
			}
		}
	}
</style>