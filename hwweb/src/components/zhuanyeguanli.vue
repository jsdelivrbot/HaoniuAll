<template>
	<div class="zhuanyeguanli">
		<div class="cjzy">
			<h3 @click="dialogFormVisible = true">创建专业</h3>
			<label for="">
				<input type="text" name="" id="" v-model='zyname' value="" placeholder="请输入专业名称" />
				<button @click='mountedzy()'>创建</button>
			</label>
		</div>

		<div class="zygl" v-for='item in bigList'>
			<h2>{{item.name}} <em @click='setfenzu(item.id)'>创建分组</em> </h2>
			<ul>
				<li v-for='item2 in item.teams'>
					<div>
						<span>
							<em>{{item2.name}}</em>
							<i>创建于 {{item2.createTime}}</i>
						</span>
						<i class="el-icon-arrow-up" v-if='isshow == item2.id' @click='isno()'></i>
						<i class="el-icon-arrow-down" v-if='isshow !== item2.id' @click='isdeng(item2.id)'></i>
					</div>

					<div class="classes" v-if='isshow == item2.id'>
						<ul>
							<li v-for='item3 in item2.groups'>
								<img src="../../static/img/teacher.jpg" v-if='item3.faceUrl == null' />
								<img :src="item3.faceUrl" v-if='item3.faceUrl' />
								<span>{{item3.name}}({{item3.groupNo}})</span>
								
								<router-link :to='"/pub/zyglclass/"+item3.id'>
									<i class="el-icon-setting"></i>
								</router-link>
							</li>
							<li @click='showClass(item2.id)'>
								<em>
									<i class="el-icon-plus"></i>
								</em>
								<span class="mountedclass">创建新班级</span>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>

		<el-dialog title="创建班级" size='tiny' v-model="dialogFormVisible">
			<el-form label-position="top" label-width="80px">
				<el-form-item label="名称">
					<el-input v-model='className' placeholder='请输入班级名称'></el-input>
				</el-form-item>
				<el-form-item label="上传班级封面">
					<!--<el-upload action="https://upload.qbox.me" :on-preview='imgRet' :on-success='imgSuc' :before-upload='bfimg' :data='imgToken' list-type="picture-card" :on-remove="imgRemove">
						<i class="el-icon-plus"></i>
					</el-upload>-->

					<el-upload class="avatar-uploader" action="https://upload.qbox.me" :on-remove="imgRemove" :show-file-list="false" :data='imgToken' :on-success="imgSuc" :before-upload="bfimg">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>

				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="trueAddClass()">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script>
    export default {
        data() {
            return {
                enHttp: localStorage.getItem('http'),
                isshow: '',
                zyname: '',
                token: '',
                imageUrl: '',
                dialogFormVisible: false,
                imgToken: {
                    token: ''
                },
                imgList: [],
                bigList: [],
                addclassid: '',
                className: ''
            }
        },
        thisToken() {
            return sessionStorage.getItem('token')
        },
        mounted() {
            this.token = sessionStorage.getItem('token')
            this.getListItem()
            this.getToken()
        },
        methods: {
            trueAddClass() {
                this.$http({
                    url: this.enHttp + '/mobile/group/add?name=' + this.className + '&teamId=' + this.addclassid + '&path_SWFUpload_1=' + this.imgList.key + '&hash_SWFUpload_1=' + this.imgList.hash,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        if (res.data.success) {
                            let $this = this
                            this.$notify({
                                title: '成功',
                                message: '创建班级成功!',
                                type: 'success',
                                duration: 1000,
                                onClose() {
                                    $this.dialogFormVisible = false
                                    $this.getListItem()
                                }
                            })
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '创建班级失败,请重试!',
                                duration: 1000
                            })
                            this.dialogFormVisible = false
                        }
                    }
                )
            },
            showClass(id) {
                this.getToken()
                this.addclassid = id
                this.dialogFormVisible = true
            },
            isno() {
                this.isshow = 0
            },
            isdeng(id) {
                this.isshow = id
            },
            imgRet(file) {},
            imgSuc(response, file, fileList) {
                this.imageUrl = URL.createObjectURL(file.raw)
                this.imgList = fileList[0].response
                this.$message({
                    type: 'success',
                    message: '上传成功!',
                    duration: 1000
                })
            },
            bfimg(file) {
                this.getToken()
            },
            getListItem() {
                this.$http({
                    url: this.enHttp + '/mobile/major/list',
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        if (res.data.success) {
                            this.bigList = res.data.data
                        }
                    }
                )
            },
            getToken() {
                this.$http.get(this.enHttp + '/mobile/qiniuUploadToken?type=1').then(
                    (res) => {
                        if (res.data.success) {
                            this.imgToken.token = res.data.data.token
                        } else {
                            return false
                        }
                    }
                )
            },
            imgRemove(file, fileList) {
                this.imgList = fileList
                console.log(this.imgList)
            },
            setfenzu(id) {
                this.$prompt('请输入分组名', '创建分组', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({
                    value
                }) => {
                    if (value === null) {
                        this.$notify({
                            title: '警告',
                            message: '请输入分组名!',
                            type: 'warning'
                        })
                    } else {
                        this.$http({
                            url: this.enHttp + '/mobile/team/add?majorId=' + id + '&name=' + value,
                            method: 'get',
                            headers: {
                                'token': this.token
                            }
                        }).then(
                            (res) => {
                                let $this = this
                                if (res.data.success) {
                                    this.$message({
                                        type: 'success',
                                        message: '新增分组成功!',
                                        onClose() {
                                            $this.getListItem()
                                        }
                                    })
                                }
                            }
                        )
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    })
                })
            },
            mountedzy() {
                this.$confirm('确定创建专业?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.zyname === '' || this.zyname === null) {
                        this.$message({
                            type: 'info',
                            message: '请输入专业名称'
                        })
                    } else {
                        this.$http({
                            url: this.enHttp + '/mobile/major/add?name=' + this.zyname,
                            method: 'get',
                            headers: {
                                'token': this.token
                            }
                        }).then(
                            (res) => {
                                let $this = this

                                if (res.data.success) {
                                    this.$message({
                                        type: 'success',
                                        message: '创建成功!',
                                        onClose() {
                                            $this.$router.go(0)
                                        }
                                    })
                                }
                            }
                        )
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消创建'
                    })
                })
            }
        }
    }
