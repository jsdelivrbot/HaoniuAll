<template>
	<div class="amusement-detail-box">
		<v-header :title="content.title"></v-header>
		<swiper :list="imgList" :show-desc-mask="false" :loop="true" :aspect-ratio="3/5"></swiper>
		<div class="home-info">
			<div class="info-top border-1px">
				<p class="info-title">
					{{content.title}}
				</p>
				<p class="info-price">
					人均{{content.price}}元
				</p>
				<!--<p class="info-label">
					<span>物美价廉</span>
					<span>服务好</span>
				</p>-->
			</div>
			<div class="position border-1px">
				<p>地址：{{content.address}}</p>
			</div>
			<div class="tel">
				<span class="number">{{content.phone}}</span>
				<a :href="'tel:' + content.phone" class="dial">立即拨打</a>
			</div>
		</div>
		<div class="resources-info" v-for="(item, index) in detail" :key="index">
			<p class="resources-title border-1px">
				{{item.title}}
			</p>
			<div class="resources-content" v-html="item.content">
				<!--<p>
					<span class="name">服务设施：</span>
					<span class="value">有wifi</span>
				</p>
				<p>
					<span class="name">产权年限：</span>
					<span class="value">70</span>
				</p>
				<p>
					<span class="name">销售许可证：</span>
					<span class="value">合房预售证第20150909号</span>
				</p>
				<p>
					<span class="name">开盘时间：</span>
					<span class="value">2016年04月14日</span>
				</p>
				<p>
					<span class="name">交房时间：</span>
					<span class="value">待定</span>
				</p>-->
			</div>
		</div>
		<!--<div class="detail-footer">
			<div class="btn">
				<div class="go-collect" @click="collect">
					<span>点赞</span>
				</div>
				<div class="collected">
					<span>已点赞</span>
				</div>
				<div class="go-share">
					<span>评论</span>
				</div>
			</div>
			<div class="detail">
				<a :href="'tel:' + content.phone">
					<p class="first">拨打电话：</p>
					<p class="second">{{content.phone}}</p>
				</a>
			</div>
		</div>-->
		<footer-btn :id="content.id">
			<a :href="'tel:' + content.phone" style="color: white">
				<p class="first" style="line-height: 16px; margin: 8px 0 0 -40px; font-size: 12px;">拨打电话：</p>
				<p class="second" style="line-height: 16px; font-size: 16px;">{{content.phone}}</p>
			</a>
		</footer-btn>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Swiper } from 'vux'
	import FooterBtn from '@/common/vue/FooterBtn'
	export default {
		name: 'AmusementDetail',
		components: {
			'v-header': Header,
			Swiper,
			FooterBtn
		},
		data() {
			return {
				detailId: this.$route.params.id,
				httpUrl: localStorage.getItem('httpUrl'),
				content: {},
				detail: [],
				imgList: [],
				collected: false
			}
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
				params: {
					seachdata: {
						'id': this.detailId
					}
				}
			}).then((res) => {
				console.log('详情页')
				console.log(res)
				this.content = res.data.data[0]
				this.detail = res.data.detail
				var imgData = res.data.img_data
				for(let i = 0; i < imgData.length; i++) {
					this.imgList.push({
						url: 'javascript:',
						img: this.httpUrl + imgData[i].content,
						title: imgData[i].title
					})
				}
			})
		},
		methods: {
			collect() {
				this.collected = true
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.amusement-detail-box {
		padding-top: 54px;
		padding-bottom: 70px;
		.home-info {
			/*height: 172px;*/
			background-color: white;
			.info-top {
				padding: 6px;
				.border-1px(#e2e2e2);
				.info-title {
					font-size: 16px;
					height: 34px;
					line-height: 24px;
					padding-top: 4px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.info-price {
					line-height: 24px;
					color: #f29318;
					font-size: 14px;
				}
				.info-label {
					font-size: 12px;
					color: #707070;
					line-height: 24px;
					height: 24px;
					margin-top: 4px;
					span {
						padding: 2px 4px;
						border: 1px solid #707070;
						border-radius: 6px;
					}
				}
			}
			.position {
				/*height: 44px;*/
				/*background: url(../../../static/position.png) 12px center no-repeat;*/
				background-size: 15px 20px;
				font-size: 14px;
				/*line-height: 44px;*/
				padding: 10px 0;
				.border-1px(#e2e2e2);
				p {
					/*margin-left: 47px;*/
					margin-left: 12px;
					margin-right: 12px;
					/*white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;*/
				}
			}
			.tel {
				height: 44px;
				background: url(../../../static/usercenter/tel.png) 12px center no-repeat;
				background-size: 15px 15px;
				.number {
					font-size: 14px;
					color: #343434;
					line-height: 44px;
					margin-left: 47px;
				}
				.dial {
					float: right;
					width: 80px;
					height: 30px;
					background-color: #e60012;
					display: inline-block;
					font-size: 12px;
					color: white;
					line-height: 30px;
					text-align: center;
					margin-top: 7px;
					margin-right: 20px;
					border-radius: 4px;
				}
			}
		}
		.resources-info {
			/*height: 164px;*/
			background-color: white;
			margin-top: 10px;
			.resources-title {
				height: 44px;
				line-height: 44px;
				font-size: 12px;
				padding-left: 12px;
				.border-1px(#e2e2e2);
			}
			.resources-content {
				padding: 5px 12px;
				overflow: hidden;
				/*p {
					font-size: 12px;
					height: 22px;
					line-height: 22px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					.name {
						color: #707070;
						display: inline-block;
						width: 77px;
					}
				}*/
			}
		}
		/*.detail-footer {
			display: flex;
			width: 100%;
			height: 50px;
			background-color: white;
			position: fixed;
			left: 0;
			bottom: 0;
			.btn {
				flex: 2;
				width: 0;
				background-color: #3d3d3d;
				display: flex;
				div {
					flex: 1;
					width: 0;
					&.go-collect {
						background: url(../../../static/home-icon1.png) center 8px no-repeat;
						background-size: 18px 18px;
					}
					&.collected {
						background: url(../../../static/hot-article-share-active.png) center 8px no-repeat;
						background-size: 20px 20px;
						display: none;
					}
					&.go-share {
						background: url(../../../static/home-icon2.png) center 8px no-repeat;
						background-size: 20px 20px;
					}
					span {
						color: white;
						text-align: center;
						display: block;
						font-size: 12px;
						margin-top: 28px;
					}
				}
			}
			.detail {
				flex: 3;
				width: 0;
				background-color: #e60012;
				color: white;
				text-align: center;
				line-height: 16px;
				display: flex;
				justify-content: center;
				align-items: center;
				a {
					color: white;
					.first {
						font-size: 12px;
						text-align: left;
					}
					.second {
						font-size: 16px;
					}
				}
			}
		}*/
	}
</style>