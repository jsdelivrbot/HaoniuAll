<template>
	<div class="integralrule-box">
		<goback title='积分规则'></goback>
		<div class="text" v-html="newsInfo">
			
		</div>
	</div>
</template>

<script>
	import goback from '../components/goback'
	export default {
		components: {
			goback
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				newsInfo: ''
			}
		},
		created() {
			var _self = this
			this.$http.get(this.lchttp + '/app/news/column?newsId=23').then(
				(res) => {
					_self.newsInfo = res.data.obj.content
					//					_self.newsInfo = 'abc'
				}
			)
		}
	}
</script>

<style lang="less">
	.integralrule-box {
		background-color: white;
		min-height: 100%;
		padding: 46px 4% 0;
		box-sizing: border-box;
	}
	
	.text{
		position: relative;
	}
	
	.title {
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
	
	.pic {
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
	
	.wechat-footer {
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
		button {
			width: 36%;
			height: 36px;
			display: block;
			border-radius: 4px;
			background-color: rgb(62, 185, 64);
			margin: auto;
			border: none;
			color: white;
			font-size: 20px;
		}
	}
	
	.wechat-icon {
		position: absolute;
		left: 20px;
		top: 20px;
		img {
			width: 40px;
			height: 40px;
		}
	}
</style>