<template>
	<div class="usercenter-info-center">
		<v-header title="消息中心"></v-header>
		<div class="list">
			<router-link to="/usercenter/infoDetail" tag="div" class="item vux-1px-b unread">
				<span class="content">您有一条留言回复</span>
				<span class="date">2017-7-3</span>
			</router-link>
			<router-link to="/usercenter/infoDetail" tag="div" class="item vux-1px-b unread">
				<span class="content">您有一条留言回复</span>
				<span class="date">2017-7-3</span>
			</router-link>
			<load-more :show-loading="false" tip="没有更多数据" background-color="#f0f0f0"></load-more>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { LoadMore } from 'vux'
	export default {
		components: {
			'v-header': Header,
			LoadMore
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