<template>
	<div class="change-psd-box">
		<div class="title">
			<div class="back" @click="back">
				<span class="iconfont icon-fanhui"></span>
			</div>
			<p class="title-text">重置密码</p>
		</div>
		<div class="content">
			<div class="input-group">
				<div class="item">
					<div class="input">
						<span class="label">验证码：</span>
						<input type="text" placeholder="请填写验证码" v-model="code" />
						<span class="getcode" @click="getCode">
							发送验证码
							<span v-show="count > 0">({{count}})</span>
						</span>
					</div>
				</div>
				<div class="item">
					<div class="input">
						<span class="label">密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
						<input type="password" placeholder="6-16位，字母区分大小写" v-model="psw" />
					</div>
				</div>
				<div class="item">
					<div class="input">
						<span class="label">确&nbsp;&nbsp;&nbsp;&nbsp;认：</span>
						<input type="password" placeholder="再输入一次密码" v-model="pswAgin" />
					</div>
				</div>
			</div>
		</div>
		<div class="btn" @click="change">
			<p>确&nbsp;&nbsp;&nbsp;&nbsp;定</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				psw: '',
				pswAgin: '',
				count: -1,
				mobile: localStorage.getItem('mobile')
			}
		},
		watch: {
			count: function() {
				if(this.count === 60) {
					var timer = setInterval(this.countChange, 1000)
				}
				if(this.count < 0) {
					clearInterval(this.timer)
				}
			}
		},
		methods: {
			countChange() {
				this.count = this.count - 1
			},
			back() {
				this.$router.back(-1)
			},
			getCode() {
				if(this.count > 0) {
					this.$vux.toast.show({
						text: '请60秒以后再试',
						type: 'text',
						time: 1000
					})
					return
				}
				this.$http.get('getData/index.php?m=home&c=Form&a=usercenter_SendCode', {
					params: {
						seachdata: {
							username: this.mobile
						}
					}
				})
					.then((res) => {
						if(res.data.result === 1) {
							this.count = 60
							this.$vux.toast.show({
								text: '发送成功',
								type: 'success',
								time: 1000
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: res.data.message
							})
						}
					})
			},
			change() {
				if(this.code === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入验证码'
					})
					return
				}
				if(this.psw.length < 6 || this.psw.length > 16) {
					this.$vux.alert.show({
						title: '提示',
						content: '密码需要在6-16位之间'
					})
					return
				}
				if(this.pswAgin === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入确认密码'
					})
					return
				}
				if(this.pswAgin !== this.psw) {
					this.$vux.alert.show({
						title: '提示',
						content: '两次密码输入不一致'
					})
					return
				}
				this.$http.get('getData/index.php?m=home&c=Form&a=usercenter_ChangePwd', {
						params: {
							seachdata: {
								'sendcode': this.code,
								'password': this.psw
							}
						}
					})
					.then((res) => {
						let $this = this
						if(res.data.result === 1 && !res.data.data && res.data.datastatus === 1) {
							this.$vux.alert.show({
								title: '提示',
								content: '密码重置成功',
								time: 1000,
								onHide() {
									sessionStorage.removeItem('token')
									$this.$router.replace('/login')
								}
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: res.data.message
							})
						}
						console.log(res)
					})
			}
		}
	}
</script>

<style lang="less">
	@rem: 40rem;
	.change-psd-box {
		width: 100%;
		min-height: 100vh;
		background: linear-gradient(#f39500, #e60112);
		.title {
			position: relative;
			width: 100%;
			height: 88/@rem;
			.back {
				width: 88/@rem;
				height: 88/@rem;
				text-align: center;
				color: white;
				line-height: 88/@rem;
				padding-left: 12px;
				position: absolute;
				span {
					font-size: 44/@rem;
					font-weight: bolder;
				}
			}
			.title-text {
				font-size: 34/@rem;
				color: white;
				text-align: center;
				line-height: 88/@rem;
			}
		}
		.content {
			margin-top: 180/@rem;
			display: flex;
			justify-content: center;
			.input-group {
				width: 550/@rem;
				.item {
					overflow: hidden;
					height: 100/@rem;
					box-sizing: border-box;
					border-bottom: 2px solid white;
					.input {
						height: 48/@rem;
						margin-top: 36/@rem;
						display: flex;
						line-height: 48/@rem;
						.label {
							font-size: 28/@rem;
							color: white;
							display: inline-block;
							flex: 0 0 auto;
						}
						input {
							border: none;
							background: none;
							outline: none;
							font-size: 28/@rem;
							color: white;
							height: 48/@rem;
							margin-left: 20/@rem;
							flex: 1;
							width: 0;
							&::placeholder {
								color: white;
							}
							/*text-align: center;*/
						}
						.getcode {
							font-size: 12px;
							color: white;
							flex: 0 0 auto;
							box-shadow: 0 2px 2px white inset, 0 2px 2px rgba(0, 0, 0, 0.4);
							border-radius: 48/@rem;
							width: 200/@rem;
							height: 48/@rem;
							line-height: 48/@rem;
							text-align: center;
						}
					}
				}
			}
		}
		.btn {
			width: 550/@rem;
			height: 88/@rem;
			border-radius: 48/@rem;
			margin: 100/@rem auto 0;
			box-shadow: 0 2px 2px white inset, 0 2px 2px rgba(0, 0, 0, 0.4);
			p {
				text-align: center;
				color: white;
				line-height: 88/@rem;
				font-size: 32/@rem;
			}
		}
	}
</style>