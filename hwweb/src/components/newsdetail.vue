<template>

	<div>
		<v-header></v-header>
		<div class="content-wrap wendaDetail-box">
			<div class="news-detail-box">
				<h1>{{detail.title}}</h1>

				<div v-html='detail.content'>
				</div>

				<div class="img-box">
					<img v-for='item2 in detail.imageUrls' :src="item2" />
				</div>

				<div class="bar">
					<div>
						{{detail.readCount}} 次浏览
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
                detailid: '',
                token: '',
                detail: [],
                pgl: '',
                plList: []
            }
        },
        mounted() {
            this.detailid = this.$route.params.id
            this.token = sessionStorage.getItem('token')
            let token = this.token
            this.$http({
                url: this.enHttp + '/mobile/news/detail?id=' + this.detailid,
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    if (res.data.success) {
                        this.detail = res.data.data
                            //console.log(res.data)
                    }
                }
            )

            this.$http({
                url: this.enHttp + '/mobile/news/comment/list?page=1&rows=1000&newsId=' + this.detailid,
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    if (res.data.success) {
                        this.plList = res.data.data.entityList
                            //console.log(this.plList)
                    }
                }
            )
        },
        methods: {
            pinglun() {
                if (this.pgl.length > 0) {
                    let token = this.token
                    this.$http({
                        url: this.enHttp + '/mobile/news/comment?newsId=' + this.detailid + '&content=' + this.pgl,
                        method: 'get',
                        headers: {
                            'token': token
                        }
                    }).then(
                        (res) => {
                            //console.log(res.data)
                            if (!res.data.success) {
                                this.$notify({
                                    duration: 1000,
                                    title: '警告',
                                    message: '评论失败!',
                                    type: 'warning'
                                })
                            } else {
                                this.pgl = ''
                                this.$notify({
                                    duration: 1000,
                                    title: '成功',
                                    message: '评论成功!',
                                    type: 'success'
                                })
                            }
                        }
                    )
                } else {
                    this.$notify({
                        title: '警告',
                        message: '请输入您的评论',
                        type: 'warning'
                    })
                }
            }
        }
    }
</script>
<style lang="less" scoped="scoped">
    @import url("../../static/css/detail.less");
    .img-box {
        display: block;
        height: auto;
        overflow: hidden;
        img {
            display: inline-block;
            width: 100%;
            overflow: hidden;
            padding: 10px;
            box-sizing: border-box;
        }
    }
</style>