<template>
	<div style="height: auto;overflow: hidden;" ref='body'>
		<div class="center-content">

			<div class="top-bar">
				<span>
						<a href="#">班级消息</a>
					</span>
				<span>
						<i class="icon iconfont icon-shuaxin"></i>
					</span>
			</div>

			<div class="haowen-box" v-for='(item,index) in Dt'>
				<div class="userinfo-box">
					<span class="user-img">
							<img src="../../static/img/haowenlogo.png"  v-if='!item.institutionLogo && !item.faceUrl' />
							<img :src=" item.faceUrl" v-if='item.faceUrl'/>
							<img :src=" item.institutionLogo " v-if='item.institutionLogo !== null'/>
					</span>

					<span>
							<em>{{item.nickname}}</em>
							<em>{{item.institutionName}}</em>
							<i>{{item.createTime}}</i>
						</span>

					<div class="down-icon">
						<i v-if='!item.curUserIsCanCollect' style="color: #f90;" class="el-icon-star-on" @click='shoucang(item.flagType,item.id,index)'></i>
						<i v-if='item.curUserIsCanCollect' class="el-icon-star-on" @click='shoucang(item.flagType,item.id,index)'></i>
					</div>
				</div>

				<div class="text-box" v-if='item.flagType ==2'>
					<router-link :to='"/videoDetail/"+item.id'>
						<h2 class="title" v-if='item.title'>{{item.title}}</h2>
						<div class="video">
							<img :src="item.videoUrl+'?vframe/png/offset/3/w/480/h/480|imageView2/1/w/480/h/360'" />
							<div class="play">
								<span>
										<i class="icon iconfont icon-icon4"></i>
									</span>
							</div>
						</div>
					</router-link>

					<div class="text-box-footer">
						<span>{{item.readCount}}次浏览</span>
						<!--<span>
									<i class="icon iconfont icon-109"></i> <em>9999</em>
								</span>-->
						<span>
									 <i class="icon iconfont icon-zan"></i><em>{{item.upVoteCount}}</em>
								</span>
						<span>
									<i class="icon iconfont icon-msg"></i><em>{{item.commentCount}}</em>
								</span>
						<span>
									<i class="icon iconfont icon-wen"></i><em>{{item.questionCount}}</em>
							</span>
					</div>

				</div>

				<div class="text-box" v-if='item.flagType ==0 || item.flagType ==1'>
					<router-link :to='"/wendadetail/"+item.id'>
						<h2 class="title" v-if='item.title'>{{item.title}}</h2>
						<p class="text">
							{{item.content}}
						</p>

						<div class="photo-list">
							<div v-for='itemImg in item.imageUrls'>
								<img :src="itemImg" />
							</div>
						</div>

						<div class="huida-box" v-if='item.flagType == 1' v-for='itemTw in item.questionQas'>
							<div class="userinfo-box">
								<span class="user-img">
								<img :src=" itemTw.faceUrl" v-if='itemTw.faceUrl'/>
											<!--<img src="../../static/img/teacher.jpg"/>-->
										</span>

								<span>
											<em>{{itemTw.nickname}}</em>
											<i>{{itemTw.createTime}}</i>
										</span>
							</div>

							<h2 class="title">{{itemTw.title}}</h2>
							<p class="text">
								{{itemTw.content}}...
							</p>
						</div>
					</router-link>

					<div class="text-box-footer">
						<span>{{item.readCount}}次浏览</span>
						<!--<span>
									<i class="icon iconfont icon-109"></i> <em>9999</em>
								</span>-->
						<span>
									 <i class="icon iconfont icon-zan"></i><em>{{item.upVoteCount}}</em>
								</span>
						<span>
									<i class="icon iconfont icon-msg"></i><em>{{item.commentCount}}</em>
								</span>
						<span>
									<i class="icon iconfont icon-wen"></i><em>{{item.questionCount}}</em>
							</span>
					</div>
					</a>

				</div>

				<div class="text-box" v-if='item.flagType ==3'>
					<router-link :to='"/newsdetail/"+item.id'>
						<h2 class="title" v-if='item.title'>{{item.title}}</h2>
						<p class="text">
							{{item.content.substring(0,160)}}
						</p>
					</router-link>

					<div class="text-box-footer">
						<span>{{item.readCount}}次浏览</span>
						<!--<span>
									<i class="icon iconfont icon-109"></i> <em>9999</em>
								</span>-->
						<span>
									 <i class="icon iconfont icon-zan"></i><em>{{item.upVoteCount}}</em>
								</span>
						<span>
									<i class="icon iconfont icon-msg"></i><em>{{item.commentCount}}</em>
								</span>
						<span>
									<i class="icon iconfont icon-wen"></i><em>{{item.questionCount}}</em>
							</span>
					</div>
					</a>
				</div>
			</div>
		</div>
		<v-right></v-right>
	</div>
