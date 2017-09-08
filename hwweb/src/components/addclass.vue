<template>
	<div>
		<v-header></v-header>
		<div class="zhuanye-bar">
			<ul>
				<li :class="{active:item.id == zhuanyeId}" v-for='(item,index) in zhuanye' @click='cut(item.id)'>
					{{item.name}}
				</li>
			</ul>

			<div>
				<ul class="addclass">
					<li v-for='(item,index) in classList' v-if='item.majorId == zhuanyeId'>
						<img src="../../static/img/teacher.jpg" />
						<span>
							<h2>{{item.name}}</h2>
							<p>班级号:{{item.groupNo}}</p>
						</span>
						<a href="javascript:;" @click='addclass(item.id,item.applyQuestion)'>
							加入
						</a>
					</li>
				</ul>
			</div>
		</div>

		<el-dialog title="回答验证问题" size="tiny" v-model="isShow" @close='closeDL'>
			<el-form>
				<el-form-item :label="wenti">
					<el-input v-model='wentidaan'></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShow = false">取 消</el-button>
				<el-button type="primary" @click="trueSub">确定申请</el-button>
			</div>
		</el-dialog>

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
                zhuanye: [],
                classList: [],
                zhuanyeId: '',
                isShow: false,
                wenti: '',
                wentidaan: '',
                classId: ''
            }
        },
        mounted() {
            this.token = sessionStorage.getItem('token')
            this.$http({
                url: this.enHttp + '/mobile/major/list',
                method: 'get',
                headers: {
                    'token': this.token
                }
            }).then(
                (res) => {
                    this.zhuanye = res.data.data
                        //console.log(this.zhuanye)
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
                    //console.log(res.data)
                    this.classList = res.data.data.entityList
                    this.zhuanyeId = this.classList[0].majorId
                        //console.log(this.classList)
                }
            )
        },
        methods: {
            closeDL() {
                this.wentidaan = ''
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
                                    duration: 1000,
                                    type: 'success'
                                })
                            } else {
                                this.$notify({
                                    title: '失败',
                                    message: res.data.msg,
                                    duration: 1000,
                                    type: 'error'
                                })
                            }
                            //console.log(res.data)
                        }
                    )
                } else {
                    this.classId = id
                    this.isShow = true
                    this.wenti = yorn
                    return false
                }
            },
            trueSub() {
                if (this.wentidaan === '') {
                    this.$notify({
                        title: '失败',
                        message: '请输入验证答案!',
                        duration: 1000,
                        type: 'error'
                    })
                    return false
                }
                this.$http({
                    url: this.enHttp + '/mobile/groupApply/apply?groupId=' + this.classId + '&applyQuestionAnswer=' + this.wentidaan,
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
                                duration: 1000,
                                type: 'success'
                            })
                        } else {
                            this.$notify({
                                title: '失败',
                                message: res.data.msg,
                                duration: 1000,
                                type: 'error'
                            })
                        }
                        //console.log(res.data)
                    }
                )
            },
            cut(index) {
                this.zhuanyeId = index
            }
        }
    }
</script>
<style lang="less">
    .zhuanye-bar {
        margin: auto;
        width: 1000px;
        margin-top: 60px;
        min-height: 600px;
        background: #fff;
        padding: 20px;
        box-sizing: border-box;
        >ul {
            width: 100%;
            height: auto;
            overflow: hidden;
            li {
                display: inline-block;
                width: 15.666666667%;
                height: 60px;
                line-height: 60px;
                text-align: center;
                background: #20a0ff;
                font-size: 20px;
                color: #fff;
                letter-spacing: 2px;
                float: left;
                margin: 5px 0.5%;
                cursor: pointer;
                border-radius: 5px;
            }
            .active {
                background: #3b5998;
            }
        }
        .addclass {
            /*display: none;*/
            height: auto;
            overflow: hidden;
            margin-top: 60px;
            border-bottom: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
            li:nth-child(2n) {
                border-right: none;
                border-left: none;
            }
            li {
                display: inline-block;
                float: left;
                width: 50%;
                height: 80px;
                border: 1px solid #e5e5e5;
                border-bottom: none;
                box-sizing: border-box;
                line-height: 80px;
                padding: 15px;
                display: flex;
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
        }
    }
</style>