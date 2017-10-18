<template>
	<div class="free-detail-box">
		<v-header :title="title"></v-header>
		<swiper :list="imgList" :show-desc-mask="false" :loop="true" :aspect-ratio="3/5"></swiper>
		<div class="home-info">
			<div class="info-top border-1px">
				<p class="info-title">
					{{content.title}}
				</p>
				<p class="info-price">
					<span class="name">
						名额
					</span>
					<span class="value">
						{{content.real_all_num}}
					</span>
					<span class="count">
						{{content.virtual_part_num}}人关注
					</span>
				</p>
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
			</div>
		</div>
		<!--<div class="detail-footer">
			<div class="btn">
				<div class="go-collect">
					<span>点赞</span>
				</div>
				<div class="go-share" @click="showMaster">
					<span>分享</span>
				</div>
			</div>
			<router-link to="/free/signUp" tag="div" class="detail">
				<p>
					立即报名
				</p>
			</router-link>
		</div>-->
		<footer-btn @detailHandle="detailHandle" :id="content.id">立即报名</footer-btn>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Swiper } from 'vux'
	import FooterBtn from '@/common/vue/FooterBtn'
	export default {
		name: 'FreeDetail',
		components: {
			'v-header': Header,
			Swiper,
			FooterBtn
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
				params: {
					seachdata: {
						'id': this.$route.params.id
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
		data() {
			return {
				httpUrl: localStorage.getItem('httpUrl'),
				imgList: [],
				content: {},
				detail: []
			}
		},
		computed: {
			title() {
				return '今日免单'
			}
		},
		methods: {
			detailHandle() {
				this.$router.push('/free/signUp/' + this.content.id)
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.free-detail-box {
		padding-top: 54px;
		padding-bottom: 70px;
		.home-info {
			/*height: 150px;*/
			background-color: white;
			.info-top {
				padding: 0 12px 10px;
				.border-1px(#e2e2e2);
				.info-title {
					font-size: 14px;
					padding: 10px 0;
				}
				.info-price {
					line-height: 18px;
					display: flex;
					.name {
						font-size: 14px;
						color: #707070;
						flex: 0 0 auto;
					}
					.value {
						font-size: 14px;
						color: #e60012;
						flex: 1;
						width: 0;
						padding-left: 4px;
					}
					.count {
						flex: 0 0 auto;
						font-size: 14px;
						color: #707070;
					}
				}
			}
			.position {
				/*height: 44px;*/
				/*background: url(../../../static/position.png) 12px center no-repeat;*/
				background-size: 15px 20px;
				font-size: 14px;
				/*line-height: 44px;*/
				.border-1px(#e2e2e2);
				p {
					/*margin-left: 47px;*/
					margin-left: 12px;
					margin-right: 12px;
					padding: 10px 0;
					/*white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;*/
				}
			}
			.tel {
				height: 44px;
				background: url(../../../static/tel.png) 12px center no-repeat;
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
				background-color: white;
				padding: 5px 12px;
			}
		}
	}
</style>