</template>
<script>
    import Right from '@/components/rightnav'
    export default {
        components: {
            'v-right': Right
        },
        data() {
            return {
                enHttp: localStorage.getItem('http'),
                Dt: [],
                pages: 2,
                mores: false,
                detailid: ''
            }
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll)
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
            let token = sessionStorage.getItem('token')
            this.token = token

            this.detailid = this.$route.params.id

            this.$http({
                url: this.enHttp + '/mobile/qa/newest?page=1&rows=10&groupId=' + this.detailid,
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    this.Dt = res.data.data.entityList
                        //console.log(this.Dt)
                }
            )
        },
        methods: {
            shoucang(flagType, id, index) {
                let flag = ''
                if (flagType === 2) {
                    flag = 'video'
                } else if (flagType === 3) {
                    flag = 'news'
                } else if (flagType === 1) {
                    flag = 'answer'
                } else {
                    flag = 'question'
                }

                this.$http({
                    url: this.enHttp + '/mobile/collect/add?flag=' + flag + '&targetId=' + id,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        let $this = this
                        if (res.data.success) {
                            $this.$set($this.Dt[index], 'curUserIsCanCollect', false)
                            this.$notify({
                                title: '成功',
                                message: '恭喜您,收藏成功!',
                                type: 'success',
                                onClose() {
                                    //									$this.$router.go(0)
                                }
                            })
                        }
                    }
                )
            },
            more() {
                this.mores = true
                this.$message('数据加载中......')
                this.$http({
                    url: this.enHttp + '/mobile/qa/newest?page=' + this.pages + '&rows=6&groupId=' + this.detailid,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        if (this.pages > res.data.data.totalPages) {
                            this.$notify.info({
                                title: '消息',
                                message: '已经没有了!'
                            })
                            return false
                        }
                        //console.log(res.data)
                        this.pages++
                            for (var i = 0; i < res.data.data.entityList.length; i++) {
                                this.Dt.push(res.data.data.entityList[i])
                            }
                        let $this = this
                        setTimeout(function() {
                            $this.mores = false
                        }, 500)
                    }
                )
            },
            handleScroll() {
                if (this.mores) {
                    return false
                }
                var scrollTop = 0
                if (document.documentElement && document.documentElement.scrollTop) {
                    scrollTop = document.documentElement.scrollTop
                } else if (document.body) {
                    scrollTop = document.body.scrollTop
                }
                let max = 0
                if (window.scrollY) {
                    max = window.innerHeight + window.scrollY + 100
                } else {
                    max = window.innerHeight + scrollTop + 100
                }

                if (!this.$refs.body.offsetHeight) {
                    return false
                }

                if (max > this.$refs.body.offsetHeight) {
                    this.more()
                } else {}
                if (scrollTop > 50) {
                    this.headerActive = true
                } else {
                    this.headerActive = false
                }
            }
        }
    }
</script>
<style>

</style>