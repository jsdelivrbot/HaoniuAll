<template>
	<div class="people">
		<div class="bar-box">
			<a href="javascript:;" :class="{active:isteacher==1}" @click='isteacher = 1'>
				老师列表
			</a>

			<a href="javascript:;" :class="{active:isteacher==2}" @click='isteacher = 2'>
				学生申请
			</a>
		</div>

		<div class="teacher" v-show='isteacher==1'>
			<ul>
				<li v-for='(item,index) in teacher'>
					<img src="../../static/img/teacher.png" />
					<div class="teacherInfo">
						<p><span>{{item.nickname}}</span><em @click='bianji(item.username,index)'>编辑</em> </p>
						<div>
							<p v-for='item2 in item.groups'>{{item2.name}}</p>
						</div>
					</div>
				</li>

				<li class="addteacher" @click='addteacherbox=true'>
					<img src="../../static/img/addteacher.png" />
				</li>
			</ul>
		</div>

		<div class="student" v-show='isteacher==2'>
			<div class="main-box">

				<div class="nochuli" v-if='applyList == ""'>
					<i class="el-icon-information"></i> 暂无申请需要处理
				</div>
				<ul>
					<li v-for='item in applyList'>
						<img src="../../static/img/addteacher.png" />
						<div class="center-box">
							<h2>
								{{item.username}}
							</h2>
							<p>申请加入&nbsp; {{item.groupName}}</p>
						</div>
						<div class="btn-bar">
							<a href="javascript:;" @click='yes(item.id)' class="yes">
								同意
							</a>
							<a href="javascript:;" @click='no(item.id)' class="no">
								拒绝
							</a>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<el-dialog title="添加新老师" v-model="addteacherbox" size="tiny">
			<div>
				<el-input v-model="searchTeacherInput" style='margin-bottom: 20px;' placeholder="输入手机号码查找老师"></el-input>
				<el-button type="primary" size="large" :loading="false" @click='getTeacher()'>查找老师</el-button>

				<div v-if='searchTeacher !==""'>
					<div class="addteacher-box">
						<img src="../../static/img/addteacher.png" v-if='searchTeacher.faceUrl== null' />
						<img :src="searchTeacher.faceUrl" v-if='searchTeacher.faceUrl !== null ' />
						<div>
							<h2>{{searchTeacher.nickname}}</h2>
							<p>{{searchTeacher.cityName}}</p>
						</div>
						<i class="el-icon-check"></i>
					</div>
					<div class="select">
						<el-select v-model="selectedOptions" placeholder="请选择班级">
							<el-option v-for="item in classOptions" :key='item'  :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>

				<div class="no-find-teacher" v-if='searchTeacher2'>
					<i class="el-icon-information"></i>
					<span>
						未查询到老师,请确认您的输入无误!
					</span>
				</div>

			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addteacherbox = false">取 消</el-button>
				<el-button type="primary" @click="trueAddTeacher()">确认添加</el-button>
			</div>
		</el-dialog>

		<el-dialog title="为老师设置班级" v-model="showbianji">
			<div class="tag-box">
				<el-tag type='success' v-for='(item,index) in teacherTag' :key='item' :closable="true" @close='deleteClass(index)'>{{item.name}}</el-tag>
			</div>

			<div class="classList">

				<ul>
					<li :class="{active:item.id == zhuanyeId}" v-for='(item,index) in zhuanye' @click='cut(item.id)'>
						{{item.name}}
					</li>
				</ul>

				<div class="list">

					<span @click='teacherAddClass(index)' v-for='(item,index) in classList' v-if='item.majorId == zhuanyeId'>
						{{item.name}}
					</span>

					<!--<el-tag type="primary" @click='teacherAddClass(index)' v-for='(item,index) in classList' v-if='item.majorId == zhuanyeId'>{{item.name}}</el-tag>-->
					<div class="noClass" v-if='NoClass =="2"'>
						暂无班级
					</div>
				</div>

			</div>

			<span slot="footer" class="dialog-footer">
			    <el-button @click="showbianji = false">取 消</el-button>
			    <el-button type="primary" @click="submitTrue()">保 存</el-button>
			</span>
		</el-dialog>

	</div>
