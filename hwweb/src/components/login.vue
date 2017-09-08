<template>
	<div style="min-height: 100vh;padding-bottom: 60px;box-sizing: border-box;">
		<div class="header-login">
			<div class="content">
				<div class="logo">
					<img src="../../static/img/logo.png" style="height: 70px;margin: 15px 0;" />
				</div>
				<div class="login-box">
					<div class="login-info">
						<p>输入手机号</p>
						<input tabindex="1" type="text" v-model='loginName' name="" id="" value="" />
						<p><input tabindex="3" type="checkbox" name="" id="" value="" />记住账号</p>
					</div>

					<div class="login-info">
						<p>输入密码</p>
						<input tabindex="2" type="password" v-model='loginPassword' name="" id="" value="" />
						<p>
							<a href="javascript:;">忘记密码?</a>
						</p>
					</div>

					<div class="login-btn">
						<p>
							<a href="javascript:;" @click='login'>登录</a>
						</p>
					</div>

					<div class="login-weixin">
						<a href="javascript:;">
							<img src="../../static/img/weixinlogin.jpg" />
						</a>
					</div>
				</div>
			</div>
		</div>

		<div class="reg-box-warp">
			<div class="reg-box-bg">
				<img src="../../static/img/wallhaven-138220.jpg" />
			</div>

			<div class="content-warp">
				<div class="reg-box">
					<h1>注册新用户</h1>
					<label for="">
						<input type="text" name="" id="" value="" placeholder="输入手机号" v-model='regUsername' />
					</label>
					<label for="">
						<input type="text" name="" id=""  v-model='regCode'  value="" placeholder="输入手机验证码" />
						<a href="javascript:;" @click='getCode' >获取验证码{{codeTimejs}}</a>
					</label>
					<label for="">
						<input type="password" name="" id=""  v-model='regPwd'  value="" placeholder="输入密码" />
					</label>
					<label for="">
						<input type="password" name="" id="" value=""  v-model='regRePwd'  placeholder="再次输入密码" />
					</label>

					<p>
						点击注册代表您已经阅读并且同意
						<a href="javascript:;">好问使用安全协议</a>
					</p>

					<button @click='goReg'>注册</button>

					<div style="display: block;height: 40px;line-height: 40px;text-align: center;">
						<router-link to='/reg'>
							机构注册?点击这里
						</router-link>
					</div>

				</div>
			</div>
		</div>

		<div class="footer">
			<!--<ul>
				<li>
					<a href="javascript:;">关于好问</a>
				</li>
				<li>
					<a href="javascript:;">服务条款</a>
				</li>
				<li>
					<a href="javascript:;">广告服务</a>
				</li>
				<li>
					<a href="javascript:;">帮助中心</a>
				</li>
				<li>
					<a href="javascript:;">好问客服</a>
				</li>
				<li>
					<a href="javascript:;">商务合作</a>
				</li>
				<li>
					<a href="javascript:;">网站导航</a>
				</li>
			</ul>

			<p>
				<span>地址:安徽合肥西湖国际广场A座1208室</span>
				<span>电话:0551-88888888</span>
			</p>-->

			<p>
				好问 2017
			</p>

		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                enHttp: localStorage.getItem('http'),
                loginName: '',
                loginPassword: '',
                regUsername: '',
                regCode: '',
                regPwd: '',
                regRePwd: '',
                codeTime: ''
            }
        },
        computed: {
            codeTimejs: function() {
                if (this.codeTime >= 1) {
                    return '(' + this.codeTime + ')'
                } else {
                    if (this.codeTime === 0) {
                        return ''
                    }
                    return this.codeTime
                }
            }
        },
        mounted() {
            if (sessionStorage.getItem('token') !== null) {
                this.$router.push('/pub/index')
                this.$message({
                    message: '请勿重复登录',
                    type: 'warning'
                })
            }
        },
        methods: {
            fncodeTime() {
                let _this = this
                if (_this.codeTime === '') {
                    _this.codeTime = 60 //倒计时秒数设置
                    var abcd = setInterval(function() {
                        if (_this.codeTime <= 0) {
                            _this.codeTime = ''
                            clearInterval(abcd)
                        } else {
                            _this.codeTime -= 1
                        }
                    }, 1000)
                }
            },
            getCode() {
                if (this.codeTime > 0) {
                    this.$message({
                        showClose: true,
                        duration: 1000,
                        message: '已发送请求,请注意查看手机短信!',
                        type: 'error'
                    })
                    return false
                }
                this.fncodeTime()
                let re = /^1\d{10}$/
                if (!re.test(this.regUsername)) {
                    this.$message({
                        showClose: true,
                        message: '请输入正确的手机号码!',
                        duration: 800,
                        type: 'error'
                    })
                } else {
                    this.$http.get(this.enHttp + '/mobile/mobileCode?tyep=1&phone=' + this.regUsername).then(
                        (res) => {
                            //console.log(res.data)
                            if (res.data.success) {
                                this.$message({
                                    showClose: true,
                                    duration: 800,
                                    message: '获取验证码成功!请及时查看手机上的验证码!',
                                    type: 'success'
                                })
                            } else {
                                this.$message({
                                    showClose: true,
                                    duration: 800,
                                    message: '获取验证码失败!请重试!',
                                    type: 'error'
                                })
                            }
                        }
                    )
                }
            },
            login() {
                if (this.loginName === '') {
                    this.$message({
                        showClose: true,
                        message: '请输入用户名!',
                        duration: 800,
                        type: 'error'
                    })
                    return false
                }
                this.$http.get(this.enHttp + '/mobile/login?phone=' + this.loginName + '&password=' + this.loginPassword).then(
                    (res) => {
                        if (res.data.success) {
                            //console.log(res.data)
                            let _this = this
                            sessionStorage.setItem('token', res.data.data.token)
                            sessionStorage.setItem('username', res.data.data.username)
                            sessionStorage.setItem('pws', res.data.data.password)
                            this.$message({
                                message: '登录成功!',
                                type: 'success',
                                duration: 1000,
                                onClose: function() {
                                    //console.log(res.data.data.token)
                                    _this.$router.push('/pub/index')
                                }
                            })
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            })
                        }
                    },
                    (res) => {
                        //console.log(res)
                        alert('您的网络有问题请重试')
                    }
                )
            },
            goReg() {
                let re = /^1\d{10}$/
                if (!re.test(this.regUsername)) {
                    this.$message({
                        showClose: true,
                        duration: 1000,
                        message: '请输入正确的手机号码!',
                        type: 'error'
                    })
                    return false
                }
                if (this.regCode === '') {
                    this.$message({
                        showClose: true,
                        duration: 1000,
                        message: '验证码不能为空!',
                        type: 'error'
                    })
                    return false
                }
                if (this.regPwd === '') {
                    this.$message({
                        showClose: true,
                        duration: 1000,
                        message: '密码不能为空!',
                        type: 'error'
                    })
                    return false
                }

                if (this.regPwd !== this.regRePwd) {
                    this.$message({
                        showClose: true,
                        duration: 1000,

                        message: '两次输入的密码不同!',
                        type: 'error'
                    })
                    return false
                }

                //				if(this.regPwd.length < 10) {
                //					this.$message({
                //						showClose: true,
                //						duration: 1000,
                //						message: '您的密码过于简单请输入大于10位的密码!',
                //						type: 'error'
                //					})
                //					return false
                //				}

                this.$http.get(this.enHttp + '/mobile/register?phone=' + this.regUsername + '&code=' + this.regCode + '&password=' + this.regRePwd + '&type=1').then(
                    (res) => {
                        let _this = this
                        if (res.data.success) {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'success',
                                duration: 800,
                                onClose: function() {
                                    _this.$router.go(0)
                                }
                            })
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'error'
                            })
                        }
                    }
                )
            }
        }
    }
</script>
<style lang="less" scoped="scoped">
    @import url('../../static/css/login.less');
    body {
        padding: 0 !important;
        background: #fff;
    }
</style>