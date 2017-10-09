<template>
	<div class="index-footer-box border-1px">
		<router-link to="/home" class="item home" tag="div" exact>
			<!--<div class="home"></div>-->
			<span class="text">首页</span>
		</router-link>
		<router-link to="/profit" class="item profit" tag="div">
			<!--<div class="profit"></div>-->
			<span class="text">我的收益</span>
		</router-link>
		<router-link to="/taskGuide" class="item" tag="div">
			<!--<div class="task"></div>-->
			<div class="task"></div>
			<span class="text">任务指南</span>
		</router-link>
		<router-link to="/shopping-mall" class="item commission" tag="div">
			<!--<div class="commission"></div>-->
			<span class="text">蜂购商城</span>
		</router-link>
		<router-link to="/usercenter" class="item user" tag="div">
			<!--<div class="user"></div>-->
			<span class="text">用户中心</span>
		</router-link>
	</div>
</template>

<script>
	export default {}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.index-footer-box {
		position: fixed;
		z-index: 2;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 49px;
		display: flex;
		background-color: white;
		.index-border-1px-top(#a5a5a5);
		.item {
			flex: 1;
			background-repeat: no-repeat;
			background-size: 22px 22px;
			background-position: center 6px;
			position: relative;
			.text {
				width: 100%;
				font-size: 12px;
				color: #656565;
				text-align: center;
				display: block;
				position: absolute;
				bottom: 0;
				z-index: 4;
			}
			.task {
				width: 56px;
				height: 56px;
				background-image: url(../../../static/index-task.png);
				background-repeat: no-repeat;
				background-position: center 6px;
				background-color: white;
				border-radius: 50%;
				border-top: 1px solid #a5a5a5;
				background-size: 38px 38px;
				position: relative;
				z-index: 3;
				top: -14px;
				margin: auto;
			}
		}
		.home {
			background-image: url(../../../static/index-home.png);
		}
		.profit {
			background-image: url(../../../static/index-profit.png);
		}
		.commission {
			background-image: url(../../../static/index-commission.png);
		}
		.user {
			background-image: url(../../../static/index-user.png);
		}
		.router-link-active.home {
			background-image: url(../../../static/index-home-active.png);
		}
		.router-link-active.profit {
			background-image: url(../../../static/index-profit-active.png);
		}
		.router-link-active.commission {
			background-image: url(../../../static/index-commission-active.png);
		}
		.router-link-active.user {
			background-image: url(../../../static/index-user-active.png);
		}
	}
</style>