</template>
<script>
    export default {
        data() {
            return {
                enHttp: localStorage.getItem('http'),
                isteacher: 1,
                teacher: '',
                token: '',
                searchTeacherInput: '',
                addteacherbox: false,
                searchTeacher: '',
                searchTeacher2: false,
                selectedOptions: '',
                classOptions: [],
                applyList: '',
                showbianji: false,
                bianjiUsername: '',
                teacherTag: [],
                zhuanye: [],
                zhuanyeId: '',
                classList: []
            }
        },
        computed: {
            NoClass() {
                let arr = []
                let $this = this
                for (var i = 0; i < this.classList.length; i++) {
                    if ($this.zhuanyeId === this.classList[i].majorId) {
                        arr.push(this.classList[i].majorId)
                    }
                }
                if (arr.length > 0) {
                    return '1'
                } else {
                    return '2'
                }
            }
        },
        mounted() {
            this.token = sessionStorage.getItem('token')
            let token = this.token
            this.$http({
                url: this.enHttp + '/mobile/major/list',
                method: 'get',
                headers: {
                    'token': this.token
                }
            }).then(
                (res) => {
                    this.zhuanye = res.data.data
                }
            )

            this.$http({
                url: this.enHttp + '/mobile/group/list?page=1&rows=1000',
                method: 'get',
                headers: {
                    'token': this.token
                }
            }).then(
                (res) => {
                    this.classList = res.data.data.entityList
                    this.zhuanyeId = this.classList[0].majorId
                }
            )
            this.$http({
                url: this.enHttp + '/mobile/groupUser/listUnRepeatTeacher?page=1&rows=1000',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    console.log(res)
                    this.teacher = res.data.data.entityList
                }
            )
            this.$http({
                url: this.enHttp + '/mobile/group/list?page=1&rows=1000',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    console.log(res)
                    this.classOptions = res.data.data.entityList
                }
            )

            this.$http({
                url: this.enHttp + '/mobile/groupApply/list?handleStatus=0',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    this.applyList = res.data.data.entityList
                }
            )
        },
        methods: {
            deleteClass(id) {
                this.teacherTag.splice(id, '1')
            },
            submitTrue() {
                let id = ''
                for (var i = 0; i < this.teacherTag.length; i++) {
                    id += this.teacherTag[i].id + ','
                }
                this.$http({
                    url: this.enHttp + '/mobile/groupUser/updateTeacher?teacherUsername=' + this.bianjiUsername + '&groupIds=' + id,
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
                                type: 'success'
                            })
                            this.$router.go(0)
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '修改失败',
                                onClose: function() {
                                    $this.router.go(0)
                                }
                            })
                        }
                        console.log(res.data)
                    }
                )
                console.log(id)
            },
            teacherAddClass(index) {
                if (this.teacherTag.length >= 3) {
                    this.$notify({
                        title: '警告',
                        message: '每位老师最多加入三个班级！',
                        type: 'warning'
                    })
                } else {
                    let id = []
                    for (var i = 0; i < this.teacherTag.length; i++) {
                        id.push(this.teacherTag[i].id)
                    }
                    if (id.indexOf(this.classList[index].id) >= 0) {
                        this.$notify({
                            title: '警告',
                            message: '老师已经加入该班级！',
                            type: 'warning'
                        })
                    } else {
                        this.teacherTag.push(this.classList[index])
                    }
                }
            },
            cut(id) {
                this.zhuanyeId = id
            },
            bianji(teacherUsername, index) {
                //				alert(index)

                this.teacherTag = this.teacher[index].groups
                let noAdd = []
                let addId = []
                for (var i = 0; i < this.teacher[index].groups.length; i++) {
                    this.teacher[index].groups[i]
                }

                for (var i = 0; i < this.teacherTag.length; i++) {
                    addId.push(this.teacherTag[i].id)
                }

                for (var i = 0; i < this.classList.length; i++) {
                    if (addId.indexOf(this.classList[i].id) < 0) {
                        noAdd.push(this.classList[i])
                    }
                }

                this.classList = noAdd
                this.bianjiUsername = teacherUsername
                this.showbianji = true
            },
            getTeacher() {
                this.$http({
                    url: this.enHttp + '/mobile/user/getInfoByPhone?phone=' + this.searchTeacherInput,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        if (!res.data.success) {
                            this.searchTeacher = ''
                            this.searchTeacherInput = ''
                            this.searchTeacher2 = true
                            let $this = this
                            setTimeout(function() {
                                $this.searchTeacher2 = false
                            }, 2000)
                        } else {
                            this.searchTeacher2 = false
                            this.searchTeacher = res.data.data
                        }
                        console.log(res.data.data)
                    }
                )
            },
            trueAddTeacher() {
                if (!this.searchTeacher.username) {
                    this.$notify({
                        title: '警告',
                        message: '请搜索老师信息!',
                        type: 'warning'
                    })
                } else {
                    if (this.selectedOptions === '') {
                        this.$notify({
                            title: '警告',
                            message: '请选择班级信息!',
                            type: 'warning'
                        })
                    } else {
                        this.$http({
                            url: this.enHttp + '/mobile/groupUser/addTeacher?groupId=' + this.selectedOptions + '&teacherUsername=' + this.searchTeacher.username,
                            method: 'get',
                            headers: {
                                'token': this.token
                            }
                        }).then(
                            (res) => {
                                if (!res.data.success) {
                                    this.$notify({
                                        title: '警告',
                                        message: res.data.msg,
                                        type: 'warning'
                                    })
                                } else {
                                    this.$notify({
                                        title: '成功',
                                        message: res.data.msg,
                                        type: 'success'
                                    })
                                    this.$router.go(0)
                                    this.addteacherbox = false
                                }
                            }
                        )
                    }
                }
            },
            yes(id) {
                this.$http({
                    url: this.enHttp + '/mobile/groupApply/handleGroupApply?applyId=' + id + '&handleStatus=1',
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
                                message: '已同意申请!',
                                type: 'success',
                                duration: 1500,
                                onClose() {
                                    $this.$router.go(0)
                                    alert(1)
                                }
                            })
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: res.data.msg,
                                duration: 1500
                            })
                        }
                        console.log(res.data)
                    }
                )
            },
            no(id) {
                this.$http({
                    url: this.enHttp + '/mobile/groupApply/handleGroupApply?applyId=' + id + '&handleStatus=2',
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        if (res.data.success) {
                            this.$notify({
                                title: '成功',
                                message: '已拒绝用户的申请!',
                                type: 'success',
                                duration: 1500
                            })
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: res.data.msg,
                                duration: 1500
                            })
                        }
                        console.log(res.data)
                    }
                )
            }
        }
    }
