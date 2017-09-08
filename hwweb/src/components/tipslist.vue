<template>
	<div class="videolist-box">
		<h2 class="title">通知列表</h2>
		<ul>
			<li v-for='(item,index) in tipslist'>
				<div class="img">
					<img src="../../static/img/haowenlogo.png"/>
					<!--<img v-if='item.imageUrls.length>0' :src="item.imageUrls[0]+'?vframe/png/offset/3/w/470/h/260|imageView2/1/w/480/h/360'" />-->
				</div>
				<div class="center">
					<h3>{{item.title}}</h3>
					<p>{{item.content}}</p>
				</div>

				<div class="right">
					<p>{{item.createTime.substring(0,10)}}</p>
					<span @click='deleteVideo(item.id,index)'>
						<i class="el-icon-delete"></i>
					</span>
				</div>
			</li>
		</ul>

		<div class="page">
			<el-pagination :page-size='5' layout="prev, pager, next" @current-change='changepages' :total="totalpages">
			</el-pagination>
		</div>

	</div>
</template>
<script>
    export default {
        data() {
            return {
                enHttp: localStorage.getItem('http'),
                tipslist: [],
                totalpages: 0
            }
        },
        mounted() {
            this.token = sessionStorage.getItem('token')
            this.getlist()
        },
        methods: {
            getlist() {
                this.$http({
                    url: this.enHttp + '/mobile/institutionNotice/adminList?page=1&rows=5',
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        //console.log('res.data')
                        this.tipslist = res.data.data.entityList
                        this.totalpages = res.data.data.totalRows
                            //console.log(res.data.data)
                    }
                )
            },
            deleteVideo(id, index) {
                this.$confirm('此操作将删除该资讯, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((value) => {
                    if (value === 'confirm') {
                        this.$http({
                            url: this.enHttp + '/mobile/institutionNotice/adminDelete?id=' + id,
                            method: 'get',
                            headers: {
                                'token': this.token
                            }
                        }).then(
                            (res) => {
                                if (res.data.success) {
                                    this.tipslist.splice(index, 1)
                                    if (this.tipslist.length <= 0) {
                                        this.getlist()
                                    }
                                }
                            }
                        )
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            changepages(val) {
                this.$http({
                    url: this.enHttp + '/mobile/institutionNotice/adminList?page=' + val + '&rows=5',
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        //console.log('res.data')
                        this.tipslist = res.data.data.entityList
                        this.totalpages = res.data.data.totalRows
                            //console.log(res.data.data)
                    }
                )
            }
        }
    }
</script>
<style lang="less">
    .videolist-box {
        height: auto;
        overflow: hidden;
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        margin-top: 20px;
        background: #fff;
        border: 1px solid #d1d3d6;
        .title {
            line-height: 40px;
            font-size: 18px;
            color: #3C3C3C;
        }
        .page {
            margin: 30px 0;
        }
        >ul {
            height: auto;
            overflow: hidden;
            li {
                display: flex;
                padding: 15px 0;
                border-bottom: 1px solid #eee;
                .img {
                    width: 80px;
                    height: 80px;
                    margin-right: 10px;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    background: #000;
                    display: flex;
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
            }
            .center {
                flex: 1;
                overflow: hidden;
                h3 {
                    height: 30px;
                    font-weight: 600;
                    line-height: 30px;
                    color: #3C3C3C;
                    font-size: 17px;
                    letter-spacing: 1px;
                    margin-bottom: 10px;
                }
                p {
                    line-height: 20px;
                    color: #808080;
                    height: 40px;
                    overflow: hidden;
                }
            }
            .right {
                width: 120px;
                height: 80px;
                text-align: right;
                p {
                    text-align: center;
                    color: #999999;
                    height: 22px;
                    line-height: 22px;
                }
                span {
                    text-align: center;
                    width: 80px;
                    display: inline-block;
                    color: #999;
                    font-size: 22px;
                    text-align: center;
                    line-height: 50px;
                    cursor: pointer;
                }
            }
        }
    }
</style>