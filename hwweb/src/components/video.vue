<template>
	<div style="height: auto;overflow: hidden;" ref='body'>
		<div class="center-content">

			<div class="top-bar">
				<span>
						<!--<img src="../../static/img/日历.png" />-->
						<a href="javascript:;">视频</a>
					</span>
				<span>
						<i class="icon iconfont icon-shuaxin"></i>
					</span>
			</div>

			<div class="haowen-box" v-for='(item,index) in videolist.entityList'>
				<div class="userinfo-box">
					<span class="user-img">
						<img src="../../static/img/haowenlogo.png"  v-if='!item.institutionLogo && !item.faceUrl' />
						<img :src=" item.faceUrl" v-if='item.faceUrl'/>
						<img v-if='item.institutionLogo' :src="item.institutionLogo +'?imageView2/2/w/40/h/40/q/75|imageslim'"	/>
					</span>
					<span>
							<em>{{item.username}}</em>
							<i>{{item.createTime}}</i>
					</span>

					<!--<div class="down-icon">
						<i class="el-icon-star-on" @click='shoucang(item.flagType,item.id)'></i>
					</div>-->
					<div class="down-icon">
						<i v-if='!item.curUserIsCanCollect' style="color: #f90;" class="el-icon-star-on" @click='shoucang(item.flagType,item.id,index)'></i>
						<i v-if='item.curUserIsCanCollect' class="el-icon-star-on" @click='shoucang(item.flagType,item.id,index)'></i>
					</div>
				</div>

				<div class="text-box">
					<!--<a href="javascript:;">-->
					<router-link :to='"/videoDetail/"+item.id'>
						<h2 class="title">{{item.title}}</h2>
						<div class="video">
							<!--<img src="../../static/img/1.jpg" />-->
							<img :src="item.videoUrl+'?vframe/png/offset/3/w/470/h/260|imageView2/1/w/480/h/360'" />
							<div class="play">
								<span>
										<i class="icon iconfont icon-icon4"></i>
									</span>
							</div>
						</div>

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
							<!--<span>
									<i class="icon iconfont icon-wen"></i><em>9999</em>
							</span>-->
						</div>
					</router-link>

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
                videolist: [],
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
                //console.log(token)
            this.$http({
                url: this.enHttp + '/mobile/video/list?page=1&rows=10',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    if (res.data.success) {
                        this.videolist = res.data.data
                            //console.log(res.data.data)
                    }
                }
            )
        },
        methods: {
            shoucang(flagType, id, index) {
                let flag = 'video'
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
                            $this.$set($this.videolist.entityList[index], 'curUserIsCanCollect', false)
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
                    url: this.enHttp + '/mobile/video/list?page=' + this.pages + '&rows=6',
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        console.log(res.data.data)
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
                                this.videolist.entityList.push(res.data.data.entityList[i])
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