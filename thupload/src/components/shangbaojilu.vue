<template>
	<div style="background-color: #f7f7f7;">
		<goback title='上报记录'></goback>
		<div class="index_box">
			<tab active-color="#0c81e0" defaultColor="#282828" custom-bar-width="30px">
				<tab-item selected @on-item-click="init(0)">审核中</tab-item>
				<tab-item @on-item-click="init(6)">处理中</tab-item>
				<tab-item @on-item-click="init(5)">已完成</tab-item>
				<tab-item @on-item-click="init(4)">已终止</tab-item>
			</tab>

			<div class="wrapper">
				<pull-to :top-load-method="refresh" :bottom-load-method="getData" :bottom-config="{failText: '没有更多信息'}">
					<div class="list">
						<div class="item" v-for="(item, index) in listData" :key="index">
							<div class="item_content">
								<router-link :to="'/detail/' + item.id" tag="div" class="text">
									<div class="first">
										<p>
											<span>上报时间 </span>
											<span>{{item.createTime}}</span>
										</p>
										<span class="label" :class="labelClass(item.statused)">
										{{item.statused}}
									</span>
									</div>
									<p class="second">
										<span>{{item.regionSecondName}}</span>
										<span>{{item.regionThirdName}}</span>
										<span>{{item.departmentName}}</span>
									</p>
									<p class="second">
										<span>描述</span>
										<span>{{item.content}}</span>
									</p>
								</router-link>
							</div>
						</div>
						<load-more :show-loading="showLoading" :tip="tip" background-color="#f1eff2" v-show="listData.length === 0"></load-more>
					</div>
				</pull-to>
			</div>
		</div>
	</div>
</template>

