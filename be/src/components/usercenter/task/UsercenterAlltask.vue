<template>
	<div class="all-task-box">
		<v-header title="全部任务"></v-header>
		<tab bar-active-color="#e8000f" active-color='#e8000f'>
			<tab-item selected>全部</tab-item>
			<tab-item>进行时</tab-item>
			<tab-item>已结束</tab-item>
		</tab>
		<usercenter-task-list></usercenter-task-list>
	</div>

</template>

<script>
	import Header from '@/common/vue/Header'
	import UsercenterTaskList from '@/common/vue/UsercenterTaskList'
	import { Tab, TabItem } from 'vux'
	export default {
		components: {
			'v-header': Header,
			Tab,
			TabItem,
			UsercenterTaskList
		}
	}
</script>

<style lang="less">
	.all-task-box {
		padding-top: 54px;
		padding-bottom: 34px;
	}
</style>