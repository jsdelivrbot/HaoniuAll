<template>
	<div class="usercenter-info-center">
		<v-header title="消息中心"></v-header>
		<div class="list">
			<router-link :to="'/usercenter/infoDetail/' + item.id" tag="div" class="item vux-1px-b unread"
				v-for="(item, index) in listData" :key="index">
				<span class="content">{{item.title}}</span>
				<span class="date">{{item.create_time | formDate}}</span>
			</router-link>
			<load-more :show-loading="false" tip="没有更多数据" background-color="#f0f0f0"></load-more>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { LoadMore } from 'vux'
	export default {
		data() {
			return {
				listData: []
			}
		},
		components: {
			'v-header': Header,
			LoadMore
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=messageList', {
					params: {
//						seachdata: {
//							'limit': this.count + ',12',
//							'action_type': 6
//						}
					}
				})
				.then((res) => {
					if(res.data.datastatus === 1) {
						console.log('消息中心')
						console.log(res)
						this.listData = res.data.data
//						this.loadingShow = false
//						this.count = this.count + 12
//						this.$nextTick(() => {
//							this._initScroll()
//						})
					} else {
//						this.tip = '暂无优惠券'
//						this.loadingShow = false
					}
				})
		}
	}
</script>

<style lang="less">
	.usercenter-info-center {
		padding-top: 44px;
		.list {
			margin-top: 10px;
			.item {
				padding: 0 12px;
				height: 40px;
				line-height: 40px;
				background-color: white;
				background-repeat: no-repeat;
				background-position: 12px center;
				font-size: 14px;
				color: #707070;
				display: flex;
				justify-content: space-between;
				.content {
					padding-left: 30px;
				}
			}
			.unread {
				background-image: url(../../../static/usercenter/usercenter2.png);
				background-size: 20px 13px;
			}
			.read {
				background-image: url(../../../static/usercenter/usercenter3.png);
				background-size: 19px 19px;
			}
		}
	}
</style>