<template>
	<div class="get-record">
		<topbar title='推广奖励获取记录'></topbar>
		<ul>
			<li class="vux-1px-b">
				<span>
					获得奖励
				</span>
				<span>
					消费时间
				</span>
				<span>
					状态
				</span>
			</li>

			<li class="vux-1px-b" v-for='item in list'>
				<span>
					{{item.money}}
				</span>
				<span>
					{{item.create_time}}
				</span>
				<span>
					{{item.status |fitText}}
				</span>
			</li>
		</ul>
	</div>
</template>
<script>
	import topbar from '../components/callback'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				localhttp: localStorage.getItem('localhttp'),
				list: ''
			}
		},
		mounted() {
			this.$http.get('/user/reward/list?page=1&rows=10000').then(
				(res) => {
					this.list = res.data.obj.result
				}
			)
		},
		filters: {
			fitText(val) {
				if(val === 0) {
					return '等待发放'
				} else if(val === 1) {
					return '取消发放'
				} else {
					return '已发放'
				}
			}
		}
	}
</script>
<style lang="less">
	.get-record {
		height: auto;
		padding-top: 51px;
		box-sizing: border-box;
		overflow: hidden;
		ul {
			height: auto;
			overflow: hidden;
			li:first-child {
				color: #333;
				font-size: 14px;
			}
			li {
				height: 44px;
				line-height: 44px;
				color: #666;
				font-size: 14px;
				display: flex;
				background: #fff;
				span {
					flex: 1;
					text-align: center;
				}
			}
		}
	}
</style>