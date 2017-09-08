<template>
	<div class="feedback-box">
		<!--<div class="top-out-bar">
			<img src="../../static/img/left.svg" @click="goback()" />
			<span>意见反馈</span>
		</div>-->

		<goback title='意见反馈'></goback>

		<div class="feedback-msg">
			<!--<group>
				<x-input title="标题" v-model="title"></x-input>
			</group>
			<group>
				<x-textarea title="您的反馈" v-model="content"></x-textarea>
			</group>
			<group>
				<x-button text="提交" type="primary" action-type="button"></x-button>
			</group>-->
			<ul>
				<li class="left">
					<img src="../../static/img/meizi.jpg" />
					<div class="txt">
						这个软件功能上很好,界面也很漂亮,要是能多加一些功能就更好了!!!
					</div>
				</li>

				<li class="right">
					<div class="txt">
						谢谢,已经收到您的反馈,我们会尽快考虑您的需要,已做改正!
					</div>
					<img src="../../static/img/logo.png" />
				</li>
			</ul>

		</div>

		<div class="static-footer">
			<input type="text" name="" id="" value="" placeholder="在这里输入评论的内容....." />
			<span>发送</span>
		</div>

	</div>
</template>
<script>
	import goback from '../components/goback'
	import { CellFormPreview, Group, XInput, XTextarea, XButton } from 'vux'
	export default {
		components: {
			goback,
			CellFormPreview,
			Group,
			XInput,
			XTextarea,
			XButton
		}
	}
</script>
<style lang="less">
	.feedback-box {
		min-height: 100vh;
		background: #f3f3f3;
		padding-top: 46px;
		box-sizing: border-box;
		ul {
			height: auto;
			overflow: hidden;
			padding: 10px;
			box-sizing: border-box;
			li {
				display: flex;
				margin-bottom: 10px;
				img {
					width: 35px;
					height: 35px;
					border-radius: 3px;
				}
				.txt {
					flex: 1;
					border: 1px solid #fff;
					background: #fff;
					padding: 10px;
					box-sizing: border-box;
					border-radius: 5px;
					font-size: 14px;
					line-height: 20px;
				}
			}
			.left img {
				margin-right: 10px;
			}
			.right img {
				width: 35px;
				margin-left: 10px !important;
			}
		}
	}
</style>