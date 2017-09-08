<template>
	<div class="home-box">
		<swiper :aspect-ratio="300/450" :list="imgList"></swiper>
		<div class="tabbar">
			<ul>
				<li>
					<router-link to='/newsdetailSingle/2'>
						<img src="../../static/img/1.png" />
						<span>自我介绍</span>
					</router-link>
				</li>
				<li>
					<router-link to='/newsdetailSingle/3'>
						<img src="../../static/img/3.png" />
						<span>我的语录</span>
					</router-link>
				</li>
				<li>
					<router-link to='/newsdetailSingle/4'>
						<img src="../../static/img/4.png" />
						<span>相关视频</span>
					</router-link>
				</li>
				<li>
					<router-link to='/newsdetailSingle/5'>
						<img src="../../static/img/2.png" />
						<span>我的客户</span>
					</router-link>
				</li>
				<!--<li>
					<router-link to='/pub/job'>
						<img src="../../static/img/kefu.png" />
						<span>我的咨询</span>
					</router-link>
				</li>-->
			</ul>
		</div>

		<div class="content-box">
			<!--<div v-html="newsInfo.content"></div>-->
			<h2 class="title">
					工作室介绍
			</h2>
			<div class="text" v-html="newsInfo">
			</div>
			<h2 class="title">
				联合创始人
			</h2>

			<div class="text-img">
				<ul>
					<li v-for="item in renyuan">
						<div class="renyuanimg">
							<img :src="lchttp+item.imgUrl" />
							<div>
								<h2>{{item.name}}</h2>
								<h2>{{item.position}}</h2>
								<!--<p>{{item.description}}</p>-->
							</div>
						</div>

						<div class="renyuan" v-html="item.description">
						</div>
					</li>
				</ul>

			</div>

			<h2 class="title">
				推荐了解
			</h2>

			<div class="link">
				<router-link :to='"/newsdetail/"+item.id' v-for='item in newslist'>
					{{item.title}}
				</router-link>
			</div>
		</div>

		<div v-transfer-dom>
			<x-dialog v-model="show" :scroll="false" class="dialog-demo">
				<div>
					<ul>
						<li v-for='item in one'>
							<router-link :to='"/newsdetail/"+item.id'>
								{{item.title}}
							</router-link>
						</li>
					</ul>
				</div>
			</x-dialog>
		</div>

	</div>
</template>
<script>
	import { Swiper, XDialog, TransferDomDirective as TransferDom } from 'vux'
	import footer from '../components/footer'
	export default {
		directives: {
			TransferDom
		},
		components: {
			'v-footer': footer,
			Swiper,
			XDialog
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				imgList: [],
				newsInfo: '',
				staff: [],
				renyuan: [],
				show: false,
				one: [],
				newslist: []
			}
		},
		mounted() {
			if(!localStorage.getItem('one')) {
				this.$http.get(this.lchttp + '/app/news/column', {
					params: {
						newsId: 17
					}
				}).then(
					(res) => {
						this.show = true
						this.one = res.data.obj.result
						localStorage.setItem('one', 'onec')
					}
				)
			}
			this.$http.get(this.lchttp + '/app/news/column?newsId=21').then(
				(res) => {
					this.newslist = res.data.obj.result
					console.log(res.data)
				}
			)

			var _self = this
			this.$http.get(this.lchttp + '/app/banner/list').then(
				(res) => {
					let jsonArr = res.data.obj
					for(var i = 0; i < jsonArr.length; ++i) {
						var o = {}
						o.img = this.lchttp + jsonArr[i].imgUrl
						o.title = jsonArr[i].title
						o.url = '/newsdetail/' + jsonArr[i].targetId
						_self.imgList.push(o)
					}
				}
			)
			this.$http.get(this.lchttp + '/app/personnel/list').then(
				(res) => {
					this.renyuan = res.data.obj
				}
			)
			this.$http.get(this.lchttp + '/app/news/column?newsId=1').then(
				(res) => {
					_self.newsInfo = res.data.obj.content
				}
			)
		}
	}
</script>
<style lang="less">
	.home-box {
		background: #f3f3f3;
		height: auto;
		padding-bottom: 100px;
		overflow: hidden;
		/*background: #f90;*/
		.tabbar {
			ul {
				/*background-color:#fddee4;*/
				background-color: #c1e5fa;
			}
		}
	}
	
	.dialog-demo div {
		padding: 10px 10px;
		box-sizing: border-box;
		ul {
			background: none;
		}
		li {
			display: block;
			margin: 10px 0;
			background: #fff;
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			border-radius: 5px;
			border: 1px solid #eee;
			a {
				display: block;
				color: #363636;
				text-align: center;
			}
		}
	}
	
	.link {
		display: block;
		height: auto;
		overflow: hidden;
		margin-bottom: 40px;
		a {
			display: block;
			text-align: center;
			line-height: 40px;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: #2e9fff;
			overflow: hidden;
		}
	}
	
	.content-box {
		height: auto;
		overflow: hidden;
		border-top: 0.5px solid #e5e5e5;
		background: #fff;
		padding: 0 20px;
		box-sizing: border-box;
		.title {
			margin: 20px 0;
			text-align: center;
			color: #ff5d5c;
			font-size: 30px;
			position: relative;
			padding: 20px 0!important;
		}
		.title:before {
			position: absolute;
			content: '';
			left: 0;
			right: 0;
			bottom: -7px;
			width: 25px;
			height: 1px;
			margin: auto;
			background: #ff5d5c;
			border-radius: 5%;
		}
		/*.text {
			span{
				color: rgb(40,40,40) !important;
			}
			line-height: 34px;
			color: #707070;
			color: black;
			font-size: 20px;
			margin-bottom: 20px;
			text-indent: 2em;
		}*/
		.text-img {
			display: block;
			height: auto;
			/*overflow: hidden;*/
			padding: 10px 0;
			.renyuan {
				word-break: break-all;
			}
			li {
				height: auto;
				overflow: hidden;
				/*display: flex;*/
				margin-bottom: 20px;
				.renyuanimg {
					display: flex;
					div {
						margin-left: 20px;
					}
				}
				div {
					color: #000;
				}
				img {
					width: 100px;
					margin-right: 12px;
					height: 120px;
					flex: 0 0 100px;
				}
				div {
					flex: 1;
					h2 {
						font-size: 16px;
						color: #333333;
						line-height: 30px;
					}
					p {
						line-height: 25px;
						color: #707070;
						font-size: 14px;
					}
				}
			}
		}
	}
	
	.tabbar {
		height: auto;
		overflow: hidden;
		display: block;
		/*padding: 2px 0;*/
		background: #fff;
		margin-bottom: 10px;
		border-bottom: 0.5px solid #e5e5e5;
		/*margin-bottom: 10px;*/
		/*background: #f3f3f3;*/
		ul {
			display: flex;
			height: auto;
			overflow: hidden;
			li {
				flex: 1;
				padding: 5px 0;
				a {
					display: block;
					overflow: hidden;
					img {
						display: block;
						padding: 5px 15px;
						padding-bottom: 3px;
						box-sizing: border-box;
						width: 100%;
					}
					span {
						display: block;
						color: #333333;
						text-align: center;
						margin-bottom: 5px;
						font-size: 14px;
					}
				}
			}
		}
	}
</style>