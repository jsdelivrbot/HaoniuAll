<template>
	<div class="perfect-box">
		<div class="main">
			<v-header title="修改个人资料"></v-header>
			<div class="avatar">
				<div>
					<img :src="avatar.link" />
				</div>
			</div>
			<div class="avatar-btn">
				<input type="file" value="test" style="background-color: white;" @change="getImgInfo" ref="imgFile" />
				<p>上传头像</p>
			</div>
			<group>
				<cell title="账号" :value="phone"></cell>
				<!--<cell title="昵称" value="默默"></cell>-->
				<x-input title="昵称" type="text" v-model="username" style="font-size: 14px;" text-align="right" :show-clear="false"></x-input>
				<!--<datetime title="出生年月" :min-year="1900" :max-year="2017" 
					placeholder="请选择" style="font-size: 14px;" default-selected-value="1995-03-24"
					year-row="{value}年" month-row="{value}月" day-row="{value}日"></datetime>-->
				<!--<cell is-link>
					<span slot="title">
	        			头像
					</span>
					<span slot="value">
						<span class="chooseImg">
							<span>上传头像</span>
					<input type="file" value="test" style="background-color: white;" />
					</span>
					</span>
				</cell>-->
				<cell is-link @click.native="isShow = true">
					<span slot="title">
        			<span>性别</span> &nbsp;
					<!--<span style="color: #e60012; vertical-align: middle;">*</span>-->
					</span>
					<span slot="value">
						{{sex}}
					</span>
				</cell>
				<cell is-link @click.native="isShow = true">
					<span slot="title">
        			<span>年龄区间</span> &nbsp;
					<!--<span style="color: #e60012; vertical-align: middle;">*</span>-->
					</span>
					<span slot="value">
						{{age}}
					</span>
				</cell>
				<cell is-link @click.native="isShow = true">
					<span slot="title">
        			<span>行业</span> &nbsp;
					<!--<span style="color: #e60012; vertical-align: middle;">*</span>-->
					</span>
					<span slot="value">
						{{work}}
					</span>
				</cell>
				<cell is-link @click.native="isShow = true">
					<span slot="title">
	        			<span>兴趣爱好</span> &nbsp;
					<!--<span style="color: #e60012; vertical-align: middle;">*</span>-->
					</span>
					<span slot="value" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block; width: 200px;">
						{{hobby}}
					</span>
				</cell>
			</group>
			<p class="detail">完善资料做有身份的人，更能彰显自己的价值！<br/> 资料越全面，商家越愿意给您派发广告！
				<br/> 资料越真实，广告的效果会越好，您的收益才会越高！
			</p>
		</div>
		<div class="footer" @click="updateInfo">
			完成
		</div>
		<!--<transition name="slide">-->
		<perfect-more @cancelShow="cancelShow" v-show="isShow" @save="save" :sex="sex" :age="age" :work="work" :hobby="hobby"></perfect-more>
		<!--</transition>-->
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import PerfectMore from '@/components/usercenter/perfect/PerfectMore'
	import { Group, Cell, PopupPicker, Datetime, XInput } from 'vux'
	export default {
		components: {
			'v-header': Header,
			Group,
			Cell,
			PerfectMore,
			PopupPicker,
			Datetime,
			XInput
		},
		created() {
			if(!localStorage.getItem('avatar')) {
				this.avatar.link = '../../../../static/usercenter/avatar.png'
			} else {
				let res = localStorage.getItem('avatar').substring(0, 4)
				if(res === 'http') {
					this.avatar.link = localStorage.getItem('avatar')
				} else {
					this.avatar.link = localStorage.getItem('httpUrl') + localStorage.getItem('avatar')
				}
			}
		},
		computed: {
			phone() {
				let mobile = localStorage.getItem('mobile')
				if(!mobile || mobile === 'null') {
					return ''
				}else {
					return mobile
				}
			}
		},
		methods: {
			cancelShow() {
				this.isShow = false
			},
			save(chosenList) {
				this.isShow = false
				if(!chosenList[0]) {
					this.sex = '请选择'
				} else {
					this.sex = chosenList[0]
				}
				if(!chosenList[1]) {
					this.age = '请选择'
				} else {
					this.age = chosenList[1]
				}
				if(!chosenList[2]) {
					this.work = '请选择'
				} else {
					this.work = chosenList[2]
				}
				if(chosenList[3].length === 0) {
					this.hobby = '请选择'
				} else {
					this.hobby = chosenList[3].join(',')
				}
			},
			getImgInfo() {
				this.$vux.loading.show({
					text: '正在读取图片'
				})
				const img = this.$refs.imgFile.files[0]
				this.$refs.imgFile.value = ''
				const formData = new FormData()
				const config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				formData.append('file', img)
				this.$http.post('getData/index.php?m=home&c=Form&a=imgUpload', formData, config)
					.then((res) => {
						console.log(res)
						if(res.data.datastatus === 1) {
							this.avatar.link = localStorage.getItem('httpUrl') + res.data.data.link
							this.avatar.img = res.data.data.img
							this.updateAvatar(res.data.data.link)
						} else {
							this.$vux.toast.text(res.data.data.message)
						}
						this.$vux.loading.hide()
					})
			},
			updateAvatar(src) {
				this.$http.get('getData/index.php?m=home&c=Form&a=usercenter_ChangeAvatar', {
					params: {
						seachdata: {
							avatar: this.avatar.img
						}
					}
				}).then((res) => {
					if(res.data.datastatus === 1) {
						this.$vux.toast.text('上传成功')
						localStorage.setItem('avatar', src)
						this.$router.back(-1)
					}
				})
			},
			updateInfo() {
				this.$vux.loading.show({
					text: '正在修改'
				})
				this.$http.get('getData/index.php?m=home&c=Form&a=usercenter_ChangeInfo', {
					params: {
						seachdata: {
							nickname: this.username,
							sex_type: this.sex,
							age_area: this.age,
							hy_area: this.work,
							hbt_list: this.hobby
						}
					}
				}).then((res) => {
					this.$vux.loading.hide()
					if(res.data.datastatus === 1) {
						localStorage.setItem('sex_type', this.sex)
						localStorage.setItem('age_area', this.age)
						localStorage.setItem('hy_area', this.work)
						localStorage.setItem('hbt_list', this.hobby)
						localStorage.setItem('nickname', this.username)
						this.$vux.toast.text('修改成功')
						this.$router.go(-1)
					} else {
						this.$vux.toast.text(res.data.message)
					}
				})
			}
			//			updateAll() {
			//				let $this = this
			//				this.$http.all([this.updateAvatar(), this.updateInfo()])
			//					.then(this.$http.spread(function(res1, res2) {
			//						if(res1.data.datastatus === 1 && res2.data.datastatus === 1) {
			//							localStorage.setItem('sex_type', $this.sex)
			//							localStorage.setItem('age_area', $this.age)
			//							localStorage.setItem('hy_area', $this.work)
			//							localStorage.setItem('hbt_list', $this.hobby)
			//							localStorage.setItem('avatar', $this.avatar.link)
			//							//							console.log(this)
			//							$this.$vux.toast.text('修改成功')
			//							$this.$router.back(-1)
			//						} else {
			//							$this.$vux.toast.text('上传失败')
			//						}
			//					}))
			//			}
		},
		beforeRouteLeave(to, from, next) {
			this.$vux.loading.hide()
			next()
		},
		data() {
			return {
				isShow: false,
				sex: localStorage.getItem('sex_type') || '请选择',
				age: localStorage.getItem('age_area') || '请选择',
				work: localStorage.getItem('hy_area') || '请选择',
				hobby: localStorage.getItem('hbt_list') || '请选择',
				username: localStorage.getItem('nickname'),
				avatar: {
					link: '',
					img: ''
				}
			}
		}
		//		computed: {
		//			avatar() {
		//				if(!localStorage.getItem('avatar')) {
		//					return '../../../../static/avatar.png'
		//				} else {
		//					return localStorage.getItem('httpUrl') + localStorage.getItem('avatar')
		//				}
		//			}
		//		}
	}
