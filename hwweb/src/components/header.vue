<template>
	<div class="header">
		<div class="content-wrap" style="overflow: initial;">
			<div class="logo">
				<!--<img src="../../static/img/smlogo.png" />-->
				<img src="../../static/img/smlogo.png" style="width: 26px;" />
			</div>
			<label for="" class="search">
					<input type="search" name="" id="" value=""  placeholder="输入关键字" />
					<a href="javascript:;"><img src="../../static/img/search.png"/></a>
				</label>
			<div class="right">
				<router-link to="/userCenter" class='img'>
					<!--<span>-->
					<img :src="userInfo.faceUrl+'?imageView2/2/w/25/h/25/q/75|imageslim'" />
					<!--<img :src="userInfo.faceUrl"/>-->
					<!--</span>-->
				</router-link>
				<span class="name">
					<router-link to="/userCenter">
						{{userInfo.nickname}} <em>|</em>
					</router-link>
					<router-link to='/pub/index'>首页</router-link>
				</span>

				<span class="msg" @mouseenter='show()'>
					<img src="../../static/img/msg.png"/>
					
					<div v-show='msgshow' @mouseleave ='hide()'>
						
						<h2 class="title">消息</h2>
						
						<ul>
							<li v-for='item in msglist' >
								<!--<img src="../../static/img/addteacher.png"/>-->
								<router-link v-if='item.flag=="qaComment"' :to='"/wendadetail/"+item.sourceId' >
									<div>
										<p>{{item.content}}</p>
										<span>{{item.createTime.substring(0,10)}}</span>
			</div>
			</router-link>

			<router-link v-if='item.flag =="answer"' :to='"/wendadetail/"+item.sourceId'>
				<div>
					<p>{{item.content}}</p>
					<span>{{item.createTime.substring(0,10)}}</span>
				</div>
			</router-link>

			<router-link v-if='item.flag =="question"' :to='"/wendadetail/"+item.sourceId'>
				<div>
					<p>{{item.content}}</p>
					<span>{{item.createTime.substring(0,10)}}</span>
				</div>
			</router-link>
			</li>
			</ul>
		</div>
		</span>

		<span class="set">
						<img src="../../static/img/set2.png"/>
						<div>
							<router-link to='/userCenter'>
								个人中心
							</router-link>
							<router-link to='/userinfoset'>
								账号设置
							</router-link>
							<a href="javascript:;" @click='loginOut'>退出登录</a>
						</div>
				</span>
	</div>
	</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                enHttp: localStorage.getItem('http'),
                userInfo: [],
                msgshow: false,
                msglist: [],
                token: ''
            }
        },
        mounted() {
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
                }
            )

            this.$http({
                url: this.enHttp + '/mobile/notice/list?flags=',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    this.msglist = res.data.data.entityList
                }
            )
            this.getnew()
        },
        methods: {
            loginOut() {
                sessionStorage.clear()
                this.$http({
                    url: this.enHttp + '/mobile/user/logout',
                    method: 'get',
                    headers: {
                        'token': this.token
                    }
                }).then(
                    (res) => {
                        let _this = this
                        this.$notify({
                                message: '退出成功',
                                type: 'warning',
                                duration: 800,
                                onClose: function() {
                                    sessionStorage.clear()
                                    _this.$router.go(0)
                                }
                            })
                            //console.log(res.data)
                    }
                )
            },
            getnew() {
                var $this = this
                    //console.log($this.msglist.length)
                var msglistLength = $this.msglist.length
                if (msglistLength !== 0) {
                    var times = setTimeout(function() {
                        var id = $this.msglist[0].id
                        $this.$http({
                            url: $this.enHttp + '/mobile/notice/listNewest?lastId=' + id,
                            method: 'get',
                            headers: {
                                'token': $this.token
                            }
                        }).then(
                            (res) => {
                                if (res.data.success) {
                                    for (var i = 0; i < res.data.data.entityList.length; i++) {
                                        $this.msglist.unshift(res.data.data.entityList[i])
                                    }
                                }
                            }
                        )
                        $this.getnew()
                    }, 5000)
                }
            },
            hide() {
                this.msgshow = false
            },
            show() {
                this.msgshow = true
            }
        }
    }
</script>
<style>

</style>