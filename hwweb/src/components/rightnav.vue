<template>
	<div class="right-box">
		<div class="hot-wenda">
			<h2>推荐视频</h2>
			<router-link :to='"/videoDetail/"+video.id'>
				<div class="video">
					<img :src="video.videoUrl+'?vframe/png/offset/3/w/480/h/480|imageView2/1/w/480/h/360'" />
					<div class="play">
						<span>
							<i class="icon iconfont icon-icon4"></i>
						</span>
					</div>
				</div>
			</router-link>
		</div>

		<div class="hot-wenda">
			<h2>热门回答</h2>
			<div class="text-box" v-for='item in hotWhy'>
				<router-link :to='"/wendadetail/"+item.id'>
					<img v-if='item.faceUrl' :src="item.faceUrl+'?imageView2/2/w/40/h/40/q/75|imageslim'" />
					<img v-if='!item.faceUrl' src="../../static/img/haowenlogo.png" />
					<div>
						<p>{{item.content}}</p>
						<a href="#">
							<i class="icon iconfont icon-zan"></i><em>{{item.upVoteCount}}</em>
						</a>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                enHttp: localStorage.getItem('http'),
                video: [],
                hotWhy: [],
                token: ''
            }
        },
        mounted() {
            this.token = sessionStorage.getItem('token')
            let token = this.token
            this.$http({
                url: this.enHttp + '/mobile/video/recommend',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    this.video = res.data.data
                }
            )

            this.$http({
                url: this.enHttp + '/mobile/qa/recommend',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    this.hotWhy = res.data.data
                        //console.log(res.data.data)
                }
            )
        }
    }
</script>
<style lang="less">

</style>