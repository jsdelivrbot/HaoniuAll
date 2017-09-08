<template>
	<div>
		<v-header></v-header>

		<div class="set-box">
			<div class="head">
				<img src="../../static/img/ren.jpg"/>
				<span>
					账号设置
				</span>
			</div>

			<div class="info-content-box">
				<div class="top">
					<span>手机号</span>
					<span class="center">
						{{userInfo.mobile}}
					</span>
					<span class="right">
						<span v-if='showid !==1' @click='showid =1'>
							编辑
						</span>
					<span v-if='showid ==1' @click='showid =0'>
							收起
						</span>
					</span>
				</div>

				<div class="body-content" :class="{show:showid == '1'}">

					<p class="tips">
						修改手机号不会改变您的个人信息,下次登录直接使用手机号码登录即可
					</p>

					<div class="div">
						<p>
							<span>
								手机
							</span>
							<input type="text" v-model='phone' name="" id="" value="" />
						</p>
						<p>
							<span>
								验证码
							</span>
							<input type="text" v-model='yzm' name="" id="" value="" />
							<el-button type="info" @click='getYzm()'>获取验证码</el-button>
						</p>
						<div>
							<span>
								
							</span>
							<el-button type="primary" @click='changePhone()'> 确 认</el-button>
						</div>
					</div>
				</div>
			</div>

			<div class="info-content-box">
				<div class="top">
					<span>昵称</span>
					<span class="center">
						{{userInfo.nickname}}
					</span>
					<span class="right">
						<span v-if='showid !==2' @click='showid =2'>
							编辑
						</span>
					<span v-if='showid ==2' @click='showid =0'>
							收起
						</span>
					</span>
				</div>

				<div class="body-content" :class="{show:showid == '2'}">
					<div class="div">
						<p>
							<span>
								昵称
							</span>
							<input type="text" v-model='nickname' name="" id="" value="" />
						</p>
						<div>
							<span>
								
							</span>
							<el-button type="primary" @click='nicknameSet()'> 确 认</el-button>
						</div>

					</div>

				</div>

			</div>

			<div class="info-content-box">
				<div class="top">
					<span>所在地</span>
					<span class="center">
						{{userInfo.address}}
					</span>
					<span class="right">
						<span v-if='showid !==3' @click='showid =3'>
							编辑
						</span>
					<span v-if='showid ==3' @click='showid =0'>
							收起
						</span>
					</span>
				</div>

				<div class="body-content" :class="{show:showid == '3'}">
					<div class="div">
						<p>

							<div>
								<span>
									所在地
								</span>
								<el-cascader @change='changeaddress' :options="address" change-on-select></el-cascader>
							</div>
						</p>
						<div>
							<span>
								
							</span>
							<el-button type="primary" @click='trueaddress()'> 确 认 </el-button>
						</div>
					</div>
				</div>

			</div>

			<div class="info-content-box">
				<div class="top">
					<span>性别</span>
					<span class="center">
						{{userInfo.sex | filterSex}}
					</span>
					<span class="right">
						<span v-if='showid !==4' @click='showid =4'>
							编辑
						</span>
					<span v-if='showid ==4' @click='showid =0'>
							收起
						</span>
					</span>
				</div>

				<div class="body-content" :class="{show:showid == '4'}">
					<div class="div">
						<div style="margin-bottom: 20px;">
							<span>
							</span>
							<el-radio class="radio" v-model="radio" label="1">男</el-radio>
							<el-radio class="radio" v-model="radio" label="2">女</el-radio>
						</div>
						<div>
							<span>
							</span>
							<el-button type="primary" @click='setSex()'> 确 认 </el-button>
						</div>
					</div>
				</div>
			</div>

			<div class="info-content-box">
				<div class="top">
					<span>生日</span>
					<span class="center">
						{{userInfo.birthday}}
					</span>
					<span class="right">
						<span v-if='showid !==5' @click='showid =5'>
							编辑
						</span>
					<span v-if='showid ==5' @click='showid =0'>
							收起
						</span>
					</span>
				</div>

				<div class="body-content" :class="{show:showid == '5'}">
					<div class="div">
						<p>

							<div>
								<span>
									生日
								</span>
								<el-date-picker v-model="birthday" type="date" placeholder="选择日期时间">
								</el-date-picker>
								<!--<el-date-picker v-model="birthday" type="date" format='yyyy' placeholder="选择日期">
								</el-date-picker>-->
							</div>

						</p>
						<div>
							<span>
								
							</span>
							<el-button type="primary" @click='birthdayclick()'> 确 认 </el-button>
						</div>

					</div>

				</div>

			</div>

			<div class="info-content-box">
				<div class="top">
					<span>个性签名</span>
					<span class="center">
						{{userInfo.signature}}
					</span>
					<span class="right">
						<span v-if='showid !==6' @click='showid =6'>
							编辑
						</span>
					<span v-if='showid ==6' @click='showid =0'>
							收起
						</span>
					</span>
				</div>

				<div class="body-content" :class="{show:showid == '6'}">
					<div class="div">
						<p>
							<span>
								个性签名
							</span>
							<input type="text" v-model='gxqm' name="" id="" value="" />
						</p>
						<div>
							<span>
								
							</span>
							<el-button type="primary" @click='changeQM()'> 确 认</el-button>
						</div>

					</div>

				</div>

			</div>

			<div class="info-content-box">
				<div class="top">
					<span>头像</span>
					<span class="center">
						赶紧上传头像吧
					</span>
					<span class="right">
						<span v-if='showid !==7' @click='showid =7'>
							编辑
						</span>
					<span v-if='showid ==7' @click='showid =0'>
							收起
						</span>
					</span>
				</div>

				<div class="body-content" :class="{show:showid == '7'}">
					<el-upload action="https://upload.qbox.me" :on-remove="imgRemove" :on-error='upError' :data='imgToken' :on-success="imgSuc" :before-upload="bfimg" list-type="picture-card">
						<i class="el-icon-plus"></i>
					</el-upload>

					<div style="margin-top: 20px;">
						<span>
								
							</span>
						<el-button type="primary" @click='headerImg()'> 确 认 上 传</el-button>
					</div>
				</div>

			</div>

		</div>

	</div>
