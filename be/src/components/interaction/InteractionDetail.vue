<template>
	<div class="interaction-detail-box">
		<v-header :title="title"></v-header>
		<swiper :list="imgList" :show-desc-mask="false" :loop="true" :aspect-ratio="360/750"></swiper>
		<div class="home-info">
			<div class="info-top border-1px">
				<p class="info-title">
					{{content.title}}
				</p>
				<p class="info-price">
					<span class="name">
						报名费
					</span>
					<span class="value">
						{{content.price}}{{content.company}}
					</span>
				</p>
				<p class="info-count">
					<span class="name">
						已报名
					</span>
					<span class="value">
						{{content.virtual_part_num}}人
					</span>
				</p>
			</div>
			<div class="position border-1px">
				<p>{{content.address}}</p>
			</div>
			<div class="tel">
				<span class="number">{{content.phone}}</span>
				<a :href="'tel:' + content.phone" class="dial">资讯热线</a>
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
				<div class="go-collect" v-if="!collected" @click="collect">
					<span>收藏</span>
				</div>
				<div class="collected" v-if="collected" @click="collected=false">
					<span>已收藏</span>
				</div>
				<div class="go-share" @click="showMaster">
					<span>分享</span>
				</div>
			</div>
			<div class="detail" @click="signUp">
				<p>
					立即报名
				</p>
			</div>
		</div>-->
		<footer-btn @detailHandle="detailHandle" :id="content.id">立即报名</footer-btn>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Swiper } from 'vux'
	import FooterBtn from '@/common/vue/FooterBtn'
	export default {
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
				masterShow: false,
				collected: false,
				content: {},
				detail: []
			}
		},
		computed: {
			title() {
				return '线下互动'
			}
		},
		methods: {
			detailHandle() {
				this.$router.push('/interaction/signUp/' + this.content.id)
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
				this.collected = true
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.interaction-detail-box {
		padding-top: 54px;
		padding-bottom: 70px;
		.home-info {
			background-color: white;
			.info-top {
				padding: 0 12px;
				.border-1px(#e2e2e2);
				.info-title {
					font-size: 14px;
					height: 32px;
					line-height: 32px;
					padding-top: 4px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.info-price {
					line-height: 18px;
					display: flex;
					.name {
						font-size: 12px;
						color: #707070;
					}
					.value {
						font-size: 18px;
						color: #e60012;
						flex: 1;
						width: 0;
						padding-left: 4px;
					}
				}
				.info-count {
					line-height: 32px;
					.name {
						font-size: 12px;
						color: #707070;
					}
					.value {
						font-size: 12px;
						color: #f39700;
					}
				}
			}
			.position {
				height: 44px;
				background: url(../../../static/position.png) 12px center no-repeat;
				background-size: 15px 20px;
				font-size: 14px;
				line-height: 44px;
				.border-1px(#e2e2e2);
				p {
					margin-left: 47px;
					margin-right: 12px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
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
				padding: 5px 12px;
				p {
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
				}
			}
		}
	}
</style>