</script>
<style lang="less">
    .classList {
        background: #fff;
        border: 1px solid #eee;
        height: auto;
        overflow: hidden;
        ul {
            width: 180px;
            line-height: 40px;
            height: auto;
            background: #e2e2e2;
            height: auto;
            overflow: auto;
            max-height: 400px;
            float: left;
            li {
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                color: #333;
                text-indent: 1em;
                cursor: pointer;
            }
            .active {
                background: #fff;
                color: #1655b3;
            }
        }
        .list {
            padding: 20px;
            box-sizing: border-box;
            margin-left: 180px;
            span {
                margin-right: 10px;
                margin-bottom: 10px;
                font-size: 15px;
                padding: 5px;
                height: auto;
                overflow: hidden;
                cursor: pointer;
                background: rgba(32, 160, 255, .2);
                color: #20a0ff;
                display: inline-block;
                border: 1px solid transparent;
                border-radius: 3px;
            }
        }
    }
    
    .nochuli {
        text-align: center;
        background: #fff;
        padding: 40px 20px;
        font-size: 18px;
        letter-spacing: 1px;
        color: #3C3C3C;
        i {
            color: #0082E6;
            font-size: 22px;
        }
    }
    
    .tag-box span {
        margin-right: 10px;
        margin-bottom: 10px;
        font-size: 15px;
        padding: 5px;
        height: auto;
        overflow: hidden;
    }
    
    .no-find-teacher {
        margin-top: 20px;
        text-align: center;
        line-height: 60px;
        background: #f9f9f9;
        /*display: flex;*/
        i {
            color: #db3652;
            font-size: 22px;
            text-align: right;
            flex: 1;
            margin-right: 10px;
            line-height: 60px;
        }
        span {
            flex: 1;
            text-align: left;
        }
    }
    
    .select {
        margin-top: 20px;
    }
    
    .addteacher-box {
        padding: 10px;
        margin-top: 20px;
        box-sizing: border-box;
        display: flex;
        background: #f9f9f9;
        img {
            width: 70px;
            height: 70px;
            margin-right: 10px;
        }
        div {
            flex: 1;
            text-align: left;
            height: 50px;
            margin: 10px 0;
            line-height: 25px;
            h2 {
                color: #3b5998;
                font-size: 17px;
            }
            p {
                color: #666666;
            }
        }
        i {
            width: 50px;
            line-height: 70px;
            color: #4db3ff;
            font-size: 24px;
        }
    }
    
    .people {
        margin-left: 200px;
        width: 800px;
        height: auto;
        overflow: hidden;
        .bar-box {
            height: 55px;
            line-height: 55px;
            border: 1px solid #d1d3d6;
            padding: 0 10px;
            box-sizing: border-box;
            background: #fff;
            a {
                display: inline-block;
                margin: 0 10px;
                color: #999999;
                border-bottom: 3px solid #fff;
                height: 52px;
                box-sizing: border-box;
            }
            .router-link-active,
            .active {
                border-color: #3b5998;
                color: #3b5998;
            }
        }
        .student {
            padding: 10px 0;
            box-sizing: border-box;
            .line-bar {
                line-height: 30px;
                text-align: center;
                color: #a5a5a6;
            }
            .main-box {
                height: auto;
                overflow: hidden;
                margin-top: 20px;
                .date {
                    line-height: 30px;
                    text-indent: 2px;
                }
                ul {
                    height: auto;
                    overflow: hidden;
                    li {
                        display: block;
                        background: #fff;
                        display: flex;
                        padding: 10px;
                        height: 100px;
                        box-sizing: border-box;
                        border: 1px solid #d1d3d6;
                        margin-bottom: 20px;
                        img {
                            width: 80px;
                            height: 80px;
                            margin-right: 10px;
                        }
                        .center-box {
                            margin-top: 10px;
                            flex: 1;
                            height: 60px;
                            line-height: 30px;
                            h2 {
                                color: #333333;
                            }
                            p {
                                color: #999999;
                            }
                        }
                        i {
                            color: #666666;
                            margin: 10px;
                            cursor: pointer;
                        }
                        .infos {
                            text-align: center;
                            color: #666666;
                            line-height: 80px;
                            width: 200px;
                        }
                        .btn-bar {
                            width: 200px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            a {
                                display: inline-block;
                                width: 76px;
                                height: 30px;
                                text-align: center;
                                line-height: 30px;
                                font-size: 13px;
                                color: #fff;
                                margin-right: 24px;
                            }
                            .yes {
                                background: #3b5998;
                            }
                            .no {
                                background: #9198a6;
                            }
                        }
                    }
                }
            }
        }
        .teacher {
            margin-top: 15px;
            background: #fff;
            padding: 15px;
            box-sizing: border-box;
            border: 1px solid #d1d3d6;
            ul {
                width: 100%;
                height: auto;
                overflow: hidden;
                li {
                    display: inline-block;
                    float: left;
                    width: 25%;
                    height: auto;
                    overflow: hidden;
                    padding: 10px;
                    box-sizing: border-box;
                    outline: 1px solid #e0e0e0;
                    outline-offset: -10px;
                    height: 288px;
                    img {
                        width: 100%;
                        display: block;
                    }
                    .teacherInfo {
                        height: auto;
                        overflow: hidden;
                        padding: 10px;
                        box-sizing: border-box;
                        >p {
                            line-height: 30px;
                            color: #333333;
                            font-size: 17px;
                            display: flex;
                            span {
                                width: 100px;
                                height: 30px;
                                line-height: 30px;
                                overflow: hidden;
                            }
                            em {
                                color: #3b5998;
                                font-size: 15px;
                                cursor: pointer;
                                flex: 1;
                                margin-left: 12px;
                            }
                        }
                        span {
                            display: block;
                            line-height: 30px;
                            font-size: 15px;
                        }
                        div {
                            height: 90px;
                            line-height: 30px;
                            font-size: 15px;
                            color: #999999;
                            p {
                                text-align: left;
                                height: 30px;
                                line-height: 30px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
                .addteacher {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    img {
                        width: 88px;
                        height: 88px;
                    }
                }
            }
        }
    }
</style>