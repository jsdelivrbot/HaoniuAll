<template>
	<div class="usercenter-my-activity-box">
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
		<div class="person-info">
			<div class="item vux-1px-b">
				<span class="name">姓 名：</span>
				<span class="value">{{username}}</span>
			</div>
			<div class="item vux-1px-b">
				<span class="name">联系电话：</span>
				<span class="value">{{phone}}</span>
			</div>
		</div>
		<div class="btn">
			取消报名
		</div>
		<div class="footer-info">
			<p>如发现信息有误，请取消重新报名！</p>
			<p>报名费将在活动结束7个工作日返回到您的收益账户中</p>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Swiper } from 'vux'
	export default {
		components: {
			'v-header': Header,
			Swiper
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=infoJoinList', {
				params: {
					seachdata: {
						'info_id': this.$route.params.id,
						'action_type': 6
					}
				}
			}).then((res) => {
				console.log('详情页')
				console.log(res)
				this.content = res.data.data[0].info_detail
				this.username = res.data.data[0].username
				this.phone = res.data.data[0].phone
//				this.detail = res.data.detail
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
				username: '',
				phone: ''
//				detail: []
			}
		},
		computed: {
			title() {
				return '报名凭证'
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.usercenter-my-activity-box {
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
		.person-info {
			width: 100%;
			margin-top: 10px;
			background-color: white;
			.item {
				height: 40px;
				padding: 0 12px;
				font-size: 14px;
				line-height: 40px;
				display: flex;
				.name {
					flex: 1;
				}
				.value {
					color: #707070;
				}
			}
		}
		.btn {
			width: 80%;
			height: 40px;
			line-height: 40px;
			background-color: #e70012;
			color: white;
			text-align: center;
			margin: 20px auto;
			font-size: 16px;
		}
		.footer-info {
			p {
				font-size: 12px;
				text-align: center;
				color: #707070;
			}
		}
	}
</style>