<template>
	<div class="woyaoshangbao_box">
		<goback title='上报'></goback>
		<div class="content">
			<div class="select_box">
				<popup-picker :title="title3" :data="list3" v-model="value3" placeholder="请选择" :columns="1" show-name @on-hide="pickDepartment"></popup-picker>
				<!--<popup-picker :title="title1" :data="list1" v-model="value1" placeholder="请选择" :columns="1" show-name @on-hide="pickSecondRegion"></popup-picker>-->
				<!--<popup-picker :title="title2" :data="list2" v-model="value2" placeholder="请选择" :columns="1" show-name></popup-picker>-->
			</div>
			<p class="title"><span style="color:red;font-size: 17px;">*&nbsp;</span>描述</p>
			<div class="texarea" style="font-size: 15px;">
				<x-textarea v-model="value" name="detail" :height="100" :placeholder="('请输入您要描述的问题')" :show-counter="false"></x-textarea>
			</div>
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
			<div class="add_box vux-1px-b">
				<span class="title">当前位置</span>
				<span class="add_img" @click="getGps"><img src="../../static/img/addRefrash.png"/></span>
				<input class="address" v-model="address" disabled></input>
				<!--<x-input class="address">望江西路102-109</x-input>-->
			</div>
		</div>

		<div class="submitss">
			<button class="pub_button" @click="shangbao">提交</button>
		</div>

	</div>
</template>

