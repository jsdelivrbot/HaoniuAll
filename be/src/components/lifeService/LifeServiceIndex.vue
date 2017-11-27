<template>
	<div class="life-service-index-box">
		<v-header title="生活服务"></v-header>
		<swiper auto :aspect-ratio="1/3" :show-desc-mask="false" :loop="true" class="banner" dots-position="center">
			<swiper-item v-for="(item, index) in baseList" :key="index" @click.native="goLink(item.url, item.link_type)">
				<img :src="item.img" class="swiper-img" />
			</swiper-item>
		</swiper>
		<div class="list">
			<ul class="clearfix">
				<router-link :to="'/lifeService/in/' + item.id" tag="li" class="vux-1px"
					v-for="(item,index) in list" :key="index" v-if="!item.isLink">
					<img :src="httpUrl + item.img" />
					<span>{{item.type_name}}</span>
				</router-link>
				<li class="vux-1px" v-for="(item,index) in list" :key="index" v-if="item.isLink" @click="goLink(item.link, '1')">
					<img :src="item.images" />
					<span>{{item.title}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Swiper, SwiperItem } from 'vux'
	export default {
		name: 'LifeServiceIndex',
		components: {
			'v-header': Header,
			Swiper,
			SwiperItem
		},
		data() {
			return {
				baseList: [],
				list: [],
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
		created() {
			//轮播图
			this.$http.get('getData/index.php?m=home&c=Form&a=bannerList', {
					params: {
						type: 0,
						seachdata: {
							page_type: 3,
							province: sessionStorage.getItem('province'),
							city: sessionStorage.getItem('city'),
							country: sessionStorage.getItem('counties')
						}
					}
				})
				.then((res) => {
//					console.log(res)
					let imgarr = res.data.data
					for(let i = 0; i < imgarr.length; i++) {
						let link
						if(imgarr[i].link_type === '5') {
							let src = encodeURIComponent(imgarr[i].link.substring(2))
							link = '/shopping-mall?url=' + src
						} else {
							link = imgarr[i].link
						}
						this.baseList.push({
							url: link,
							img: this.httpUrl + imgarr[i].banner_img,
							title: imgarr[i].banner_title,
							link_type: imgarr[i].link_type
						})
					}
				})
			this.$http.get('getData/index.php?m=home&c=Form&a=infoTypeList', {
					params: {
						seachdata: {
							'parent_id': 2
						}
					}
				})
				.then((res) => {
//					console.log('生活服务')
//					console.log(res)
					this.list = res.data.data
					this.$http.get('getData/home/Form/lifeLinkList').then((res) => {
//						console.log(res)
						let arr = res.data.data
						for(let i = 0; i < arr.length; i++) {
							arr[i].isLink = true
						}
						this.list.push.apply(this.list, arr)
						console.log(this.list)
					})
				})
		},
		methods: {
			goLink(link, type) {
				if(type === '1') {
					plus.runtime.openURL(link)
				} else {
					this.$router.push(link)
				}
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.life-service-index-box {
		padding-top: 44px;
		overflow: hidden;
		.vux-slider {
			margin-top: 5px;
			.vux-indicator {
				a {
					.vux-icon-dot.active {
						background-color: white;
					}
				}
			}
		}
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
		.swiper-img {
			width: 100%;
		}
	}
</style>