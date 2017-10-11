<template>
	<div class="pub-box">
		<el-row class='pub-hader-box'>
			<el-col :span='4' class='logo'>
				PIChina
			</el-col>

			<el-col :span='2' :offset='14' class='user'>
				陈博文
			</el-col>
			<el-col :span='2'>
				<div class="set">
					设置
					<i class="el-icon-setting"></i>
				</div>
			</el-col>

			<el-col :span='2'>
				<div class='out' @click="out">
					退出
				</div>
			</el-col>
		</el-row>

		<div class="pub-content-box">
			<div class="pub-left-box">
				<el-menu default-active="0" class="el-menu-vertical">
					<el-menu-item :index='toNum(index)' v-for='(item,index) in 10'>
						<i class="el-icon-menu"></i>
						<span slot="title">导航{{item}}</span>
					</el-menu-item>
				</el-menu>
			</div>
			<div style='overflow: auto; max-height: calc(100vh - 80px); width: calc(100% - 300px);'>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		methods: {
			toNum(index) {
				return index.toString()
			},
			out() {
				sessionStorage.clear()
				this.$router.replace('/login')
			}
		}
	}
</script>
<style lang="less">
	.pub-box {
		height: auto;
		overflow: hidden;
		.pub-hader-box {
			height: 80px;
			line-height: 80px;
			background: #b3c0d1;
			background: #545c64;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			color: #fff;
			
			.logo {
				text-indent: 24px;
				font-weight: 600;
				font-size: 22px;
				color: #fff;
				letter-spacing: 2px;
			}
			.user {
				text-align: center;
				font-size: 18px;
			}
			.set {
				background: #a8a8a8;
				background: #f90;
				text-align: center;
				cursor: pointer;
			}
			.out {
				background: #42B983;
				background: #db3652;
				text-align: center;
				cursor: pointer;
			}
		}
		
		.pub-content-box{
			height: 100vh;
			overflow: hidden;
			padding-top: 80px;
			box-sizing: border-box;
			display: flex;
		}
		
		.pub-left-box {
			width: 300px;
			height: 100%;
			.el-menu-vertical {
				height: 100%;
			}
		}
	}
</style>