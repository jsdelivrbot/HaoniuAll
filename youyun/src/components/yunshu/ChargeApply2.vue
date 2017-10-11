<template>
	<div class="charge-apply2-box">
		<v-header title="运费申请"></v-header>
		<div class="item">
			<p>运单号：123450-1</p>
			<p>建单时间：2017-9-9 12:34</p>
			<p>项目名称：金六福项目</p>
			<p>机械设备,35.0吨</p>
			<p>安徽-合肥-高新区 至 四川-成都-金牛区</p>
		</div>
		<div class="item">
			<p>皖A12345,袁自林,13900000000</p>
			<p>高栏平板，17.5米</p>
			<p>定位时间：2017-10-10 13:09</p>
			<p>当前位置：安徽省合肥市高新区创新2700号</p>
		</div>
		<div class="footer">
			<span class="vux-1px-r">
				<img src="../../../static/image/jingquedingwei@2x.png" width="13px" height="16px" />
				精确定位
			</span>
			<span>
				<img src="../../../static/image/lishiguiji@2x.png" width="16px" height="16px" />
				历史轨迹
			</span>
		</div>
		<div class="item">
			<p>发货时间：2017-9-9 12:23<span class="label">已签收</span></p>
			<p>预计到货时间：2017-9-9 12:23</p>
			<p>实际到货时间：2017-9-9 12:23<span class="label2">查看签收详情</span></p>
		</div>
		<div class="btn">
			<span class="btn1">付款</span>
			<span class="btn2">反驳</span>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Rater } from 'vux'
	export default {
		components: {
			'v-header': Header,
			Rater
		}
	}
</script>

<style lang="less">
	.charge-apply2-box {
		padding-top: 45px;
		.item {
			margin: 10px 10px 0;
			padding: 15px;
			background-color: white;
			font-size: 14px;
			p {
				.label {
					color: #60befb;
					float: right;
					font-size: 16px;
				}
				.label2 {
					font-size: 14px;
					text-decoration: underline;
					float: right;
					color: #60befb;
				}
			}
			.rater {
				display: flex;
				flex-direction: column;
				align-items: center;
				p {
					color: #fcad6b;
					font-size: 14px;
					margin-top: 16px;
				}
			}
		}
		.onRoad {
			p {
				.label {
					color: #f64440;
					float: right;
					font-size: 16px;
				}
			}
		}
		.footer-on-road {
			height: 30px;
			background-color: white;
			margin: 0 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			.red {
				color: red;
			}
		}
		.footer {
			display: flex;
			align-items: center;
			background-color: white;
			height: 30px;
			margin: 2px 10px;
			span {
				width: 0;
				flex: 1;
				font-size: 14px;
				color: #656565;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					margin-right: 6px;
				}
			}
		}
		.btn {
			display: flex;
			justify-content: space-around;
			margin: 20px 0;
			.btn1 {
				width: 36%;
				height: 36px;
				background-color: #63bffe;
				text-align: center;
				line-height: 36px;
				color: white;
				border-radius: 18px;
			}
			.btn2 {
				width: 36%;
				height: 36px;
				background-color: #999999;
				text-align: center;
				line-height: 36px;
				color: white;
				border-radius: 18px;
			}
		}
		.master {
			position: fixed;
			z-index: 3;
			width: 100%;
			height: 100vh;
			top: 0;
			left: 0;
			background-color: rgba(40,40,40,0.4);
			display: flex;
			justify-content: center;
			align-items: center;
			.content {
				width: 320px;
				background-color: white;
				border-radius: 10px;
				padding: 30px 0;
				position: relative;
				p {
					font-size: 14px;
					text-align: center;
					color: #666666;
					margin-top: 10px;
				}
				.rater {
					display: flex;
					justify-content: center;
				}
				textarea {
					width: 240px;
					min-height: 80px;
					display: block;
					margin: 10px auto;
					font-size: 14px;
				}
				.content-btn {
					width: 92px;
					height: 30px;
					background-color: #ffce4e;
					color: white;
					text-align: center;
					line-height: 30px;
					border-radius: 15px;
					font-size: 14px;
					margin: 0 auto;
				}
				svg {
					position: absolute;
					top: 4px;
					right: 4px;
				}
				.vux-x-icon {
				  fill: #9b9b9b;
				}
			}
		}
	}
</style>