<template>
	<div class="sure-sign-in-box">
		<v-header title="确认签收"></v-header>
		<div class="content" v-show="!img">
			<p>您还未上传任何照片，点击下方按钮新增</p>
			<div class="btn">
				增加
				<input type="file" @change="fileChanged" ref="file">
				<img :src="img" />
			</div>
		</div>
		<div class="imgList" v-show="img">
			<div class="img">
				<img :src="img" />
				<x-icon type="ios-close" size="60" @click.native="deleteImg"></x-icon>
			</div>
			<div class="btn" @click="sure">
				<span>确认修改</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	export default {
		data() {
			return {
				img: '',
				token: sessionStorage.getItem('token')
			}
		},
		components: {
			'v-header': Header
		},
		created() {
			console.log(this.img)
			this.img = sessionStorage.getItem('signInImg')
		},
		methods: {
			fileChanged() {
				this.$vux.loading.show({
					text: '正在读取图片'
				})
				const img = this.$refs.file.files[0]
				const reader = new FileReader()
				reader.onload = (e) => {
					let base64 = e.target.result
					console.log(base64)
					this.$http.post('waybill/html/post/v1/sign_img_upload?token=' + this.token, {
						data: {
							file_stream: base64,
							file_name: img.name,
							file_type: img.type
						}
					}).then((res) => {
						if(res.data.result.reCode === '0') {
							this.img = res.data.data.sign_img_url
							this.$vux.loading.hide()
						}
					})
				}
				reader.readAsDataURL(img)
			},
			deleteImg() {
				sessionStorage.removeItem('signInImg')
				this.img = ''
			},
			sure() {
				sessionStorage.setItem('signInImg', this.img)
				this.$router.back(-1)
			}
		}
	}
</script>

<style lang="less">
	.sure-sign-in-box {
		padding-top: 45px;
		/*height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;*/
		.content {
			margin-top: 200px;
			p {
				text-align: center;
				font-size: 16px;
			}
			.btn {
				width: 124px;
				height: 34px;
				background-color: #63bffe;
				color: white;
				text-align: center;
				line-height: 34px;
				font-size: 16px;
				margin: 0 auto;
				border-radius: 14px;
				position: relative;
				margin-top: 40px;
				input {
					position: absolute;
					left: 0;
					top: 0;
					width: 124px;
					height: 34px;
					opacity: 0;
				}
			}
		}
		.imgList {
			padding-top: 45px;
			.img {
				width: 200px;
				height: 200px;
				margin: 64px auto;
				display: block;
				position: relative;
				img {
					width: 200px;
					height: 200px;
				}
				.vux-x-icon {
					fill: #C7C7C7;
					position: absolute;
					right: -30px;
					top: -30px;
				}
			}
			.btn {
				width: 68%;
				height: 36px;
				background-color: #ffce4e;
				margin: 50px auto 18px;
				text-align: center;
				color: white;
				line-height: 36px;
				border-radius: 18px;
				font-size: 16px;
			}
		}
	}
</style>