<template>
	<div ref='body' style="height: auto;overflow: hidden;">
		<div class="center-content" v-loading="isloading" element-loading-text="拼命加载中">
			<div class="top-bar">
				<span>
						<a href="#">问答</a>
					</span>
				<span>
						<i class="icon iconfont icon-shuaxin"></i>
					</span>
			</div>

			<div class="haowen-box" v-for='(item,index) in wendalist'>
				<div class="userinfo-box">
					<span class="user-img">
							<img v-if='item.faceUrl' :src="item.faceUrl+'?imageView2/2/w/40/h/40/q/75|imageslim'"	/>
							<img v-if='!item.faceUrl' src="../../static/img/teacher.jpg"/>
						</span>
					<span>
							<em>{{item.nickname}}</em>
							<i>{{item.createTime}}</i>
						</span>

					<div class="down-icon">
						<i v-if='!item.curUserIsCanCollect' style="color: #f90;" class="el-icon-star-on" @click='shoucang(item.flagType,item.id,index)'></i>
						<i v-if='item.curUserIsCanCollect' class="el-icon-star-on" @click='shoucang(item.flagType,item.id,index)'></i>
					</div>
				</div>

				<div class="text-box">

					<router-link :to='"/wendadetail/"+item.id'>
						<p class="text">
							{{item.content}}
						</p>

						<div class="photo-list">
							<div v-for='items in item.imageUrls'>
								<img :src="items" />
							</div>
						</div>

						<div class="huida-box" v-for='item2 in item.questionQas'>
							<div class="userinfo-box">
								<span class="user-img">
										<img v-if='item2.faceUrl' :src="item2.faceUrl+'?imageView2/2/w/40/h/40/q/75|imageslim'"	/>
										<img v-if='!item2.faceUrl' src="../../static/img/teacher.jpg"/>
									</span>
								<span>
										<em>{{item2.nickname}}</em>
										<i>{{item2.createTime}}</i>
									</span>
							</div>
							<h2 class="title">{{item2.title}}</h2>
							<p class="text">
								{{item2.content}}
							</p>
						</div>
					</router-link>

					<div class="text-box-footer">
						<span>{{item.readCount}}次浏览</span>

						<span v-if='item.curUserIsCanUpVote' @click='dianzan(item.id)'>
									 <i class="icon iconfont icon-zan"></i><em>{{item.upVoteCount}}</em>
							</span>

						<span v-if='!item.curUserIsCanUpVote' class="active" @click='ydainzan()'>
									 <i class="icon iconfont icon-zan"></i><em>{{item.upVoteCount}}</em>
								</span>

						<span>
									<i class="icon iconfont icon-msg"></i><em>{{item.commentCount}}</em>
								</span>

					</div>
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
                token: '',
                wendalist: [],
                isloading: false,
                pages: 2,
                mores: false
            }
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll)
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
            this.token = sessionStorage.getItem('token')
            let token = this.token
            this.isloading = true
            this.$http({
                url: this.enHttp + '/mobile/qa/list?page=1&rows=6',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    //console.log(res.data)
                    this.wendalist = res.data.data.entityList
                    let $this = this
                    setTimeout(function() {
                        $this.isloading = false
                    }, 500)
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
                            $this.$set($this.wendalist[index], 'curUserIsCanCollect', false)
                            this.$notify({
                                title: '成功',
                                message: '恭喜您,收藏成功!',
                                type: 'success'
                            })
                        }
                    }
                )
            },
            dianzan(id) {
                this.$http({
                    url: this.enHttp + '/mobile/qa/upVote?id=' + id,
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        //console.log(res.data)
                    }
                )
            },
            more() {
                this.mores = true
                this.$message('数据加载中......')
                this.$http({
                    url: this.enHttp + '/mobile/qa/list?page=' + this.pages + '&rows=6',
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
                                this.wendalist.push(res.data.data.entityList[i])
                            }
                        let $this = this
                        setTimeout(function() {
                            $this.isloading = false
                            $this.mores = false
                        }, 500)
                    }
                )
            },
            ydainzan() {
                alert('已经点过赞!')
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