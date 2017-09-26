<template>
	<div class="databank">
		<topbar :title='list.name'></topbar>
		<div class="list">
			<h2 class="vux-1px-b">{{list.time}}</h2>
			<ul>
				<li v-for="(item,index) in list.list" :key="index" :class="{video:item.type==1,img:item.type!==1}">
					<router-link :to='"/play/"+item.id' tag='div' v-if='item.type==1'>
						<img :src="item.cover" />
					</router-link>
					<div v-if='item.type!==1' @click="bigShow = item.cover ">
						<img :src="item.cover" />
					</div>
				</li>
			</ul>

			<div class="nodata" v-if='list.list==""'>
				暂无资料,您可以点击右下角上传
			</div>
		</div>
		<!--<button @click="kas">上传</button>-->
		<div class="bg-box" v-if='bigShow'>
			<div class="bg" @click=" bigShow = ''"></div>
			<img :src="bigShow" />
		</div>
		<div class="addData" @click="actionsheetshow = !actionsheetshow">
			<img src="../../../static/img/addicon2.png" />
		</div>

		<div class="actionsheet" v-show="actionsheetshow">
			<ul>
				<li class="vux-1px-b">
					<input type="button" name="" id="" value="" @click="iphoneUpload2()" v-if='!this.isandroid' />
					<input type="file" name="file" id="fsiles" multiple @change="uploadVideo" v-if='this.isandroid'> 视频
				</li>
				<li>
					<input type="file" id="upload2" @change="uploadImg">图片
				</li>
				<li @click="actionsheetshow = false">取消</li>
			</ul>
		</div>
		<div v-transfer-dom>
			<loading :show="showLoading" :text="loadingText"></loading>
		</div>
	</div>
