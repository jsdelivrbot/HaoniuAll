<template>
	<div class="get-record">
		<topbar title='推广记录'></topbar>
		<ul>
			<li class="vux-1px-b">
				<span>
					推广用户
				</span>
				<span>
					推广级别
				</span>
				<span>
					推广时间
				</span>
			</li>

			<li class="vux-1px-b" v-for='item in list'>
				<span>
					**{{item.nickname.substr(item.nickname.length-1,1)}}
					<!--{{item.nickname}}-->
				</span>
				<span>
					{{item.level_}}
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
				list: ''
			}
		},
		methods: {
			getall() {
				let $this = this
				setTimeout(function() {
					if(sessionStorage.getItem('token')) {
						$this.$http.get('/user/extension/list?page=1&rows=10000').then(
							(res) => {
								$this.list = res.data.obj.result
							}
						)
					} else {
						$this.getall()
					}
				}, 100)
			}
		},
		mounted() {
			this.getall()
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