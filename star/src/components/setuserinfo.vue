<template>
	<div class="setuserinfo">
		<topbar title='设置'></topbar>
		<ul class="userinfo-list">
			<li class='vux-1px-b' @click="starUp">
				<!--<input type="file" id="change" ref='uploads' accept="image" @change="changes">-->
				<span>头像</span>
				<img :src="userinfo.avatarUrl" v-if='userinfo.avatarUrl' />
				<img src="../../static/img/loginlogo.png" v-if='!userinfo.avatarUrl' />
			</li>
			<router-link tag='li' class='vux-1px-b' to='/resetusername'>
				<span>用户名</span>
				<span>{{userinfo.nickname}}</span>
			</router-link>
			<li class="vux-1px-b">
				<span>手机号码</span>
				<span>{{userinfo.phone}}</span>
			</li>
		</ul>

		<group>
			<cell title='修改密码' link='/resetpassword' is-link></cell>
		</group>
		<group>
			<cell title='关于我们' link='/about' is-link></cell>
			<cell title='建议与反馈' link='/feedback' is-link></cell>
		</group>

		<group>
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
				<li class="vux-1px-b">
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
	import topbar from '../components/callback'
	export default {
		components: {
			topbar,
			Cell,
			Group
		},
		data() {
			return {
				actionsheetshow: false,
				localhttp: localStorage.getItem('localhttp'),
				userinfo: querystring.parse(localStorage.getItem('userinfos')),
				headerImage: '',
				picValue: '',
				cropper: '',
				croppable: false,
				panel: false,
				url: ''
			}
		},
		activated() {
			this.userinfo = querystring.parse(localStorage.getItem('userinfos'))
		},
		mounted() {
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
				console.log(this.cropper)
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
						localStorage.setItem('userinfos', querystring.stringify(res.data.obj))
						this.$vux.loading.hide()
						if(res.data.result === 0) {
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
						console.log(res.data)
					}
				)
			},
			outlogin() {
				let $this = this
				this.$vux.confirm.show({
					title: '提示',
					content: '确定要退出吗?',
					onConfirm() {
						sessionStorage.clear()
						$this.$http.defaults.headers.get['token'] = sessionStorage.setItem('token', '')
						localStorage.removeItem('childrenInfo')
						localStorage.removeItem('loginname')
						localStorage.removeItem('loginpwd')
						localStorage.removeItem('loginopenid')
						$this.$router.replace('/pub/home')
					},
					onCancel() {
						console.log('plugin confirm')
					}
				})
			}
		}
	}
</script>
<style lang="less">
	.setuserinfo {
		padding-top: 50px;
		.actionsheet {
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, 0.5);
			z-index: 99999999999;
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
</style>