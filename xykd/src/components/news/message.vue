<template>
	<div class="message_box">
		<v-header title="消息中心"></v-header>
		<div class="list">
			<div class="item" v-for="(item,index) in infoDetail" :key='index'>
				<div class="info_title">
					<p class="text">{{item.title}}</p>
					<p class="date">{{item.addTime}}</p>
				</div>
				<div class="detail">
					<p>{{item.content}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		components: {
			'v-header': Header
		},
		data() {
			return {
				infoDetail: ''
			}
		},
		mounted() {
			this.$http.get('api/msg/list').then(
				(res) => {
					this.infoDetail = res.data.obj
				}
			)
		}
	}
</script>
<style lang="less">
	.message_box {
		min-height: 100vh;
		padding-top: 48px;
		background-color: #f7f7f7;
		box-sizing: border-box;
		.list {
			.item {
				width: 100%;
				height: 103px;
				background-color: white;
				margin-top: 10px;
				padding: 0 14px;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.info_title {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.text {
						font-size: 16px;
						color: #333;
					}
					.date {
						font-size: 12px;
						color: #999;
					}
				}
				.detail {
					p {
						font-size: 12px;
						color: #666;
						line-height: 1.6;
						overflow: hidden;
						margin-top: 10px;
					}
				}
			}
		}
	}
</style>