</template>
<script>
    import Header from '@/components/header'
    export default {
        components: {
            'v-header': Header
        },
        data() {
            return {
                enHttp: localStorage.getItem('http'),
                showid: 1,
                radio: '',
                imgToken: {
                    token: '' //获取上传的token
                },
                userInfo: [],
                imgList: [],
                gxqm: '',
                phone: '',
                nickname: '',
                yzm: '',
                address: [],
                addressnow: '',
                birthday: ''
            }
        },
        mounted() {
            this.token = sessionStorage.getItem('token')
            let token = this.token
            this.$http({
                url: this.enHttp + '/mobile/user/info',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    this.userInfo = res.data.data
                    console.log(this.userInfo)
                    this.radio = this.userInfo.sex.toString()
                }
            )
            this.$http.get('static/js/address.json').then((response) => {
                this.address = response.data
                    //				console.log(response.data)
            }, (response) => {})

            this.getToken()
        },
        methods: {
            birthdayclick() {
                var d = new Date(this.birthday)
                let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
                    //console.log(youWant)
                this.$http({
                    url: this.enHttp + '/mobile/user/updateBirthday?birthday=' + youWant,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        let $this = this
                        if (res.data.success) {
                            this.$notify({
                                title: '成功',
                                message: res.data.msg,
                                type: 'success',
                                duration: 1000,
                                onClose: function() {
                                    $this.$router.go(0)
                                }
                            })
                        } else {
                            this.$notify({
                                title: '失败!',
                                message: res.data.msg,
                                type: 'error',
                                duration: 1000
                            })
                        }
                    }
                )
            },
            trueaddress() {
                if (this.addressnow === '') {
                    this.$notify({
                        title: '失败!',
                        message: '请选择您所在的城市!',
                        type: 'error',
                        duration: 1000
                    })
                    return false
                }
                this.$http({
                    url: this.enHttp + '/mobile/user/updateAddress?address=' + this.addressnow,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        let $this = this
                        if (res.data.success) {
                            this.$notify({
                                title: '成功!',
                                message: '修改成功!',
                                type: 'success',
                                duration: 1000,
                                onClose() {
                                    $this.$router.go(0)
                                }
                            })
                        }
                    }
                )
            },
            changeaddress(val) {
                this.addressnow = val
            },
            changePhone() {
                if (this.phone.length !== 11) {
                    this.$message({
                        showClose: true,
                        message: '请输入正确的手机号码!',
                        duration: 800,
                        type: 'error'
                    })
                    return false
                }

                if (this.yzm.length !== 4) {
                    this.$message({
                        showClose: true,
                        message: '请输入正确的验证码!',
                        duration: 800,
                        type: 'error'
                    })
                    return false
                }

                this.$http({
                    url: this.enHttp + '/mobile/user/updatePhone?phone=' + this.phone + '&code=' + this.yzm,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        let $this = this
                        if (res.data.success) {
                            this.$notify({
                                title: '成功',
                                message: res.data.msg,
                                type: 'success',
                                duration: 1000,
                                onClose: function() {
                                    $this.$router.go(0)
                                }
                            })
                        } else {
                            this.$notify({
                                title: '失败!',
                                message: res.data.msg,
                                type: 'error',
                                duration: 1000,
                                onClose: function() {
                                    //									$this.$router.go(0)
                                }
                            })
                        }
                    }
                )
            },
            getYzm() {
                if (!this.phone.length >= 11) {
                    this.$message({
                        showClose: true,
                        message: '请输入正确的手机号码!',
                        duration: 800,
                        type: 'error'
                    })
                } else {
                    this.$http.get(this.enHttp + '/mobile/mobileCode?tyep=1&phone=' + this.phone).then(
                        (res) => {
                            //console.log(res.data)
                            if (res.data.success) {
                                this.$message({
                                    showClose: true,
                                    duration: 1000,
                                    message: '获取验证码成功!请及时查看手机上的验证码!',
                                    type: 'success'
                                })
                            } else {
                                this.$message({
                                    showClose: true,
                                    duration: 1000,
                                    message: '获取验证码失败!请重试!',
                                    type: 'error'
                                })
                            }
                        }
                    )
                }
            },
            nicknameSet() {
                this.$http({
                    url: this.enHttp + '/mobile/user/updateNickname?nickname=' + this.nickname,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        let $this = this
                        if (res.data.success) {
                            this.$notify({
                                title: '成功',
                                message: res.data.msg,
                                type: 'success',
                                duration: 1000,
                                onClose: function() {
                                    $this.$router.go(0)
                                }
                            })
                        } else {
                            this.$notify({
                                title: '失败!',
                                message: res.data.msg,
                                type: 'error',
                                duration: 1000,
                                onClose: function() {
                                    $this.$router.go(0)
                                }
                            })
                        }
                    }
                )
            },
            setSex() {
                this.$http({
                    url: this.enHttp + '/mobile/user/updateSex?sex=' + this.radio,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        let $this = this
                        if (res.data.success) {
                            this.$notify({
                                title: '成功',
                                message: res.data.msg,
                                type: 'success',
                                duration: 1000,
                                onClose: function() {
                                    $this.$router.go(0)
                                }
                            })
                        } else {
                            this.$notify({
                                title: '失败!',
                                message: res.data.msg,
                                type: 'error',
                                duration: 1000,
                                onClose: function() {
                                    $this.$router.go(0)
                                }
                            })
                        }
                    }
                )
            },
            changeQM() {
                if (this.gxqm.length <= 0) {
                    this.$notify({
                        title: '失败!',
                        message: '请输入您的个性签名!',
                        type: 'error',
                        duration: 1000
                    })
                    return false
                }

                this.$http({
                    url: this.enHttp + '/mobile/user/updateSignature?signature=' + this.gxqm,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        let $this = this
                        if (res.data.success) {
                            this.$notify({
                                title: '成功',
                                message: res.data.msg,
                                type: 'success',
                                duration: 1000,
                                onClose: function() {
                                    $this.$router.go(0)
                                }
                            })
                        } else {
                            this.$notify({
                                title: '失败!',
                                message: res.data.msg,
                                type: 'error',
                                duration: 1000,
                                onClose: function() {
                                    $this.$router.go(0)
                                }
                            })
                        }
                    }
                )
            },
            headerImg() {
                let imglist = ''

                if (this.imgList.length <= 0) {
                    this.$notify({
                        title: '失败!',
                        message: '请选择图片',
                        type: 'error',
                        duration: 1000
                    })
                    return false
                }

                for (var i = 0; i < this.imgList.length; i++) {
                    //console.log(this.imgList[i].response)
                    imglist += 'targetUrl=' + this.imgList[i].response.key + '&targetHash=' + this.imgList[i].response.hash
                }

                this.$http({
                    url: this.enHttp + '/mobile/user/uploadUserFace?' + imglist,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        let $this = this

                        if (res.data.success) {
                            this.$notify({
                                title: '成功',
                                message: res.data.msg,
                                type: 'success',
                                duration: 1000,
                                onClose: function() {
                                    $this.$router.go(0)
                                }
                            })
                        } else {
                            this.$notify({
                                title: '失败!',
                                message: res.data.msg,
                                type: 'error',
                                duration: 1000,
                                onClose: function() {
                                    $this.$router.go(0)
                                }
                            })
                        }
                    }
                )
            },
            upError() {
                this.$message({
                    type: 'error',
                    message: '上传失败,请重试!',
                    duration: 1000
                })
            },
            imgRet(file) {},
            imgSuc(response, file, fileList) {
                this.imageUrl = URL.createObjectURL(file.raw)
                this.imgList = fileList
                this.$message({
                        type: 'success',
                        message: '上传成功!',
                        duration: 1000
                    })
                    //console.log(this.imgList)
            },
            bfimg(file) {
                if (this.imgList.length > 4) {
                    this.$message({
                        type: 'error',
                        message: '上传失败,最多只能上传4张图片!',
                        duration: 1000
                    })
                    return false
                } else {
                    this.getToken()
                }
            },
            getToken() {
                this.$http.get(this.enHttp + '/mobile/qiniuUploadToken?type=1').then(
                    (res) => {
                        if (res.data.success) {
                            this.imgToken.token = res.data.data.token
                        } else {
                            return false
                        }
                        //console.log(res.data.data.token)
                    }
                )
            },
            imgRemove(file, fileList) {
                this.imgList = fileList
                    //console.log(this.imgList)
            }
        },
        filters: {
            filterSex(val) {
                if (val === 1) {
                    return '男'
                } else {
                    return '女'
                }
            }
        }
    }
