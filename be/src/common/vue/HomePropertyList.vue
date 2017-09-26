<template>
	<div class="home-property-list-box">
		<router-link tag="div" :to="'/homeProperty/detail/' + item.id" class="item border-1px"
			v-for="(item, index) in list" :key="index">
			<div class="img">
				<img :src="httpUrl + item.img">
			</div>
			<div class="new-content">
				<div class="item-title">
					<span class="content">{{item.title}}</span>
					<!--<span class="label">{{findType(item.type_id)}}</span>-->
					<span class="label">{{item.type_name}}</span>
				</div>
				<p class="adress">{{item.address}}</p>
				<p>
					<span>{{item.subtitle}}</span>
				</p>
				<div class="price">
					<span>{{item.price}}{{item.company}}</span>
				</div>
			</div>
		</router-link>
		<load-more :show-loading="loadingShow" :tip="tip" background-color="#f0f0f0"></load-more>
		<!--<router-link tag="div" to="/homeProperty/detail/second/1" class="item border-1px">
			<div class="img">
				<img src="../../../static/home-property-list.png">
			</div>
			<div class="second-hand-content">
				<div class="item-title">
					<span>元一名城精装房</span>
					<span class="label">二手房</span>
				</div>
				<p class="adress">临泉路与嘉山路交汇处</p>
				<p>
					<span>3室1厅1卫</span>
					<span>105㎡</span>
					<span class="pre-price">1444元/㎡</span>
				</p>
				<div class="price">
					<span>130万元</span>
				</div>
			</div>
		</router-link>
		<router-link tag="div" to="/homeProperty/detail/decorate/1" class="item border-1px">
			<div class="img">
				<img src="../../../static/home-property-list.png">
			</div>
			<div class="decorate-content">
				<div class="item-title">
					<span>大伟装饰</span>
					<span class="label">居家</span>
				</div>
				<rater star="★" active-color="red" :value="3.0"
					:font-size="16" :margin="2" :disabled="true"></rater>
				<span class="score">3.0</span>
				<p class="detail">
					<span class="price">199元起</span>
					<span class="adress">新蚌埠路</span>
				</p>
			</div>
		</router-link>
		<router-link tag="div" to="/homeProperty/detail/storefront/1" class="item border-1px">
			<div class="img">
				<img src="../../../static/home-property-list.png">
			</div>
			<div class="storefront-content">
				<div class="item-title">
					<span>信地城市广场</span>
					<span class="label">门面</span>
				</div>
				<p class="adress">临泉路与全椒路交汇处</p>
				<p>
					<span>200㎡</span>
				</p>
				<div class="price">
					<span>1500元/月</span>
				</div>
			</div>
		</router-link>
		<router-link tag="div" to="/homeProperty/detail/rental/1" class="item border-1px">
			<div class="img">
				<img src="../../../static/home-property-list.png">
			</div>
			<div class="rental-content">
				<div class="item-title">
					<span>保利东郡</span>
					<span class="label">租房</span>
				</div>
				<p class="adress">新安江路以南.郎溪路以东</p>
				<p>
					<span>三室两厅两卫</span>
				</p>
				<div class="price">
					<span>2000元/月</span>
				</div>
			</div>
		</router-link>-->
	</div>
</template>