<script>
	import { PopupPicker, XTextarea, Group } from 'vux'
	import goback from '@/components/return'
	export default {
		name: 'woyaoshangbao',
		components: {
			goback,
			XTextarea,
			PopupPicker,
			Group
		},
		data() {
			return {
				title1: '<span style="color:red;">&nbsp;*&nbsp;</span>选择区域',
				title2: '<span style="color:red;">&nbsp;*&nbsp;</span>选择网格',
				title3: '<span style="color:red;">&nbsp;*&nbsp;</span>选择上报类型',
				list1: [],
				list2: [],
				list3: [],
				value: '',
				value1: ['10'],
				value2: ['102'],
				value3: [],
				httpUrl: localStorage.getItem('http'),
				img1: '',
				img2: '',
				img3: '',
				lat: '',
				lng: '',
				address: ''
			}
		},
		created() {
			this.$http.get('/api/frontBase/department/findDepartment')
				.then((res) => {
					if(res.data.result === 0) {
						let obj = res.data.obj
						for(let i = 0; i < obj.length; i++) {
							this.list3.push({
								name: obj[i].name,
								value: obj[i].id.toString()
							})
						}
						console.log(this.list3)
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				})
			this.$http.get('/api/frontBase/region/findSecondRegion')
				.then((res) => {
					if(res.data.result === 0) {
						let obj = res.data.obj
						for(let i = 0; i < obj.length; i++) {
							this.list1.push({
								name: obj[i].name,
								value: obj[i].id.toString()
							})
						}
						console.log(this.list1)
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				})
			this.getGps()
		},
		methods: {
			pickDepartment() {
				console.log(this.value3)
			},
			pickSecondRegion(closeType) {
				if(!closeType) {
					return
				}
				this.list2 = []
				this.value2 = []
				this.$http.get('/api/frontBase/region/findRegionByid', {
					params: {
						id: this.value1[0]
					}
				}).then((res) => {
					if(res.data.result === 0) {
						let obj = res.data.obj
						for(let i = 0; i < obj.length; i++) {
							this.list2.push({
								name: obj[i].name,
								value: obj[i].id.toString()
							})
						}
					}
				})
			},
			getaddress() {
				this.$http.get('/api/common/getBaiduCoordinate', {
					params: {
						latitude: this.lat,
						longitude: this.lng,
						type: 1
					}
				}).then(
					(res) => {
						this.address = res.data.obj.formatted_address
					}
				)
			},
			getGps() {
				let $this = this
				this.$CGPS((result) => {
					if(result) {
						if(result.coordsType === 'wgs84') {
							$this.lat = result.coords.latitude
							$this.lng = result.coords.longitude
							if(!result.addresses) {
								$this.getaddress()
								return
							} else {
								$this.address = result.addresses
							}
						} else {
							$this.$http.get('/api/frontBase/department/getSome', {
								params: {
									lat: result.coords.latitude,
									lng: result.coords.longitude
								}
							}).then((res) => {
								$this.lat = res.data.obj.lat
								$this.lng = res.data.obj.lng
								if(!result.addresses) {
									$this.getaddress()
									return
								} else {
									$this.address = result.addresses
								}
							})
						}
					} else {
						$this.$vux.toast.text('位置信息获取失败,请确认是否授权!')
					}
				})
			},
			uploadImg(img) {
				let $this = this
				this.$CgetCamera(function(path) {
					let url = localStorage.getItem('http') + '/api/frontBase/attachment/uploadPicture'
					$this.$CuploadImg(url, path, function(res) {
						$this[img] = res.obj
					})
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
			shangbao() {
				if(this.value1 === undefined || this.value1.length === 0 || this.value2 === undefined || this.value2.length === 0 || this.value3 === undefined || this.value3.length === 0 || this.value === undefined || this.value === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请完善上报信息，*为必填项'
					})
					return
				} else {
					this.$vux.loading.show({
						text: '正在上传'
					})
					let imgArr = [this.img1, this.img2, this.img3]
					let imgString = ''
					for(let i = 0; i < imgArr.length; i++) {
						if(imgArr[i] !== '') {
							imgString = imgString + imgArr[i] + ','
						}
					}
					let reg = /,$/gi
					imgString = imgString.replace(reg, '')
					this.$http.get('/api/frontBase/workOrder/saveWorkOrder', {
						params: {
							regionSecondId: '10',
							regionThirdId: '100',
							departmentId: this.value3[0],
							pictures: imgString,
							content: this.value,
							lat: this.lat,
							lng: this.lng,
							address: this.address
						}
					}).then((res) => {
						console.log(res)
						this.$vux.loading.hide()
						if(res.data.result === 0) {
							let $this = this
							this.$vux.alert.show({
								title: '提示',
								content: '提交成功,工作人员会及时处理此条上报信息',
								onHide() {
									$this.$router.back()
								}
							})
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
	}
</script>

<style lang="less" scoped="scoped">
	.vux-selector.weui-cell_select {
		height: 30px;
	}
	
	.woyaoshangbao_box {
		min-height: 100vh;
		padding-top: 44px;
		box-sizing: border-box;
		background-color: #f7f7f7;
		.content {
			width: 100%;
			background-color: white;
			.title {
				padding: 10px 18px;
				font-size: 16px;
				color: #707070;
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
					background: url(../../static/img/camera.jpg) center no-repeat;
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
			.select_box {
				margin: auto;
				width: 100%;
				height: auto;
				overflow: hidden;
				/*background: #f60;*/
			}
			.texarea {
				width: 90%;
				height: 120px;
				margin: 0 auto;
				border: 1px solid #cccccc;
				border-radius: 5px;
				text-align: center;
				background-color: white;
				color: #000000;
			}
			/*.photo_box {
				width: 100%;
				height: 105px;
				padding: 0 18px;
				display: flex;
				box-sizing: border-box;
				.photo {
					width: 75px;
					height: 75px;
					background-color: #fcfcfc;
					border: 1px solid #cccccc;
					border-radius: 5px;
					margin-right: 15px;
					display: flex;
					img {
						width: 50%;
						margin: auto;
					}
				}
			}*/
			.add_box {
				height: 85px;
				span {
					display: inline-block;
				}
				.add_img {
					width: 103px;
					height: 25px;
					margin-top: 10px;
					margin-right: 18px;
					float: right;
					img {
						width: 100%;
					}
				}
			}
			.address {
				padding-left: 18px;
				margin-top: 13px;
				border: none;
				width: 100%;
				box-sizing: border-box;
				background-color: white;
			}
		}
		.submitss {
			padding: 30px 50px;
			box-sizing: border-box;
			background-color: #f7f7f7;
			.pub_button {
				height: 40px;
				border-radius: 3px;
				width: 100%;
				border: none;
				color: #fff;
				background: #0c81e0;
			}
		}
	}
</style>