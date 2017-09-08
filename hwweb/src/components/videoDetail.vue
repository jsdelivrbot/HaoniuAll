<template>
	<div>
		<v-header></v-header>
		<div class="content-wrap" style="margin-top: 60px;">
			<div class="video-detail">
				<h1>{{videoInfo.title}}</h1>
				<div class="video">

					<video style="margin: 30px 0;background: #3C3C3C;border: 1px solid #eee;padding: 10px;box-sizing: border-box;" :src=" videoInfo.videoUrl" class="my-video" controls width="100%" :poster="videoInfo.videoUrl+'?vframe/png/offset/3/w/780/h/420|imageView2/1/w/480/h/360'">
						<p>
							<h1>您的浏览器不支持视频播放.... 请升级最新浏览器</h1>
						</p>
					</video>
				</div>

				<div class="video-info">
					<img v-if='videoInfo.faceUrl' :src="videoInfo.faceUrl+'?imageView2/2/w/40/h/40/q/75|imageslim'" />
					<a href="#">{{videoInfo.username}}</a>
					<span>{{videoInfo.createTime}}</span>
					<span>{{videoInfo.readCount}}次浏览</span>
					<div @click='dianzan()' :class='{active:!videoInfo.curUserIsCanUpVote}'>
						<i class="icon iconfont icon-zan"></i><em>{{videoInfo.upVoteCount}}</em>
					</div>
					<div>
						<i class="icon iconfont icon-msg"></i><em>{{videoInfo.commentCount}}</em>
					</div>
					<div>
						<i class="icon iconfont icon-wen"></i><em>{{videoInfo.questionCount}}</em>
					</div>
				</div>
			</div>

			<a href="javascript:;" class="tiwen-bar" @click='cengShow=!cengShow' v-if='videoInfo.flag !=="pub"'>
				<i class="icon iconfont icon-wen"></i><em>我要提问</em>
			</a>

			<div class="haowen-pl-list" v-if='plList.length>0'>
				<ul>
					<li v-for='item in plList'>
						<div class="ziji">
							<div class="userinfo-top-box">
								<span class="user-img">
								<img :src="item.faceUrl+'?imageView2/2/w/40/h/40/q/75|imageslim'"/>
							</span>
								<span>
								<em>{{item.nickname}}</em>
								<i>{{item.createTime}}</i>
							</span>

								<a href="javascript:;" class="huifu" @click='huifu(item.id)'>
									回复
								</a>
							</div>
							<p>
								{{item.content}}
							</p>
						</div>

						<div class="fdpl" v-if='item.levelTwoPages.entityList.length>0'>
							<li v-for='item2 in item.levelTwoPages.entityList'>
								<div class="userinfo-top-box">
									<span class="user-img">
								<img :src="item2.faceUrl+'?imageView2/2/w/40/h/40/q/75|imageslim'"/>
							</span>
									<span>
								<em>{{item2.nickname}}</em>
								<i>{{item2.createTime}}</i>
							</span>

								</div>
								<p>
									{{item2.content}}
								</p>
							</li>
						</div>

					</li>
				</ul>
			</div>

			<el-dialog title="提出问题" v-model="cengShow">
				<el-form label-position="top" label-width="80px">
					<el-form-item label="问题标题">
						<el-input v-model="title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="问题描述">
						<el-input type="textarea" :rows="5" v-model='tiwencontent' placeholder="请详细描述您的问题!" style='margin-bottom: 20px;'>
						</el-input>
					</el-form-item>
					<el-form-item label="选择老师">
						<el-select v-model="selectTeacher" placeholder="请选择">
							<el-option v-for="item in teacherList" :key='item' :label="item.nickname" :value="item.username">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<el-upload action="https://upload.qbox.me" :file-list="getImgList" :on-remove="imgRemove" :on-error='upError' :data='imgToken' :on-success="imgSuc" :before-upload="bfimg" list-type="picture-card">
					<i class="el-icon-plus"></i>
				</el-upload>

				<div slot="footer" class="dialog-footer">
					<el-button @click="cengShow = false">取 消</el-button>
					<el-button type="primary" @click="trueSubmit()">确定提交</el-button>
				</div>
			</el-dialog>

			<el-dialog title="回复" v-model='huifutrue'>
				<el-input type="textarea" v-model='huifucontent'></el-input>
				<div slot="footer" class="dialog-footer">
					<el-button @click="huifutrue = false">取 消</el-button>
					<el-button type="primary" @click="subhuifu()">确 定</el-button>
				</div>
			</el-dialog>

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
                token: '',
                detailid: '',
                cengShow: false,
                videoInfo: '',
                tiwencontent: '',
                title: '',
                imgToken: {
                    token: '' //获取上传的token
                },
                imgList: [], //图片上传列表
                teacherList: [],
                selectTeacher: '',
                plList: '',
                huifutrue: false,
                huifuid: '',
                huifucontent: '',
                getImgList: [],
                stop: false
            }
        },
        beforeDestroy() {
            this.stop = true
            this.lunxun()
        },
        mounted() {
            this.lunxun()
            this.token = sessionStorage.getItem('token')
            let token = this.token
            this.detailid = this.$route.params.id
            this.$http({
                url: this.enHttp + '/mobile/video/detail?id=' + this.detailid,
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    if (res.data.success) {
                        this.videoInfo = res.data.data
                    }
                }
            )

            this.$http({
                url: this.enHttp + '/mobile/video/comment/list?page=1&rows=1000&videoId=' + this.detailid,
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    if (res.data.success) {
                        this.plList = res.data.data.entityList
                    }
                }
            )

            this.$http({
                url: this.enHttp + '/mobile/groupUser/listAnswerTeacher?videoId=' + this.detailid,
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    if (res.data.success) {
                        this.teacherList = res.data.data
                    }
                }
            )
            this.getToken()
        },
        methods: {
            lunxun() {
                let $this = this
                let jishiqi = setInterval(function() {
                    if ($this.stop) {
                        clearInterval(jishiqi)
                        return false
                    }
                    $this.$http({
                        url: $this.enHttp + '/mobile/user/loadImage',
                        method: 'get',
                        headers: {
                            'token': $this.token
                        }
                    }).then(
                        (res) => {
                            if (res.data.success) {
                                let arr = []
                                for (var i = 0; i < res.data.data.length; i++) {
                                    let obj = {}
                                    let obj2 = {}
                                    obj.name = i
                                    obj.url = 'http://v.haowen.im/' + res.data.data[i]
                                    arr.push(obj)
                                    obj2.key = res.data.data[i]
                                    obj2.hash = res.data.data[i]
                                    $this.getImgList.push(obj)
                                    $this.imgList.push(obj2)
                                }
                            } else {
                                //console.log(res.data)
                            }
                        }
                    )
                }, 10000)

                return this.stop
            },
            dianzan() {
                this.$http({
                    url: this.enHttp + '/mobile/video/upVote?id=' + this.detailid,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        if (res.data.success) {
                            this.$notify({
                                title: '成功!',
                                message: '点赞' + res.data.msg,
                                type: 'success',
                                duration: 1000
                            })
                        } else {
                            this.$notify({
                                title: '失败',
                                message: res.data.msg,
                                type: 'error',
                                duration: 1000
                            })
                        }
                    }
                )
            },
            subhuifu() {
                if (this.huifucontent.length <= 0) {
                    this.$notify({
                        title: '失败',
                        message: '请输入您的回复',
                        type: 'warning',
                        duration: 1000
                    })
                    return false
                }
                this.$http({
                    url: this.enHttp + '/mobile/video/comment/reply?commentId=' + this.huifuid + '&content=' + this.huifucontent,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        if (res.data.success) {
                            this.$notify({
                                title: '成功',
                                message: res.data.msg,
                                type: 'success',
                                duration: 1000
                            })
                            this.huifutrue = false
                            this.huifucontent = ''
                        } else {
                            this.$notify({
                                title: '失败',
                                message: res.data.msg,
                                type: 'error',
                                duration: 1000
                            })
                            this.huifutrue = false
                        }
                    }
                )
            },
            huifu(id) {
                this.huifutrue = true
                this.huifuid = id
            },
            trueSubmit() {
                let imglist = ''
                for (var i = 0; i < this.imgList.length; i++) {
                    //console.log(this.imgList[i].response)
                    imglist += '&path_SWFUpload_' + i + '=' + this.imgList[i].key + '&hash_SWFUpload_' + i + '=' + this.imgList[i].hash
                }

                this.$http({
                        url: this.enHttp + '/mobile/qa/question?teacherUsername=' + this.selectTeacher + '&title=' + this.title + '&content=' + this.tiwencontent + '&videoId=' + this.detailid + imglist,
                        method: 'get',
                        headers: {
                            'token': this.token
                        }
                    }).then(
                        (res) => {
                            if (res.data.success) {
                                this.$notify({
                                    title: '成功',
                                    message: res.data.msg,
                                    type: 'success',
                                    duration: 1000
                                })
                                this.cengShow = false
                            } else {
                                this.$notify({
                                    title: '失败!',
                                    message: res.data.msg,
                                    type: 'error',
                                    duration: 1000
                                })
                                this.cengShow = false
                            }
                            //console.log(res.data)
                        }
                    )
                    //console.log(imglist)
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
                    //console.log(fileList)
                this.imgList.push(response)
                    //				this.imgList = fileList
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
                        //console.log(this.imgList)
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
                        //						console.log(res.data.data.token)
                    }
                )
            },
            imgRemove(file, fileList) {
                this.imgList = fileList
                    //console.log(this.imgList)
            }
        }
    }
</script>
<style lang="less">
    .active {
        color: #f90 !important;
    }
</style>