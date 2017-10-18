<template>
	<div class="flea-market-my">
		<v-header title="我的待卖清单"></v-header>
		<router-link to="" tag="div" class="item vux-1px-b" v-for="(item, index) in listInfo" :key="index">
			<div class="img">
				<img :src="httpUrl + item.img">
			</div>
			<div class="detail-content">
				<div class="item-title">
					<span>{{item.title}}</span>
				</div>
				<p class="sub-title">
					{{item.subtitle}}
				</p>
				<p class="process">
					{{item.create_time | formDate}}发布
				</p>
				<div class="btn">
					<span class="btn-item dele" @click="deleItem(item.id, index)">
						删除
					</span>
					<!--<router-link to="/fleaMarket/release" tag="span" class="btn-item edit">
						编辑
					</router-link>-->
					<span class="btn-item edit" @click="goEdit">
						编辑
					</span>
				</div>
			</div>
		</router-link>
		<div v-show="listInfo.length === 0">
			<load-more :show-loading="false" tip="暂无待卖商品" background-color="#f0f0f0"></load-more>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { LoadMore } from 'vux'
	export default {
		name: 'FleaMarketMy',
		data() {
			return {
				listInfo: [],
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
		components: {
			'v-header': Header,
			LoadMore
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=myGoodsList', {
				params: {
					seachdata: {
						limit: '100'
					}
				}
			}).then((res) => {
				console.log(res)
				this.listInfo = res.data.data
			})
		},
		methods: {
			deleItem(id, index) {
				this.$vux.loading.show({
					text: '正在删除'
				})
				console.log(index)
				this.$http.get('getData/index.php?m=home&c=Form&a=deleteMyGoods', {
					params: {
						seachdata: {
							id: id
						}
					}
				}).then((res) => {
					console.log(res)
					this.$vux.loading.hide()
					if(res.data.datastatus === 1) {
						this.listInfo.splice(index, 1)
						this.$vux.toast.show({
							text: '删除成功!',
							time: '1000'
						})
					} else {
						this.$vux.toast.text(res.data.message)
					}
				})
			},
			goEdit() {
				this.$vux.alert.show({
					title: '提示',
					content: '正在优化，敬请期待'
				})
			}
		}
	}
</script>

<style lang="less">
	.flea-market-my {
		padding: 44px 0;
		.item {
			height: 104px;
			padding: 10px 12px;
			box-sizing: border-box;
			display: flex;
			background-color: white;
			margin-top: 10px;
			.img {
				flex: 0 0 120px;
				img {
					max-width: 100%;
					max-height: 100%;
				}
			}
			.detail-content {
				flex: 1;
				width: 0;
				margin-left: 16px;
				.item-title {
					span {
						font-size: 16px;
						display: block;
						line-height: 22px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #343434;
					}
				}
				.sub-title {
					font-size: 14px;
					color: #707070;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.process {
					font-size: 14px;
					color: #707070;
				}
				.btn {
					display: flex;
					float: right;
					.btn-item {
						width: 54px;
						height: 18px;
						line-height: 18px;
						border: 1px solid;
						font-size: 14px;
						display: block;
						text-align: center;
						border-radius: 4px;
						margin-left: 12px;
					}
					.dele {
						color: #343434;
						border-color: #343434;
					}
					.edit {
						color: #e60012;
						border-color: #e60012;
					}
				}
			}
		}
	}
</style>