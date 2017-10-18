<template>
	<div class="interaction-sign-up-box">
		<v-header title="填写报名信息"></v-header>
		<div class="info-box">
			<div class="username vux-1px-b">
				<span class="name">姓名：</span>
				<input type="text" class="value" v-model="username" />
			</div>
			<div class="tel vux-1px-b">
				<span class="name">联系电话：</span>
				<input type="text" class="value" v-model="phone" />
			</div>
			<div class="choose">
				<div class="title">
					<span class="category">选择票种</span>
					<span class="count">选择数量</span>
				</div>
				<div class="content">
					<div class="item">
						<span class="price">成人票：￥{{adultPrice}}</span>
						<div class="count">
							<span class="subtract" @click="subtractadult">-</span>
							<span class="now">{{adult}}</span>
							<span class="add" @click="adult = adult + 1">+</span>
						</div>
					</div>
					<div class="item">
						<span class="price">儿童票：￥{{childrenPrice}}</span>
						<div class="count">
							<span class="subtract" @click="subtractchildren">-</span>
							<span class="now">{{children}}</span>
							<span class="add" @click="children = children + 1">+</span>
						</div>
					</div>
					<div class="item">
						<span class="price">免费票：￥{{freePrice}}</span>
						<div class="count">
							<span class="subtract" @click="subtractfree">-</span>
							<span class="now">{{free}}</span>
							<span class="add" @click="free = free + 1">+</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="btn" @click="goSignUp">
			确定
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	export default {
		name: 'InteractionSignUp',
		components: {
			'v-header': Header
		},
		data() {
			return {
				adult: 0,
				children: 0,
				free: 0,
				username: '',
				phone: ''
			}
		},
		computed: {
			adultPrice() {
				return 100 * this.adult
			},
			childrenPrice() {
				return 50 * this.children
			},
			freePrice() {
				return 0 * this.free
			}
		},
		methods: {
			subtractadult() {
				if(this.adult === 0) {
					return
				} else {
					this.adult = this.adult - 1
				}
			},
			subtractchildren() {
				if(this.children === 0) {
					return
				} else {
					this.children = this.children - 1
				}
			},
			subtractfree() {
				if(this.free === 0) {
					return
				} else {
					this.free = this.free - 1
				}
			},
			goSignUp() {
				//				console.log(this.username)
				//				console.log(this.phone)
				if(this.username === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请填写姓名'
					})
					return
				}
				if(this.phone.length !== 11) {
					this.$vux.alert.show({
						title: '提示',
						content: '请填写正确的手机号码'
					})
					return
				}
				let remark = {
					adult: {
						title: '成人票',
						price: '￥' + this.adultPrice,
						num: '×' + this.adult
					},
					children: {
						title: '儿童票',
						price: '￥' + this.childrenPrice,
						num: '×' + this.children
					},
					free: {
						title: '免费票',
						price: '￥' + this.freePrice,
						num: '×' + this.free
					}
				}
				this.$http.get('getData/index.php?m=home&c=Form&a=infoJoin', {
					params: {
						seachdata: {
							'info_id': this.$route.params.id,
							'username': this.username,
							'phone': this.phone,
							'action_type': 6,
							//							'remark': '成人票:￥' + this.adultPrice + ',num:' + this.adult + ',儿童票:￥' + this.childrenPrice + ',num:' + this.children + ',免费票:￥' + this.freePrice + ',num:' + this.free
							'remark': JSON.stringify(remark)
						}
					}
				}).then((res) => {
					console.log(res)
					let $this = this
					if(res.data.datastatus === 1) {
						this.$vux.alert.show({
							title: '提示',
							content: '报名成功',
							onHide() {
								$this.$router.back(-1)
							}
						})
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.message
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.interaction-sign-up-box {
		padding-top: 54px;
		.info-box {
			background-color: white;
			.username,
			.tel {
				height: 49px;
				line-height: 49px;
				font-size: 14px;
				color: #707070;
				display: flex;
				.name {
					padding-left: 12px;
					flex: 0 0 88px;
					width: 88px;
					box-sizing: border-box;
				}
				.value {
					flex: 1;
					width: 0;
					outline: none;
					border: none;
				}
			}
			.choose {
				padding: 20px 12px;
				.title {
					display: flex;
					justify-content: space-between;
					span {
						font-size: 14px;
						color: #707070;
					}
				}
				.content {
					.item {
						display: flex;
						justify-content: space-between;
						font-size: 14px;
						height: 56px;
						align-items: center;
						.price {
							margin-left: 32px;
						}
						.count {
							display: flex;
							span {
								height: 30px;
								display: block;
								text-align: center;
								line-height: 30px;
								&.subtract,
								&.add {
									width: 30px;
									color: white;
									background-color: #afafaf;
								}
								&.now {
									width: 24px;
								}
							}
						}
					}
				}
			}
		}
		.btn {
			width: 80%;
			height: 45px;
			background-color: #e60012;
			line-height: 45px;
			text-align: center;
			color: white;
			margin: 20px auto;
		}
	}
</style>