<template>
	<div style="height: auto;overflow: hidden;" ref='body'>
		<div class="center-content">
			<div class="top-bar">
				<span>
						<!--<img src="../../static/img/日历.png" />-->
						<a href="#">资讯</a>
					</span>
				<span>
						<i class="icon iconfont icon-shuaxin"></i>
					</span>
			</div>

			<div class="haowen-box" v-for='(item,index) in newslist'>
				<div class="userinfo-box">
					<span class="user-img">
							<img v-if='item.institutionLogo' :src="item.institutionLogo+'?imageView2/2/w/40/h/40/q/75|imageslim'"	/>
						</span>
					<span>
							<em>{{item.institutionName?item.institutionName:"暂无"}}{{index}}</em>
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
					<router-link :to='"/newsdetail/"+item.id'>
						<h2 class="title">{{item.title.length>30?item.title.substr(0,30)+'...':item.title}}</h2>
						<p class="text">
							{{item.content.substring(0,160)}}
						</p>
						<div class="photo-list">
							<div v-for='item2 in item.imageUrls'>
								<img :src="item2" />
							</div>
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
                newslist: [],
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
            this.$http({
                url: this.enHttp + '/mobile/news/list?page=1&rows=10',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    if (res.data.success) {
                        //console.log(res.data.data)
                        this.newslist = res.data.data.entityList
                    } else {
                        ci
                        alert('获取失败')
                    }
                }
            )
        },
        methods: {
            shoucang(flagType, id, index) {
                let flag = 'news'

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
                            $this.$set($this.newslist[index], 'curUserIsCanCollect', false)
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
                    url: this.enHttp + '/mobile/news/list?page=' + this.pages + '&rows=6',
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
                                this.newslist.push(res.data.data.entityList[i])
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