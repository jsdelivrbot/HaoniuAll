<template>
	<div class="fukuan-box">
		<search-header></search-header>
		<div class="tab">
			<div class="item" :class="{current: listShow === 1}" @click="listShow = 1">
				运费申请
			</div>|
			<div class="item" :class="{current: listShow === 2}" @click="listShow = 2">
				运费审核
			</div>|
			<div class="item" :class="{current: listShow === 3}" @click="listShow = 3">
				运费支付
			</div>
		</div>
		<div class="list" v-show="listShow === 1">
			<div class="item">
				<div class="header">
					<span class="red">运费总额：35000.00</span>
					<span>未付：13000.00</span>
					<span>已付：35000.00</span>
				</div>
				<div class="content">
					<p>
						<span>运单号：123450-1</span>
						<span class="red">未支付</span>
					</p>
					<p>
						<span>建单时间：2017-09-09 12:23</span>
					</p>
					<p>
						<span>皖A12345，袁自林，13900000000</span>
					</p>
					<p>
						<span>安徽-合肥-高新区 至 四川-成都-金牛区</span>
					</p>
				</div>
				<div class="footer">
					<span class="vux-1px-r current">
						操作记录
					</span>
					<span class="vux-1px-r">
						修改运费
					</span>
					<span>
						运费申请
					</span>
				</div>
			</div>
			<div class="item">
				<div class="header">
					<span class="red">运费总额：35000.00</span>
					<span>未付：13000.00</span>
					<span>已付：35000.00</span>
				</div>
				<div class="content">
					<p>
						<span>运单号：123450-1</span>
						<span class="red">未支付</span>
					</p>
					<p>
						<span>建单时间：2017-09-09 12:23</span>
					</p>
					<p>
						<span>皖A12345，袁自林，13900000000</span>
					</p>
					<p>
						<span>安徽-合肥-高新区 至 四川-成都-金牛区</span>
					</p>
				</div>
				<div class="footer">
					<span class="vux-1px-r current">
						操作记录
					</span>
					<span class="vux-1px-r">
						修改运费
					</span>
					<span>
						运费申请
					</span>
				</div>
			</div>
		</div>
		<div class="list" v-show="listShow === 2">
			<div class="item">
				<div class="header">
					<span class="red">运费总额：35000.00</span>
					<span>未付：13000.00</span>
					<span>已付：35000.00</span>
				</div>
				<div class="content">
					<p>
						<span>运单号：123450-1</span>
						<span class="red">本次申请：10000.00元</span>
					</p>
					<p>
						<span>建单时间：2017-09-09 12:23</span>
					</p>
					<p>
						<span>皖A12345，袁自林，13900000000</span>
					</p>
					<p>
						<span>安徽-合肥-高新区 至 四川-成都-金牛区</span>
					</p>
				</div>
				<div class="footer">
					<span class="vux-1px-r current">
						操作记录
					</span>
					<span class="vux-1px-r">
						通过
					</span>
					<span>
						驳回
					</span>
				</div>
			</div>
		</div>
		<div class="list" v-show="listShow === 3">
			<div class="item">
				<div class="header">
					<span class="red">运费总额：35000.00</span>
					<span>未付：13000.00</span>
					<span>已付：35000.00</span>
				</div>
				<div class="content">
					<p>
						<span>运单号：123450-1</span>
						<span class="red">本次申请：10000.00元</span>
					</p>
					<p>
						<span>建单时间：2017-09-09 12:23</span>
					</p>
					<p>
						<span>皖A12345，袁自林，13900000000</span>
					</p>
					<p>
						<span>安徽-合肥-高新区 至 四川-成都-金牛区</span>
					</p>
				</div>
				<div class="footer">
					<span class="vux-1px-r current">
						操作记录
					</span>
					<span>
						付款
					</span>
				</div>
			</div>
			<div class="fixed">
				<div>
					<p>共计 <span class="red">35</span> 单未付款</p>
					<p>合计 <span class="red">56000.00</span> 元</p>
				</div>
				<div class="btn">运费账户管理</div>
			</div>
			<div class="fixed2">
				运单信息不完整，无法申请运费
			</div>
		</div>
	</div>
</template>

<script>
	import SearchHeader from '@/components/base/SearchHeader'
	export default {
		data() {
			return {
				listShow: 1
			}
		},
		components: {
			SearchHeader
		}
	}
</script>

<style lang="less">
	.fukuan-box {
		padding: 85px 0 64px;
		.tab {
			width: 100%;
			height: 40px;
			position: fixed;
			top: 45px;
			left: 0;
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
				&.current {
					color: #63bffe;
				}
			}
		}
		.list {
			.item {
				margin: 10px 10px 0;
				.header {
				 	color: #696969;
					background-color: white;
					padding: 10px 15px;
					font-size: 0;
					display: flex;
					justify-content: space-between;
					span {
						font-size: 12px;
						display: block;
						&.red {
							color: #ff423a;
						}
					}
				}
				.content {
					margin-top: 2px;
					padding: 15px;
					background-color: white;
					p {
						display: flex;
						justify-content: space-between;
						span {
							font-size: 14px;
							&.red {
								color: #ff423a;
							}
						}
					}
				}
				.footer {
					margin-top: 2px;
					background-color: white;
					display: flex;
					span {
						width: 0;
						flex: 1;
						text-align: center;
						font-size: 14px;
						color: #696969;
						padding: 4px 0;
					}
					.current {
						color: #63bffe;
					}
				}
			}
			.fixed {
				width: 100%;
				height: 64px;
				background-color: white;
				position: fixed;
				z-index: 2;
				left: 0;
				bottom: 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px 22px;
				box-sizing: border-box;
				div {
					p {
						color: #696969;
						font-size: 14px;
						span {
							&.red {
								color: #ff423a;
							}
						}
					}
					&.btn {
						height: 30px;
						line-height: 30px;
						background-color: #66bfff;
						border-radius: 6px;
						font-size: 14px;
						color: white;
						padding: 0 6px;
					}
				}
			}
			.fixed2 {
				height: 45px;
				line-height: 45px;
				text-align: center;
				color: white;
				background-color: rgba(40,40,40,0.4);
				width: 100%;
				font-size: 14px;
				position: fixed;
				left: 0;
				bottom: 0;
				z-index: 2;
				display: none;
			}
		}
	}
</style>