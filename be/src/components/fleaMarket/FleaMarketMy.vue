<template>
	<div class="flea-market-my">
		<v-header title="我的待卖清单"></v-header>
		<router-link to="" tag="div" class="item vux-1px-b">
			<div class="img">
				<img src="../../../static/flea-market4.png">
			</div>
			<div class="detail-content">
				<div class="item-title">
					<span>test</span>
				</div>
				<p class="sub-title">
					再补充一丢丢信息就能赚大钱啦！
				</p>
				<p class="process">
					2017-7-20发布
				</p>
				<div class="btn">
					<span class="btn-item dele">
						删除
					</span>
					<router-link to="/fleaMarket/release" tag="span" class="btn-item edit">
						编辑
					</router-link>
				</div>
			</div>
		</router-link>
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
	.flea-market-my {
		padding-top: 44px;
		.item {
			height: 104px;
			padding: 10px 12px;
			box-sizing: border-box;
			display: flex;
			background-color: white;
			margin-top: 10px;
			.img {
				flex: 0 0 120px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.detail-content {
				flex: 1;
				width: 0;
				margin-left: 16px;
				.item-title {
					span {
						font-size: 16px;
						display: block;
						line-height: 22px;
                		overflow: hidden;
                		text-overflow: ellipsis;
                		white-space: nowrap;
                		color: #343434;
					}
				}
				.sub-title {
					font-size: 14px;
					color: #707070;
					overflow: hidden;
            		text-overflow: ellipsis;
            		white-space: nowrap;
				}
				.process {
					font-size: 14px;
					color: #707070;
				}
				.btn {
					display: flex;
					float: right;
					.btn-item {
						width: 54px;
						height: 18px;
						line-height: 18px;
						border: 1px solid;
						font-size: 14px;
						display: block;
						text-align: center;
						border-radius: 4px;
						margin-left: 12px;
					}
					.dele {
						color: #343434;
						border-color: #343434;
					}
					.edit {
						color: #e60012;
						border-color: #e60012;
					}
				}
			}
		}
	}
</style>