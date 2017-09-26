<template>
	<div class="usercenter-collection-task-list-box">
		<transition-group name="flip-list" tag="ul">
			<!--<li class="border-1px test" v-for="item,index in list2" :key="item">
				<div class="img">
					<img src="../../../static/usercenter/collection.png">
				</div>
				<div class="content">
					<p class="title">适合宝宝的手指笔饼干</p>
					<p class="text">手指饼干是一款容易上手、不以失败、口 感极佳的小点心手指饼干是一款容易上手 不以失败、口感极佳的小点心……</p>
					<span class="category">美食</span>{{item}}
				</div>
				<div class="delete" v-show="editting" :class="{shakeLittle:editting}" @click="deleteItem(index)">
					<img src="../../../static/usercenter/delete.png" />
				</div>
			</li>-->
			<router-link :to="'/task/detail/' + item.article_id" tag="li" class="border-1px test" 
				v-for="(item, index) in list" :key="index">
				<div class="img">
					<img :src="httpUrl + item.article_detail.resp_img">
				</div>
				<div class="content">
					<p class="title">【今日推荐】</p>
					<p class="text">{{item.article_detail.article_title}}</p>
					<!--<span class="category"></span>-->
				</div>
				<div class="delete" v-show="editting"
					@click.stop="deleteItem(index)">
					<img src="../../../static/usercenter/delete.png" />
				</div>
			</router-link>
		</transition-group>
		<load-more :show-loading="loadingShow" :tip="tip" background-color="#f0f0f0"></load-more>
	</div>
</template>

<script>
	import { LoadMore } from 'vux'
	export default {
		computed: {
			editting() {
				return this.$store.state.editting
			}
		},
		data() {
			return {
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
		methods: {
			deleteItem(index) {
				this.$emit('spliceList', index)
//				this.list.splice(index, 1)
			}
		},
		props: {
			list: Array,
			tip: String,
			loadingShow: Boolean
		},
		components: {
			LoadMore
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	/*@import url("../../../static/less/csshake.css");*/
	.usercenter-collection-task-list-box {
		/*.test {
			transition: all .6s ease;
		}
		.flip-list-enter,
		.flip-list-leave-to
		{
			opacity: 0;
			transform: translateX(100%);
		}*/
		ul {
			margin-top: 10px;
			/*padding-bottom: 34px;*/
			li {
				display: flex;
				align-items: center;
				height: 105px;
				background-color: white;
				padding: 0 10px;
				box-sizing: border-box;
				position: relative;
				.border-1px(#e2e2e2);
				.img {
					flex: 0 0 120px;
					height: 80px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.content {
					flex: 1;
					width: 0;
					height: 85px;
					margin-left: 10px;
					position: relative;
					.title {
						font-size: 14px;
						margin-top: -4px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #e70012;
					}
					.text {
						font-size: 12px;
						color: #707070;
						line-height: 22px;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						overflow: hidden;
					}
					.category {
						position: absolute;
						right: 0;
						bottom: 0;
						font-size: 12px;
						color: #e60012;
						display: block;
						padding: 0 3px;
						border: 1px solid #E60012;
						border-radius: 6px;
					}
				}
				.delete {
					width: 20%;
					height: 60%;
					position: absolute;
					right: 0;
					top: 0;
					img {
						width: 22px;
						height: 22px;
						position: absolute;
						top: 5px;
						right: 5px;			
					}
				}
			}
		}
	}
</style>