</script>
<style lang="less">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px !important;
        text-align: center;
    }
    
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    /**/
    
    .zhuanyeguanli {
        margin-left: 200px;
        width: 800px;
        height: auto;
        overflow: hidden;
        .cjzy {
            border: 1px solid #d1d3d6;
            background: #fff;
            padding: 15px;
            box-sizing: border-box;
            margin-bottom: 10px;
            h3 {
                color: #3b5998;
                margin-bottom: 15px;
                font-size: 18px;
            }
            input {
                background: #f6f6f6;
                width: 350px;
                height: 44px;
                border: 1px solid #ebebeb;
                border-radius: 5px;
                outline: none;
                text-indent: 1em;
            }
            button {
                background: #3b5998;
                border: none;
                width: 70px;
                height: 42px;
                border-radius: 5px;
                letter-spacing: 2px;
                color: #fff;
                font-size: 16px;
                cursor: pointer;
                outline: none;
            }
        }
        .zygl {
            padding: 20px;
            box-sizing: border-box;
            background: #fff;
            border: 1px solid #d1d3d6;
            margin-bottom: 20px;
            h2 {
                margin-bottom: 20px;
                font-size: 18px;
                color: #333333;
                em {
                    float: right;
                    color: #3b5998;
                    font-size: 17px;
                    cursor: pointer;
                }
            }
            >ul {
                background: #f6f6f6;
                height: auto;
                border: 1px solid #dfdfdf;
                overflow: hidden;
                border-bottom: none;
                li {
                    height: auto;
                    overflow: hidden;
                    >div:first-child {
                        display: block;
                        height: 40px;
                        line-height: 40px;
                        padding: 0 10px;
                        box-sizing: border-box;
                        border-bottom: 1px solid #dfdfdf;
                        color: #333333;
                        font-size: 16px;
                        display: flex;
                        span {
                            flex: 1;
                            i {
                                font-size: 13px;
                                color: #b5b5b5;
                            }
                        }
                        i {
                            line-height: 40px;
                            cursor: pointer;
                            color: #8e8e8e;
                        }
                    }
                    .classes {
                        /*display: none;*/
                        height: auto;
                        overflow: hidden;
                        li:nth-child(2n) {
                            border-right: none;
                        }
                        li {
                            display: inline-block;
                            float: left;
                            width: 50%;
                            height: 80px;
                            border-bottom: 1px solid #e5e5e5;
                            border-right: 1px solid #e5e5e5;
                            box-sizing: border-box;
                            line-height: 80px;
                            padding: 15px;
                            display: flex;
                            img {
                                width: 50px;
                                border-radius: 50%;
                                border: 1px solid #dadada;
                                float: left;
                                margin-right: 10px;
                            }
                            >em {
                                display: block;
                                width: 50px;
                                height: 50px;
                                background: #fff;
                                text-align: center;
                                line-height: 50px;
                                border-radius: 50%;
                                border: 1px solid #dadada;
                                margin-right: 10px;
                            }
                            .mountedclass {
                                color: #3b5998;
                            }
                            span {
                                flex: 1;
                                line-height: 50px;
                                font-size: 17px;
                                color: #333333;
                            }
                            a {
                                display: block;
                                width: 30px;
                                height: 50px;
                                i {
                                    height: 30px;
                                    width: 30px;
                                    background: #e9edef;
                                    border: 1px solid #dcdcdc;
                                    text-align: center;
                                    color: #3e3e3e;
                                    line-height: 30px;
                                    border-radius: 3px;
                                    cursor: pointer;
                                    position: relative;
                                    top: -15px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>