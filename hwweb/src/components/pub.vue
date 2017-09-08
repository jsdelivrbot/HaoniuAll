<template>
	<div>
		<v-header></v-header>
		<div class="content-wrap" style="padding-top: 60px; ">
			<div class="left-nav">
				<ul>
					<li>
						<span>
							<div>
								<router-link to="/pub/classlist">
									<img src="../../static/img/class.png"/>
									班级
								</router-link>		
							</div>
												
							<a href="javascript:;" @click='showAdd = !showAdd' >
								添加
							</a>
							
						</span>
					</li>
					<li>
						<router-link to="/pub/index">
							<img src="../../static/img/动态.png" /> 动态消息
						</router-link>
					</li>
					<li>
						<router-link to="/pub/video">
							<img src="../../static/img/视频.png" /> 视频
						</router-link>
					</li>
					<li>
						<router-link to="/pub/news">
							<img src="../../static/img/资讯.png" /> 资讯
						</router-link>
					</li>
					<li>
						<router-link to="/pub/wenda">
							<img src="../../static/img/问答.png" /> 问答
						</router-link>
					</li>
					<li>
						<router-link to="/pub/myhuida">
							<img src="../../static/img/huida.png" /> 我的回答
						</router-link>
					</li>
					<li>
						<router-link to="/pub/mywenti">
							<img src="../../static/img/tiwen.png" /> 我的问题
						</router-link>
					</li>
					<li>
						<router-link to="/pub/tips">
							<img src="../../static/img/通知.png" /> 通知
						</router-link>
					</li>
					<li>
						<router-link to="/pub/collect">
							<img src="../../static/img/收藏夹 (2).png" /> 收藏夹
						</router-link>
					</li>
					<li v-if='userInfo.isInstitutionManager'>
						<router-link to="/pub/zygl">
							<img src="../../static/img/e18aea6ff559153f0527bc66d2c869df@2x.png" /> 专业管理
						</router-link>
					</li>
					<li v-if='userInfo.isInstitutionManager'>
						<router-link to="/pub/people">
							<img src="../../static/img/ae3f5f07df240cb427f73d796da1dd4a@2x.png" /> 人员管理
						</router-link>
					</li>
					<li v-if='userInfo.isInstitutionManager'>
						<router-link to="/pub/contentgl">
							<img src="../../static/img/0637130a3bb06c9e71fba598a1fe276f@2x.png" /> 内容管理
						</router-link>
					</li>
				</ul>
			</div>
			<el-dialog title="添加班级" v-model="showAdd" size="tiny" class='zindex'  @close='close()'>
					<el-form :inline="true" class="demo-form-inline">
						<el-form-item label="搜索班级">
							<el-input placeholder="搜索班级" v-model="search">
							</el-input>

						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">查询</el-button>
						</el-form-item>

						<ul class="addclass" v-if='classDetail !==""'>
							<li>
								<img src="../../static/img/teacher.jpg" />
								<span>
									<h2>{{classDetail.name}}</h2>
									<p>班级号:{{classDetail.groupNo}}</p>
								</span>
								<a v-if='classDetail.applySetting == 0' href="javascript:;" @click='addclass(classDetail.id,classDetail.applyQuestion)'>
									加入
								</a>
							</li>
							<div class="div" v-if='classDetail.applySetting == 1'>
								<div>
									问题: {{classDetail.applyQuestion}}
								</div>
								<div>
									<em>
									<el-input v-model="daan" placeholder="请输入内容"></el-input>
								</em>

									<a href="javascript:;" @click='addclass(classDetail.id,classDetail.applyQuestion)'>
										加入
									</a>
								</div>
							</div>
						</ul>

					</el-form>
				</el-dialog>
			<router-view></router-view>
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
                userInfo: [],
                showAdd: false,
                classDetail: '',
                search: '',
                token: '',
                daan: ''
            }
        },
        mounted() {
            let token = sessionStorage.getItem('token')
            this.token = token
            this.$http({
                url: this.enHttp + '/mobile/user/info',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    this.userInfo = res.data.data
                        //console.log(this.userInfo)
                }
            )
        },
        methods: {
            close() {
                this.classDetail = ''
                this.search = ''
            },
            onSubmit() {
                this.classDetail = ''
                if (this.search === '') {
                    this.$notify({
                        title: '警告',
                        message: '请输入需要搜索的班级号',
                        type: 'warning'
                    })
                } else {
                    this.$http({
                        url: this.enHttp + '/mobile/group/findByGroupNo?groupNo=' + this.search,
                        method: 'get',
                        headers: {
                            'token': this.token
                        }
                    }).then(
                        (res) => {
                            if (res.data.success) {
                                this.classDetail = res.data.data
                                    //console.log(res.data.data)
                            } else {
                                this.$notify({
                                    title: '提示',
                                    message: '未搜索到班级,请检查您的输入!',
                                    type: 'info'
                                })
                            }
                        }
                    )
                }
            },
            addclass(id, yorn) {
                if (yorn === '' || yorn === null) {
                    this.$http({
                        url: this.enHttp + '/mobile/groupApply/apply?groupId=' + id,
                        method: 'get',
                        headers: {
                            'token': this.token
                        }
                    }).then(
                        (res) => {
                            if (res.data.success) {
                                this.$notify({
                                    title: '成功',
                                    message: '申请成功,请等待管理员审核!',
                                    duration: 1500,
                                    type: 'success'
                                })
                            } else {
                                this.$notify({
                                    title: '失败',
                                    message: res.data.msg,
                                    duration: 1500,
                                    type: 'error'
                                })
                            }
                            //console.log(res.data)
                        }
                    )
                    let $this = this
                    setTimeout(function() {
                        $this.showAdd = false
                    }, 1000)
                } else {
                    if (this.daan === '') {
                        this.$notify({
                            title: '失败',
                            message: '请输入验证答案!',
                            duration: 1500,
                            type: 'error'
                        })
                        return false
                    }
                    this.$http({
                        url: this.enHttp + '/mobile/groupApply/apply?groupId=' + id + '&applyQuestionAnswer=' + this.daan,
                        method: 'get',
                        headers: {
                            'token': this.token
                        }
                    }).then(
                        (res) => {
                            if (res.data.success) {
                                this.$notify({
                                    title: '成功',
                                    message: '申请成功,请等待管理员审核!',
                                    duration: 1500,
                                    type: 'success'
                                })
                            } else {
                                this.$notify({
                                    title: '失败',
                                    message: res.data.msg,
                                    duration: 1500,
                                    type: 'error'
                                })
                            }
                            //console.log(res.data)
                        }
                    )
                    let $this = this
                    setTimeout(function() {
                        $this.showAdd = false
                    }, 1000)
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    @import url('../../static/css/pub.less');
    .zindex {
        z-index: 9999999999999;
    }
    
    .addclass {
        /*display: none;*/
        height: auto;
        overflow: hidden;
        border: 1px solid #e5e5e5;
        z-index: 999999999999999999999999999;
        position: relative;
        li {
            display: inline-block;
            width: 100%;
            height: 80px;
            box-sizing: border-box;
            line-height: 80px;
            padding: 15px;
            display: flex;
            border-bottom: none;
            div {
                line-height: 50px;
                flex: 1;
                text-align: center;
            }
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 1px solid #dadada;
                float: left;
                margin-right: 10px;
            }
            .mountedclass {
                color: #3b5998;
            }
            em {
                margin-right: 40px;
                line-height: 50px;
            }
            span {
                flex: 1;
                /*line-height: 50px;*/
                font-size: 17px;
                color: #333333;
                h2 {
                    line-height: 30px;
                }
                p {
                    line-height: 20px;
                    color: #a1a1a1;
                }
            }
            a {
                display: block;
                width: 60px;
                height: 36px;
                margin-top: 7px;
                text-align: center;
                line-height: 36px;
                background: #e9edef;
                color: #333;
                font-size: 14px;
                border: 1px solid #e0e0e0;
            }
        }
        .div {
            display: inline-block;
            width: 100%;
            height: auto;
            overflow: hidden;
            box-sizing: border-box;
            padding: 0 15px;
            /*display: flex;*/
            border-bottom: none;
            div {
                text-align: center;
                display: flex;
                height: auto;
                overflow: hidden;
                padding: 7px 0;
                font-size: 16px;
            }
            em {
                margin-right: 40px;
                line-height: 50px;
            }
            a {
                display: block;
                width: 60px;
                height: 36px;
                margin-top: 7px;
                text-align: center;
                line-height: 36px;
                background: #e9edef;
                color: #333;
                font-size: 14px;
                border: 1px solid #e0e0e0;
            }
        }
    }
</style>