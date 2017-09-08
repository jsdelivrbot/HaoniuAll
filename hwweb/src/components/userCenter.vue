<template>
	<div style="height: auto;overflow: hidden;" ref='bodyes'>
		<v-header></v-header>
		<div class="content-wrap">
			<div class="userinfo-top">
				<img src="../../static/img/a37b4b1a8a845a26caa946eb1ebce909.jpg" width="100%" />

				<div class="userinfo-content">
					<div class="left">
						<img :src="userInfo.faceUrl+'?imageView2/2/w/120/h/120/q/75|imageslim'" />
					</div>
					<div class="right">
						<h1>{{userInfo.nickname}}</h1>
						<p>{{userInfo.signature}}</p>
					</div>
				</div>

				<div class="bottom-bar">
					<ul>
						<!--<li>
							<a href="#">
								全部 (213)
							</a>
						</li>

						<li>
							<a href="#">
								问答 (213)
							</a>
						</li>

						<li>
							<a href="#">
								视频 (213)
							</a>
						</li>

						<li>
							<a href="#">
								资讯 (213)
							</a>
						</li>-->
					</ul>
				</div>
			</div>
		</div>

		<div class="content-wrap userinfo-bottom">

			<div class="user-introduce">
				<h1>
					<img src="../../static/img/ren.jpg"/>
					<span>介绍</span>
				</h1>
				<p>性别: <em>{{userInfo.sex}}</em></p>
				<p>年龄: <em>21岁</em> </p>
				<p>所在地: <em>{{userInfo.cityName}}</em> </p>
				<p>个性签名: <em>{{userInfo.signature}}</em> </p>
			</div>

			<div class="right">

				<div class="haowen-box" v-for='item in Dt'>
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
							<i v-if='!item.curUserIsCanCollect' style="color: #f90;" class="el-icon-star-on" @click='shoucang(item.flagType,item.id)'></i>
							<i v-if='item.curUserIsCanCollect' class="el-icon-star-on" @click='shoucang(item.flagType,item.id)'></i>
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
                Dt: [],
                token: '',
                pages: 2,
                mores: false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
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
            this.$http({
                url: this.enHttp + '/mobile/qa/newest?page=1&rows=10' + '&username=' + this.userInfo.username,
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
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll)
        },
        methods: {
            shoucang(flagType, id) {
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
                        if (res.data.success) {
                            this.$notify({
                                title: '成功',
                                message: '恭喜您,收藏成功!',
                                type: 'success'
                            })
                        }
                        //console.log(res.data)
                    }
                )
            },
            more() {
                this.mores = true
                this.$message('数据加载中......')
                this.$http({
                    url: this.enHttp + '/mobile/qa/newest?page=' + this.pages + '&rows=6' + '&username=' + this.userInfo.username,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        //console.log(res.data)
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

                if (max > this.$refs.bodyes.offsetHeight) {
                    this.more()
                }
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
    @import url("../../static/css/userinfo.css");
</style>