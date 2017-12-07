<template>
	<section class="authentication-box">
		<v-header title="认证中心"></v-header>
		<!--<ul class="time_line">
			<li :class="{'active':authenticationStatus==0}">
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
		</ul>-->

		<ul class="time_line" v-if='stepStatus<=0'>
			<li v-for="(item,index) in step" v-if="index<=2" :class="{'active':(authenticationStatus+1)>=index}">
				<div class="round_box">
					{{index+1}}
				</div>
				<span>{{item.name}}</span>
			</li>
		</ul>

		<ul class="time_line" v-if='stepStatus>0'>
			<li v-for="(item,index) in step" v-if="index>2" :class="{'active':(authenticationStatus+1)>=index}">
				<div class="round_box">
					{{index+1}}
				</div>
				<span>{{item.name}}</span>
			</li>
		</ul>

		<div class="tips_bar">
			温馨提示:请填写真实有效信息以获得更高信用额度
		</div>

		<ul class="select_box vux-1px-tb" v-if='stepStatus<=0'>
			<li class="vux-1px-b" @click="toAuthentication(0)">
				<div class="left_icon">
					<img src="./img/shenfenyanzheng@3x.png" />
				</div>
				<div class="center_info">
					<h2>芝麻授权</h2>
					<p>*最高增加2000元</p>
				</div>
				<div class="right_icon">
					<span v-if='authenticationStatus>=0'>认证中</span>
					<span v-else>未认证</span>
					<div>
						<img src="./img/zuola@3x.png" />
					</div>
				</div>
			</li>
			<li class="vux-1px-b" @click="toAuthentication(1)">
				<div class="left_icon">
					<img src="./img/zhimaxinyong@3x.png" />
				</div>
				<div class="center_info">
					<h2>人脸识别</h2>
					<p>*最高增加2000元</p>
				</div>
				<div class="right_icon">
					<span v-if='authenticationStatus>=1'>认证中</span>
					<span v-else>未认证</span>
					<div>
						<img src="./img/zuola@3x.png" />
					</div>
				</div>
			</li>

			<li class="vux-1px-b" @click="toAuthentication(2)">
				<div class="left_icon">
					<img src="./img/shenfenyanzheng@3x.png" />
				</div>
				<div class="center_info">
					<h2>手机号认证</h2>
					<p>*最高增加2000元</p>
				</div>
				<div class="right_icon">
					<span v-if='authenticationStatus>=2'>认证中</span>
					<span v-else>未认证</span>
					<div>
						<img src="./img/zuola@3x.png" />
					</div>
				</div>
			</li>
		</ul>

		<ul class="select_box vux-1px-tb" v-if='stepStatus>0'>
			<li class="vux-1px-b" @click="toAuthentication(3)">
				<div class="left_icon">
					<img src="./img/zhimaxinyong@3x.png" />
				</div>
				<div class="center_info">
					<h2>紧急联系人认证</h2>
					<p>*最高增加2000元</p>
				</div>
				<div class="right_icon">
					<span v-if='authenticationStatus>=3'>认证中</span>
					<span v-else>未认证</span>
					<div>
						<img src="./img/zuola@3x.png" />
					</div>
				</div>
			</li>
			<li class="vux-1px-b" @click="toAuthentication(4)">
				<div class="left_icon">
					<img src="./img/bangdingyinhangka@3x.png" />
				</div>
				<div class="center_info">
					<h2>绑定银行卡</h2>
					<p>*最高增加2000元</p>
				</div>
				<div class="right_icon">
					<span v-if='authenticationStatus>=4'>认证中</span>
					<span v-else>未认证</span>
					<div>
						<img src="./img/zuola@3x.png" />
					</div>
				</div>
			</li>
		</ul>

		<ul class="payment_box" v-if='stepStatus>0'>
			<li @click="selectpay=0">
				<i :class="{active:selectpay==0}"></i>
				<p>正常审核(2个工作日内完成审核)</p>
			</li>
			<li @click="selectpay=1">
				<i :class="{active:selectpay==1}"></i>
				<p>快速审核通道(20分钟内完成审核)需要支付20元快速审核费用</p>
			</li>
		</ul>

		<div class="global_btn_wrapper" v-if='stepStatus<=0'>
			<p class="btn active" v-if='authenticationStatus>=2' @click='nextStep'>下一步</p>
			<p class="btn" v-else>下一步</p>
		</div>
		<div class="global_btn_wrapper" v-else>
			<p class="btn active" v-if='authenticationStatus>2' @click='back'>完成</p>
			<p class="btn" v-else>完成</p>
		</div>

	</section>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		name: 'nokeep',
		components: {
			'v-header': Header
		},
		data() {
			return {
				authenticationStatus: 0,
				stepStatus: 0,
				selectpay: 0,
				step: [{
						name: '芝麻授权'
					},
					{
						name: '人脸识别'
					},
					{
						name: '手机号认证'
					},
					{
						name: '紧急联系人认证'
					},
					{
						name: '绑定银行卡'
					},
					{
						name: '认证完成'
					}
				],
				routerPath: [
					'/zhima',
					'/face',
					'/phone',
					'/emergency',
					'/bindBank'
				]
			}
		},
		mounted() {
			this.$http.post('api/certify/query').then(
				(res) => {
					if(res.data.result === 0) {
						this.authenticationStatus = res.data.obj.step
					}
					//					if(this.authenticationStatus >= 2) {
					//						this.nextStep()
					//					}
				}
			)
		},
		methods: {
			nextStep() {
				this.stepStatus = 1
			},
			back() {
				if(this.selectpay !== 0) {
					this.$router.push('/quick')
				} else {
					this.stepStatus = 0
					this.$router.replace('/borrowMoney')
				}
			},
			toAuthentication(id) {
				if(this.authenticationStatus < id) {
					if((id - 1) > this.authenticationStatus) {
						this.$vux.toast.text('请按顺序认证', 'middle')
					} else {
						this.$router.push(this.routerPath[id])
					}
				} else {
					this.$vux.toast.text('正在认证中', 'middle')
				}
			}
		},
		beforeRouteLeave(to, from, next) {
			if(to.path === '/borrowMoney') {
				if(this.stepStatus > 0) {
					this.stepStatus = 0
					next(false)
				} else {
					next()
				}
			} else {
				next()
			}
		}
	}
</script>
<style lang="less">
	.authentication-box {
		width: 100%;
		overflow: hidden;
		background: #fafafa;
		min-height: 100vh;
		padding-top: 48px;
		box-sizing: border-box;
		.payment_box {
			margin-top: 10px;
			padding: 0 10px;
			box-sizing: border-box;
			height: auto;
			overflow: hidden;
			li {
				display: flex;
				font-size: 12px;
				height: 40px;
				line-height: 40px;
				i {
					margin: 11px 0;
					width: 18px;
					height: 18px;
					background: url(./img/select1.png) no-repeat center;
					background-size: 100% 100%;
					margin-right: 5px;
				}
				.active {
					background-image: url(./img/select.png);
				}
			}
		}
		.select_box {
			background: #fff;
			height: auto;
			overflow: hidden;
			padding-left: 10px;
			box-sizing: border-box;
			>li {
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
				line-height: 26px;
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