<template>
	<div class="more_box">
		<tab class="tab" active-color="#dbb76c" defaultColor="#000000">
			<tab-item selected @click.native='getNews(0)'>借款问题</tab-item>
			<tab-item @click.native='getNews(1)'>还款问题</tab-item>
			<tab-item @click.native='getNews(2)'>其它问题</tab-item>
		</tab>

		<group>
			<cell :title="item.title" :link='/newsdetail/+item.id' is-link v-for="(item, index) in newsList" :key="index">
				<span slot="icon" style="width: 24px; display: block; text-align: center;">{{index + 1 + '、'}}</span>
			</cell>
		</group>

		<div class="global_btn_wrapper">
			<p class="btn active">在线客服</p>
		</div>
	</div>
</template>

<script>
	import { Tab, TabItem, Group, Cell } from 'vux'
	export default {
		components: {
			Tab,
			TabItem,
			Group,
			Cell
		},
		data() {
			return {
				newsList: ''
			}
		},
		mounted() {
			this.getNews(0)
		},
		methods: {
			getNews(type) {
				this.$http.get('api/question/list', {
					params: {
						type
					}
				}).then(
					(res) => {
						this.newsList = res.data.obj
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.more_box {
		min-height: 100vh;
		padding-top: 48px;
		padding-bottom: 82px;
		box-sizing: border-box;
		background-color: #fafafa;
		.tab {
			width: 100%;
			height: 48px;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 2;
			.vux-tab-item {
				font-size: 16px;
			}
		}
		.weui-cells {
			font-size: 13px;
			&::before {
				display: none;
			}
			&::after {
				left: 39px;
			}
			.weui-cell {
				padding: 15px;
				&::before {
					left: 39px;
				}
			}
		}
	}
</style>