</template>
<script>
	import topbar from '@/components/callback'
	import { Loading, TransferDomDirective as TransferDom } from 'vux'
	export default {
		name: 'nokeep',
		directives: {
			TransferDom
		},
		components: {
			topbar,
			Loading
		},
		data() {
			return {
				list: '',
				bigShow: '',
				info: '',
				actionsheetshow: false,
				showLoading: false,
				loadingText: '',
				isandroid: this.$CisANDROID()
			}
		},
		methods: {
			uploadImg(event) {
				let file = event.target.files[0]
				let param = new FormData()
				param.append('file', file, file.name)
				param.append('timetableId', this.$route.params.timetableid)
				param.append('childId', this.$route.params.childid)
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				this.loadingText = '图片上传中...'
				this.showLoading = true
				this.$http.post('/classHour/aliLive/createImage', param, config).then(
					(res) => {
						if(res.data.result === 0) {
							this.list.list.push(res.data.obj)
							this.actionsheetshow = false
							this.showLoading = false
						}
					}
				)
			},
			uploadVideo(event) {
				this.actionsheetshow = false
				let userData = '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}'
				this.uploader.addFile(event.target.files[0], null, null, null, userData)
				this.$http.get('/classHour/aliLive/createUploadVideo').then(
					(res) => {
						this.info = res.data.obj
						this.uploader.startUpload()
					}
				)
			},
			iphoneUpload(event) {
				alert(event.target.files[0].size)
				let file = event.target.files[0]
				let param = new FormData()
				param.append('file', file, file.name)
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				this.showLoading = true
				this.loadingText = '视频上传中.....'
				this.$http.post('/classHour/aliLive/uploadVideo', param, config).then(
					(res) => {
						let $this = this
						this.loadingText = '视频后台转码中,稍后.....'
						setTimeout(function() {
							$this.showLoading = false
						}, 1200)
						let a = setInterval(function() {
							$this.$http.get('/classHour/aliLive/getPlayInfo', {
								params: {
									childId: $this.$route.params.childid,
									timetableId: $this.$route.params.timetableid,
									videoId: res.data.obj
								}
							}).then(
								(res) => {
									$this.list.list.push(res.data.obj)
									$this.showLoading = false
									clearInterval(a)
								}
							)
						}, 2000)
					}
				)
			},
			callback(val) {
				let $this = this
				$this.showLoading = true
				this.loadingText = '转码中,稍后.....'
				let a = setInterval(function() {
					$this.$http.get('/classHour/aliLive/getPlayInfo', {
						params: {
							childId: $this.$route.params.childid,
							timetableId: $this.$route.params.timetableid,
							videoId: val
						}
					}).then(
						(res) => {
							$this.list.list.push(res.data.obj)
							$this.showLoading = false
							clearInterval(a)
						}
					)
				}, 2000)
			},
			iphoneUpload2() {
				this.actionsheetshow = false
				this.showLoading = true
				this.loadingText = '视频上传中..'
				plus.gallery.pick(function(p) {
					task.addFile(p, {
						key: 'uploadvideo'
					})
					task.start()
				}, function(p) {}, {
					filter: 'video'
				})
				let $this = this
				var se = $this.$http.defaults.baseURL + '/classHour/aliLive/uploadVideo'
				var task = plus.uploader.createUpload(se, {
					method: 'post'
				}, function(t, status) {
					if(status === 200) {
						var res = JSON.parse(t.responseText)
						$this.callback(res.obj)
					} else {
						mui.toast('上传错误:' + status)
					}
				})
			}
		},
		beforeRouteLeave(to, from, next) {
			if(!this.showLoading) {
				next()
			} else {
				next(false)
			}
		},
		mounted() {
			let $this = this
			this.uploader = new VODUpload({
				onUploadstarted(uploadInfo) {
					$this.uploader.setUploadAuthAndAddress(uploadInfo, $this.info.UploadAuth, $this.info.UploadAddress)
				},
				onUploadSucceed(uploadInfo) {
					$this.loadingText = '正在转码中.....'
					let a = setInterval(function() {
						$this.$http.get('/classHour/aliLive/getPlayInfo', {
							params: {
								childId: $this.$route.params.childid,
								timetableId: $this.$route.params.timetableid,
								videoId: $this.info.videoId
							}
						}).then(
							(res) => {
								$this.list.list.push(res.data.obj)
								$this.showLoading = false
								clearInterval(a)
							}
						)
					}, 2000)
				},
				onUploadFailed(uploadInfo, code, message) {
					alert('失败')
				},
				onUploadProgress(uploadInfo, totalSize, uploadedSize) {
					if(Math.ceil(uploadedSize * 100 / totalSize) !== 100) {
						$this.showLoading = true
						$this.loadingText = '上传中' + Math.ceil(uploadedSize * 100 / totalSize) + '%'
					}
				},
				onUploadTokenExpired() {}
			})

			this.$http.get('/classHour/datum/listDatum', {
				params: {
					childId: this.$route.params.childid,
					timetableId: this.$route.params.timetableid
				}
			}).then(
				(res) => {
					this.list = res.data.obj
				}
			)
		}
	}
</script>
<style lang="less">
	.databank {
		padding-top: 54px;
		height: auto;
		overflow: hidden;
		.nodata {
			line-height: 120px;
			margin-bottom: 10px;
			text-align: center;
			color: #666;
		}
		.addData {
			position: fixed;
			bottom: 30px;
			right: 30px;
			width: 60px;
			img {
				width: 100%;
			}
		}
		.bg-box {
			position: fixed;
			z-index: 999999;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			.bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.5);
				z-index: -1;
			}
			img {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				max-width: 80%;
				max-height: 80%;
			}
		}
		.list {
			height: auto;
			background: #fff;
			box-sizing: border-box;
			overflow: hidden;
			h2 {
				height: 30px;
				line-height: 30px;
				font-size: 15px;
				color: #666;
				padding: 0 5px;
				padding: 0 15px;
				font-weight: normal;
				margin-bottom: 5px;
			}
			ul {
				padding: 0 3vw 3vw 3vw;
				height: auto;
				overflow: hidden;
				box-sizing: border-box;
				li {
					display: inline-block;
					float: left;
					width: 25%;
					height: 23vw;
					padding: 5px;
					/*margin: 0.25vw;*/
					box-sizing: inherit;
					div {
						width: 100%;
						height: 100%;
					}
					img {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				.video div {
					position: relative;
				}
				.video div:before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: url(../../../static/img/play2.png) no-repeat center rgba(0, 0, 0, 0.3);
					background-size: 30px;
				}
			}
		}
	}
</style>