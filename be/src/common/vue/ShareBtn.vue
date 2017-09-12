<template>
	<div class="share-btn-box border-1px">
		<div class="share border-1px">
			<div class="btn">
				<div class="go-collect" v-if="!collected" @click="collect">
					<span>收藏</span>
				</div>
				<div class="collected" v-if="collected">
					<span>已收藏</span>
				</div>
				<div class="go-share" @click="showMaster">
					<span>分享</span>
				</div>
			</div>
			<div class="detail" @click="showMaster">
				点击按钮轻松赚取{{article_rule_money}}元
			</div>
		</div>
		<transition name="all">
			<div class="share-master" v-show="masterShow" @touchmove.prevent @click="masterShow=false">
				<transition name="up">
					<div class="category" @click.stop v-show="masterShow">
						<div class="row row1">
							<div class="icon">
								<img src="../../../static/hot-article-category5.png" width="38px" />
								<p>微信朋友圈</p>
							</div>
							<div class="icon">
								<img src="../../../static/hot-article-category4.png" width="40px" />
								<p>微信好友</p>
							</div>
							<div class="icon">
								<img src="../../../static/hot-article-category1.png" width="40px" />
								<p>QQ空间</p>
							</div>
							<div class="icon">
								<img src="../../../static/hot-article-category6.png" width="40px" />
								<p>QQ好友</p>
							</div>
						</div>
						<div class="row row2">
							<div class="icon">
								<img src="../../../static/hot-article-category3.png" width="38px" />
								<p>微博</p>
							</div>
							<div class="icon">
								<img src="../../../static/hot-article-category2.png" width="38px" />
								<p>贴吧</p>
							</div>
							<div class="icon"></div>
							<div class="icon"></div>
						</div>
						<div class="btn" @click="masterShow=false">
							取消
						</div>
					</div>
				</transition>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		props: ['articleId', 'article_rule_money'],
		data() {
			return {
				collected: false,
				masterShow: false
			}
		},
		methods: {
			showMaster() {
				if(!sessionStorage.getItem('token')) {
					this.$router.push({
						path: '/login',
						query: {
							redirect: this.$route.fullPath
						}
					})
					return
				}
				this.masterShow = true
			},
			collect() {
				if(!sessionStorage.getItem('token')) {
					this.$router.push({
						path: '/login',
						query: {
							redirect: this.$route.fullPath
						}
					})
					return
				}
				this.$http.get('getData/index.php?m=home&c=Form&a=infoCollect', {
					params: {
						seachdata: {
							'article_id': this.articleId
						}
					}
				}).then((res) => {
					console.log(res)
					if(res.data.datastatus === 1) {
						this.$vux.alert.show({
							title: '提示',
							content: '加入成功'
						})
						this.collected = true
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: '加入失败'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.all-enter-active,
	.all-leave-active {
		transition: all .2s;
	}
	
	.all-enter,
	.all-leave-to {
		opacity: 0;
	}
	
	.up-enter-active,
	.up-leave-active {
		transition: all .2s;
	}
	
	.up-enter,
	.up-leave-to {
		transform: translateY(100%);
	}
	/*.up-enter-active {
		animation: bounce-in .5s;
	}
	
	.up-leave-active {
		animation: bounce-in .5s reverse;
	}
	
	@keyframes bounce-in {
		0% {
			transform: translateY(100%);
		}
		50% {
			transform: translateY(-30%);
		}
		100% {
			transform: translateY(0);
		}
	}
	
	.up-enter,
	.up-leave-to
	{
		transform: translateY(-100%);
	}*/
	
	.share-btn-box {
		.share {
			display: flex;
			height: 50px;
			padding-bottom: 8px;
			background-color: white;
			.border-1px(#e2e2e2);
			.btn {
				flex: 2;
				width: 0;
				background-color: #3d3d3d;
				display: flex;
				div {
					flex: 1;
					width: 0;
					&.go-collect {
						background: url(../../../static/hot-article-collect.png) center 6px no-repeat;
						background-size: 22px 22px;
					}
					&.collected {
						background: url(../../../static/hot-article-share-active.png) center 6px no-repeat;
						background-size: 20px 20px;
					}
					&.go-share {
						background: url(../../../static/hot-article-share.png) center 6px no-repeat;
						background-size: 16px 19px;
					}
					span {
						color: white;
						text-align: center;
						display: block;
						font-size: 12px;
						margin-top: 26px;
					}
				}
			}
			.detail {
				flex: 3;
				width: 0;
				background-color: #e60012;
				color: white;
				font-size: 16px;
				text-align: center;
				line-height: 50px;
			}
		}
		.share-master {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			z-index: 3;
			.category {
				background-color: #f0f0f0;
				width: 100%;
				height: 224px;
				position: absolute;
				left: 0;
				bottom: 0;
				.row {
					display: flex;
					height: 60px;
					align-items: center;
					margin-top: 20px;
					.icon {
						flex: 1;
						width: 0;
						text-align: center;
						p {
							font-size: 12px;
							margin-top: 6px;
						}
					}
				}
				.row2 {
					margin-bottom: 20px;
				}
				.btn {
					height: 44px;
					line-height: 44px;
					background-color: #ffffff;
					text-align: center;
					font-size: 12px;
					color: #707070;
				}
			}
		}
	}
</style>