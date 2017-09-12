<template>
	<div class="amusement-index-more-box">
		<v-header title="吃喝玩乐"></v-header>
		<div class="list">
			<ul class="clearfix">
				<router-link :to="'/amusement/in/' + item.id" tag="li" class="vux-1px" v-for="(item, index) in list" :key="index" v-if="index > 8&&index < list.length">
					<img :src="httpUrl + item.img" />
					<span>{{item.type_name}}</span>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	export default {
		components: {
			'v-header': Header
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=infoTypeList', {
					params: {
						seachdata: {
							'parent_id': 3
						}
					}
				})
				.then((res) => {
					console.log('吃喝玩乐')
					console.log(res)
					this.list = res.data.data
				})
		},
		data() {
			return {
				list: [],
				httpUrl: localStorage.getItem('httpUrl')
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.amusement-index-more-box {
		padding-top: 44px;
		.list {
			background-color: white;
			ul {
				margin-top: 10px;
				li {
					width: 50%;
					height: 60px;
					display: flex;
					align-items: center;
					float: left;
					img {
						width: 28px;
						height: 28px;
						margin-left: 30px;
					}
					span {
						font-size: 14px;
						margin-left: 30px;
					}
				}
			}
		}
	}
</style>