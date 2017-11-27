<template>
	<div class="index-footer-box border-1px">
		<router-link replace to="/home" class="item home" tag="div" exact>
			<!--<div class="home"></div>-->
			<span class="text">首页</span>
		</router-link>

		<router-link replace to="/profit" class="item profit" tag="div" v-if="showAll === '1'">
			<!--<div class="profit"></div>-->
			<span class="text">我的收益</span>
		</router-link>

		<div class="item profit" v-if="showAll === '0'" @click="forward">
			<span class="text">购物车</span>
		</div>

		<router-link replace to="/taskGuide" class="item" tag="div" v-if="showAll === '1'">
			<!--<div class="task"></div>-->
			<div class="task"></div>
			<span class="text">任务指南</span>
		</router-link>

		<router-link to="/shopping-mall" class="item commission" tag="div">
			<span class="text">佣金商城</span>
		</router-link>

		<!--<router-link to="/Shopping" class="item commission" tag="div">
			<div class="commission"></div>
			<span class="text">佣金商城</span>
		</router-link>-->

		<router-link replace to="/usercenter" class="item user" tag="div">
			<!--<div class="user"></div>-->
			<span class="text">用户中心</span>
		</router-link>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showAll: sessionStorage.getItem('showAll')
			}
		},
		created() {
			//判断是否显示全部
			this.$http.get('getData/index.php?m=home&c=Form&a=showMenu', {
					params: {
						seachdata: {
							versions: '1.0101'
						}
					}
				})
				.then((res) => {
					//		console.log(res)
					if(res.data.result === 0) {
						sessionStorage.setItem('showAll', '0')
					} else {
						sessionStorage.setItem('showAll', '1')
					}
					this.showAll = sessionStorage.getItem('showAll')
				})
		},
		methods: {
			forward() {
				this.$router.push('/usercenter/ShoppingCar')
			}
		}
	}
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
				background-image: url(../../../static/usercenter/index-task.png);
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
			background-image: url(../../../static/usercenter/index-home.png);
		}
		.profit {
			background-image: url(../../../static/usercenter/index-profit.png);
		}
		.commission {
			background-image: url(../../../static/usercenter/index-commission.png);
		}
		.user {
			background-image: url(../../../static/usercenter/index-user.png);
		}
		.router-link-active.home {
			background-image: url(../../../static/usercenter/index-home-active.png);
		}
		.router-link-active.profit {
			background-image: url(../../../static/usercenter/index-profit-active.png);
		}
		.router-link-active.commission {
			background-image: url(../../../static/usercenter/index-commission-active.png);
		}
		.router-link-active.user {
			background-image: url(../../../static/usercenter/index-user-active.png);
		}
	}
</style>