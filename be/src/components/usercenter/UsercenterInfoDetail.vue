<template>
	<div class="usercenter-info-detail">
		<v-header title="详细详情"></v-header>
		<div class="top">
			<p class="top-title">{{content.title}}</p>
			<p class="top-date">{{content.create_time | formDate}}</p>
		</div>
		<div class="content">
			<!--<p class="question">
				问：我的体现为什么没有到账？
			</p>-->
			<p class="answer">
				<!--<span class="answer-title">回复：</span>-->
				<span>{{content.message}}</span>
			</p>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	export default {
		data() {
			return {
				content: {}
			}
		},
		components: {
			'v-header': Header
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=messageList', {
					params: {
						seachdata: {
							'message_id': this.$route.params.id
						}
					}
				})
				.then((res) => {
					console.log(res.data.data[0])
					this.content = res.data.data[0]
				})
		}
	}
</script>

<style lang="less">
	.usercenter-info-detail {
		padding-top: 44px;
		.top {
			padding: 4px 12px;
			background-color: white;
			margin-top: 10px;
			.top-title {
				font-size: 16px;
				line-height: 34px;
			}
			.top-date {
				font-size: 14px;
				color: #707070;
			}
		}
		.content {
			padding: 20px 12px;
			background-color: white;
			margin-top: 10px;
			font-size: 14px;
			.question {
				margin-bottom: 10px;
			}
			.answer {
				/*color: #e70012;*/
				display: flex;
				span {
					display: block;
					&.answer-title {
						flex: 0 0 45px;
					}
				}
			}
		}
	}
</style>