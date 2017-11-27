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
					<div class="item" v-for="(item, index) in info_list" :key="index">
						<span class="price">{{item.title}}：￥{{item.price}}</span>
						<div class="count">
							<span class="subtract" @click="subtractNum(index)">-</span>
							<span class="now">{{item.num}}</span>
							<span class="add" @click="addNum(index)">+</span>
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
				username: '',
				phone: '',
				info_list: []
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				this.$http.get('getData/home/Form/info_pj_list', {
					params: {
						seachdata: {
							id: this.$route.params.id
						}
					}
				}).then((res) => {
//										console.log(res)
					if(res.data.datastatus === 1) {
						this.info_list = res.data.data
						for(let i = 0; i < this.info_list.length; i++) {
							this.info_list[i].num = 0
						}
					}
				})
			},
			subtractNum(index) {
				if(this.info_list[index].num === 0) {
					return
				} else {
					this.$set(this.info_list, index, {
						title: this.info_list[index].title,
						price: this.info_list[index].price,
						num: this.info_list[index].num - 1
					})
				}
			},
			addNum(index) {
				this.$set(this.info_list, index, {
						title: this.info_list[index].title,
						price: this.info_list[index].price,
						num: this.info_list[index].num + 1
					})
//				console.log(this.info_list)
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
				let remark = JSON.stringify(this.info_list)
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