<script>
	import { Rater, LoadMore } from 'vux'
	export default {
		components: {
			Rater,
			LoadMore
		},
		props: {
			list: Array,
//			typeArr: Array,
			tip: String,
			loadingShow: Boolean
		},
		data() {
			return {
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
		methods: {
//			findType(id) {
//				for (let i = 0; i < this.typeArr.length; i++) {
//					if(this.typeArr[i].id === id) {
//						return this.typeArr[i].type_name
//					}
//				}
//			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.home-property-list-box {
		.item {
			height: 104px;
			padding: 12px;
			box-sizing: border-box;
			display: flex;
			background-color: white;
			.border-1px(#e2e2e2);
			.img {
				flex: 0 0 120px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			/************新房************/
			.new-content {
				flex: 1;
				margin-left: 16px;
				.item-title {
					display: flex;
					justify-content: space-between;
					span {
						font-size: 14px;
						display: block;
						line-height: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						&.content {
							flex: 1;
							width: 0;
						}
						&.label {
							 font-size: 12px;
							 color: #e60012;
							 border: 1px solid #e60012;
							 border-radius: 6px;
							 height: 12px;
							 line-height: 12px;
							 padding: 2px 5px;
						}
					}
				}
				p {
					color: #707070;
					font-size: 12px;
					line-height: 20px;
				}
				.price {
					color: #e60012;
					font-size: 18px;
					float: right;
				}
			}
			/************二手房************/
			.second-hand-content {
				flex: 1;
				margin-left: 16px;
				.item-title {
					display: flex;
					justify-content: space-between;
					span {
						font-size: 14px;
						display: block;
						line-height: 1;
						&.label {
							 font-size: 12px;
							 color: #e60012;
							 border: 1px solid #e60012;
							 border-radius: 6px;
							 height: 12px;
							 line-height: 12px;
							 padding: 2px 5px;
						}
					}
				}
				p {
					color: #707070;
					font-size: 12px;
					.pre-price{
						float: right;
					}
				}
				.price{
					color: #e60012;
					font-size: 18px;
					float: right;
				}
			}
			/************居家************/
			.decorate-content{
				flex: 1;
				margin-left: 16px;
				font-size: 0;
				.item-title {
					display: flex;
					justify-content: space-between;
					span {
						font-size: 14px;
						display: block;
						line-height: 1;
						&.label {
							 font-size: 12px;
							 color: #e60012;
							 border: 1px solid #e60012;
							 border-radius: 6px;
							 height: 12px;
							 line-height: 12px;
							 padding: 2px 5px;
						}
					}
				}
				.vux-rater {
					line-height: 0;
				}
				.score {
					font-size: 14px;
					color: #e60012;
				}
				.detail{
					line-height: 12px;
					span {
						font-size: 12px;
					}
					.price {
						color: #f29318;
					}
					.adress {
						color: #afafaf;
						float: right;
						line-height: 26px;
					}
				}
				.decorate-label {
					margin-top: 4px;
					span {
						color: #afafaf;
						font-size: 12px;
						border: 1px solid #afafaf; 
						border-radius: 6px;	
						padding: 2px 8px;
						&+span {
							margin-left: 6px;
						}
					}
				}
			}
			/************门面************/
			.storefront-content {
				flex: 1;
				margin-left: 16px;
				.item-title {
					display: flex;
					justify-content: space-between;
					span {
						font-size: 14px;
						display: block;
						line-height: 1;
						&.label {
							 font-size: 12px;
							 color: #e60012;
							 border: 1px solid #e60012;
							 border-radius: 6px;
							 height: 12px;
							 line-height: 12px;
							 padding: 2px 5px;
						}
					}
				}
				p {
					color: #707070;
					font-size: 12px;
				}
				.price{
					color: #e60012;
					font-size: 18px;
					float: right;
				}
			}
			/************门面************/
			.rental-content {
				flex: 1;
				margin-left: 16px;
				.item-title {
					display: flex;
					justify-content: space-between;
					span {
						font-size: 14px;
						display: block;
						line-height: 1;
						&.label {
							 font-size: 12px;
							 color: #e60012;
							 border: 1px solid #e60012;
							 border-radius: 6px;
							 height: 12px;
							 line-height: 12px;
							 padding: 2px 5px;
						}
					}
				}
				p {
					color: #707070;
					font-size: 12px;
				}
				.price{
					color: #e60012;
					font-size: 18px;
					float: right;
				}
			}
		}
		/*.footer {
			width: 100%;
			height: 27px;
			line-height: 27px;
			background-color: #f0f0f0;
			text-align: center;
			font-size: 12px;
			color: #afafaf;
		}*/
	}
</style>