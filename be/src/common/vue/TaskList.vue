<template>
	<div class="task-list-box">
		<!--<router-link to="/task/detail/1" tag="div" class="item">
			<div class="img">
				<img src="../../../static/task-list.jpg" />
			</div>
			<div class="content">
				<span class="title">【今日推荐】</span>
				<p class="main">名以食物为天,各种各样的美食对于人们来说都是一个不小的诱惑</p>
				<!--<p class="count">投放量： 10000</p>-->
			<!--<p class="price">剩余金额： <span class="price-red">2000</span></p>
				<div class="share-btn">
					<span class="share-price">￥2</span>
					<span class="share-go">去分享</span>
				</div>
			</div>
		</router-link>-->
		<router-link :to="fullDetailUrl(item.id)" tag="div" class="item"
			v-for="item,index in data" :key="index">
			<div class="img">
				<img :src="fullImgUrl(item.resp_img)" />
			</div>
			<div class="content">
				<span class="title"></span>
				<p class="main">{{item.article_title}}</p>
				<!--<p class="count">投放量： 10000</p>-->
				<p class="price">
					剩余金额： 
					<span class="price-red">{{item.article_rule_moneytotal}}</span>
				</p>
				<div class="share-btn">
					<span class="share-price">￥{{item.article_rule_money}}</span>
					<span class="share-go">去分享</span>
				</div>
			</div>
		</router-link>
		<load-more :show-loading="loadingShow" :tip="tip" background-color="#f0f0f0"></load-more>
	</div>
</template>

<script>
	import { LoadMore } from 'vux'
	export default {
		props: {
			data: Array,
			tip: String,
			loadingShow: Boolean
		},
		data() {
			return {
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
		methods: {
			fullImgUrl(img) {
				return this.httpUrl + img
			},
			fullDetailUrl(id) {
				return '/task/detail/' + id
			}
		},
		components: {
			LoadMore
		}
	}
</script>

<style lang="less">
	.task-list-box {
		padding: 0 12px 6px;
		/*padding: 0 12px 64px;*/
		box-sizing: border-box;
		.item {
			background-color: white;
			height: 140px;
			margin-top: 10px;
			box-shadow: 0 4px 4px #ab9c9b;
			padding: 5px;
			box-sizing: border-box;
			display: flex;
			width:100%;
			.img {
				flex: 0 0 160px;
				width: 160px;
				height: 128px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.content {
				flex: 1;
				margin: -2px 5px 0 10px;
				width: 0;
				overflow: hidden;
				.title,
				.main {
					font-size: 12px;
				}
				.title {
					color: #e4151c;
					font-weight: 700;
					display: block;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.main {
					/*height: 76px;*/
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					line-height: 16px;
					height: 32px;
					margin: 6px 0 24px;
				}
				.count,.price {
					font-size: 10px;
					line-height: 24px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					color: #7d7d7d;
				}
				.count{
					margin-top: 4px;
				}
				.price{
					.price-red{
						color: #e50b1b;
					}
				}
				.share-btn{
					height: 30px;
					width: 114px;
					background-color: #e70012;
					margin-top: 6px;
					color: white;
					display: flex;
					align-items: center;
					span{
						text-align: center;
						height: 20px;
						font-size: 14px;
						&.share-price{
							flex: 3;
							border-right: 1px solid #cbb4b6;
						}
						&.share-go{
							flex: 3;
						}
					}
				}
			}
		}
	}
</style>