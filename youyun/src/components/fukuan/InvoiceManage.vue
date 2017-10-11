<template>
	<div class="invoice-manage-box">
		<v-header title="发票管理"></v-header>
		<div class="search vux-1px-b">
			<input type="text" placeholder="搜索车牌号或车辆信息" />
			<span>搜索</span>
		</div>
		<div class="info" v-show="infoShow">
			<p>已申请开发票5笔15000元，已开发票7笔8900元</p>
			<x-icon type="ios-close" size="30" @click="hideInfo"></x-icon>
		</div>
		<div class="tab">
			<div class="item" :class="{current: listShow === 1}" @click="listShow=1">
				未申请
			</div>|
			<div class="item" :class="{current: listShow === 2}" @click="listShow=2">
				已申请
			</div>
		</div>
		<div class="list">
			<div>
				<div class="item">
					<div class="first">
						<div class="title">
							<img src="../../../static/image/weigouxuan@2x.png" v-show="!checked1" @click="checked1=!checked1;" />
							<img src="../../../static/image/gouxuan@2x.png" v-show="checked1" @click="checked1=!checked1;" />
							<p>受票方：当前项目暂无售票方</p>
						</div>
						<p class="label">未开发票</p>
					</div>
					<p>项目名称：郎酒项目</p>
					<p class="detail">皖A12345，袁自林，13900000000</p>
					<p class="detail">安徽-合肥-高新区 至 四川-成都-金牛区</p>
				</div>
				<div class="item-footer">
					填写受票方
				</div>
			</div>
			<div>
				<div class="item">
					<div class="first">
						<div class="title">
							<img src="../../../static/image/weigouxuan@2x.png" v-show="!checked1" @click="checked1=!checked1;" />
							<img src="../../../static/image/gouxuan@2x.png" v-show="checked1" @click="checked1=!checked1;" />
							<p>受票方：当前项目暂无售票方</p>
						</div>
						<p class="label">未开发票</p>
					</div>
					<p>项目名称：郎酒项目</p>
					<p class="detail">皖A12345，袁自林，13900000000</p>
					<p class="detail">安徽-合肥-高新区 至 四川-成都-金牛区</p>
				</div>
			</div>
		</div>
		<div class="fixed">
			<p>已选择5笔，合计15000元</p>
			<span class="btn disabled">
				申请发票
			</span>
		</div>
		<!--<div class="fixed">
			<div>
				<img src="../../../static/image/weigouxuan@2x.png" v-show="!checked1" @click="checked1=!checked1;" />
				<img src="../../../static/image/gouxuan@2x.png" v-show="checked1" @click="checked1=!checked1;" />
				<span>全选</span>
			</div>	
			<span class="btn disabled">
				申请发票
			</span>
		</div>-->
		<div class="opcity-fixed">
			<p>含有无受方订单，请填写受票方订单</p>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	export default {
		data() {
			return {
				listShow: 1,
				checked1: false,
				infoShow: true
			}
		},
		components: {
			'v-header': Header
		},
		methods: {
			hideInfo() {
				this.infoShow = false
			}
		}
	}
</script>

<style lang="less">
	.invoice-manage-box {
		padding-top: 45px;
		.search {
			height: 46px;
			background-color: white;
			padding: 0 10px;
			display: flex;
			align-items: center;
			input {
				width: 0;
				height: 26px;
				flex: 1;
				border: none;
				outline: none;
				background: url(../../../static/image/search.png) 14px center no-repeat;
				background-size: 16px;
				background-color: #f4f4f4;
				border-radius: 6px;
				font-size: 14px;
				text-indent: 3em;
			}
			span {
				width: 45px;
				height: 46px;
				line-height: 46px;
				flex: 0 0 45px;
				font-size: 16px;
				display: block;
				text-align: center;
				color: #686868;
			}
		}
		.info {
			/*height: 35px;*/
			background-color: #e7e7e7;
			font-size: 14px;
			color: #666666;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 15px;
			.vux-x-icon {
				fill: #9a9a9a;
			}
		}
		.tab {
			width: 100%;
			height: 40px;
			background-color: white;
			display: flex;
			color: #999999;
			line-height: 40px;
			.item {
				width: 0;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 14px;
				color: #646464;
			}
			.current {
				color: #63bffe;
			}
		}
		.list {
			margin: 0 10px;
			.item {
				margin-top: 10px;
				padding: 15px;
				background-color: white;
				.first {
					display: flex;
					justify-content: space-between;
					.title {
						display: flex;
						img {
							width: 20px;
							height: 20px;
						}
						p {
							font-size: 14px;
							margin-left: 10px;
						}
					}
					.label {
						font-size: 14px;
						color: #63bffe;
					}
				}
				p {
					font-size: 14px;
					margin-left: 30px;
				}
				.detail {
					color: #696969;
				}
			}
			.item-footer {
				height: 32px;
				margin-top: 2px;
				background-color: white;
				font-size: 14px;
				color: #999999;
				text-align: center;
				line-height: 32px;
			}
		}
		.fixed {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			height: 40px;
			background-color: white;
			padding: 0 24px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			p {
				font-size: 14px;
				color: #666666;
				line-height: 40px;
				margin-left: 10px;
			}
			.btn {
				width: 80px;
				height: 30px;
				background-color: #63bffe;
				display: block;
				color: white;		
				border-radius: 10px;
				text-align: center;
				line-height: 30px;
				font-size: 14px;
			}
			.disabled {
				color: white;
				background-color: #999999;
			}
			img {
				width: 16px;
				height: 16px;
			}
		}
		.opcity-fixed {
			width: 100%;
			height: 50px;
			background-color: rgba(40,40,40,0.6);
			position: fixed;
			left: 0;
			bottom: 0;
			color: white;
			text-align: center;
			line-height: 50px;
			display: none;
		}
	}
</style>