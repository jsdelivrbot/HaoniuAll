<template>
	<div class="contentgl">
		<el-tabs active-name='second' style='background: #fff;'>
			<el-tab-pane label="视频管理" name="first">
				<div class="glvideo">
					<el-form label-width="80px" label-position='top'>
						<el-form-item label="标题">
							<el-input placeholder='请输入标题' v-model='videoTitle'></el-input>
						</el-form-item>
						<el-form-item label="内容">
							<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="videoContent">
							</el-input>
						</el-form-item>
						<el-form-item label="上传视频文件">
							<el-upload class="upload-demo" drag action="https://upload.qbox.me" :on-remove="videoRemove" :data='imgToken' :on-success="srcvideo" :before-upload="bfvideo" multiple>
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
								<div class="el-upload__tip" slot="tip">只能上传视频文件</div>
							</el-upload>
						</el-form-item>
						<el-form-item label="是否全部公开">
							<el-switch v-model="isPuball" on-color="#13ce66" off-color="#ff4949">
							</el-switch>
						</el-form-item>
						<el-form-item label="是否机构公开" v-if='!isPuball'>
							<el-switch v-model="isPub" on-color="#13ce66" off-color="#ff4949">
							</el-switch>
						</el-form-item>
						<div v-if='!isPub && !isPuball'>
							<el-radio class="radio" v-model="radio" label="1">指定专业</el-radio>
							<el-radio class="radio" v-model="radio" label="2">指定分组</el-radio>
							<el-radio class="radio" v-model="radio" label="3">指定班级</el-radio>
							<el-form-item label="   ">
								<el-select v-model="zhuanyeId" placeholder="请指定专业" v-if='radio ==1'>
									<el-option v-for="item in zhuanyeList" :key='item' :label="item.name" :value="item.id">
									</el-option>
								</el-select>
								<el-select v-model="fenzuId" placeholder="请指定分组 " v-if='radio ==2'>
									<el-option v-for="item in fenzuList" :key='item' :label="item.name" :value="item.id">
									</el-option>
								</el-select>
								<el-select v-model="classesId" placeholder="请指定班级" v-if='radio ==3'>
									<el-option v-for="item in classList" :key='item' :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
						<div style="text-align: right;">
							<el-button type="primary" style='margin-top: 20px;' @click='trueUp'>确认发布</el-button>
						</div>
					</el-form>
				</div>

				<v-videolist></v-videolist>

			</el-tab-pane>

			<el-tab-pane label="资讯管理" name="second">
				<div class="glvideo">
					<div id="editor">
						<!--<iframe :src="enHttp+'/app/page/index?token='+token" width="760" height="1000">-->
						<div style="margin-bottom: 10px;">
							<span style="display: block;">资讯标题</span>
							<input type="text" name="title" id="title" value="">
							<el-input v-model="editorTitle" placeholder="请输入资讯标题"></el-input>
						</div>
						</iframe>
						<div>
							<span style="display: block;margin-bottom: 10px;">资讯描述</span>
							<vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="editorContent"></vue-editor>

						</div>
						<div class="select">
							<el-form label-width="80px" label-position='top'>
								<el-form-item label="是否全部公开">
									<el-switch v-model="isnewsPuball" on-color="#13ce66" off-color="#ff4949">
									</el-switch>
								</el-form-item>
								<el-form-item label="是否机构公开" v-if='!isnewsPuball'>
									<el-switch v-model="isnewsPub" on-color="#13ce66" off-color="#ff4949">
									</el-switch>
								</el-form-item>
								<div v-if='!isnewsPub && !isnewsPuball'>
									<el-radio class="radio" v-model="radio2" label="1">指定专业</el-radio>
									<el-radio class="radio" v-model="radio2" label="2">指定分组</el-radio>
									<el-radio class="radio" v-model="radio2" label="3">指定班级</el-radio>
									<el-form-item label="   ">
										<el-select v-model="zhuanyeId2" placeholder="请指定专业" v-if='radio2 ==1'>
											<el-option v-for="item in zhuanyeList" :key='item' :label="item.name" :value="item.id">
											</el-option>
										</el-select>
										<el-select v-model="fenzuId2" placeholder="请指定分组 " v-if='radio2 ==2'>
											<el-option v-for="item in fenzuList" :key='item' :label="item.name" :value="item.id">
											</el-option>
										</el-select>
										<el-select v-model="classesId2" placeholder="请指定班级" v-if='radio2 ==3'>
											<el-option v-for="item in classList" :key='item' :label="item.name" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</div>
							</el-form>
						</div>
						<el-button type="primary" @click="editorPut">提交</el-button>
					</div>
				</div>

				<newlist></newlist>

			</el-tab-pane>

			<el-tab-pane label="通知管理" name="third">

				<div class="glvideo">
					<el-form label-position="top" label-width="80px">
						<el-form-item label="通知标题">
							<el-input v-model="tipsTitle" placeholder="请输入咨询标题"></el-input>
						</el-form-item>
						<el-form-item label="通知内容">
							<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="tipsContent">
							</el-input>
						</el-form-item>

						<el-form-item label="是否全部公开">
							<el-switch v-model="istipsPuball" on-color="#13ce66" off-color="#ff4949">
							</el-switch>
						</el-form-item>

						<el-form-item label="是否机构公开" v-if='!istipsPuball'>
							<el-switch v-model="istipsPub" on-color="#13ce66" off-color="#ff4949">
							</el-switch>
						</el-form-item>

						<div v-if='!istipsPub && !istipsPuball '>
							<el-radio class="radio" v-model="radio3" label="1">指定专业</el-radio>
							<el-radio class="radio" v-model="radio3" label="2">指定分组</el-radio>
							<el-radio class="radio" v-model="radio3" label="3">指定班级</el-radio>
							<el-form-item label="   ">
								<el-select v-model="zhuanyeId3" placeholder="请指定专业" v-if='radio3 ==1'>
									<el-option v-for="item in zhuanyeList" :key='item' :label="item.name" :value="item.id">
									</el-option>
								</el-select>

								<el-select v-model="fenzuId3" placeholder="请指定分组 " v-if='radio3 ==2'>
									<el-option v-for="item in fenzuList" :key='item' :label="item.name" :value="item.id">
									</el-option>
								</el-select>

								<el-select v-model="classesId3" placeholder="请指定班级" v-if='radio3 ==3'>
									<el-option v-for="item in classList" :key='item' :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>

						</div>

						<el-form-item label="" style='text-align: right;'>
							<el-button type="primary" @click='trueSubTips()'>确认发布</el-button>
						</el-form-item>
					</el-form>
				</div>

				<tipslist></tipslist>

			</el-tab-pane>
			<el-tab-pane label="删帖管理" name="four">
				<deletetxt></deletetxt>
			</el-tab-pane>

			<el-tab-pane label="机构管理" name="five">
				<jggl></jggl>
			</el-tab-pane>
		</el-tabs>

	</div>
