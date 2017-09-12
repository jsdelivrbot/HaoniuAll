<template>
	<div class="login-box">
		<div>
			<div class="left">
				<span><em>账号:</em> <input type="text" v-model='username'/></span>
				<span><em>密码:</em><input type="password" v-model='passwords'  /></span>
			</div>
			<div class="right" @click='login'>
				<img src="../../static/img/loginbtn.png" />
			</div>
			<toast v-model="show" type="text" is-show-mask :text="msg"></toast>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vux'
	export default {
		components: {
			Toast
		},
		data() {
			return {
				enhttp: localStorage.getItem('htppurl'),
				username: '13966733092',
				passwords: '123456',
				show: false,
				msg: ''
			}
		},
		mounted() {
			localStorage.removeItem('id')
		},
		methods: {
			login() {
				let $this = this
				this.$http.get(this.enhttp + '/trees/mobile/user/appLogin?userPhone=' + this.username + '&userPassword=' + this.passwords).then(
					(res) => {
						if(!res.data.success) {
							$this.show = true
							$this.msg = res.data.message
							console.log(res.data)
						} else {
							$this.show = true
							$this.msg = res.data.message
							localStorage.setItem('id', res.data.data)
							this.$router.push('/index')
						}
					},
					(res) => {
						alert('请检查您的网络!')
					}
				)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	body {
		height: 56.25vw;
		background: url(../../static/img/colorbar.png);
	}
	
	.login-box {
		height: 100%;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		background: url(../../static/img/loginbg.jpg);
		background-size: 100% 100%;
		align-items: center;
		>div {
			width: 443px;
			height: 188px;
			background: #000;
			background: rgba(255, 255, 255, 0.5);
			border-radius: 5px;
			border: 1px solid #93724f;
			box-sizing: border-box;
			position: relative;
			padding: 45px 30px;
			box-sizing: border-box;
			.left {
				width: 250px;
				overflow: hidden;
				float: left;
				span {
					display: block;
					width: 100%;
					height: 40px;
					overflow: hidden;
					border: 1px solid #9f9983;
					box-sizing: border-box;
					padding: 0;
					display: flex;
					display: -webkit-flex;
					border-radius: 5px;
					margin-bottom: 20px;
					background: rgba(255, 255, 255, 0.5);
					background: #fff;
					em {
						width: 50px;
						height: 40px;
						line-height: 38px;
						font-size: 13px;
						font-style: normal;
						text-align: center;
						color: #797979;
					}
				}
				input {
					width: 100%;
					height: 100%;
					margin: 0;
					background: none;
					outline: none;
					font-size: 14px;
					color: #3c3c3c;
					line-height: 40px;
				}
			}
			.right {
				width: 107px;
				height: 105px;
				float: right;
				overflow: hidden;
				img {
					width: 100%;
				}
			}
		}
		>div:before {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			top: -50px;
			width: 250px;
			height: 90px;
			background: url(../../static/img/liuse.png) no-repeat center;
			background-size: 100% auto;
		}
	}
	
	.body {
		width: 100%;
		height: 100%;
		background: url(../../static/img/bg.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.cart {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		top: 0.9rem;
		width: 10rem;
		text-align: center;
		display: flex;
		display: -webkit-flex;
		span {
			flex: 1;
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			img {
				max-width: 100%;
			}
		}
	}
	
	.userinfo-box {
		width: 100%;
		height: 1.2rem;
		overflow: hidden;
		padding: 0 10px;
		box-sizing: border-box;
		position: absolute;
		top: 10px;
		.left {
			width: 4rem;
			height: 1.2rem;
			background: rgba(255, 255, 255, 0.45);
			border-radius: 0.6rem;
			position: relative;
			z-index: 1;
			padding: 0.1rem;
			box-sizing: border-box;
			display: flex;
			display: -webkit-flex;
			float: left;
			.head-img {
				display: inline-block;
				float: left;
				width: 1rem;
				height: 1rem;
				border-radius: 50%;
				overflow: hidden;
				border: 2px solid #000200;
				box-sizing: border-box;
				background: #fff;
				margin-right: 10px;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			div {
				flex: 1;
				overflow: hidden;
				h3 {
					font-size: 15px;
					line-height: 0.6rem;
					color: #f8673a;
				}
				p {
					font-size: 12px;
					color: #ead323;
					line-height: 0.4rem;
					em {
						font-style: normal;
					}
				}
			}
		}
		.right {
			width: 5rem;
			height: 1.2rem;
			float: right;
			background: rgba(255, 255, 255, 0.45);
			position: relative;
			z-index: 1;
			border-radius: 0.6rem;
			padding: 0.1rem;
			box-sizing: border-box;
			ul {
				display: flex;
				display: -webkit-flex;
				margin: 0;
				li {
					flex: 1;
					a {
						width: 100%;
						display: block;
						text-align: center;
						img {
							margin: auto;
							display: block;
							height: 1rem;
						}
					}
				}
			}
		}
	}
	
	.left-nav {
		width: 2.578313rem;
		height: auto;
		position: absolute;
		top: 2.168674rem;
		left: 10px;
		z-index: 1;
		li {
			width: 100%;
			height: 0.843373rem;
			padding: 0;
			overflow: hidden;
			margin-bottom: 0.240963rem;
			img {
				width: 100%;
				height: 100%;
				float: left;
			}
		}
	}
	
	.chenbowen {
		.weui-dialog {
			max-width: 200px !important;
		}
		.weui-dialog__hd {
			padding: 0 !important;
		}
		.weui-dialog__bd {
			padding: 0 !important;
			min-height: 20px !important;
		}
	}
	
	.right-nav {
		width: 2.5rem;
		height: auto;
		position: absolute;
		top: 1.5rem;
		right: 10px;
		li {
			width: 100%;
			height: 1rem;
			padding: 0;
			img {
				width: 100%;
			}
		}
		span {
			display: block;
			margin-top: 0.722891rem;
			em {
				display: block;
				width: 0.963855rem;
				height: 0.963855rem;
				margin: auto;
				background: rgba(255, 255, 255, 0.5);
				border-radius: 50%;
				padding: 0.120481rem;
				box-sizing: border-box;
			}
			img {
				width: 100%;
				float: left;
			}
			.rotate {
				-webkit-animation: rotating 2s linear infinite;
				-moz-animation: rotating 2s linear infinite;
				-o-animation: rotating 2s linear infinite;
				animation: rotating 2s linear infinite
			}
			@keyframes rotating {
				from {
					transform: rotate(0)
				}
				to {
					transform: rotate(360deg)
				}
			}
		}
	}
	
	.cropland-box {
		width: 100%;
		height: 4.6rem;
		position: relative;
		top: 4.3rem;
		padding: 0 3rem;
		box-sizing: border-box;
		ul {
			width: 10rem !important;
		}
		ul li {
			width: 1.5rem;
			height: 1.45rem;
			margin: 0 0.25rem;
			box-sizing: border-box;
			background-size: 100% auto !important;
			float: left;
			img {
				width: 140%;
				position: relative;
				top: -70%;
				left: -15%;
			}
			.span {
				display: block;
				width: 140%;
				height: 140%;
				position: relative;
				z-index: 999;
				top: -80%;
				left: -20%;
			}
			span {
				display: block;
				width: 100%;
				height: 100%;
				position: relative;
			}
			.shu:before {
				position: absolute;
				z-index: 1;
				content: '';
				width: 130%;
				height: 130%;
				top: -75%;
				left: -20%;
				background: url(../../static/img/shgs.png) no-repeat;
				background-size: 100%;
			}
			.shouhu:before {
				position: absolute;
				content: '';
				width: 130%;
				height: 130%;
				top: -75%;
				left: -20%;
				background: url(../../static/img/gs.png) no-repeat;
				background-size: 100%;
			}
			.wu {}
		}
		.ul-hong {
			width: 100%;
			height: 1.45rem;
			li {
				background: url(../../static/img/hong.png) no-repeat;
			}
		}
		.ul-hei {
			width: 100%;
			height: 1.45rem;
			li {
				background: url(../../static/img/hei.png) no-repeat;
			}
		}
		.ul-huang {
			width: 100%;
			height: 1.45rem;
			li {
				background: url(../../static/img/huang.png) no-repeat;
			}
		}
	}
</style>