<script>
	import goback from '@/components/return'
	import { Tab, TabItem, LoadMore } from 'vux'
	import PullTo from '@/components/PullTo/vue-pull-to'
	export default {
		name: 'shangbaojilu',
		data() {
			return {
				httpUrl: localStorage.getItem('http'),
				listData: [],
				showLoading: true,
				tip: '正在加载',
				status: 0
			}
		},
		components: {
			Tab,
			TabItem,
			PullTo,
			LoadMore,
			goback
		},
		created() {
			this.init(0)
		},
		methods: {
			labelClass(status) {
				switch(status) {
					case '审核中':
						return 'label0'
					case '处理中':
						return 'label1'
					case '已完成':
						return 'label2'
					case '已终止':
						return 'label3'
					case '已超时':
						return 'label4'
				}
			},
			init(status) {
				this.listData = []
				this.showLoading = true
				this.tip = '正在加载'
				this.status = status
				this.$http.get('/api/frontBase/workOrderStep/findOrderListByUser', {
					params: {
						type: this.status.toString(),
						seeId: '',
						flag: ''
					}
				}).then((res) => {
					//					console.log(res)
					if(res.data.result === 0) {
						this.listData = res.data.obj
						if(this.listData.length === 0) {
							this.showLoading = false
							this.tip = '暂无数据'
						}
					} else {
						this.showLoading = false
						this.tip = '暂无数据'
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				})
			},
			refresh(loaded) {
				this.$http.get('/api/frontBase/workOrderStep/findOrderListByUser', {
					params: {
						type: this.status.toString(),
						seeId: '',
						flag: ''
					}
				}).then((res) => {
					//					console.log(res)
					if(res.data.result === 0) {
						this.listData = res.data.obj
						if(this.listData.length === 0) {
							this.showLoading = false
							this.tip = '暂无数据'
						}
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
					loaded('done')
				})
			},
			getData(loaded) {
				if(this.listData.length === 0) {
					loaded('fail')
					return
				}
				this.$http.get('/api/frontBase/workOrderStep/findOrderListByUser', {
					params: {
						type: this.status.toString(),
						seeId: this.listData[this.listData.length - 1].id,
						flag: 'up'
					}
				}).then((res) => {
					//					console.log(res)
					if(res.data.result === 0) {
						if(res.data.obj.length === 0) {
							loaded('fail')
						} else {
							this.listData = this.listData.concat(res.data.obj)
							loaded('done')
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.index_box {
		padding-top: 88px;
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #eeeeee;
		.vux-tab {
			width: 100%;
			position: fixed;
			left: 0;
			top: 44px;
			z-index: 2;
		}
		.wrapper {
			position: fixed;
			left: 0;
			top: 88px;
			bottom: 0;
			width: 100%;
		}
		.list {
			margin-top: 10px;
			.item {
				height: 150px;
				margin-bottom: 10px;
				background-color: white;
				padding: 20px 15px;
				box-sizing: border-box;
				.item_content {
					width: 100%;
					height: 100%;
					border: 1px #cccccc solid;
					border-radius: 4px;
					box-sizing: border-box;
					/*padding: 0 9px;*/
					.text {
						height: 100px;
						box-sizing: border-box;
						padding: 8px 9px;
						font-size: 14px;
						.first {
							display: flex;
							justify-content: space-between;
							p {
								span {
									margin-right: 6px;
								}
							}
							.label {
								text-decoration: underline;
							}
							.label0 {
								color: #0c81e0;
							}
							.label1 {
								color: #41c94e;
							}
							.label2 {
								color: #0c81e0;
							}
							.label3 {
								color: #898989;
							}
							.label4 {
								color: #e82803;
							}
						}
						p {
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							line-height: 28px;
							&.second {
								span {
									margin-right: 6px;
								}
							}
						}
					}
					.vux-1px-b:after {
						border-bottom: 1px solid #cccccc;
						color: #cccccc;
					}
					.btn {
						height: 36px;
						display: flex;
						background-color: #0c81e0;
						span {
							flex: 1;
							width: 0;
							line-height: 36px;
							font-size: 18px;
							display: block;
							text-align: center;
							color: white;
						}
					}
				}
			}
		}
		.swiper_user {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.4);
			z-index: 4;
			.swiper_user_content {
				width: 190px;
				height: 100vh;
				background-color: white;
				position: relative;
				.avatar {
					width: 106px;
					height: 106px;
					position: absolute;
					top: 16%;
					left: 50%;
					transform: translateX(-50%);
					border-radius: 50%;
					overflow: hidden;
					display: flex;
					justify-content: center;
					align-items: center;
					img {
						width: 100%;
					}
				}
				.btn {
					width: 100%;
					position: absolute;
					left: 0;
					bottom: 28.5vh;
					p {
						text-align: center;
						font-size: 16px;
						line-height: 40px;
					}
				}
			}
		}
		.slide-enter-active {
			transition: all .3s ease;
		}
		.slide-leave-active {
			transition: all .3s ease;
		}
		.slide-enter,
		.slide-leave-to {
			transform: translateX(-100%);
		}
		.master {
			width: 100%;
			height: 100vh;
			position: fixed;
			z-index: 6;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, 0.4);
			.content {
				width: 320px;
				background-color: white;
				position: absolute;
				left: 50%;
				top: 50%;
				margin-left: -160px;
				transform: translateY(-50%);
			}
		}
		.beginMaster {
			.content {
				padding: 10px 0 28px;
				box-sizing: border-box;
				.row {
					display: flex;
					align-items: center;
					justify-content: space-around;
					height: 76px;
					margin: 0 20px;
					.item {
						width: 116px;
						height: 38px;
						line-height: 38px;
						text-align: center;
						border: 1px #b9b9b9 solid;
						border-radius: 6px;
						font-size: 16px;
						&.current {
							border-color: #0c81e0;
						}
					}
				}
				.beginBtn {
					width: 280px;
					height: 40px;
					background-color: #0c81e0;
					margin: 0 auto;
					color: white;
					text-align: center;
					line-height: 40px;
					font-size: 16px;
					border-radius: 6px;
					margin-top: 10px;
				}
			}
		}
		.delayMaster {
			.content {
				textarea {
					width: 280px;
					height: 139px;
					margin: 20px auto;
					display: block;
					border: none;
					border: 1px #cccccc solid;
					border-radius: 6px;
					padding: 10px;
					box-sizing: border-box;
					font-size: 14px;
					outline: none;
				}
				.delayBtn {
					width: 280px;
					height: 40px;
					background-color: #0c81e0;
					margin: 0 auto;
					color: white;
					text-align: center;
					line-height: 40px;
					font-size: 16px;
					border-radius: 6px;
					margin-bottom: 28px;
				}
			}
		}
		.stopMaster {
			.content {
				textarea {
					width: 280px;
					height: 139px;
					margin: 20px auto 10px;
					display: block;
					border: none;
					border: 1px #cccccc solid;
					border-radius: 6px;
					padding: 10px;
					box-sizing: border-box;
					font-size: 14px;
					outline: none;
				}
				.imgs {
					.title {
						font-size: 12px;
						padding-left: 20px;
						color: #666666;
					}
					.gruop {
						padding: 10px 20px;
						display: flex;
						justify-content: space-between;
						.item {
							width: 80px;
							height: 80px;
							border: 1px #cccccc solid;
							border-radius: 4px;
							box-sizing: border-box;
							background: url(../../static/img/camera.png) center no-repeat;
							background-size: 24px 20px;
							background-color: #fcfcfc;
							.input {
								width: 100%;
								height: 100%;
								outline: none;
								opacity: 0;
							}
						}
						.img_item {
							width: 80px;
							height: 80px;
							border-radius: 4px;
							background-size: cover;
							background-position: center;
							position: relative;
							.close_icon {
								.vux-x-icon {
									fill: #ff423a;
									position: absolute;
									right: -15px;
									top: -15px;
								}
							}
						}
					}
				}
				.stopBtn {
					width: 280px;
					height: 40px;
					background-color: #0c81e0;
					margin: 28px auto;
					color: white;
					text-align: center;
					line-height: 40px;
					font-size: 16px;
					border-radius: 6px;
				}
			}
		}
	}
</style>