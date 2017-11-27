<template>
	<div class="help_box">
		<goback title='帮助中心'></goback>
		<router-link tag='div' :to="'help_detail/' + item.id" class="text vux-1px-b" v-for="(item,index) in lists" :key="item.id">
			<p>{{item.title}}</p>
		</router-link>
		<!--<router-link tag='div' to='help_detail' class="text vux-1px-b">
			<p>太湖有什么湖？</p>
		</router-link>
		<router-link tag='div' to='help_detail' class="text vux-1px-b">
			<p>太湖三天三夜游览介绍？</p>
		</router-link>
		<router-link tag='div' to='help_detail' class="text vux-1px-b">
			<p>如何来到太湖？</p>
		</router-link>
		<router-link tag='div' to='help_detail' class="text vux-1px-b">
			<p>太湖十大小吃推荐</p>
		</router-link>
		<router-link tag='div' to='help_detail' class="text vux-1px-b">
			<p>太湖什么最好吃？</p>
		</router-link>
		<router-link tag='div' to='help_detail' class="text vux-1px-b">
			<p>太湖十大宾馆介绍</p>
		</router-link>
		<router-link tag='div' to='help_detail' class="text vux-1px-b">
			<p>如何解绑/绑定支付宝账户？</p>
		</router-link>
		<router-link tag='div' to='help_detail' class="text vux-1px-b">
			<p>太湖十大早餐介绍</p>
		</router-link>
		<router-link tag='div' to='help_detail' class="text vux-1px-b">
			<p>太湖美，人更美！</p>
		</router-link>-->
	</div>
</template>

<script>
	import goback from '@/components/return'
	export default {
		name: 'help',
		data() {
			return {
				lists: []
			}
		},
		components: {
			goback
		},
		created() {
			this.$http.get('/api/frontBase/department/findHelp').then((res) => {
				if(res.data.result === 0) {
					this.lists = res.data.obj
					//					this.content = res.data.obj.content
				} else {
					this.$vux.loading.hide()
					this.$vux.alert.show({
						title: '提示',
						content: res.data.msg
					})
				}
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.help_box {
		min-height: 100vh;
		box-sizing: border-box;
		padding-top: 44px;
		background-color: #f7f7f7;
		.text {
			padding-left: 20px;
			height: 44px;
			line-height: 44px;
			font-size: 14px;
			color: #5c5c5c;
		}
	}
</style>