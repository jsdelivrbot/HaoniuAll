<template>
	<div class="index_box">
		<div class="header">
			<div class="icon1" @click="swiperShow = true">
				<img src="../../static/img/home_icon1.png" />
			</div>
			<p @click="getGps">文明太湖</p>
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
							<div class="btn" v-if="item.statused === '未处理'" @click="beginMasterShow = true;id = item.id">
								<span>开始</span>
							</div>
							<div class="btn" v-if="item.statused === '处理中'">
								<span @click="goToMap(item.lat,item.lng,item.address)">导航</span>
								<span @click="stopMasterShow = true;id = item.id">终止</span>
								<span @click="delayMasterShow = true;id = item.id">延时</span>
								<span @click="completeMasterShow = true;id = item.id">结束</span>
							</div>
							<router-link :to="/summary/ + item.id" tag="div" class="btn" v-if="item.statused === '已完成'">
								<span>查看总结</span>
							</router-link>
							<div class="btn" v-if="item.statused === '已超时'">
								<span @click="goToMap(item.lat,item.lng,item.address)">导航</span>
								<span @click="stopMasterShow = true;id = item.id">终止</span>
								<span @click="delayMasterShow = true;id = item.id">延时</span>
								<span @click="completeMasterShow = true;id = item.id">结束</span>
							</div>
							<div class="btn" v-if="item.statused === '已终止'">
								<span @click="goToMap(item.lat,item.lng,item.address)">导航</span>
								<!--<span>继续</span>-->
								<!--<span @click="delayMasterShow = true;id = item.id">延时</span>-->
								<!--<span @click="completeMasterShow = true;id = item.id">结束</span>-->
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
						<router-link to="/ChangePsw" tag="p">修改密码</router-link>
						<p @click="logout">退出登录</p>
					</div>
				</div>
			</transition>
		</div>
		<div class="master beginMaster" v-show="beginMasterShow" @click="beginMasterShow = false">
			<div class="content" @click.stop>
				<div class="row">
					<div class="item" :class="{current: beginCurrent === 1}" @click="beginCurrent = 1">
						一天
					</div>
					<div class="item" :class="{current: beginCurrent === 3}" @click="beginCurrent = 3">
						三天
					</div>
				</div>
				<div class="row">
					<div class="item" :class="{current: beginCurrent === 5}" @click="beginCurrent = 5">
						五天
					</div>
					<div class="item" :class="{current: beginCurrent === 7}" @click="beginCurrent = 7">
						七天
					</div>
				</div>
				<div class="beginBtn" @click="start">
					确认开始
				</div>
			</div>
		</div>

		<div class="master delayMaster" v-show="delayMasterShow" @click="delayMasterShow = false">
			<div class="content" @click.stop>
				<textarea placeholder="请输入延时原因" v-model="delayResult"></textarea>
				<input type="number" placeholder="请输入延时天数" v-model="yanLong" />
				<div class="delayBtn" @click="delay">
					请求延时
				</div>
			</div>
		</div>

		<div class="master stopMaster" v-show="stopMasterShow" @click="stopMasterShow = false">
			<div class="content" @click.stop>
				<textarea placeholder="请输入您终止的原因" v-model="stopResult"></textarea>
				<div class="imgs">
					<p class="title">上传图片</p>
					<div class="gruop">
						<div class="item" v-show="img1 === ''">
							<div class="input" @click="uploadImg('img1')"></div>
							<!--<input type="file" class="input" @change="fileChange($event, 'img1')" />-->
						</div>
						<div class="img_item" v-show="img1 !== ''" :style="'background-image: url(' + httpUrl + img1 + ');'">
							<div @click="img1=''" class="close_icon">
								<x-icon type="ios-close" size="30"></x-icon>
							</div>
						</div>
						<div class="item" v-show="img2 === ''">
							<div class="input" @click="uploadImg('img2')"></div>
							<!--<input type="file" class="input" @change="fileChange($event, 'img2')" />-->
						</div>
						<div class="img_item" v-show="img2 !== ''" :style="'background-image: url(' + httpUrl + img2 + ');'">
							<div @click="img2=''" class="close_icon">
								<x-icon type="ios-close" size="30"></x-icon>
							</div>
						</div>
						<div class="item" v-show="img3 === ''">
							<div class="input" @click="uploadImg('img3')"></div>
							<!--<input type="file" class="input" @change="fileChange($event, 'img3')" />-->
						</div>
						<div class="img_item" v-show="img3 !== ''" :style="'background-image: url(' + httpUrl + img3 + ');'">
							<div @click="img3=''" class="close_icon">
								<x-icon type="ios-close" size="30"></x-icon>
							</div>
						</div>
					</div>
				</div>
				<div class="stopBtn" @click="stop">
					请求终止
				</div>
			</div>
		</div>

		<div class="master stopMaster" v-show="completeMasterShow" @click="completeMasterShow = false">
			<div class="content" @click.stop>
				<textarea placeholder="请输入维护总结" v-model="completeResult"></textarea>
				<div class="imgs">
					<p class="title">上传图片</p>
					<div class="gruop">
						<div class="item" v-show="img4 === ''">
							<div class="input" @click="uploadImg('img4')"></div>
							<!--<input type="file" class="input" @change="fileChange($event, 'img4')" />-->
						</div>
						<div class="img_item" v-show="img4 !== ''" :style="'background-image: url(' + httpUrl + img4 + ');'">
							<div @click="img4=''" class="close_icon">
								<x-icon type="ios-close" size="30"></x-icon>
							</div>
						</div>
						<div class="item" v-show="img5 === ''">
							<div class="input" @click="uploadImg('img5')"></div>
							<!--<input type="file" class="input" @change="fileChange($event, 'img5')" />-->
						</div>
						<div class="img_item" v-show="img5 !== ''" :style="'background-image: url(' + httpUrl + img5 + ');'">
							<div @click="img5=''" class="close_icon">
								<x-icon type="ios-close" size="30"></x-icon>
							</div>
						</div>
						<div class="item" v-show="img6 === ''">
							<div class="input" @click="uploadImg('img6')"></div>
							<!--<input type="file" class="input" @change="fileChange($event, 'img6')" />-->
						</div>
						<div class="img_item" v-show="img6 !== ''" :style="'background-image: url(' + httpUrl + img6 + ');'">
							<div @click="img6=''" class="close_icon">
								<x-icon type="ios-close" size="30"></x-icon>
							</div>
						</div>
					</div>
				</div>
				<div class="stopBtn" @click="complete">
					提交总结
				</div>
			</div>
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
				status: 0,
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
				id: Number,
				gps: {
					lng: '',
					lat: ''
				},
				yanLong: ''
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
		mounted() {
			this.getGps()
			this.init(1)
		},
		activated() {
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
		},
		methods: {
			uploadImg(img) {
				let $this = this
				this.$CgetCamera(function(path) {
					let url = localStorage.getItem('http') + '/api/frontBase/attachment/uploadPicture'
					$this.$CuploadImg(url, path, function(res) {
						$this[img] = res.obj
					})
				})
			},
			goToMap(lat, lng, address) {
				if(!this.$CgetBaidumap('com.baidu.BaiduMap')) {
					mui.confirm('未检测到百度地图,请到应用商店安装？', '提示!', function(e) {
						if(e.index === 1) {
							plus.runtime.openURL('http://map.baidu.com/zt/qudao/map/html/index.html')
						} else {
							mui.toast('未安装百度地图,无法使用此功能!')
						}
					})
					return false
				} else {
					var dst = new plus.maps.Point(lng, lat)
					var src = new plus.maps.Point(this.gps.lng, this.gps.lat)
					plus.maps.openSysMap(dst, address, src)
				}
			},
			getGps() {
				let $this = this
				this.$CGPS(function(res) {
					console.log(JSON.stringify(res))
					if(res.coordsType === 'gcj02') {
						$this.$http.get('/api/frontBase/department/getSome', {
							params: {
								lat: res.coords.latitude,
								lng: res.coords.longitude
							}
						}).then(
							(res) => {
								$this.gps.lat = res.data.obj.lat
								$this.gps.lng = res.data.obj.lng
							}
						)
					} else {
						$this.gps.lat = res.coords.latitude
						$this.gps.lng = res.coords.longitude
					}
				})
			},
			logout() {
				sessionStorage.removeItem('userInfo')
				sessionStorage.removeItem('token')
				sessionStorage.removeItem('departmentName')
				localStorage.removeItem('work_phone')
				localStorage.removeItem('work_password')
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
						} else {
							this.listData = this.listData.concat(res.data.obj)
							loaded('done')
						}
					}
				})
			},
			fileChange(e, imgSrc) {
				this.$vux.loading.show({
					text: '正在读取图片'
				})
				const img = e.target.files[0]
				e.target.value = ''
				const formData = new FormData()
				const config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				formData.append('file', img)
				this.$http.post('/api/frontBase/attachment/uploadPicture', formData, config)
					.then((res) => {
						//						console.log(res)
						this.$vux.loading.hide()
						if(res.data.result === 0) {
							this[imgSrc] = res.data.obj
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: res.data.msg
							})
						}
					})
			},
			//开始
			start() {
				this.$vux.loading.show({
					text: '请稍等'
				})
				this.$http.get('/api/frontBase/workOrder/updateWorkOrderStart', {
					params: {
						workOrderId: this.id.toString(),
						days: this.beginCurrent
					}
				}).then((res) => {
					//					console.log(res)
					this.$vux.loading.hide()
					if(res.data.result === 0) {
						this.$vux.toast.show({
							text: '开始成功'
						})
						setTimeout(() => {
							this.beginMasterShow = false
							this.init(this.status)
						}, 500)
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				})
			},
			//终止
			stop() {
				if(this.stopResult === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入您的终止原因'
					})
					return
				}
				let imgArr = [this.img1, this.img2, this.img3]
				let imgString = ''
				for(let i = 0; i < imgArr.length; i++) {
					if(imgArr[i] !== '') {
						imgString = imgString + imgArr[i] + ','
					}
				}
				let reg = /,$/gi
				imgString = imgString.replace(reg, '')
				if(imgString === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请至少上传一张图片'
					})
					return
				}
				this.$vux.loading.show({
					text: '请稍等'
				})
				this.$http.get('/api/frontBase/workOrder/updateWorkOrderTermination', {
					params: {
						workOrderId: this.id.toString(),
						result: this.stopResult,
						pictures: imgString
					}
				}).then((res) => {
					//					console.log(res)
					this.$vux.loading.hide()
					if(res.data.result === 0) {
						this.$vux.toast.show({
							text: '终止成功'
						})
						setTimeout(() => {
							this.stopMasterShow = false
							this.init(this.status)
						}, 500)
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				})
			},
			//延时
			delay(id) {
				if(this.delayResult === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入延时原因'
					})
					return
				}
				if(this.yanLong === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入延时间'
					})
					return
				}
				//				console.log(this.yanLong)
				this.$vux.loading.show({
					text: '请稍等'
				})
				this.$http.get('/api/frontBase/workOrder/updateWorkOrderDelay', {
					params: {
						workOrderId: this.id.toString(),
						reason: this.delayResult,
						yanLong: this.yanLong
					}
				}).then((res) => {
					//					console.log(res)
					this.$vux.loading.hide()
					if(res.data.result === 0) {
						this.$vux.toast.show({
							text: '延时成功'
						})
						setTimeout(() => {
							this.delayMasterShow = false
							this.init(this.status)
						}, 500)
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				})
			},
			//结束
			complete() {
				if(this.completeResult === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入维护总结'
					})
					return
				}
				let imgArr = [this.img4, this.img5, this.img6]
				let imgString = ''
				for(let i = 0; i < imgArr.length; i++) {
					if(imgArr[i] !== '') {
						imgString = imgString + imgArr[i] + ','
					}
				}
				let reg = /,$/gi
				imgString = imgString.replace(reg, '')
				if(imgString === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请至少上传一张图片'
					})
					return
				}
				this.$vux.loading.show({
					text: '请稍等'
				})
				this.$http.get('/api/frontBase/workOrder/updateWorkOrderCompalte', {
					params: {
						workOrderId: this.id.toString(),
						result: this.completeResult,
						pictures: imgString
					}
				}).then((res) => {
					console.log(res)
					this.$vux.loading.hide()
					if(res.data.result === 0) {
						this.$vux.toast.show({
							text: '提交成功'
						})
						setTimeout(() => {
							this.completeMasterShow = false
							this.init(this.status)
						}, 500)
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
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
				input {
					width: 280px;
					height: 30px;
					margin: 0 auto 20px;
					display: block;
					border: none;
					border: 1px #cccccc solid;
					border-radius: 6px;
					font-size: 14px;
					outline: none;
					padding: 0 10px;
					box-sizing: border-box;
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