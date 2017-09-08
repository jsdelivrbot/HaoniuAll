<template>
	<div>
		<div class="center-content">
			<div class="shoucangjia">
				<div>
					<i class="icon iconfont icon-qmiconshoucangjiaxuanzhong"></i> 收藏夹
				</div>
			</div>

			<div class="collect-box">
				<ul>
					<li v-for='(item,index) in list'>
						<div class="top">
							<img v-if='item.pubFaceUrl' :src="item.pubFaceUrl+'?imageView2/2/w/40/h/40/q/75|imageslim'" />

							<img v-if='!item.pubFaceUrl' src="../../static/img/haowenlogo.png" />

							<!--<img src="../../static/img/userimg.jpg"/>-->
							<!--<img :src="item.pubFaceUrl" />-->
							<div class="info">
								<h2>{{item.pubNickname}}</h2>
								<p>{{item.createTime}}</p>
							</div>
							<div class="right" @click='detele(item.id,index)'>
								<i class="el-icon-delete2"></i>
							</div>
						</div>
						<div class="bottom">
							<router-link :to='"/videoDetail/"+item.targetId' v-if='item.flag == "video"'>
								<div class="img">
									<img v-if='item.mediaUrl' :src="item.mediaUrl+'?vframe/png/offset/3/w/470/h/260|imageView2/1/w/480/h/360'" />
								</div>
								<div class="content">
									<h2 v-if='item.title'>{{item.title}}</h2>
									<p>
										{{item.content}}
									</p>
								</div>
							</router-link>

							<router-link :to='"/newsdetail/"+item.targetId' v-if='item.flag == "news"'>
								<div class="img">
									<img src="../../static/img/a37b4b1a8a845a26caa946eb1ebce909.jpg" />
									<img v-if='item.mediaUrl' :src="item.mediaUrl" />
								</div>

								<!--<img src="../../dist/static/img/a37b4b1a8a845a26caa946eb1ebce909.b7a5191.jpg" />-->
								<div class="content">
									<h2 v-if='item.title'>{{item.title}}</h2>
									<p>
										{{item.content}}
									</p>
								</div>
							</router-link>

							<router-link :to='"/wendadetail/"+item.targetId' v-if='item.flag == "question" || item.flag == "answer"'>

								<div class="img">
									<img v-if='item.pubFaceUrl' :src="item.mediaUrl" />
								</div>
								<!--<img v-if='item.pubFaceUrl' :src="item.mediaUrl" />-->
								<!--<img src="../../dist/static/img/a37b4b1a8a845a26caa946eb1ebce909.b7a5191.jpg" />-->
								<div class="content">
									<h2 v-if='item.title'>{{item.title}}</h2>
									<p>
										{{item.content}}
									</p>
								</div>
							</router-link>
						</div>
					</li>
				</ul>
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
				list: []
			}
		},
		mounted() {
			let token = sessionStorage.getItem('token')
			this.token = token
			this.$http({
				url: this.enHttp + '/mobile/collect/list?page=1&row=1000',
				method: 'get',
				headers: {
					'token': token
				}
			}).then(
				(res) => {
					this.list = res.data.data.entityList
				}
			)
		},
		methods: {
			detele(id, index) {
				this.$http({
					url: this.enHttp + '/mobile/collect/delete?id=' + id,
					method: 'get',
					headers: {
						'token': this.token
					}
				}).then(
					(res) => {
						let $this = this
						if(res.data.success) {
							$this.list.splice(index, 1)
							this.$notify({
								title: '成功',
								message: res.data.msg,
								type: 'success',
								duration: 1000
							})
						} else {
							this.$notify({
								title: '失败!',
								message: res.data.msg,
								type: 'error',
								duration: 1000
							})
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.collect-box {
		height: auto;
		overflow: hidden;
		li {
			height: auto;
			overflow: hidden;
			border: 1px solid #e2e2e2;
			margin-bottom: 10px;
			background: #fff;
			.bottom {
				padding: 0 10px 10px 10px;
				box-sizing: border-box;
				a {
					display: flex;
					.img {
						width: 160px;
						height: 90px;
						margin-right: 10px;
						justify-content: center;
						align-items: center;
						overflow: hidden;
						background: #000;
						display: flex;
						img {
							width: 100%;
							height: auto;
						}
					}
				}
				.content {
					flex: 1;
					h2 {
						margin-bottom: 10px;
						height: 20px;
						font-size: 18px;
						line-height: 20px;
						color: #333333;
						overflow: hidden;
					}
					p {
						height: 60px;
						overflow: hidden;
						line-height: 20px;
						font-size: 15px;
						color: #666;
					}
				}
			}
			.top {
				height: 80px;
				padding: 10px;
				box-sizing: border-box;
				display: flex;
				overflow: hidden;
				img {
					height: 54px;
					margin: 3px;
					display: block;
					margin-right: 15px;
				}
				.info {
					flex: 1;
					h2 {
						line-height: 35px;
						height: 35px;
						font-size: 16px;
						color: #3C3C3C;
					}
					p {
						color: #666;
						font-size: 14px;
					}
				}
				.right {
					font-size: 20px;
					line-height: 60px;
					color: #666;
					width: 60px;
					text-align: center;
					cursor: pointer;
				}
			}
		}
	}
</style>