<template>
	<div class="setuserinfo">
		<topbar title='设置'></topbar>
		<ul class="userinfo-list">
			<li class='vux-1px-b' @click="starUp">
				<!--<input type="file" id="change" ref='uploads' accept="image" @change="changes">-->
				<span>头像</span>
				<img :src="userinfo.avatarUrl" v-if='userinfo.avatarUrl' />
				<img src="../../../static/img/loginlogo.png" v-if='!userinfo.avatarUrl' />
			</li>
			<router-link tag='li' class='vux-1px-b' to='/resetusername'>
				<span>用户名</span>
				<span>{{userinfo.nickname}}</span>
			</router-link>
			<li>
				<span>手机号码</span>
				<span>{{userinfo.phone}}</span>
			</li>
		</ul>

		<group>
			<cell title='修改密码' link='/resetpassword' is-link></cell>
		</group>

		<group class='sm-margin'>
			<cell title='评价与反馈' link='/feedback' is-link></cell>
			<cell title='关于我们' link='/about' is-link></cell>
		</group>

		<group class='sm-margin'>
			<cell title='退出登录' is-link @click.native='outlogin'></cell>
		</group>

		<div id="demo">
			<div class="container" v-show="panel">
				<div>
					<img id="image" :src="url" alt="Picture">
				</div>
				<ul class="button-box">
					<li><button type="button" @click="panel=!panel">取消</button></li>
					<li><button type="button" @click="crop">确定</button></li>
				</ul>
			</div>
		</div>
		<div class="actionsheet" v-show="actionsheetshow">
			<ul>
				<li class="vux-1px-b" @click="getImage()" v-if='isandroid'>
					<!--<input type="file" id="upload1" accept="image/*" ref='uploadsTwo' capture="camera" @change="changes">-->
					拍照
				</li>
				<li class="vux-1px-b" v-if='!isandroid'>
					<input type="file" id="upload1" accept="image/*" ref='uploadsTwo' capture="camera" @change="changes"> 拍照
				</li>
				<li>
					<input type="file" id="upload2" accept="image" ref='uploads' @change="changes">相册选择
				</li>
				<li @click="actionsheethide">取消</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import Cropper from 'cropperjs'
	import { Cell, Group, querystring } from 'vux'
	import topbar from '@/components/callback'
	export default {
		components: {
			topbar,
			Cell,
			Group
		},
		data() {
			return {
				actionsheetshow: false,
				userinfo: querystring.parse(localStorage.getItem('userinfos')),
				headerImage: '',
				picValue: '',
				cropper: '',
				croppable: false,
				panel: false,
				url: '',
				isandroid: ''
			}
		},
		activated() {
			this.userinfo = querystring.parse(localStorage.getItem('userinfos'))
		},
		mounted() {
			var u = navigator.userAgent
			this.isandroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
			var self = this
			var image = document.getElementById('image')
			this.cropper = new Cropper(image, {
				aspectRatio: 1,
				viewMode: 1,
				background: false,
				zoomable: false,
				ready: function() {
					self.croppable = true
				}
			})
		},
		methods: {
			getImage() {
				const $this = this
				var c = plus.camera.getCamera()
				c.captureImage(function(e) {
					plus.io.resolveLocalFileSystemURL(e, function(entry) {
						var s = entry.toLocalURL()
						plus.zip.compressImage({
							src: s,
							dst: '_doc/chat/camera/' + s,
							quality: 80,
							overwrite: true
						}, function(e) {
							var server = $this.$http.defaults.baseURL + '/user/uploadPath'
							var wt = plus.nativeUI.showWaiting()
							var task = plus.uploader.createUpload(server, {
								method: 'post'
							}, function(t, status) {
								if(status === 200) {
									wt.close()
									$this.imgs(JSON.parse(t.responseText).obj)
								} else {
									alert('上传失败：' + status)
									wt.close()
								}
							})
							task.addFile(e.target, {
								name: e.target
							})
							task.start()
						}, function(err) {
							console.log('11')
						})
					}, function(e) {})
				}, function(s) {}, {
					filename: '_doc/head'
				})
			},
			outlogin() {
				let $this = this
				this.$vux.confirm.show({
					title: '提示',
					content: '确定要退出吗?',
					onConfirm() {
						sessionStorage.clear()
						sessionStorage.setItem('token', '')
						$this.$http.defaults.headers.get['token'] = sessionStorage.getItem('token')
						localStorage.removeItem('loginname')
						localStorage.removeItem('loginpwd')
						localStorage.removeItem('loginopenid')
						localStorage.removeItem('userinfos')
						$this.$router.replace('/pub/home')
					}
				})
			},
			actionsheethide() {
				this.actionsheetshow = false
			},
			starUp() {
				this.actionsheetshow = true
			},
			getObjectURL(file) {
				var url = null
				if(window.createObjectURL !== undefined) {
					url = window.createObjectURL(file)
				} else if(window.URL !== undefined) {
					url = window.URL.createObjectURL(file)
				} else if(window.webkitURL !== undefined) {
					url = window.webkitURL.createObjectURL(file)
				}
				return url
			},
			imgs(ulrs) {
				this.actionsheethide()
				if(this.cropper) {
					this.cropper.replace(ulrs)
				}
				this.panel = true
			},
			changes(e) {
				this.actionsheethide()
				let files = e.target.files || e.dataTransfer.files
				if(!files.length) return
				this.panel = true
				this.picValue = files[0]
				this.url = this.getObjectURL(this.picValue)
				if(this.cropper) {
					this.cropper.replace(this.url)
				}
				this.panel = true
			},
			crop() {
				this.panel = false
				var croppedCanvas
				var roundedCanvas
				if(!this.croppable) {
					return
				}
				croppedCanvas = this.cropper.getCroppedCanvas()
				roundedCanvas = this.getRoundedCanvas(croppedCanvas)
				this.headerImage = roundedCanvas.toDataURL()
				this.postImg()
			},
			getRoundedCanvas(sourceCanvas) {
				var canvas = document.createElement('canvas')
				var context = canvas.getContext('2d')
				var width = 100
				var height = 100
				canvas.width = width
				canvas.height = height
				context.imageSmoothingEnabled = true
				context.drawImage(sourceCanvas, 0, 0, width, height)
				context.globalCompositeOperation = 'destination-in'
				context.beginPath()
				//				context.arc(50, 50, 50, 0, 2 * Math.PI, true)
				context.fill()
				return canvas
			},
			postImg() {
				let par = {
					pictrue: this.headerImage
				}
				this.userinfo.avatarUrl = this.headerImage
				var params = new FormData()
				this.$vux.loading.show({
					text: '头像上传中.....'
				})
				params.append('picture', this.headerImage)
				this.$http.post('/user/uploadPicture', params).then(
					(res) => {
						this.$vux.loading.hide()
						if(res.data.result === 0) {
							let info = querystring.parse(localStorage.getItem('userinfos'))
							info.avatarUrl = this.headerImage
							localStorage.setItem('userinfos', querystring.stringify(info))
							this.$vux.alert.show({
								title: '提示!',
								content: '恭喜您上传成功!'
							})
						} else {
							this.$vux.alert.show({
								title: '提示!',
								content: '上传失败,请重试!'
							})
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.actionsheet {
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 998;
		position: fixed;
		ul {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: auto;
			/*background: #EFEFF4;*/
		}
		li {
			background: #fff;
			height: 48px;
			line-height: 49px;
			text-align: center;
			position: relative;
			input {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
		li:last-child {
			margin-top: 6px;
		}
	}
	
	.setuserinfo {
		padding-top: 50px;
	}
	
	.userinfo-list {
		height: auto;
		overflow: hidden;
		background: #fff;
		padding-left: 15px;
		box-sizing: border-box;
		li:first-child {
			height: 75px;
			line-height: 75px;
		}
		li {
			display: flex;
			height: auto;
			overflow: hidden;
			height: 44px;
			padding-right: 15px;
			box-sizing: border-box;
			line-height: 45px;
			position: relative;
			input {
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
			span {
				font-size: 17px;
				flex: 1;
			}
			span:last-child {
				color: #999;
				text-align: right;
			}
			img {
				display: block;
				margin: 5px 0;
				height: 65px;
			}
		}
	}
	
	.button-box {
		position: absolute;
		bottom: 20px;
		width: 100%;
		display: flex;
		li {
			flex: 1;
			text-align: center;
			button {
				width: 100px;
				height: 34px;
				margin: auto;
				border: none;
				background: #fff;
				border-radius: 3px;
			}
		}
	}
	
	#demo .show {
		width: 100px;
		height: 100px;
		overflow: hidden;
		position: relative;
		border-radius: 50%;
		border: 1px solid #d5d5d5;
	}
	
	#demo .picture {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	#demo .container {
		z-index: 99999999999999999999999999;
		position: fixed;
		height: 100vh;
		width: 100%;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 1);
	}
	
	#demo #image {
		max-width: 100%;
	}
	
	.cropper-view-box,
	.cropper-face {
		border-radius: 50%;
	}
	
	.cropper-container {
		font-size: 0;
		line-height: 0;
		position: relative;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		direction: ltr;
		-ms-touch-action: none;
		touch-action: none
	}
	
	.cropper-container img {
		display: block;
		min-width: 0 !important;
		max-width: none !important;
		min-height: 0 !important;
		max-height: none !important;
		width: 100%;
		height: 100%;
		image-orientation: 0deg
	}
	
	.cropper-wrap-box,
	.cropper-canvas,
	.cropper-drag-box,
	.cropper-crop-box,
	.cropper-modal {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	
	.cropper-wrap-box {
		overflow: hidden;
	}
	
	.cropper-drag-box {
		opacity: 0;
		background-color: #fff;
	}
	
	.cropper-modal {
		opacity: .5;
		background-color: #000;
	}
	
	.cropper-view-box {
		display: block;
		overflow: hidden;
		width: 100%;
		height: 100%;
		outline: 1px solid #39f;
		outline-color: rgba(51, 153, 255, 0.75);
	}
	
	.cropper-dashed {
		position: absolute;
		display: block;
		opacity: .5;
		border: 0 dashed #eee
	}
	
	.cropper-dashed.dashed-h {
		top: 33.33333%;
		left: 0;
		width: 100%;
		height: 33.33333%;
		border-top-width: 1px;
		border-bottom-width: 1px
	}
	
	.cropper-dashed.dashed-v {
		top: 0;
		left: 33.33333%;
		width: 33.33333%;
		height: 100%;
		border-right-width: 1px;
		border-left-width: 1px
	}
	
	.cropper-center {
		position: absolute;
		top: 50%;
		left: 50%;
		display: block;
		width: 0;
		height: 0;
		opacity: .75
	}
	
	.cropper-center:before,
	.cropper-center:after {
		position: absolute;
		display: block;
		content: ' ';
		background-color: #eee
	}
	
	.cropper-center:before {
		top: 0;
		left: -3px;
		width: 7px;
		height: 1px
	}
	
	.cropper-center:after {
		top: -3px;
		left: 0;
		width: 1px;
		height: 7px
	}
	
	.cropper-face,
	.cropper-line,
	.cropper-point {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		opacity: .1;
	}
	
	.cropper-face {
		top: 0;
		left: 0;
		background-color: #fff;
	}
	
	.cropper-line {
		background-color: #39f
	}
	
	.cropper-line.line-e {
		top: 0;
		right: -3px;
		width: 5px;
		cursor: e-resize
	}
	
	.cropper-line.line-n {
		top: -3px;
		left: 0;
		height: 5px;
		cursor: n-resize
	}
	
	.cropper-line.line-w {
		top: 0;
		left: -3px;
		width: 5px;
		cursor: w-resize
	}
	
	.cropper-line.line-s {
		bottom: -3px;
		left: 0;
		height: 5px;
		cursor: s-resize
	}
	
	.cropper-point {
		width: 5px;
		height: 5px;
		opacity: .75;
		background-color: #39f
	}
	
	.cropper-point.point-e {
		top: 50%;
		right: -3px;
		margin-top: -3px;
		cursor: e-resize
	}
	
	.cropper-point.point-n {
		top: -3px;
		left: 50%;
		margin-left: -3px;
		cursor: n-resize
	}
	
	.cropper-point.point-w {
		top: 50%;
		left: -3px;
		margin-top: -3px;
		cursor: w-resize
	}
	
	.cropper-point.point-s {
		bottom: -3px;
		left: 50%;
		margin-left: -3px;
		cursor: s-resize
	}
	
	.cropper-point.point-ne {
		top: -3px;
		right: -3px;
		cursor: ne-resize
	}
	
	.cropper-point.point-nw {
		top: -3px;
		left: -3px;
		cursor: nw-resize
	}
	
	.cropper-point.point-sw {
		bottom: -3px;
		left: -3px;
		cursor: sw-resize
	}
	
	.cropper-point.point-se {
		right: -3px;
		bottom: -3px;
		width: 20px;
		height: 20px;
		cursor: se-resize;
		opacity: 1
	}
	
	@media (min-width: 768px) {
		.cropper-point.point-se {
			width: 15px;
			height: 15px
		}
	}
	
	@media (min-width: 992px) {
		.cropper-point.point-se {
			width: 10px;
			height: 10px
		}
	}
	
	@media (min-width: 1200px) {
		.cropper-point.point-se {
			width: 5px;
			height: 5px;
			opacity: .75
		}
	}
	
	.cropper-point.point-se:before {
		position: absolute;
		right: -50%;
		bottom: -50%;
		display: block;
		width: 200%;
		height: 200%;
		content: ' ';
		opacity: 0;
		background-color: #39f
	}
	
	.cropper-invisible {
		opacity: 0;
	}
	
	.cropper-bg {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
	}
	
	.cropper-hide {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
	}
	
	.cropper-hidden {
		display: none !important;
	}
	
	.cropper-move {
		cursor: move;
	}
	
	.cropper-crop {
		cursor: crosshair;
	}
	
	.cropper-disabled .cropper-drag-box,
	.cropper-disabled .cropper-face,
	.cropper-disabled .cropper-line,
	.cropper-disabled .cropper-point {
		cursor: not-allowed;
	}
</style>