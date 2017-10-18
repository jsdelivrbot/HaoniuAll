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
					<span>分享到社交圈赚取更多</span>
				</div>
			</div>
			<div class="detail" @click="getCharge" v-show="!getted">
				点击赚取{{article_rule_money}}元
			</div>
			<div class="detail getted" @click="showMaster" v-show="getted">
				已赚取{{article_rule_money}}元
			</div>
		</div>
		<transition name="all">
			<div class="share-master" v-show="masterShow" @touchmove.prevent @click="masterShow=false">
				<transition name="up">
					<div class="category" @click.stop v-show="masterShow">
						<div class="row row1">
							<div class="icon" @click="share('tm')">
								<img src="../../../static/hot-article-category5.png" width="38px" />
								<p>微信朋友圈</p>
							</div>
							<div class="icon" @click="share('wx')">
								<img src="../../../static/hot-article-category4.png" width="40px" />
								<p>微信好友</p>
							</div>
							<!--<div class="icon">
								<img src="../../../static/hot-article-category1.png" width="40px" />
								<p>QQ空间</p>
							</div>-->
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
							<!--<div class="icon">
								<img src="../../../static/hot-article-category2.png" width="38px" />
								<p>贴吧</p>
							</div>-->
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
		props: ['articleId', 'article_rule_money', 'title', 'id', 'isChecked', 'shareImg'],
		data() {
			return {
				collected: false,
				masterShow: false,
				getted: false,
				uid: localStorage.getItem('id'),
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
		created() {
//			console.log('isChecked')
//			console.log(this.isChecked)
//			console.log(this.shareImg)
			if(this.isChecked === '1') {
				this.getted = true
			}
		},
		methods: {
			share(selects) {
				console.log(this.httpUrl + this.shareImg)
				let opts = {
					url: 'http://aifengxiang.hfrjkf.cn/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=article&aid=' + this.id + '&uid=' + this.uid,
					title: this.title.substring(0, 10) + '...',
					content: this.title,
					img: this.httpUrl + this.shareImg
				}
				this.$CwxShare(selects, opts, function(res) {
					if(res) {
						mui.toast('分享成功!')
					} else {
						mui.toast('分享失败,请重试!')
					}
				})
			},
			showMaster() {
				this.masterShow = true
			},
			getCharge() {
				if(!sessionStorage.getItem('token')) {
					this.$router.push({
						path: '/login',
						query: {
							redirect: this.$route.fullPath
						}
					})
					return
				}
				this.$http.get('getData/index.php?m=home&c=Form&a=articleShare', {
					params: {
						seachdata: {
							'article_id': this.articleId
						}
					}
				}).then((res) => {
					console.log(res)
					if(res.data.datastatus === 1) {
						this.getted = true
					}
					if(res.data.datastatus === 0) {
						this.$vux.alert.show({
							title: '提示',
							content: '提交失败'
						})
					}
					if(res.data.datastatus === 2) {
						let $this = this
						this.$vux.alert.show({
							title: '提示',
							content: '请补全信息',
							onHide() {
								$this.$router.push('/usercenter/perfect')
							}
						})
					}
				})
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
//				let token = this.$http.defaults.headers.common['token']
//				alert(token)
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
				flex: 4;
				width: 0;
				background-color: #3d3d3d;
				display: flex;
				div {
					width: 0;
					&.go-collect {
						flex: 1;
						background: url(../../../static/hot-article-collect.png) center 6px no-repeat;
						background-size: 22px 22px;
					}
					&.collected {
						flex: 1;
						background: url(../../../static/hot-article-share-active.png) center 6px no-repeat;
						background-size: 20px 20px;
					}
					&.go-share {
						flex: 2;
						background: url(../../../static/hot-article-share.png) center 6px no-repeat;
						background-size: 16px 19px;
						background-color: rgb(255, 82, 33);
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
				flex: 2;
				width: 0;
				background-color: #e60012;
				color: white;
				font-size: 14px;
				text-align: center;
				line-height: 50px;
			}
			.getted {
				background-color: lightcoral;
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