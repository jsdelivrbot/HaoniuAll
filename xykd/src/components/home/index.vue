<template>
	<section class="index-box">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<ul class="footer-box vux-1px-t">
			<router-link tag='li' to='/borrowMoney' replace>
				<div class="icon icon_jiekuan"></div>
				<span>借款</span>
			</router-link>
			<router-link tag='li' to='/userCenter' replace>
				<div class="icon icon_usercenter"></div>
				<span>我的</span>
			</router-link>
			<router-link tag='li' to='/more' replace>
				<div class="icon icon_more"></div>
				<span>更多</span>
			</router-link>
		</ul>
	</section>
</template>

<script>
	export default {}
</script>
<style lang="less">
	.index-box {
		min-height: 100vh;
	}
	
	.footer-box {
		width: 100%;
		height: 50px;
		position: fixed !important;
		bottom: 0;
		left: 0;
		display: flex;
		padding: 7px 0 3px 0;
		box-sizing: border-box;
		background: #fff;
		.router-link-exact-active {
			.icon_jiekuan {
				background-image: url(img/jiekuan2@3x.png);
			}
			.icon_usercenter {
				background-image: url(img/wode2@3x.png);
			}
			.icon_more {
				background-image: url(img/more2@3x.png);
			}
		}
		li {
			flex: 1;
			text-align: center;
			.icon {
				margin: auto;
				width: 20px;
				height: 20px;
				background-size: 100% 100%;
			}
			.icon_jiekuan {
				background-image: url(img/jiekuan1@3x.png);
			}
			.icon_usercenter {
				background-image: url(img/wode1@3x.png);
			}
			.icon_more {
				background-image: url(img/more1@3x.png);
			}
			span {
				display: block;
				text-align: center;
				color: #dbb76c;
				font-size: 10px;
				line-height: 20px;
			}
		}
	}
</style>