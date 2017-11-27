<template>
	<div class="summary_box" v-show="isComplete">
		<return title="维护总结"></return>
		
		<div class="text_box">
			<p class="title">总结文字</p>
			<!--<textarea class="text" placeholder="请输入..."></textarea>-->
			<p class="text">{{result}}</p>
		</div>
		
		<div class="imgs">
			<p class="title">总结图片</p>
			<div class="gruop">
				<div class="item" v-for="(item, index) in imgs" :key="index" @click="previewPhone(httpUrl + item.targerUrl)">
					<img :src="httpUrl + item.targerUrl" />
				</div>
			</div>
		</div>
		
		<div>
			<x-dialog v-model="show" class="dialog-demo">
				<div class="img-box">
					<img :src="showPhote" style="max-width:60%">
				</div>
				<div @click="show=false">
					<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>
		
		<!--<div class="form">
			<button class="pub_button">提交总结</button>
		</div>-->
	</div>
</template>

<script>
	import Return from '@/components/Return'
	import { Group, XTextarea, XDialog } from 'vux'
	export default {
		name: 'Summary',
		data() {
			return {
				workOrderId: this.$route.params.id,
				imgs: [],
				result: '',
				httpUrl: localStorage.getItem('http'),
				isComplete: false,
				show: false,
				showPhote: ''
			}
		},
		components: {
			Return,
			Group,
			XTextarea,
			XDialog
		},
		created() {
			this.$vux.loading.show({
				text: '加载中'
			})
			this.$http.get('/api/frontBase/workOrder/findResult', {
				params: {
					workOrderId: this.workOrderId
				}
			}).then((res) => {
				console.log(res)
				if(res.data.result === 0) {
					this.imgs = res.data.obj.picturesUrl
					this.result = res.data.obj.result
				}else {
					this.$vux.alert.show({
						title: '提示',
						content: res.data.msg
					})
				}
				this.$nextTick(() => {
					this.isComplete = true
					this.$vux.loading.hide()
				})
			})
		},
		methods: {
			previewPhone(src) {
				this.show = true
				this.showPhote = src
			}
		}
	}
</script>

<style lang="less">
	.summary_box {
		padding-top: 44px;
		min-height: 100vh;
		box-sizing: border-box;
		background-color: white;
		.text_box {
			padding: 15px;
			.title {
				font-size: 14px;
				color: #666666;
			}
			.text {
				width: 100%;
				padding: 12px;
				box-sizing: border-box;
				font-size: 14px;
			}
		}
		.imgs {
			.title {
				font-size: 14px;
				padding-left: 15px;
				color: #666666;
			}
			.gruop {
				padding: 12px 15px;
				display: flex;
				justify-content: space-between;
				
				.item {
					width: 26vw;
					height: 26vw;
					/*border: 1px #cccccc solid;*/
					border-radius: 4px;
					/*overflow: hidden;*/
					/*background: url(../../static/img/camera.png) center no-repeat;*/
					/*background-size: 24px 20px;*/
					/*background-color: #fcfcfc;*/
					img {
						width: 100%;
					}
				}
			}
		}
		.form {
			padding: 0 15px;
			box-sizing: border-box;
			margin-top: 20px;
			.pub_button {
				width: 100%;
				height: 40px;
				border-radius: 2px;
				background-color: #0c81e0;
				color: white;
				border: none;
			}
		}
		.dialog-demo {
			.weui-dialog {
				border-radius: 8px;
				padding-bottom: 8px;
			}
			.dialog-title {
				line-height: 30px;
				color: #666;
			}
			.img-box {
				height: 350px;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.vux-close {
				margin-top: 8px;
				margin-bottom: 8px;
			}
		}
	}
</style>