</script>
<style lang="less">
    .set-box {
        width: 1000px;
        margin: 60px auto;
        height: auto;
        background: #fff;
        border: 1px solid #d1d3d6;
        padding: 6px 20px;
        box-sizing: border-box;
        overflow: hidden;
        .head {
            height: 50px;
            line-height: 50px;
            display: flex;
            img {
                margin-right: 10px;
            }
            span {
                font-size: 17px;
            }
        }
        .info-content-box {
            background: #fafafa;
            border: 1px solid #e0e0e0;
            height: auto;
            overflow: hidden;
            margin-bottom: 10px;
            .top {
                height: 40px;
                line-height: 40px;
                display: flex;
                padding: 0 20px;
                font-size: 17px;
                box-sizing: border-box;
                span {
                    flex: 1;
                }
                .center {
                    text-align: center;
                    color: #8b8b8b;
                }
                .right {
                    text-align: right;
                    color: #3b5998;
                    cursor: pointer;
                }
            }
            .show {
                padding: 20px !important;
                height: auto !important;
                opacity: 1 !important;
            }
            .body-content {
                padding: 0px 20px;
                box-sizing: border-box;
                height: auto;
                height: 0;
                overflow: hidden;
                opacity: 0;
                transition: all .5s ease-in-out;
                .tips {
                    color: #858585;
                    margin-bottom: 20px;
                }
                .div {
                    height: auto;
                    overflow: hidden;
                    max-width: 500px;
                    p {
                        height: 50px;
                        /*line-height: 50px;*/
                        display: flex;
                        margin-bottom: 10px;
                        >span,
                        div {
                            width: 100px;
                            line-height: 50px;
                            margin-right: 10px;
                            text-align: right;
                        }
                        >input {
                            height: 36px;
                            margin: 7px 0;
                            flex: 1;
                            border: 1px solid #dcdcdc;
                            outline: none;
                            border-radius: 4px;
                            text-indent: 15px;
                        }
                        >button {
                            height: 36px;
                            margin: 7px 0 7px 20px;
                        }
                    }
                    >div {
                        padding-left: 110px;
                    }
                }
            }
        }
    }
</style>