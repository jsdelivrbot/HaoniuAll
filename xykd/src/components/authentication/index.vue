<template>
	<section class="authentication-box">
		<v-header title="认证中心"></v-header>
		<ul class="time_line">
			<li class="active">
				<div class="round_box">
					1
				</div>
				<span>实名认证</span>
			</li>
			<li>
				<div class="round_box">
					2
				</div>
				<span>详细资料</span>
			</li>
			<li>
				<div class="round_box">
					3
				</div>
				<span>征信资料</span>
			</li>
		</ul>

		<div class="tips_bar">
			温馨提示:请填写真实有效信息以获得更高信用额度
		</div>

		<ul class="select_box vux-1px-tb">
			<li class="vux-1px-b">
				<div class="left_icon">
					<img src="./img/shenfenyanzheng@3x.png" />
				</div>
				<div class="center_info">
					<h2>身份信息</h2>
					<p>*最高增加2000元</p>
				</div>
				<div class="right_icon">
					<span>待认证</span>
					<div>
						<img src="./img/zuola@3x.png" />
					</div>
				</div>
			</li>
			<li class="vux-1px-b">
				<div class="left_icon">
					<img src="./img/zhimaxinyong@3x.png" />
				</div>
				<div class="center_info">
					<h2>身份信息</h2>
					<p>*最高增加2000元</p>
				</div>
				<div class="right_icon">
					<span>待认证</span>
					<div>
						<img src="./img/zuola@3x.png" />
					</div>
				</div>
			</li>
			<li>
				<div class="left_icon">
					<img src="./img/bangdingyinhangka@3x.png" />
				</div>
				<div class="center_info">
					<h2>身份信息</h2>
					<p>*最高增加2000元</p>
				</div>
				<div class="right_icon">
					<span>待认证</span>
					<div>
						<img src="./img/zuola@3x.png" />
					</div>
				</div>
			</li>
		</ul>
		
		<div class="default_button">
			下一步
		</div>
		<!--<h1>认证首页</h1>-->
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		components: {
			'v-header': Header
		},
		methods: {}
	}
</script>
<style lang="less">
	.default_button{
		margin:30px auto;
		width: 95%;
		height: 45px;
		font-size: 18px;
		color: #fff;
		background: #dbb76c;
		border-radius:22px ;
		text-align: center;
		line-height: 45px;
	}
	
	.authentication-box {
		width: 100%;
		overflow: hidden;
		background: #fafafa;
		min-height: 100vh;
		padding-top: 48px;
		box-sizing: border-box;
		
		.select_box {
			background: #fff;
			height: auto;
			overflow: hidden;
			padding-left: 10px;
			box-sizing: border-box;
			li {
				display: flex;
				height: 75px;
				padding: 15px 0;
				box-sizing: border-box;
				.left_icon {
					margin-right: 15px;
					width: 45px;
					img {
						display: block;
						width: 45px;
					}
				}
				.center_info {
					flex: 1;
					height: 45px;
					overflow: hidden;
					h2 {
						line-height: 25px;
						font-size: 14px;
						font-weight: normal;
					}
					p {
						line-height: 20px;
						font-size: 11px;
						color: #9b9b9b;
					}
				}
				.right_icon {
					display: flex;
					line-height: 45px;
					font-size: 11px;
					margin-right: 10px;
					color: #9B9B9B;
					span {
						margin-right: 10px;
					}
					img {
						width: 8px;
						vertical-align: middle;
					}
				}
			}
		}
		.time_line {
			background: #fff;
			padding: 15px 0px;
			box-sizing: border-box;
			display: flex;
			li {
				flex: 1;
				position: relative;
			}
			li:before {
				content: '';
				position: absolute;
				top: 18px;
				left: 75%;
				width: 50%;
				margin: auto;
				height: 1px;
				background: #D1D1D1;
			}
			.active {
				.round_box {
					background: #DBB76C;
				}
				.round_box:before {
					border-color: #DBB76C;
				}
				span {
					color: #DBB76C;
				}
			}
			li:last-child:before {
				background: #fff;
			}
			.round_box {
				margin: auto;
				width: 26px;
				height: 26px;
				background: #d1d1d1;
				border-radius: 50%;
				position: relative;
				margin: 5px auto;
				text-align: center;
				color: #fff;
			}
			.round_box:before {
				content: '';
				position: absolute;
				top: -5px;
				left: -5px;
				width: 36px;
				height: 36px;
				box-sizing: border-box;
				border: 1px solid #D1D1D1;
				border-radius: 50%;
			}
			span {
				margin-top: 8px;
				text-align: center;
				display: block;
				width: 100%;
				font-size: 12px;
			}
		}
		.tips_bar {
			text-align: center;
			padding: 10px 0;
			font-size: 12px;
			color: #282828;
			box-sizing: border-box;
		}
	}
</style>