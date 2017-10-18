<template>
	<div class="life-service-index-box">
		<v-header title="生活服务"></v-header>
		<swiper :list="baseList" auto :aspect-ratio="1/3" :show-desc-mask="false" :loop="true" class="banner" dots-position="center"></swiper>
		<div class="list">
			<ul class="clearfix">
				<router-link :to="'/lifeService/in/' + item.id" tag="li" class="vux-1px"
					v-for="(item,index) in list" :key="index">
					<img :src="httpUrl + item.img" />
					<span>{{item.type_name}}</span>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Swiper } from 'vux'
	export default {
		name: 'LifeServiceIndex',
		components: {
			'v-header': Header,
			Swiper
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
							page_type: 3
						}
					}
				})
				.then((res) => {
					let imgarr = res.data.data
					for(let i = 0; i < imgarr.length; i++) {
						this.baseList.push({
							url: 'javascript:',
							img: this.httpUrl + imgarr[i].banner_img,
							title: imgarr[i].banner_title
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
					console.log('生活服务')
					console.log(res)
					this.list = res.data.data
				})
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.life-service-index-box {
		padding-top: 44px;
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
	}
</style>