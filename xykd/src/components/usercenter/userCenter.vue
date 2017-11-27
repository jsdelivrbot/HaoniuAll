<template>
	<section class="usercenter-box">
		<div class="userinfo_box">
			<div class="user_avatar">
				<img src="./img/touxiang@3x.png" />
			</div>
			<div class="detail_info">
				<h2 class="name">
					俞强
				</h2>
				<p>182****1147</p>
			</div>

			<div class="right_top_box">
				<span>
					<img src="./img/shezhi@3x.png"/>
				</span>
				<router-link tag='span' to='/Record'>
					<img src="./img/jie@3x.png" />
				</router-link>
				<!--<span>
					<img src="./img/jie@3x.png"/>
				</span>-->
			</div>
		</div>

		<div class="money_info">
			<div class="money_info_children">
				<div>
					<p>当前可借</p>
					<h2>50000</h2>
				</div>
				<div>
					<p>总额度限</p>
					<h2>8000</h2>
				</div>
			</div>
		</div>

		<ul class="list_box">
			<li>
				<div class="top">待还</div>
				<div class="bottom">
					<h2>暂无待还借款</h2>
					<i class="left_icon"></i>
				</div>
			</li>
			<li>
				<div class="top">待还</div>
				<div class="bottom">
					<h2>暂无待还借款</h2>
					<i class="left_icon"></i>
				</div>
			</li>
			<li>
				<div class="top">待还</div>
				<div class="bottom">
					<h2>暂无待还借款</h2>
					<i class="left_icon"></i>
				</div>
			</li>
			<li>
				<div class="top">待还</div>
				<div class="bottom">
					<h2>暂无待还借款</h2>
					<i class="left_icon"></i>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
	export default {}
</script>
<style lang="less">
	.usercenter-box {
		background: #f7f7f7;
		padding-bottom: 52px;
		box-sizing: border-box;
		.list_box {
			height: auto;
			overflow: hidden;
			padding: 10px 20px;
			box-sizing: border-box;
			li {
				background: #fff;
				height: 80px;
				padding: 15px;
				line-height: 25px;
				box-sizing: border-box;
				border-radius: 3px;
				margin-bottom: 10px;
				.top {
					color: #bdbdbd;
					font-size: 12px;
				}
				.bottom {
					display: flex;
					h2 {
						flex: 1;
						color: #4a4a4a;
						font-size: 13px;
					}
					i {
						width: 25px;
						height: 25px;
						background: url(img/iconright1@3x.png) no-repeat center;
						background-size: 9px auto;
					}
				}
			}
		}
		.userinfo_box {
			width: 100%;
			height: 170px;
			padding: 50px 20px 20px 20px;
			box-sizing: border-box;
			background: url(img/bj@3x.png) center;
			display: flex;
			background-size: 100% auto;
			position: relative;
			.right_top_box {
				position: absolute;
				top: 20px;
				right: 20px;
				display: flex;
				span {
					margin-left: 25px;
					flex: 1;
					img {
						display: block;
						height: 24px;
					}
				}
			}
			.user_avatar {
				width: 90px;
				img {
					display: block;
					width: 90px;
				}
			}
			.detail_info {
				margin-left: 9px;
				flex: 1;
				font-size: 18px;
				color: #f2f2f2;
				h2 {
					margin-top: 12px;
					font-size: inherit;
					font-weight: normal;
					line-height: 36px;
					text-indent: 20px;
				}
			}
		}
		.money_info {
			background: #fff;
			padding: 16px 40px;
			.money_info_children {
				width: 100%;
				background: #DBB76C;
				height: 135px;
				padding: 35px 0;
				box-sizing: border-box;
				text-align: center;
				border-radius: 5px;
				display: flex;
				div:first-child {
					border-right: 1px solid #fff;
				}
				div {
					flex: 1;
					color: #fff;
					font-size: 16px;
					p {
						line-height: 32px;
					}
					h2 {
						font-size: 18px;
						font-weight: normal;
						line-height: 33px;
					}
				}
			}
		}
	}
</style>