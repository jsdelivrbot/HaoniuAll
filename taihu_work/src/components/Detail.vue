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
			<div class="step">
				<p class="title vux-1px-b">
					进度
				</p>
				<div class="content">
					<div class="item vux-1px-l" v-for="(item, index) in step" :key="index">
						<span class="dot" :class="{first: index===0}"></span>
						<span>{{item.createTime}} {{item.content}}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="btn" v-if="info.statused === '未处理'" @click="beginMasterShow = true">
			<span>开始</span>
		</div>

		<div class="btn" v-if="info.statused === '处理中'">
			<span @click="goToMap(info.lat,info.lng,info.address)">导航</span>
			<span @click="stopMasterShow = true">终止</span>
			<span @click="delayMasterShow = true">延时</span>
			<span @click="completeMasterShow = true">结束</span>
		</div>

		<router-link :to="/summary/ + workOrderId" tag="div" class="btn" v-if="info.statused === '已完成'">
			<span>查看总结</span>
		</router-link>

		<div class="btn" v-if="info.statused === '已终止'">
			<span @click="goToMap(info.lat,info.lng,info.address)">导航</span>
			<!--<span>继续</span>-->
			<!--<span @click="delayMasterShow = true">延时</span>-->
			<!--<span @click="completeMasterShow = true">结束</span>-->
		</div>

		<div class="btn" v-if="info.statused === '已超时'">
			<span @click="goToMap(info.lat,info.lng,info.address)">导航</span>
			<span @click="stopMasterShow = true">终止</span>
			<span @click="delayMasterShow = true">延时</span>
			<span @click="completeMasterShow = true">结束</span>
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
							<input type="file" class="input" @change="fileChange($event, 'img5')" />
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
	import Return from '@/components/Return'
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
				workOrderId: this.$route.params.id,
				gps: {
					lng: '',
					lat: ''
				},
				yanLong: ''
			}
		},
		components: {
			Return
		},
		created() {
			this.$vux.loading.show({
				text: '加载中'
			})
			this.$http('/api/frontBase/workOrder/findOrderDetail', {
				params: {
					workOrderId: this.workOrderId
				}
			}).then((res) => {
				//				console.log(res)
				if(res.data.result === 0) {
					this.info = res.data.obj
				} else {
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
					this.isComplete = true
					this.$nextTick(() => {
						this.$vux.loading.hide()
					})
				})
			})
			this.getGps()
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
			labelClass(status) {
				//				console.log(status)
				switch(status) {
					case '未处理':
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
						workOrderId: this.$route.params.id,
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
							this.$router.back()
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
						workOrderId: this.$route.params.id,
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
							this.$router.back()
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
			delay() {
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
				this.$vux.loading.show({
					text: '请稍等'
				})
				this.$http.get('/api/frontBase/workOrder/updateWorkOrderDelay', {
					params: {
						workOrderId: this.$route.params.id,
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
							this.$router.back()
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
						workOrderId: this.$route.params.id,
						result: this.completeResult,
						pictures: imgString
					}
				}).then((res) => {
					//					console.log(res)
					this.$vux.loading.hide()
					if(res.data.result === 0) {
						this.$vux.toast.show({
							text: '提交成功'
						})
						setTimeout(() => {
							this.$router.back()
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
	.detail_box {
		padding: 44px 0;
		/*background-color: white;*/
		display: flex;
		flex-flow: column;
		box-sizing: border-box;
		min-height: 100vh;
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