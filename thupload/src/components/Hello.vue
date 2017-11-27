<template>
	<div class="index_box">
		<div class="header">
			<div class="icon1" @click="swiperShow = true">
				<img src="../../static/img/home_icon1.png" />
			</div>
			<p>文明太湖</p>
			<router-link to="/info" tag="div" class="icon2">
				<img src="../../static/img/home_icon2.png" />
			</router-link>
		</div>

		<tab active-color="#0c81e0" defaultColor="#282828" custom-bar-width="30px">
			<tab-item selected @on-item-click="init(1)">未处理</tab-item>
			<tab-item @on-item-click="init(2)">处理中</tab-item>
			<tab-item @on-item-click="init(5)">已完成</tab-item>
			<tab-item @on-item-click="init(4)">已终止</tab-item>
			<tab-item @on-item-click="init(6)">已超时</tab-item>
		</tab>
		
		<div class="wrapper">
			<pull-to :top-load-method="refresh" :bottom-load-method="getData" :bottom-config="{failText: '没有更多信息'}">
				<div class="list">
					<div class="item" v-for="(item, index) in listData" :key="index">
						<div class="item_content">
							<router-link :to="'/detail/' + item.id" tag="div" class="text vux-1px-b">
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
							<div class="btn" v-if="item.statused === '未处理'">
								<span>开始</span>
							</div>
							<div class="btn" v-if="item.statused === '处理中'">
								<span>导航</span>
								<span>终止</span>
								<span>延时</span>
								<span>结束</span>
							</div>
							<router-link to="/summary" tag="div" class="btn" v-if="item.statused === '已完成'">
								<span>查看总结</span>
							</router-link>
							<div class="btn" v-if="item.statused === '已超时'">
								<span>导航</span>
								<span>终止</span>
								<span>延时</span>
								<span>结束</span>
							</div>
							<div class="btn" v-if="item.statused === '已终止'">
								<span>导航</span>
								<span>继续</span>
								<span>延时</span>
								<span>结束</span>
							</div>
						</div>
					</div>
					<load-more :show-loading="showLoading" :tip="tip" background-color="#f1eff2" v-show="listData.length === 0"></load-more>
				</div>
			</pull-to>
		</div>

		<div class="swiper_user" v-show="swiperShow" @click="swiperShow = false">
			<transition name="slide">
				<div class="swiper_user_content" @click.stop v-show="swiperShow">
					<div class="avatar">
						<img :src="avatar" />
					</div>
					<div class="btn">
						<router-link to="/personal" tag="p">个人资料</router-link>
						<p @click="logout">退出登录</p>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import { Tab, TabItem, LoadMore } from 'vux'
	import PullTo from '@/components/PullTo/vue-pull-to'
	export default {
		name: 'Hello',
		data() {
			return {
				swiperShow: false,
				userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
				httpUrl: localStorage.getItem('http'),
				listData: [],
				showLoading: true,
				tip: '正在加载',
				status: 0
			}
		},
		computed: {
			avatar() {
				if(this.userInfo) {
					return this.httpUrl + this.userInfo.avatarUrl
				} else {
					return '../../static/img/avatar.png'
				}
			}
		},
		components: {
			Tab,
			TabItem,
			PullTo,
			LoadMore
		},
		created() {
			this.init(1)
		},
		activated() {
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
		},
		methods: {
			logout() {
				sessionStorage.removeItem('userInfo')
				sessionStorage.removeItem('token')
				sessionStorage.removeItem('departmentName')
				localStorage.removeItem('phone')
				localStorage.removeItem('password')
				this.$http.defaults.headers.common['token'] = ''
				this.$router.replace('/login')
			},
			labelClass(status) {
				switch(status) {
					case '未处理':
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
				this.$http.get('/api/frontBase/workOrderStep/findOrderList', {
					params: {
						type: this.status.toString(),
						seeId: '',
						flag: ''
					}
				}).then((res) => {
					console.log(res)
					if(res.data.result === 0) {
						this.listData = res.data.obj
						if(this.listData.length === 0) {
							this.showLoading = false
							this.tip = '暂无数据'
						}
					}else {
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
				this.$http.get('/api/frontBase/workOrderStep/findOrderList', {
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
					}else {
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
				this.$http.get('/api/frontBase/workOrderStep/findOrderList', {
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
						}else {
							this.listData = this.listData.concat(res.data.obj)
							loaded('done')
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.index_box {
		padding-top: 88px;
		.header {
			width: 100%;
			height: 44px;
			background-color: #0c81e0;
			display: flex;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 2;
			p {
				flex: 1;
				font-size: 18px;
				color: white;
				text-align: center;
				line-height: 44px;
			}
			.icon1 {
				flex: 0 0 auto;
				padding: 0 15px;
				height: 44px;
				display: flex;
				align-items: center;
				img {
					width: 20px;
					height: 22px;
				}
			}
			.icon2 {
				flex: 0 0 auto;
				padding: 0 15px;
				height: 44px;
				display: flex;
				align-items: center;
				img {
					width: 23px;
					height: 20px;
				}
			}
		}
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
				height: 178px;
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
					padding: 0 9px;
					.text {
						height: 100px;
						box-sizing: border-box;
						padding: 8px 0;
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
						span {
							flex: 1;
							width: 0;
							line-height: 36px;
							font-size: 18px;
							display: block;
							text-align: center;
							color: #282828;
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
	}
</style>