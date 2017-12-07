<template>
	<section class="userSet-box">
		<v-header title="个人设置"></v-header>
		<ul class="item_list">
			<li class="user_avatar vux-1px-b" @click="showActionSheet">
				<span>我的头像</span>
				<div>
					<img :src="userInfo.headImg" />
				</div>
				<i>
					<img src="./img/youla@3x.png"/>
				</i>
			</li>

			<li class="vux-1px-b" @click="goRouter('/changeName')">
				<span>我的昵称</span>
				<div>
					{{userInfo.nickName!==""?userInfo.nickName:'匿名'}}
				</div>
				<i>
					<img src="./img/youla@3x.png"/>
				</i>
			</li>

			<li class="vux-1px-b">
				<span>手机号</span>
				<div>
					{{userInfo.phone}}
				</div>
				<i>
					<img src="./img/youla@3x.png"/>
				</i>
			</li>

			<li class="vux-1px-b" @click="goRouter('/changePwd')">
				<span>设置密码</span>
				<div>
				</div>
				<i>
					<img src="./img/youla@3x.png"/>
				</i>
			</li>
		</ul>
		<!--<actionsheet v-model="showActionsheet" @on-click-menu-selectPic='selectPic' @on-click-menu-takePhoto='takePhoto' :menus="menus" show-cancel></actionsheet>-->
		<div class="global_btn_wrapper">
			<p class="btn active" @click="out">退出登录</p>
		</div>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	import { TransferDom, Actionsheet } from 'vux'
	export default {
		name: 'nokeep',
		components: {
			'v-header': Header,
			Actionsheet
		},
		directives: {
			TransferDom
		},
		data() {
			return {
				userInfo: JSON.parse(localStorage.getItem('userInfo')),
				showActionsheet: false,
				menus: {
					takePhoto: '拍照',
					selectPic: '相册选择'
				}
			}
		},
		mounted() {
			mui.plusReady(function() {
				var bacc = plus.webview.defauleHardwareAccelerated()
				alert(bacc)
			})
		},
		methods: {
			showActionSheet() {
				this.$createActionSheet({
					title: '头像选择',
					data: [{
							content: '拍照'
						},
						{
							content: '相册选择'
						}
					],
					onSelect: (item, index) => {
						if(index === 0) {
							this.takePhoto()
						} else {
							this.selectPic()
						}
					}
				}).show()
			},
			takePhoto() {
				let $this = this
				this.$CgetCamera((path) => {
					let url = localStorage.getItem('http') + 'api/user/modifyImg?token=' + sessionStorage.getItem('token')
					$this.$CuploadImg(url, path, function(res) {
						if(res.result === 0) {
							$this.$set($this.userInfo, 'headImg', res.obj)
							localStorage.setItem('userInfo', JSON.stringify($this.userInfo))
						} else {
							mui.toast('上传失败')
						}
					})
				})
			},
			selectPic() {
				let $this = this
				this.$CgetGallery((path) => {
					let url = localStorage.getItem('http') + 'api/user/modifyImg?token=' + sessionStorage.getItem('token')
					$this.$CuploadImg(url, path, function(res) {
						if(res) {
							$this.$set($this.userInfo, 'headImg', res.obj)
							localStorage.setItem('userInfo', JSON.stringify($this.userInfo))
						} else {
							mui.toast('上传失败')
						}
					})
				})
			},
			goRouter(path) {
				this.$router.push(path)
			},
			out() {
				sessionStorage.clear()
				localStorage.removeItem('autoLogin')
				this.$router.replace('/login')
			}
		}
	}
</script>
<style lang="less">
	.userSet-box {
		padding-top: 68px;
		box-sizing: border-box;
		background: #fff;
		.item_list {
			height: auto;
			overflow: hidden;
			.user_avatar {
				padding: 8px 10px;
				height: 66px;
				box-sizing: border-box;
				display: flex;
				color: #363636;
				font-size: 14px;
				span {
					flex: 1;
					line-height: 50px;
				}
				div {
					margin-right: 15px;
					height: 50px;
					line-height: 50px;
					color: #888888;
					img {
						width: 50px;
						height: 50px;
						border-radius: 50%;
					}
				}
				i {
					img {
						margin: 20px 0;
						height: 10px;
					}
				}
			}
			li {
				padding: 8px 10px;
				height: 56px;
				box-sizing: border-box;
				display: flex;
				color: #363636;
				font-size: 14px;
				span {
					flex: 1;
					line-height: 40px;
				}
				div {
					margin-right: 15px;
					height: 40px;
					line-height: 40px;
					color: #888888;
					img {
						width: 50px;
					}
				}
				i {
					img {
						margin: 15px 0;
						height: 10px;
					}
				}
			}
		}
	}
</style>