</script>

<style lang="less">
	.perfect-box {
		.main {
			/*min-height: 100vh;*/
			padding-top: 44px;
			padding-bottom: 88px;
			/*box-sizing: border-box;*/
			.avatar {
				width: 100%;
				height: 140px;
				display: flex;
				justify-content: center;
				align-items: center;
				&>div {
					width: 100px;
					height: 100px;
					border-radius: 50%;
					background-color: #999999;
					overflow: hidden;
					display: flex;
					justify-content: center;
					align-items: center;
					img {
						width: 100%;
					}
				}
			}
			.avatar-btn {
				position: relative;
				p {
					text-align: center;
					height: 26px;
					line-height: 26px;
					width: 30%;
					margin: 0 auto;
					/*margin: -48px 25px 16px;*/
					background-color: #e60012;
					color: white;
					font-size: 14px;
					border-radius: 6px;
				}
				input {
					position: absolute;
					width: 30%;
					height: 26px;
					left: 50%;
					transform: translateX(-50%);
					opacity: 0;
				}
			}
			.vux-label {
				font-size: 14px;
				color: #333333;
			}
			.weui-cell__ft {
				font-size: 14px;
				color: #afafaf;
			}
			.detail {
				font-size: 12px;
				color: #8b8b8b;
				text-align: center;
				line-height: 24px;
				margin-top: 24px;
			}
			.weui-label {
				color: #333333;
			}
			/*.weui-cell__bd {
				input {
					color: #afafaf;
				}
			}*/
			.weui-cell {
				.chooseImg {
					span,
					input {
						position: absolute;
						width: 300px;
						height: 20px;
						right: 10px;
						top: -10px;
						display: block;
					}
					input {
						opacity: 0;
					}
				}
			}
		}
		.footer {
			text-align: center;
			height: 32px;
			line-height: 32px;
			margin: -48px 25px 16px;
			background-color: #e60012;
			color: white;
			font-size: 18px;
			border-radius: 6px;
		}
		.slide-enter-active,
		.slide-leave-active {
			transition: all .5s;
		}
		.slide-enter,
		.slide-leave-to {
			transform: translateX(100%);
			/*opacity: 0;*/
		}
	}
</style>