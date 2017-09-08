<template>
	<div class="jigouguanli">
		<h2 class="title">机构信息管理</h2>
		<div class="body-content">
			<el-form label-width="80px" label-position='top'>
				<el-form-item label="机构简介">
					<el-input placeholder='请输机构简介' v-model='description'></el-input>
				</el-form-item>
				<el-form-item label="机构图标">
					<el-upload action="https://upload.qbox.me" :on-remove="imgRemove" :on-error='upError' :data='imgToken' :on-success="imgSuc" :before-upload="bfimg" list-type="picture-card">
						<i class="el-icon-plus"></i>
					</el-upload>
					<div style="margin-top: 20px;">
						<el-button type="primary" @click='headerImg()'> 确认更新 </el-button>
					</div>
				</el-form-item>
			</el-form>
		</div>

	</div>
</template>
<script>
    export default {
        data() {
            return {
                enHttp: localStorage.getItem('http'),
                imgToken: {
                    token: '' //获取上传的token
                },
                imgList: '',
                description: '',
                token: ''
            }
        },
        created() {
            this.token = sessionStorage.getItem('token')
            let token = this.token
            this.getToken()
        },
        methods: {
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
                    imglist += 'path_SWFUpload_1=' + this.imgList[i].response.key + '&hash_SWFUpload_1=' + this.imgList[i].response.hash
                }
                if (this.description.length === 0) {
                    this.$notify({
                        title: '失败!',
                        message: '请输入机构简介!',
                        type: 'error',
                        duration: 1000
                    })
                    return false
                }

                this.$http({
                    url: this.enHttp + '/mobile/institution/update?' + imglist + '&description=' + this.description,
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
                this.getToken()
                if (this.imgList.length > 1) {
                    this.$message({
                        type: 'error',
                        message: '上传失败,最多只能上传1张图片!',
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
        }
    }
</script>
<style lang="less">
    .jigouguanli {
        height: auto;
        overflow: hidden;
        background: #fff;
        .title {
            text-align: left;
            font-size: 16px;
            line-height: 40px;
            color: #333;
            font-size: 18px;
            text-indent: 40px;
        }
        .body-content {
            padding: 20px 40px;
            box-sizing: border-box;
        }
    }
</style>