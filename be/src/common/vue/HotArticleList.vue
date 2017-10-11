<template>
	<div class="hot-article-list-box">
		<ul>
			<!--<router-link to="/hotArticle/detail/1" tag="li" class="border-1px">
				<div class="img">
					<img src='../../../static/hot-article.png'>
				</div>
				<div class="content">
					<p class="content-title">
						带便当无上班，带上家的味道
					</p>
					<!--<p class="content-text">
						便当，让生活更惬意，是夫妻间爱意的表达，给自己的幸福感。
					</p>-->
			<!--<p class="cotent-footer">
						<span class="date">截止日期：</span>2017-8-22
					</p>
				</div>
				<div class="share">
					￥2元
					<span class="go-share">
						立即分享
					</span>
				</div>
			</router-link>-->
			<router-link :to="fullDetailUrl(item.id)" tag="li" class="border-1px" v-for="item,index in data" :key="index">
				<div class="img">
					<img :src="fullImgUrl(item.resp_img)">
				</div>
				<div class="content">
					<p class="content-title">
						{{item.article_title}}
					</p>
					<!--<p class="content-text">
						便当，让生活更惬意，是夫妻间爱意的表达，给自己的幸福感。
					</p>-->
					<p class="cotent-footer">
						<span class="date">截止日期：</span>{{item.article_date_v}}
					</p>
				</div>
				<div class="share">
					￥{{item.article_rule_money}}
					<span class="go-share">
						立即分享
					</span>
				</div>
			</router-link>
		</ul>
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
				return '/hotArticle/detail/' + id
			}
		},
		components: {
			LoadMore
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.hot-article-list-box {
		ul {
			li {
				padding: 0 12px;
				height: 80px;
				background-color: white;
				display: flex;
				align-items: center;
				.border-1px(#e2e2e2);
				.img {
					flex: 0 0 75px;
					height: 60px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.content {
					flex: 1;
					width: 0;
					margin-right: 12px;
					p {
						margin-left: 10px;
					}
					.content-title {
						font-size: 14px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.content-text {
						font-size: 12px;
						color: #707070;
						line-height: 20px;
						margin-top: 4px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.cotent-footer {
						font-size: 12px;
						color: #707070;
						line-height: 20px;
						margin-top: 12px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						float: right;
						.date {
							color: #e50b1b;
						}
					}
				}
				.share {
					flex: 0 0 92px;
					height: 47px;
					line-height: 36px;
					text-align: center;
					color: #e60012;
					font-size: 20px;
					position: relative;
					.border-1px-left-dashed(#707070);
					.go-share {
						width: 66px;
						height: 16px;
						position: absolute;
						bottom: -6px;
						left: 16px;
						border: 1px solid #e60012;
						border-radius: 7px;
						background: url(../../../static/share.png) 4px center no-repeat;
						background-size: 10px;
						font-size: 10px;
						line-height: 14px;
						padding-left: 12px;
						box-sizing: border-box;
					}
				}
			}
		}
	}
</style>