<template>
	<div class="city-list-box">
		<div class="list" v-for="(item, index) in city" ref="listGroup">
			<p class="list-title">
				{{item.title[0]}}
			</p>
			<ul>
				<li class="vux-1px-b" v-for="list,listindex in item.content" @click="selectItem(list)">{{list}}</li>
			</ul>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				scrollY: -1,
				currentIndex: 0,
				diff: -1
			}
		},
		props: {
			city: Array
		},
		methods: {
			selectItem(item) {
				this.$emit('select', item)
			}
		}
	}
</script>

<style lang="less">
	.city-list-box {
		.list-view {
			width: 100%;
			position: fixed;
			top: 176px;
			bottom: 0;
			overflow: hidden;
		}
		.list-top {
			padding: 0 12px 12px;
			.top-item {
				.top-title {
					color: #707070;
					font-size: 16px;
					height: 44px;
					line-height: 44px;
				}
				.top-content {
					span {
						width: 94px;
						height: 38px;
						font-size: 16px;
						color: #333333;
						background-color: white;
						display: inline-block;
						text-align: center;
						line-height: 38px;
						margin-left: 10px;
						margin-top: 6px;
					}
				}
			}
		}
		.list {
			.list-title {
				font-size: 16px;
				color: #707070;
				height: 30px;
				line-height: 30px;
				padding-left: 12px;
			}
			ul {
				background-color: white;
				li {
					height: 44px;
					line-height: 44px;
					padding-left: 12px;
					font-size: 16px;
					color: #333333;
				}
			}
		}
		.shortCutList {
			position: absolute;
			z-index: 2;
			right: 4px;
			top: 50%;
			transform: translateY(-50%);
			width: 20px;
			border-radius: 10px;
			text-align: center;
			font-size: 14px;
			ul {
				list-style-type: none;
				li {
					padding: 4px;
					&.current {
						color: #e70012;
					}
				}
			}
		}
		.list-fixed {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.fixed-title {
				height: 30px;
				line-height: 30px;
				padding-left: 12px;
				font-size: 16px;
				color: #707070;
				background-color: #F0F0F0;
			}
		}
	}
</style>