</template>
<script>
	import videolist from '@/components/videolist'
	import newlist from '@/components/newlist'
	import tipslist from '@/components/tipslist'
	import deletetxt from '@/components/deletetxt'
	import jggl from '@/components/jggl'
	import vueHtmlEditor from 'vue-html-editor'

	import {
		VueEditor
	} from 'vue2-editor'

	export default {
		props: ['total'],
		components: {
			'v-videolist': videolist,
			'newlist': newlist,
			'tipslist': tipslist,
			deletetxt,
			jggl,
			VueEditor
		},
		data() {
			return {
				enHttp: localStorage.getItem('http'),
				editorContent: '',
				customToolbar: [
					['bold', 'italic', 'underline'],
					[{
						'list': 'ordered'
					}, {
						'list': 'bullet'
					}],
					['image', 'code-block']
				],
				editorTitle: '',
				videoTitle: '',
				jurisdiction: '1',
				videoContent: '',
				imgToken: {
					token: ''
				},
				radio: '1',
				radio2: '1',
				radio3: '1',
				video: '',
				isPub: true,
				isPuball: true,
				isnewsPub: true,
				isnewsPuball: true,
				istipsPub: true,
				istipsPuball: true,
				zhuanyeList: '',
				fenzuList: '',
				classList: '',
				zhuanyeId: '',
				fenzuId: '',
				classesId: '',
				zhuanyeId2: '',
				fenzuId2: '',
				classesId2: '',
				zhuanyeId3: '',
				fenzuId3: '',
				classesId3: '',
				newsContent: '',
				newsTitle: '',
				tipsContent: '',
				tipsTitle: '',
				click1: 0,
				otherUrl: '',
				imgList: [],
				token: ''
			}
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
			this.getToken()
			this.$http({
				url: this.enHttp + '/mobile/major/list',
				method: 'get',
				headers: {
					'token': this.token
				}
			}).then(
				(res) => {
					this.zhuanyeList = res.data.data
				}
			)

			this.$http({
				url: this.enHttp + '/mobile/team/list?page=1&rows=1000',
				method: 'get',
				headers: {
					'token': this.token
				}
			}).then(
				(res) => {
					this.fenzuList = res.data.data.entityList
					//console.log(res.data.data.entityList)
				}
			)
			this.$http({
				url: this.enHttp + '/mobile/group/list?page=1&rows=1000',
				method: 'get',
				headers: {
					'token': this.token
				}
			}).then(
				(res) => {
					this.classList = res.data.data.entityList
				}
			)
		},
		methods: {
			editorPut() {
				if(this.editorTitle === '') {
					this.$notify({
						title: '警告',
						message: '请输入资讯标题',
						duration: 1000,
						type: 'warning'
					})
					return false
				}
				if(this.editorContent === '') {
					this.$notify({
						title: '警告',
						message: '请输入资讯描述',
						duration: 1000,
						type: 'warning'
					})
					return false
				}
				let flag = ''
				let targetIdes = ''
				if(this.isnewsPuball) {
					flag = 'pub'
				} else {
					if(this.isnewsPub) {
						flag = 'all'
					} else {
						if(this.radio2 === '1') {
							flag = 'major'
							targetIdes = this.zhuanyeId2
						} else if(this.radio2 === '2') {
							flag = 'team'
							targetIdes = this.fenzuId2
						} else {
							flag = 'group'
							targetIdes = this.classesId2
						}
						if(flag === '' || targetIdes === '') {
							this.$notify({
								title: '警告',
								message: '请选择资讯权限',
								type: 'warning'
							})
							return false
						}
					}
				}
				this.$http.post(
					this.enHttp + '/mobile/news/adminAdd', {
						flag: flag,
						content: this.editorContent,
						title: this.editorTitle,
						targetId: targetIdes
					}, {
						emulateJSON: true
					}
				).then(res => {
					var $this = this
					if(res.data.success) {
						this.$notify({
							title: '成功',
							message: '恭喜您上传成功!',
							type: 'success',
							duration: 1000,
							onClose: function() {
								$this.$router.go(0)
							}
						})
					} else {
						this.$notify({
							title: '失败',
							message: '资讯上传失败,请重试!',
							duration: 1000,
							type: 'error'
						})
					}
				})

				//								this.$http({
				//									url: this.enHttp + '/mobile/news/adminAdd?flag=' + flag + '&content=' + this.editorContent + '&title=' + this.editorTitle + '&targetId=' + targetIdes,
				//									method: 'post',
				//									headers: {
				//										'token': this.token
				//									},
				//									data
				//								}).then(res => {
				//									var $this = this
				//									if(res.data.success) {
				//										this.$notify({
				//											title: '成功',
				//											message: '恭喜您上传成功!',
				//											type: 'success',
				//											duration: 1000,
				//											onClose: function() {
				//												//								$this.$router.go(0)
				//											}
				//										})
				//									} else {
				//										this.$notify({
				//											title: '失败',
				//											message: '资讯上传失败,请重试!',
				//											duration: 1000,
				//											type: 'error'
				//										})
				//									}
				//								})
			},
			handleImageAdded(file, Editor, cursorLocation) {
				if(!this.imgToken.token) {
					this.getToken()
				}
				var formData = new FormData()
				formData.append('token', this.imgToken.token)
				formData.append('file', file, file.name)
				this.$http.post('https://upload.qbox.me', formData).then(res => {
					this.$message({
						type: 'success',
						message: '上传成功!',
						duration: 1000
					})
					Editor.insertEmbed(cursorLocation, 'image', 'https://cdn.haowen.im/' + res.data.key)
				}).catch(err => {
					console.log(err)
				})
			},
			imgSuc(response, file, fileList) {
				console.log(URL)
				this.imageUrl = URL.createObjectURL(file.raw)
				this.imgList = fileList
				this.$message({
					type: 'success',
					message: '上传成功!',
					duration: 1000
				})
				//console.log(this.imgList)
			},
			bfimg(file) {
				if(this.imgList.length > 4) {
					this.$message({
						type: 'error',
						message: '上传失败,最多只能上传4张图片!',
						duration: 1000
					})
					return false
				} else {
					this.getToken()
				}
			},
			trueSub() {
				if(this.click1 > 0) {
					this.$notify({
						title: '警告',
						message: '请等待结果！',
						type: 'warning',
						duration: 1000
					})
				} else {
					this.click1 = 1
				}

				if(this.newsTitle === '') {
					this.$notify({
						title: '警告',
						message: '请输入资讯标题！',
						type: 'warning',
						duration: 1000
					})
					this.click1 = 0
					return false
				}
				if(this.newsContent === '') {
					this.$notify({
						title: '警告',
						message: '请输入资讯正文！',
						type: 'warning',
						duration: 1000
					})
					this.click1 = 0
					return false
				}
				if(this.isnewsPuball) {
					let flag = ''
					if(this.isnewsPuball) {
						flag = 'pub'
					} else {
						flag = 'all'
					}

					let imglist = ''
					for(var i = 0; i < this.imgList.length; i++) {
						//console.log(this.imgList[i].response)
						imglist += '&path_SWFUpload_' + i + '=' + this.imgList[i].response.key + '&hash_SWFUpload_' + i + '=' + this.imgList[i].response.hash
					}

					this.$http({
						url: this.enHttp + '/mobile/news/adminAdd?flag=' + flag + '&content=' + this.newsContent + '&title=' + this.newsTitle + imglist + '&otherUrl=' + this.otherUrl,
						method: 'get',
						headers: {
							'token': this.token
						}
					}).then(
						(res) => {
							var $this = this
							if(res.data.success) {
								this.$notify({
									title: '成功',
									message: '恭喜您上传成功!',
									type: 'success',
									duration: 1000,
									onClose: function() {
										$this.$router.go(0)
									}
								})
							} else {
								this.$notify({
									title: '失败',
									message: '资讯上传失败,请重试!',
									duration: 1000,
									type: 'error'
								})
							}
							this.click1 = 0
						}
					)
				} else {
					let flages = ''
					let targetIdes = ''
					if(this.radio2 === '1') {
						flages = 'major'
						targetIdes = this.zhuanyeId2
					} else if(this.radio2 === '2') {
						flages = 'team'
						targetIdes = this.fenzuId2
					} else {
						flages = 'group'
						targetIdes = this.classesId2
					}
					if(flages === '' || targetIdes === '') {
						this.$notify({
							title: '警告',
							message: '请选择资讯权限',
							type: 'warning'
						})
						this.click1 = 0
						return false
					}

					let imglist = ''
					for(var i = 0; i < this.imgList.length; i++) {
						//console.log(this.imgList[i].response)
						imglist += '&path_SWFUpload_' + i + '=' + this.imgList[i].response.key + '&hash_SWFUpload_' + i + '=' + this.imgList[i].response.hash
					}

					this.$http({
						url: this.enHttp + '/mobile/news/adminAdd?flag=' + flages + '&targetId=' + targetIdes + '&content=' + this.newsContent + '&title=' + this.newsTitle + imglist + '&otherUrl=' + this.otherUrl,
						method: 'get',
						headers: {
							'token': this.token
						}
					}).then(
						(res) => {
							let $this = this
							if(res.data.success) {
								this.$notify({
									title: '成功',
									message: '恭喜您上传成功!',
									type: 'success',
									duration: 1000,
									onClose: function() {
										$this.$router.go(0)
									}
								})
							} else {
								this.$notify({
									title: '失败',
									message: '资讯上传失败,请重试!',
									duration: 1000,
									type: 'error'
								})
							}
							this.click1 = 0
						}
					)
				}
			},
			trueUp() {
				if(this.videoTitle === '') {
					this.$notify({
						title: '警告',
						message: '请输入视频标题',
						duration: 1000,
						type: 'warning'
					})
					return false
				}
				if(this.videoContent === '') {
					this.$notify({
						title: '警告',
						message: '请输入视频内容',
						duration: 1000,
						type: 'warning'
					})
					return false
				}
				if(this.video === '' || this.video === undefined) {
					this.$notify({
						title: '警告',
						message: '请上传视频',
						duration: 1000,
						type: 'warning'
					})
					return false
				}
				if(this.isPuball) {
					let flag = ''
					if(this.isPuball) {
						flag = 'pub'
					} else {
						flag = 'all'
					}

					this.$http.get(this.enHttp + '/mobile/video/adminAdd', {
						params: {
							'flag': flag,
							'content': this.videoContent,
							'title': this.videoTitle,
							'path_SWFUpload_1': this.video.key,
							'hash_SWFUpload_1': this.video.hash
						},
						headers: {
							'token': this.token
						}
					}).then(
						(res) => {
							let $this = this
							if(res.data.success) {
								this.$notify({
									title: '成功',
									message: '恭喜您上传成功!',
									type: 'success',
									duration: 1000,
									onClose: function() {
										$this.$router.go(0)
									}
								})
							} else {
								this.$notify({
									title: '失败',
									message: '视频上传失败,请重试!',
									duration: 1000,
									type: 'error'
								})
							}
						}
					)
				} else {
					let flag = ''
					let targetId = ''
					if(this.radio === '1') {
						flag = 'major'
						targetId = this.zhuanyeId
					} else if(this.radio === '2') {
						flag = 'team'
						targetId = this.fenzuId
					} else {
						flag = 'group'
						targetId = this.classesId
					}
					if(flag === '' || targetId === '') {
						this.$notify({
							title: '警告',
							message: '请选择视频权限',
							type: 'warning'
						})
						return false
					}

					this.$http.get(this.enHttp + '/mobile/video/adminAdd', {
						params: {
							'flag': flag,
							'targetId': targetId,
							'content': this.videoContent,
							'title': this.videoTitle,
							'path_SWFUpload_1': this.video.key,
							'hash_SWFUpload_1': this.video.hash
						},
						headers: {
							'token': this.token
						}
					}).then(
						(res) => {
							let $this = this
							if(res.data.success) {
								this.$notify({
									title: '成功',
									message: '恭喜您上传成功!',
									type: 'success',
									duration: 1000,
									onClose: function() {
										$this.$router.go(0)
									}
								})
							} else {
								this.$notify({
									title: '失败',
									message: '视频上传失败,请重试!',
									duration: 1000,
									type: 'error'
								})
							}
						}
					)
				}
			},
			trueSubTips() {
				if(this.tipsTitle === '') {
					this.$notify({
						title: '警告',
						message: '请输入通知标题',
						type: 'warning'
					})
					return false
				}
				if(this.tipsContent === '') {
					this.$notify({
						title: '警告',
						message: '请输入通知内容',
						type: 'warning'
					})
					return false
				}
				if(this.istipsPuball) {
					let flag = ''
					if(this.istipsPuball) {
						flag = 'pub'
					} else {
						flag = 'all'
					}
					this.$http({
						url: this.enHttp + '/mobile/institutionNotice/adminAdd?flag=' + flag + '&targetId=&content=' + this.tipsContent + '&title=' + this.tipsTitle,
						method: 'get',
						headers: {
							'token': this.token
						}
					}).then(
						(res) => {
							let $this = this
							if(res.data.success) {
								this.$notify({
									title: '成功',
									message: '已成功发布通知!',
									type: 'success',
									duration: 1000,
									onClose: function() {
										$this.$router.go(0)
									}
								})
							} else {
								this.$notify({
									title: '失败',
									message: '通知发布失败,请重试!',
									duration: 1000,
									type: 'error'
								})
							}
						}
					)
				} else {
					let flag = ''
					let targetId = ''
					if(this.radio3 === '1') {
						flag = 'major'
						targetId = this.zhuanyeId3
					} else if(this.radio3 === '2') {
						flag = 'team'
						targetId = this.fenzuId3
					} else {
						flag = 'group'
						targetId = this.classesId3
					}
					if(flag === '' || targetId === '') {
						this.$notify({
							title: '警告',
							message: '请选择通知权限',
							type: 'warning'
						})
						return false
					}
					this.$http({
						url: this.enHttp + '/mobile/institutionNotice/adminAdd?flag=' + flag + '&targetId=' + targetId + '&content=' + this.tipsContent + '&title=' + this.tipsTitle,
						method: 'get',
						headers: {
							'token': this.token
						}
					}).then(
						(res) => {
							let $this = this
							if(res.data.success) {
								this.$notify({
									title: '成功',
									message: '已成功发布通知!',
									type: 'success',
									duration: 1000,
									onClose: function() {
										$this.$router.go(0)
									}
								})
							} else {
								this.$notify({
									title: '失败',
									message: '通知发布失败,请重试!',
									duration: 1000,
									type: 'error'
								})
							}
						}
					)
				}
			},
			zychange() {
				this.fenzuId = ''
				this.classesId = ''
			},
			fzchange() {
				this.zhuanyeId = ''
				this.classesId = ''
			},
			cschange(val) {
				alert(val)
				this.fenzuId = ''
				this.zhuanyeId = ''
				this.classesId = val
			},
			srcvideo(response, file, fileList) {
				this.video = fileList[0].response
				this.$message({
					type: 'success',
					message: '上传成功!',
					duration: 1000
				})
				//console.log(this.video)
			},
			bfvideo(file) {
				console.log(file.type)
				if(file.type !== 'video/mp4') {
					alert('请上传MP4格式的视频文件')
					return false
				}
				//console.log(file.type)
				//console.log(file.size)
				this.getToken()
			},
			videoRemove(file, fileList) {
				this.video = fileList
			},
			imgRemove(file, fileList) {
				this.imgList = fileList
				//console.log(this.imgList)
			},
			upError() {
				alert('上传失败')
			},
			getToken() {
				this.$http.get(this.enHttp + '/mobile/qiniuUploadToken?type=1').then(
					(res) => {
						if(res.data.success) {
							this.imgToken.token = res.data.data.token
						} else {
							return false
						}
						//console.log(res.data.data.token)
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.ql-editor {
		min-height: 400px;
	}
	
	.el-tabs__content {
		background: #e9ebee;
	}
	
	.contentgl {
		margin-left: 200px;
		width: 800px;
		height: auto;
		overflow: hidden;
		padding-bottom: 60px;
		.glvideo {
			padding: 20px;
			box-sizing: border-box;
			background: #fff;
		}
		.video-list {
			background: #e9ebee;
			height: auto;
			overflow: hidden;
			padding-top: 20px;
			.title {
				background: #fff;
				line-height: 40px;
				padding: 5px 20px;
				box-sizing: border-box;
				color: #222222;
			}
		}
	}
</style>