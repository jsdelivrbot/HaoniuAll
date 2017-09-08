<template>
	<div class="dou-record">
		<topbar title='转换豆获取记录'></topbar>
		<ul>
			<li class="vux-1px-b">
				<span>数量</span>
				<span>
					获取时间
				</span>
			</li>
			<li class="vux-1px-b" v-for="item in list">
				<span>
					{{item.amount}}
				</span>
				<span>
					{{item.create_time}}
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
				token: sessionStorage.getItem('token'),
				list: []
			}
		},
		mounted() {
			this.$http.get('/user/dou/list?page=1&rows=100000').then(
				(res) => {
					this.list = res.data.obj.result
					console.log(res.data)
				}
			)
		}
	}
</script>
<style lang="less">
	.dou-record {
		padding-top: 55px;
		box-sizing: border-box;
		ul {
			height: auto;
			overflow: hidden;
			background: #fff;
			li:first-child {
				color: #333;
				font-size: 14px;
			}
			li {
				display: flex;
				font-size: 14px;
				color: #666;
				height: 44px;
				line-height: 44px;
				span {
					flex: 1;
					text-align: center;
				}
				span:last-child {
					flex: 2;
				}
			}
		}
	}
</style>