<template>
	<div class="detail_box" v-show="isComplete">
		<return title="详情"></return>

		<div class="wrapper">
			<div class="procrible">
				<div class="progress vux-1px-t">
					<div class="content">
						<div class="row first_row">
							<p>
								<span class="key">上报时间</span>
								<span class="vaule">{{info.createTime}}</span>
							</p>
							<p>
								<span class="key">当前状态</span>
								<!--<span class="vaule2">处理中</span>-->
								<span :class="labelClass(info.statused)">{{info.statused}}</span>
							</p>
						</div>
						<div class="row first_row">
							<p>
								<span class="key">地区</span>
								<span class="vaule">{{info.regionSecondName}} {{info.regionThirdName}}</span>
							</p>
						</div>
						<div class="row first_row">
							<p>
								<span class="key">物业</span>
								<span class="vaule">{{info.departmentName}}</span>
							</p>
						</div>
					</div>
				</div>

				<div class="describle vux-1px-b">
					<p class="title vux-1px-b">
						描述
					</p>
					<div class="content">
						<p>{{info.content}}</p>
					</div>
					<div class="imgs">
						<img v-for="(item, index) in info.picturesUrl" :src="httpUrl + item.targerUrl" />
					</div>
				</div>
			</div>
			<div class="position">
				<div class="title">当前位置</div>
				<p class="address">{{info.address}}</p>
			</div>
			<!--<div class="step">
				<p class="title vux-1px-b">
					进度
				</p>
				<div class="content">
					<div class="item vux-1px-l" v-for="(item, index) in step" :key="index">
						<span class="dot" :class="{first: index===0}"></span>
						<span>{{item.createTime}} {{item.content}}</span>
					</div>
				</div>
			</div>-->
		</div>
	</div>
</template>

<script>
	import Return from '@/components/return'
	export default {
		name: 'detail',
		data() {
			return {
				isComplete: false,
				info: {},
				step: [],
				httpUrl: localStorage.getItem('http'),
				beginCurrent: 1,
				beginMasterShow: false,
				delayMasterShow: false,
				stopMasterShow: false,
				stopResult: '',
				img1: '',
				img2: '',
				img3: '',
				delayResult: '',
				completeMasterShow: false,
				completeResult: '',
				img4: '',
				img5: '',
				img6: '',
				workOrderId: this.$route.params.id
			}
		},
		components: {
			Return
		},
		created() {
			this.$vux.loading.show({
				text: '加载中'
			})
			this.$http('/api/frontBase/workOrderStep/findOrderDetalByUser', {
				params: {
					workOrderId: this.workOrderId
				}
			}).then((res) => {
//				console.log(res)
				if(res.data.result === 0) {
					this.info = res.data.obj
				}else {
					this.$vux.alert.show({
						title: '提示',
						content: res.data.msg
					})
				}
				this.$http('/api/frontBase/workOrderStep/findStepById', {
					params: {
						workOrderId: this.workOrderId
					}
				}).then((res) => {
//					console.log(res)
					if(res.data.result === 0) {
						this.step = res.data.obj
					}
					this.$nextTick(() => {
						this.$vux.loading.hide()
						this.isComplete = true
					})
				})
			})
		},
		methods: {
			labelClass(status) {
				//				console.log(status)
				switch(status) {
					case '审核中':
						return 'value0'
					case '处理中':
						return 'value1'
					case '已完成':
						return 'value2'
					case '已终止':
						return 'value3'
					case '已超时':
						return 'value4'
				}
			}
		}
	}
</script>

<style lang="less">
	.detail_box {
		/*padding: 44px 0;*/
		/*background-color: white;*/
		display: flex;
		flex-flow: column;
		box-sizing: border-box;
		min-height: 100vh;
		padding-top: 44px;
		.wrapper {
			flex: 1;
		}
		.procrible {
			overflow: hidden;
			background-color: #eeeeee;
			.progress {
				height: 100px;
				/*margin-top: 10px;*/
				background-color: white;
				padding: 0 15px;
				.title {
					height: 40px;
					line-height: 40px;
					color: #666666;
					font-size: 12px;
				}
				.content {
					padding: 8px 0;
					font-size: 14px;
					.row {
						line-height: 28px;
						p {
							.key {
								color: #282828;
								margin-right: 10px;
							}
							.vaule {
								color: #999999;
							}
							.value0 {
								color: #0c81e0;
								text-decoration: underline;
							}
							.value1 {
								color: #41c94e;
								text-decoration: underline;
							}
							.value2 {
								color: #0c81e0;
								text-decoration: underline;
							}
							.value3 {
								color: #898989;
								text-decoration: underline;
							}
							.value4 {
								color: #e82803;
								text-decoration: underline;
							}
						}
					}
					.first_row {
						display: flex;
						justify-content: space-between;
					}
				}
			}
			.describle {
				margin-top: 10px;
				background-color: white;
				padding: 0 15px;
				.title {
					height: 40px;
					line-height: 40px;
					color: #666666;
					font-size: 12px;
				}
				.content {
					padding: 10px 0;
					font-size: 14px;
					color: #282828;
					line-height: 28px;
					word-break: break-all;
					line-height: 20px;
				}
				.imgs {
					padding: 15px 0;
					img {
						width: 28%;
						margin-right: 2.6%;
						border-radius: 4px;
					}
				}
			}
		}
		.step {
			margin: 10px 0;
			background-color: white;
			padding: 0 15px 10px;
			.title {
				height: 40px;
				line-height: 40px;
				color: #666666;
				font-size: 12px;
			}
			.content {
				margin: 0 20px;
				.item {
					height: 50px;
					font-size: 12px;
					display: flex;
					align-items: center;
					.dot {
						width: 10px;
						height: 10px;
						border-radius: 50%;
						background-color: #cdcdcd;
						display: block;
						margin: 0 20px 0 -5px;
					}
					.first {
						width: 16px;
						height: 16px;
						margin: 0 20px 0 -8px;
						background: url(../../static/img/go.png) center no-repeat;
						background-color: #cdcdcd;
						background-size: 10px 10px;
					}
				}
			}
		}
		.position {
			padding: 0 15px;
			background-color: white;
			overflow: hidden;
			height: 70px;
			.title {
				height: 40px;
				line-height: 40px;
				background: url(../../static/img/position.png) left center no-repeat;
				background-size: 9px 13px;
				font-size: 12px;
				padding-left: 22px;
				color: #666666;
			}
			.address {
				line-height: 20px;
				font-size: 14px;
				color: #282828;
			}
		}
		.btn {
			/*padding: 36px 15px;*/
			display: flex;
			/*background-color: white;*/
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			span {
				flex: 1;
				display: block;
				height: 54px;
				line-height: 54px;
				background-color: #0c81e0;
				color: white;
				text-align: center;
				font-size: 16px;
				/*&+span {
					margin-left: 10px;
				}*/
			}
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