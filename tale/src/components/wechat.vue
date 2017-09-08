<template>
	<div class="wechat-box">
		<goback title='微信咨询'></goback>
		<div class="text">
			<!--<div class="text" v-html="newsInfo">-->
			<div class="wechat-icon">
				<img src="../../static/img/wechaticon.png" />
			</div>
			<div class="title">
				<pre v-html="wechatContent">
					立即添加我的微信<br/>
					有机会申请成为您的免费私家健康顾问<br/>
					私家健康顾问900/年
				</pre>
				<div class="close" @click="back">×</div>
			</div>
			<div class="pic">
				<img :src="wechatImg" />
			</div>
			<div class="wechat-footer">
				<div class="phone">
					{{wnumber}}
				</div>
				<p>
					↑长按复制上方微信号，前往微信添加↑
				</p>
				
				<a href="weixin://">
					去微信 >
				</a>
				<!--<router-link tag='button' to='weixin://'>
					去微信 >
				</router-link>
				<button>
					去微信 >
				</button>-->
			</div>
		</div>
	</div>
</template>

<script>
	import goback from '../components/goback'
	export default {
		//		methods: {
		//			back() {
		//				this.$router.back(-1)
		//			}
		//		}
		components: {
			goback
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				wechatImg: '',
				wechatContent: '',
				wnumber: ''
			}
		},
		created() {
			var _self = this
			this.$http.get(this.lchttp + '/app/wx/get').then(
				(res) => {
					console.log(res.data.obj.imgUrl)
					this.wechatImg = this.lchttp + res.data.obj.imgUrl
					console.log(res.data)
					this.wnumber = res.data.obj.wxNumber
					this.wechatContent = res.data.obj.content
				}
			)
			//			this.$http.get(this.lchttp + '/app/dictionary/get?id=1').then(
			//				(res) => {
			//					console.log(res)
			//					this.wnumber = res.data.obj.value
			//				}
			//			)
		},
		methods: {
			back() {
				this.$router.back(-1)
			}
		}
	}
</script>

<style lang="less">
	.wechat-box {
		background-color: white;
		height: 100vh;
		padding: 46px 4% 0;
		padding-top: 46px;
		box-sizing: border-box;
		.text {
			padding: 10px 0;
			box-sizing: border-box;
			img {
				display: inline-block;
				/*margin: auto;*/
			}
		}
	}
	
	.wechat-box .text {
		position: relative;
	}
	
	.wechat-box .title {
		width: 100%;
		text-align: center;
		position: relative;
		line-height: 24px;
		padding: 40px 0;
		color: rgb(90, 90, 90);
		font-size: 14px;
		.close {
			position: absolute;
			right: 12px;
			top: 12px;
			color: rgb(148, 165, 185);
			font-weight: bolder;
			font-size: 40px;
		}
	}
	
	.wechat-box .pic {
		border: 1px dashed rgb(164, 164, 164);
		width: 70%;
		padding: 10px;
		margin: -30px auto 0;
		border-radius: 6px;
		img {
			width: 100%;
			height: 100%;
			margin: auto;
			display: block;
		}
	}
	
	.wechat-box .wechat-footer {
		width: 100%;
		box-sizing: border-box;
		padding-top: 40px;
		margin-top: -30px;
		.phone {
			width: 72.4%;
			background-color: rgb(245, 141, 72);
			height: 44px;
			margin: 0 auto;
			border-radius: 4px;
			font-size: 26px;
			text-align: center;
			color: white;
			line-height: 44px;
		}
		p {
			text-align: center;
			height: 40px;
			line-height: 40px;
			font-size: 14px;
		}
		button,a {
			width: 36%;
			height: 36px;
			display: block;
			border-radius: 4px;
			background-color: rgb(62, 185, 64);
			margin: auto;
			border: none;
			color: white;
			font-size: 20px;
			text-align: center;
		}
	}
	
	.wechat-box .wechat-icon {
		position: absolute;
		left: 20px;
		top: 20px;
		img {
			width: 40px;
			height: 40px;
		}
	}
</style>