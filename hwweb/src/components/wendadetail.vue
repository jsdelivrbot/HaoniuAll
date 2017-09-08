<template>
	<div>
		<v-header></v-header>
		<div class="content-wrap wendaDetail-box">
			<div class="haowen-detail-box">
				<div class="userinfo-box" v-if='detail.isQOrA ==1'>
					<span class="user-img">
						<img v-if='detail.faceUrl' :src="detail.faceUrl+'?imageView2/2/w/40/h/40/q/75|imageslim'"	/>
							<img v-if='!detail.faceUrl' src="../../static/img/teacher.jpg"/>
						</span>

						<span>
							<em>{{detail.nickname}}</em>
							<i>{{detail.createTime}}</i>
						</span>
				</div>

				<div class="text-box">
					<div v-if='detail.isQOrA ==1'>
						<h2 class="title" v-if='detail.title'>{{detail.title}}</h2>
					</div>

					<div v-if='detail.isQOrA ==0'>
						<h1 class="title-h1" v-if='detail.title'>{{detail.title}}</h1>
					</div>

					<p class="text">
						{{detail.content}}
					</p>

					<div class="photo-list" v-for='item in detail.imageUrls'>
						<img :src="item" />
					</div>

					<router-link :to='"/wendadetail/"+item2.id' v-for='item2 in detail.questionQas' :key='item'>
						<div class="huida-box">
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
							<h2 class="title" v-if='item2.title'>{{item2.title}}</h2>
							<p class="text">
								{{item2.content}}
							</p>
						</div>
					</router-link>

					<div class="text-box-footer">
						<span>{{detail.readCount}}次浏览</span>
						<span>
							<i class="icon iconfont icon-msg"></i><em>{{detail.commentCount}}</em>
						</span>
						<span :class="{active:!detail.curUserIsCanUpVote}" @click='dianzan()'>
							<i class="icon iconfont icon-zan"></i><em>{{detail.upVoteCount}}</em>
						</span>

					</div>

				</div>

			</div>

			<a href="javascript:;" v-if='detail.isQOrA!==1' class="tiwen-bar" @click='huida(detail.id)'>
				<i class="icon iconfont icon-wen"></i><em>我要回答问题</em>
			</a>

			<el-dialog title="回答问题" v-model="cengShow">
				<el-input type="textarea" :rows="5" v-model='wendacontent' placeholder="请输入您的答案" style='margin-bottom: 20px;'>
				</el-input>

				<el-upload :file-list="getImgList" action="https://upload.qbox.me" :on-remove="imgRemove" :on-error='upError' :data='imgToken' :on-success="imgSuc" :before-upload="bfimg" list-type="picture-card">
					<i class="el-icon-plus"></i>
				</el-upload>

				<div slot="footer" class="dialog-footer">
					<el-button @click="cengShow = false">取 消</el-button>
					<el-button type="primary" @click="trueSubmit()">确定提交</el-button>
				</div>
			</el-dialog>

			<div class="haowen-pl-box">
				<textarea v-model='pgl'></textarea>
				<p>
					<a href="javascript:;" @click='pinglun'>评论</a>
				</p>
			</div>

			<div class="haowen-pl-list" v-if='pllist.length>0'>
				<ul>
					<li v-for='item in pllist'>
						<div class="ziji">
							<div class="userinfo-top-box">
								<span class="user-img">
								<img :src="item.faceUrl+'?imageView2/2/w/40/h/40/q/75|imageslim'"/>
							</span>
								<span>
								<em>{{item.nickname}}</em>
								<i>{{item.createTime}}</i>
							</span>

								<a href="javascript:;" class="huifu" @click='huifu(item.id)'>
									回复
								</a>
							</div>
							<p>
								{{item.content}}
							</p>
						</div>

						<div class="fdpl" v-if='item.levelTwoPages.entityList.length>0'>
							<li v-for='item2 in item.levelTwoPages.entityList'>
								<div class="userinfo-top-box">
									<span class="user-img">
								<img :src="item2.faceUrl+'?imageView2/2/w/40/h/40/q/75|imageslim'"/>
							</span>
									<span>
								<em>{{item2.nickname}}</em>
								<i>{{item2.createTime}}</i>
							</span>

									<a href="javascript:;" class="huifu" @click='huifu(item2.id)'>
										回复
									</a>
								</div>
								<p>
									{{item2.content}}
								</p>
							</li>
						</div>

					</li>
				</ul>
			</div>
		</div>

		<el-dialog title="回复" v-model='huifutrue'>
			<el-input type="textarea" v-model='huifucontent'></el-input>
			<div slot="footer" class="dialog-footer">
				<el-button @click="huifutrue = false">取 消</el-button>
				<el-button type="primary" @click="subhuifu()">确 定</el-button>
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
				fileList2: [],
				detail: [],
				token: '',
				detailid: '', //问答详情ID
				pgl: '',
				fls: false,
				pllist: [], //评论列表
				cengShow: false, //回答问题的碳层
				imgToken: {
					token: '' //获取上传的token
				},
				imgList: [], //图片上传列表
				wendacontent: '',
				huifutrue: false,
				huifuid: '',
				huifucontent: '',
				getImgList: [],
				stop: false
			}
		},
		beforeRouteUpdate(to, from, next) {
			this.$router.go(0)
			next()
		},
		beforeDestroy() {
			this.stop = true
		},
		mounted() {
			this.detailid = this.$route.params.id
			this.token = sessionStorage.getItem('token')
			let token = this.token
			console.log(token)
			this.$http({
				url: this.enHttp + '/mobile/qa/detail?id=' + this.detailid,
				method: 'get',
				headers: {
					'token': token
				}
			}).then(
				(res) => {
					console.log(res.data)
					this.detail = res.data.data
					if(!res.data.success) {
						this.$router.replace('/pub/wenda')
					}
				}
			)
			this.$http({
				url: this.enHttp + '/mobile/qa/comment/list?page=1&rows=5&qaId=' + this.detailid,
				method: 'get',
				headers: {
					'token': token
				}
			}).then(
				(res) => {
					this.pllist = res.data.data.entityList
					console.log(res.data)
				}
			)
			this.getToken()
			this.lunxun()
		},
		methods: {
			lunxun() {
				if(!this.stop) {
					let $this = this
					let jishiqi = setInterval(function() {
						$this.$http({
							url: $this.enHttp + '/mobile/user/loadImage',
							method: 'get',
							headers: {
								'token': $this.token
							}
						}).then(
							(res) => {
								if(res.data.success) {
									let arr = []
									for(var i = 0; i < res.data.data.length; i++) {
										let obj = {}
										let obj2 = {}
										obj.name = i
										obj.url = 'http://v.haowen.im/' + res.data.data[i]
										arr.push(obj)
										obj2.key = res.data.data[i]
										obj2.hash = res.data.data[i]
										$this.getImgList.push(obj)
										$this.imgList.push(obj2)
									}
								} else {
									//									console.log(res.data)
								}
							}
						)
					}, 10000)
				}
			},
			dianzan() {
				this.$http({
					url: this.enHttp + '/mobile/qa/upVote?id=' + this.detailid,
					method: 'get',
					headers: {
						'token': this.token
					}
				}).then(
					(res) => {
						if(res.data.success) {
							this.$notify({
								title: '成功!',
								message: '点赞' + res.data.msg,
								type: 'success',
								duration: 1000
							})
						} else {
							this.$notify({
								title: '失败',
								message: res.data.msg,
								type: 'error',
								duration: 1000
							})
						}
					}
				)
			},
			subhuifu() {
				if(this.huifucontent.length <= 0) {
					this.$notify({
						title: '失败',
						message: '请输入您的回复',
						type: 'warning',
						duration: 1000
					})
					return false
				}
				this.$http({
					url: this.enHttp + '/mobile/qa/comment/reply?commentId=' + this.huifuid + '&content=' + this.huifucontent,
					method: 'get',
					headers: {
						'token': this.token
					}
				}).then(
					(res) => {
						if(res.data.success) {
							this.$notify({
								title: '成功',
								message: res.data.msg,
								type: 'success',
								duration: 1000
							})
							this.huifutrue = false
							this.huifucontent = ''
						} else {
							this.$notify({
								title: '失败',
								message: res.data.msg,
								type: 'error',
								duration: 1000
							})
							this.huifutrue = false
						}
					}
				)
			},
			huifu(id) {
				this.huifutrue = true
				this.huifuid = id
			},
			trueSubmit() {
				let imglist = ''
				for(var i = 0; i < this.imgList.length; i++) {
					console.log(this.imgList[i].response)
					imglist += '&path_SWFUpload_' + i + '=' + this.imgList[i].key + '&hash_SWFUpload_' + i + '=' + this.imgList[i].hash
				}
				this.$http({
					url: this.enHttp + '/mobile/qa/answer?content=' + this.wendacontent + '&questionId=' + this.detailid + imglist,
					method: 'get',
					headers: {
						'token': this.token
					}
				}).then(
					(res) => {
						if(res.data.success) {
							this.$notify({
								title: '成功',
								message: res.data.msg,
								type: 'success',
								duration: 1000
							})
							this.cengShow = false
						}
						console.log(res.data)
					}
				)

				console.log(imglist)
			},
			pinglun() {
				if(this.pgl.length > 0) {
					let token = this.token
					this.$http({
						url: this.enHttp + '/mobile/qa/comment?qaId=' + this.detailid + '&content=' + this.pgl,
						method: 'get',
						headers: {
							'token': token
						}
					}).then(
						(res) => {
							console.log(res.data)
							if(!res.data.success) {
								this.$notify({
									title: '警告',
									message: '评论失败!',
									type: 'warning',
									duration: 1000
								})
							} else {
								this.pgl = ''
								this.$notify({
									title: '成功',
									message: '评论成功!',
									type: 'success',
									duration: 1000
								})
							}
						}
					)
				} else {
					this.$notify({
						title: '警告',
						message: '请输入您的评论',
						type: 'warning',
						duration: 1000
					})
				}
			},
			upError() {
				this.$message({
					type: 'error',
					message: '上传失败,请重试!',
					duration: 1000
				})
			},
			imgRet(file) {},
			imgSuc(response, file, fileList) {
				this.imageUrl = URL.createObjectURL(file.raw)
				console.log(fileList)
				this.imgList.push(response)
				//				this.imgList = fileList
				this.$message({
					type: 'success',
					message: '上传成功!',
					duration: 1000
				})
				console.log(this.imgList)
			},
			bfimg(file) {
				if(this.imgList.length > 4) {
					this.$message({
						type: 'error',
						message: '上传失败,最多只能上传4张图片!',
						duration: 1000
					})
					console.log(this.imgList)
					return false
				} else {
					this.getToken()
				}
			},
			getToken() {
				this.$http.get(this.enHttp + '/mobile/qiniuUploadToken?type=1').then(
					(res) => {
						if(res.data.success) {
							this.imgToken.token = res.data.data.token
						} else {
							return false
						}
						console.log(res.data.data.token)
					}
				)
			},
			imgRemove(file, fileList) {
				this.imgList = fileList
				console.log(this.imgList)
			},
			huida(id) {
				this.cengShow = true
			}
		}
	}
</script>
<style lang="less">
	@import url("../../static/css/detail.less");
	.wendaDetail-box {
		margin-top: 60px;
	}
	
	.hideimg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1111;
		text-align: center;
		.bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			z-index: -1;
		}
		>div {
			margin: auto;
			margin-top: 100px;
			background: #fff;
			max-width: 1000px;
			padding: 40px 0;
			padding-bottom: 0;
		}
		>span {
			margin: auto;
			padding: 40px 0;
			max-width: 1000px;
			display: block;
			background: #fff;
		}
	}
</style>